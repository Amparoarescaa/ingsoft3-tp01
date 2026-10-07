export function calcularSubtotal(precio, cantidad) {
    if (precio < 0) {
        throw new Error('El precio no puede ser negativo')
    }

    if (!Number.isInteger(cantidad) || cantidad <= 0) {
        throw new Error('La cantidad debe ser un entero mayor a 0')
    }

    return precio * cantidad
}

export function calcularTotal(items) {
    return items.reduce(
        (total, item) => total + calcularSubtotal(item.precio, item.cantidad),
        0
    )
}

export function carritoVacio(items) {
    return items.length === 0
}

export function calcularDescuento(total, porcentaje) {
    if (porcentaje < 0 || porcentaje > 100) {
        throw new Error('El porcentaje debe estar entre 0 y 100')
    }

    if (porcentaje === 0) {
        return total
    }

    return total - (total * porcentaje) / 100
}