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

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});