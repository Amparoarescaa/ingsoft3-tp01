const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend de PetStyle funcionando");
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

  try {
    let total = 0;

    // Primero validamos los productos y calculamos el total.
    for (const item of items) {
      const resultado = await pool.query(
        "SELECT precio, stock FROM productos WHERE id = $1",
        [item.id]
      );

      if (resultado.rows.length === 0) {
        return res.status(404).json({
          error: "Producto no encontrado",
        });
      }

      const producto = resultado.rows[0];
      const precio = Number(producto.precio);

      if (item.cantidad <= 0) {
        return res.status(400).json({
          error: "La cantidad debe ser mayor a 0",
        });
      }

      if (item.cantidad > producto.stock) {
        return res.status(400).json({
          error: `Stock insuficiente para el producto ${item.id}`,
        });
      }

      total += precio * item.cantidad;
    }

    // Creamos el pedido.
    const pedido = await pool.query(
      `INSERT INTO pedidos (direccion, ciudad, codigo_postal, total)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [direccion, ciudad, codigoPostal, total]
    );

    const pedidoId = pedido.rows[0].id;

    // Guardamos los productos del pedido y descontamos el stock.
    for (const item of items) {
      const resultado = await pool.query(
        "SELECT precio FROM productos WHERE id = $1",
        [item.id]
      );

      const precio = Number(resultado.rows[0].precio);

      await pool.query(
        `INSERT INTO pedido_items
         (pedido_id, producto_id, cantidad, precio_unitario)
         VALUES ($1, $2, $3, $4)`,
        [pedidoId, item.id, item.cantidad, precio]
      );

      await pool.query(
        "UPDATE productos SET stock = stock - $1 WHERE id = $2",
        [item.cantidad, item.id]
      );
    }

    res.status(201).json(pedido.rows[0]);
  } catch (error) {
    res.status(500).json({
      error: "No se pudo crear el pedido",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});