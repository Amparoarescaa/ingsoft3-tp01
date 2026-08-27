const express = require("express");
const pool = require("./db");

const app = express();
const PORT = 3000;

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

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});