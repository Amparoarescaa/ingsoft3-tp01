import { test, expect } from "@playwright/test";

test.describe("PetStyle - E2E en QA", () => {
  test.setTimeout(120000);

  async function abrirProductos(page) {
    await page.goto("/productos", {
      waitUntil: "domcontentloaded",
      timeout: 90000,
    });

    // Esperar a que Render termine de iniciar el frontend.
    await expect(async () => {
      await page.reload({
        waitUntil: "domcontentloaded",
        timeout: 90000,
      });

      await expect(
        page.locator("#titulo-productos")
      ).toBeVisible({ timeout: 10000 });
    }).toPass({
      timeout: 90000,
      intervals: [3000, 5000, 10000],
    });

    // Esperar los productos reales obtenidos desde la API.
    await expect(
      page.locator(".grilla-productos > *").first()
    ).toBeVisible({ timeout: 30000 });
  }

  test("E2E 1: muestra productos reales de la tienda", async ({ page }) => {
    await abrirProductos(page);

    await expect(
      page.locator("#titulo-productos")
    ).toHaveText("Accesorios para tu mascota");

    await expect(
      page.locator(".grilla-productos > *").first()
    ).toBeVisible();
  });

  test("E2E 2: permite agregar un producto al carrito", async ({ page }) => {
    await abrirProductos(page);

    await page
      .locator(".grilla-productos")
      .getByRole("button", { name: /agregar/i })
      .first()
      .click();

    const carrito = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("tw_carrito") || "[]")
    );

    expect(carrito).toHaveLength(1);
    expect(carrito[0].cantidad).toBe(1);
  });

  test("E2E 3: protege el carrito para usuarios no autenticados", async ({
    page,
  }) => {
    await abrirProductos(page);

    // Agregar un producto como usuario no autenticado.
    await page
      .locator(".grilla-productos")
      .getByRole("button", { name: /agregar/i })
      .first()
      .click();

    // Intentar ingresar al carrito.
    await page.goto("/carrito");

    // La aplicación debe redirigir al inicio de sesión.
    await expect(page).toHaveURL(/\/ingresar$/);

    await expect(
      page.getByRole("heading", { name: "Ingresar" })
    ).toBeVisible();

    await expect(
      page.getByRole("textbox", { name: "Email" })
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Entrar" })
    ).toBeVisible();
  });
});