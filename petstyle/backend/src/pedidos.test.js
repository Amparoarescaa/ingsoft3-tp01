
const {
  validarCantidad,
  validarStock,
  calcularSubtotal,
  calcularTotal,
  obtenerProducto,
} = require("./pedidos");

describe("Lógica de pedidos", () => {
  describe("validarCantidad", () => {
    it.each([0, -1, -5, 1.5])(
      "rechaza la cantidad inválida %s",
      (cantidad) => {
        // Act
        const resultado = validarCantidad(cantidad);

        // Assert
        expect(resultado.valida).toBe(false);
      }
    );

    it("acepta una cantidad entera mayor a cero", () => {
      // Act
      const resultado = validarCantidad(2);

      // Assert
      expect(resultado.valida).toBe(true);
    });
  });

  describe("validarStock", () => {
    it("acepta cuando la cantidad es igual al stock disponible", () => {
      // Act
      const resultado = validarStock(5, 5);

      // Assert
      expect(resultado.valido).toBe(true);
    });

    it("rechaza cuando la cantidad supera el stock disponible", () => {
      // Act
      const resultado = validarStock(6, 5);

      // Assert
      expect(resultado.valido).toBe(false);
      expect(resultado.error).toBe("Stock insuficiente");
    });
  });

  describe("calcularSubtotal", () => {
    it("calcula precio por cantidad", () => {
      // Act
      const subtotal = calcularSubtotal(1500, 3);

      // Assert
      expect(subtotal).toBe(4500);
    });

    it("lanza un error si el precio es negativo", () => {
      // Act + Assert
      expect(() => calcularSubtotal(-100, 2)).toThrow(
        "El precio no puede ser negativo"
      );
    });
  });

  describe("calcularTotal", () => {
    it("suma los subtotales de todos los productos", () => {
      // Arrange
      const items = [
        { precio: 1000, cantidad: 2 },
        { precio: 500, cantidad: 3 },
      ];

      // Act
      const total = calcularTotal(items);

      // Assert
      expect(total).toBe(3500);
    });
  });

  describe("obtenerProducto", () => {
    it("obtiene el producto utilizando el repositorio", async () => {
      // Arrange
      const producto = { id: 7, nombre: "Correa", precio: 1200 };

      const repositorio = {
        buscarPorId: vi.fn().mockResolvedValue(producto),
      };

      // Act
      const resultado = await obtenerProducto(7, repositorio);

      // Assert
      expect(resultado).toEqual(producto);
      expect(repositorio.buscarPorId).toHaveBeenCalledWith(7);
      expect(repositorio.buscarPorId).toHaveBeenCalledTimes(1);
    });
  });
});