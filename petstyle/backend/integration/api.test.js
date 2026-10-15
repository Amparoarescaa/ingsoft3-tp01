const { randomUUID } = require("node:crypto");
const { Pool } = require("pg");

const API_URL = "https://petstyle-backend-qa.onrender.com";
const QA_DATABASE_URL = process.env.QA_DATABASE_URL;

const pool = QA_DATABASE_URL
  ? new Pool({
      connectionString: QA_DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    })
  : null;

describe("Integración API QA + PostgreSQL", () => {
  // TEST 1: Verificar la conexión real a PostgreSQL
  it("verifica la conexión real con PostgreSQL", async () => {
    const respuesta = await fetch(`${API_URL}/db`);
    const datos = await respuesta.json();

    expect(respuesta.status).toBe(200);
    expect(datos.mensaje).toBe("Conexión a PostgreSQL exitosa");
    expect(datos.fecha).toBeDefined();
  });

  // TEST 2: Consultar productos reales
  it("obtiene los productos reales desde PostgreSQL", async () => {
    const respuesta = await fetch(`${API_URL}/api/productos`);
    const productos = await respuesta.json();

    expect(respuesta.status).toBe(200);
    expect(Array.isArray(productos)).toBe(true);
    expect(productos.length).toBeGreaterThan(0);
    expect(productos[0]).toHaveProperty("id");
    expect(productos[0]).toHaveProperty("nombre");
  });

  // TEST 3: Crear un pedido real y limpiar los datos
  it("crea un pedido real y limpia los datos de prueba", async () => {
    if (!pool) {
      throw new Error(
        "Falta QA_DATABASE_URL. No se puede crear un pedido sin garantizar su limpieza."
      );
    }

    // Comprobar que podemos acceder a la base antes de crear datos.
    await pool.query("SELECT 1");

    const respuestaProductos = await fetch(`${API_URL}/api/productos`);
    expect(respuestaProductos.status).toBe(200);

    const productos = await respuestaProductos.json();
    const producto = productos.find((p) => Number(p.stock) > 0);

    expect(producto).toBeDefined();

    const identificadorPrueba = `TEST-TP7-${randomUUID()}`;

    let pedidoId = null;
    let errorLimpieza = null;

    try {
      // Crear pedido mediante la API real de QA.
      const respuesta = await fetch(`${API_URL}/api/pedidos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          direccion: identificadorPrueba,
          ciudad: "Cordoba",
          codigoPostal: "5000",
          items: [
            {
              id: producto.id,
              cantidad: 1,
            },
          ],
        }),
      });

      // Guardamos el ID si la API consiguió crear el pedido.
      if (respuesta.status === 201) {
        const pedido = await respuesta.json();
        pedidoId = pedido.id;
      }

      expect(respuesta.status).toBe(201);
      expect(pedidoId).toBeDefined();

      // Verificar que el pedido realmente existe en PostgreSQL.
      const pedidoGuardado = await pool.query(
        "SELECT * FROM pedidos WHERE id = $1 AND direccion = $2",
        [pedidoId, identificadorPrueba]
      );

      expect(pedidoGuardado.rows).toHaveLength(1);

      // Verificar que también se guardó el producto del pedido.
      const itemsGuardados = await pool.query(
        "SELECT * FROM pedido_items WHERE pedido_id = $1",
        [pedidoId]
      );

      expect(itemsGuardados.rows).toHaveLength(1);
      expect(Number(itemsGuardados.rows[0].producto_id)).toBe(
        Number(producto.id)
      );
    } finally {
      // Limpiar los registros de prueba aunque falle una comprobación.
      const cliente = await pool.connect();

      try {
        await cliente.query("BEGIN");

        // Localizar únicamente el pedido identificado como prueba.
        const pedidosPrueba = await cliente.query(
          "SELECT id FROM pedidos WHERE direccion = $1 FOR UPDATE",
          [identificadorPrueba]
        );

        for (const pedido of pedidosPrueba.rows) {
          // Recuperar cantidades para restaurar el stock.
          const items = await cliente.query(
            "SELECT producto_id, cantidad FROM pedido_items WHERE pedido_id = $1",
            [pedido.id]
          );

          for (const item of items.rows) {
            await cliente.query(
              "UPDATE productos SET stock = stock + $1 WHERE id = $2",
              [item.cantidad, item.producto_id]
            );
          }

          // Al borrar el pedido, se eliminan también sus items
          // por la relación ON DELETE CASCADE.
          await cliente.query(
            "DELETE FROM pedidos WHERE id = $1 AND direccion = $2",
            [pedido.id, identificadorPrueba]
          );
        }

        await cliente.query("COMMIT");

        // Comprobar que no quedaron registros de prueba.
        const restantes = await cliente.query(
          "SELECT id FROM pedidos WHERE direccion = $1",
          [identificadorPrueba]
        );

        expect(restantes.rows).toHaveLength(0);
      } catch (error) {
        await cliente.query("ROLLBACK");
        errorLimpieza = error;
      } finally {
        cliente.release();
      }

      if (errorLimpieza) {
        throw errorLimpieza;
      }
    }
  });
});

afterAll(async () => {
  if (pool) {
    await pool.end();
  }
});