const express = require("express");
const cors = require("cors");
const pool = require("./db");

const {
  validarCantidad,
  validarStock,
  calcularSubtotal,
  obtenerProducto,
} = require("./src/pedidos");

const app = express();
const PORT = process.env.PORT || 3000;

const repositorioProductos = {
  async buscarPorId(id) {
    const resultado = await pool.query(
      "SELECT precio, stock FROM productos WHERE id = $1",
      [id]
    );

    return resultado.rows[0] || null;
  },
};

app.use(cors());
app.use(express.json());

// Autorizar operaciones exclusivas de las pruebas de integración en QA.
function autorizarPruebasQA(req, res, next) {
  if (process.env.APP_ENV !== "qa") {
    return res.status(404).json({
      error: "Ruta no disponible",
    });
  }

  const tokenConfigurado = process.env.QA_TEST_TOKEN;
  const tokenRecibido = req.get("x-qa-test-token");

  if (
    !tokenConfigurado ||
    !tokenRecibido ||
    tokenRecibido.trim() !== tokenConfigurado.trim()
  ) {
    return res.status(403).json({
      error: "Acceso no autorizado",
    });
  }

  next();
}

app.get("/", (req, res) => {
  res.send("Backend de PetStyle funcionando");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/db", async (req, res) => {
  try {
    const resultado = await pool.query("SELECT NOW()");

    res.json({
      mensaje: "Conexión a PostgreSQL exitosa",
      fecha: resultado.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      error: "No se pudo conectar a PostgreSQL",
    });
  }
});

app.get("/api/productos", async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM productos ORDER BY id"
    );

    res.json(resultado.rows);
  } catch (error) {
    res.status(500).json({
      error: "No se pudieron obtener los productos",
    });
  }
});

app.post("/api/pedidos", async (req, res) => {
  const { direccion, ciudad, codigoPostal, items } = req.body;

  let cliente;

  try {
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: "El pedido debe contener productos",
      });
    }

    cliente = await pool.connect();
    await cliente.query("BEGIN");

    let total = 0;

    // Evitar productos repetidos en un mismo pedido.
    const productosRecibidos = new Set();

    for (const item of items) {
      if (productosRecibidos.has(String(item.id))) {
        await cliente.query("ROLLBACK");

        return res.status(400).json({
          error: "No se permiten productos repetidos en el pedido",
        });
      }

      productosRecibidos.add(String(item.id));
    }

    // Validar productos, cantidades y stock.
    for (const item of items) {
      const resultado = await cliente.query(
        "SELECT precio, stock FROM productos WHERE id = $1 FOR UPDATE",
        [item.id]
      );

      const producto = resultado.rows[0];

      if (!producto) {
        await cliente.query("ROLLBACK");

        return res.status(404).json({
          error: "Producto no encontrado",
        });
      }

      const cantidad = validarCantidad(item.cantidad);

      if (!cantidad.valida) {
        await cliente.query("ROLLBACK");

        return res.status(400).json({
          error: cantidad.error,
        });
      }

      const stock = validarStock(item.cantidad, producto.stock);

      if (!stock.valido) {
        await cliente.query("ROLLBACK");

        return res.status(400).json({
          error: `Stock insuficiente para el producto ${item.id}`,
        });
      }

      total += calcularSubtotal(
        Number(producto.precio),
        item.cantidad
      );
    }

    // Crear el pedido.
    const pedido = await cliente.query(
      `INSERT INTO pedidos (direccion, ciudad, codigo_postal, total)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [direccion, ciudad, codigoPostal, total]
    );

    const pedidoId = pedido.rows[0].id;

    // Guardar los productos del pedido y descontar stock.
    for (const item of items) {
      const resultado = await cliente.query(
        "SELECT precio FROM productos WHERE id = $1",
        [item.id]
      );

      const precio = Number(resultado.rows[0].precio);

      await cliente.query(
        `INSERT INTO pedido_items
         (pedido_id, producto_id, cantidad, precio_unitario)
         VALUES ($1, $2, $3, $4)`,
        [pedidoId, item.id, item.cantidad, precio]
      );

      await cliente.query(
        "UPDATE productos SET stock = stock - $1 WHERE id = $2",
        [item.cantidad, item.id]
      );
    }

    // Confirmar la transacción.
    await cliente.query("COMMIT");

    res.status(201).json(pedido.rows[0]);

  } catch (error) {
    if (cliente) {
      try {
        await cliente.query("ROLLBACK");
      } catch (rollbackError) {
        console.error("Error al revertir la transacción:", rollbackError);
      }
    }

    res.status(500).json({
      error: "No se pudo crear el pedido",
    });

  } finally {
    if (cliente) {
      cliente.release();
    }
  }
});

// Consultar un pedido por ID (exclusivo para pruebas de integración en QA).
app.get("/api/pedidos/:id", autorizarPruebasQA, async (req, res) => {
  const pedidoId = Number(req.params.id);

  if (!Number.isSafeInteger(pedidoId) || pedidoId <= 0) {
    return res.status(400).json({
      error: "ID de pedido inválido",
    });
  }

  try {
    const resultado = await pool.query(
      "SELECT * FROM pedidos WHERE id = $1 AND direccion LIKE 'TEST-TP7-%'",
      [pedidoId]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        error: "Pedido de prueba no encontrado",
      });
    }

    res.status(200).json(resultado.rows[0]);
  } catch (error) {
    console.error("Error al consultar pedido de prueba:", error);

    res.status(500).json({
      error: "No se pudo consultar el pedido",
    });
  }
});

// Eliminar un pedido de prueba y restaurar su stock (solo QA).
app.delete("/api/pedidos/:id", autorizarPruebasQA, async (req, res) => {
  const pedidoId = Number(req.params.id);

  if (!Number.isSafeInteger(pedidoId) || pedidoId <= 0) {
    return res.status(400).json({
      error: "ID de pedido inválido",
    });
  }

  let cliente;

  try {
    cliente = await pool.connect();
    await cliente.query("BEGIN");

    // Bloquear el pedido para evitar modificaciones simultáneas.
    const resultado = await cliente.query(
      `SELECT id
       FROM pedidos
       WHERE id = $1 AND direccion LIKE 'TEST-TP7-%'
       FOR UPDATE`,
      [pedidoId]
    );

    if (resultado.rows.length === 0) {
      await cliente.query("ROLLBACK");

      return res.status(404).json({
        error: "Pedido de prueba no encontrado",
      });
    }

    // Recuperar los productos y cantidades del pedido.
    const items = await cliente.query(
      `SELECT producto_id, cantidad
       FROM pedido_items
       WHERE pedido_id = $1`,
      [pedidoId]
    );

    // Restaurar el stock descontado al crear el pedido.
    for (const item of items.rows) {
      await cliente.query(
        `UPDATE productos
         SET stock = stock + $1
         WHERE id = $2`,
        [item.cantidad, item.producto_id]
      );
    }

    // ON DELETE CASCADE elimina también los ítems del pedido.
    await cliente.query(
      "DELETE FROM pedidos WHERE id = $1",
      [pedidoId]
    );

    await cliente.query("COMMIT");

    return res.status(200).json({
      mensaje: "Pedido de prueba eliminado correctamente",
      id: pedidoId,
    });
  } catch (error) {
    if (cliente) {
      try {
        await cliente.query("ROLLBACK");
      } catch (rollbackError) {
        console.error("Error al revertir eliminación:", rollbackError);
      }
    }

    console.error("Error al eliminar pedido de prueba:", error);

    return res.status(500).json({
      error: "No se pudo eliminar el pedido de prueba",
    });
  } finally {
    if (cliente) {
      cliente.release();
    }
  }
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});