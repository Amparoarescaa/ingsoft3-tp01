function validarCantidad(cantidad) {
  if (!Number.isInteger(cantidad) || cantidad <= 0) {
    return {
      valida: false,
      error: "La cantidad debe ser un entero mayor a 0",
    };
  }

  return { valida: true };
}

function validarStock(cantidad, stock) {
  if (cantidad > stock) {
    return {
      valido: false,
      error: "Stock insuficiente",
    };
  }

  return { valido: true };
}

function calcularSubtotal(precio, cantidad) {
  if (precio < 0) {
    throw new Error("El precio no puede ser negativo");
  }

  return precio * cantidad;
}

function calcularTotal(items) {
  return items.reduce(
    (total, item) => total + calcularSubtotal(item.precio, item.cantidad),
    0
  );
}

async function obtenerProducto(productoId, repositorio) {
  const producto = await repositorio.buscarPorId(productoId);

  if (!producto) {
    throw new Error("Producto no encontrado");
  }

  return producto;
}

function calcularCostoEnvio(total) {
  if (total >= 50000) {
    return 0;
  }

  if (total >= 20000) {
    return 2500;
  }

  return 5000;
}

module.exports = {
  validarCantidad,
  validarStock,
  calcularSubtotal,
  calcularTotal,
  obtenerProducto,
  calcularCostoEnvio,
};