import { test, expect } from "@playwright/test";
import { randomUUID } from "node:crypto";

const API_URL = "https://petstyle-backend-qa.onrender.com";
const QA_TEST_TOKEN = process.env.QA_TEST_TOKEN;

test.describe("TP7 - Integración API en QA", () => {
  test.setTimeout(120000);

  test("API 1: consulta productos reales", async ({ request }) => {
    const respuesta = await request.get(`${API_URL}/api/productos`, {
      timeout: 90000,
    });

    expect(respuesta.status()).toBe(200);

    const productos = await respuesta.json();

    expect(Array.isArray(productos)).toBe(true);
    expect(productos.length).toBeGreaterThan(0);
    expect(productos[0]).toHaveProperty("id");
    expect(productos[0]).toHaveProperty("nombre");
  });

  test("API 2: crea, consulta y elimina un pedido de prueba", async ({
    request,
  }) => {
    expect(
      QA_TEST_TOKEN,
      "Falta configurar QA_TEST_TOKEN"
    ).toBeTruthy();

    const respuestaProductos = await request.get(
      `${API_URL}/api/productos`
    );

    expect(respuestaProductos.status()).toBe(200);

    const productos = await respuestaProductos.json();
    const producto = productos.find((p) => Number(p.stock) > 0);

    expect(producto).toBeDefined();

    const direccion = `TEST-TP7-${randomUUID()}`;
    let pedidoId;

    try {
      // 1. Crear el pedido.
      const creacion = await request.post(`${API_URL}/api/pedidos`, {
        data: {
          direccion,
          ciudad: "Cordoba",
          codigoPostal: "5000",
          items: [{ id: producto.id, cantidad: 1 }],
        },
      });

      expect(creacion.status()).toBe(201);

      const pedidoCreado = await creacion.json();
      pedidoId = pedidoCreado.id;

      // 2. Consultar el pedido creado.
      const consulta = await request.get(
        `${API_URL}/api/pedidos/${pedidoId}`,
        {
          headers: {
            "x-qa-test-token": QA_TEST_TOKEN,
          },
        }
      );

      expect(consulta.status()).toBe(200);

      const pedidoConsultado = await consulta.json();

      expect(pedidoConsultado.id).toBe(pedidoId);
      expect(pedidoConsultado.direccion).toBe(direccion);
    } finally {
      // 3. Eliminar el pedido y restaurar el stock.
      if (pedidoId) {
        const eliminacion = await request.delete(
          `${API_URL}/api/pedidos/${pedidoId}`,
          {
            headers: {
              "x-qa-test-token": QA_TEST_TOKEN,
            },
          }
        );

        expect(eliminacion.status()).toBe(200);

        // 4. Verificar que ya no existe.
        const consultaFinal = await request.get(
          `${API_URL}/api/pedidos/${pedidoId}`,
          {
            headers: {
              "x-qa-test-token": QA_TEST_TOKEN,
            },
          }
        );

        expect(consultaFinal.status()).toBe(404);
      }
    }
  });

  test("API 3: rechaza un pedido inválido con HTTP 400", async ({
    request,
  }) => {
    const respuesta = await request.post(`${API_URL}/api/pedidos`, {
      data: {
        direccion: "TEST-TP7-INVALIDO",
        ciudad: "Cordoba",
        codigoPostal: "5000",
        items: [],
      },
    });

    expect(respuesta.status()).toBe(400);

    const datos = await respuesta.json();

    expect(datos).toHaveProperty("error");
  });
});