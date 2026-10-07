import { describe, it, expect } from 'vitest'
import {
    calcularSubtotal,
    calcularTotal,
    carritoVacio,
} from './carrito'

describe('Lógica del carrito', () => {
    describe('calcularSubtotal', () => {
        it.each([
            [1000, 2, 2000],
            [750, 3, 2250],
            [125.5, 2, 251],
        ])(
            'calcula el subtotal de precio %s y cantidad %s',
            (precio, cantidad, esperado) => {
                // Act
                const resultado = calcularSubtotal(precio, cantidad)

                // Assert
                expect(resultado).toBe(esperado)
            }
        )

        it('lanza un error si el precio es negativo', () => {
            // Act + Assert
            expect(() => calcularSubtotal(-100, 2)).toThrow(
                'El precio no puede ser negativo'
            )
        })

        it('lanza un error si la cantidad no es un entero positivo', () => {
            // Act + Assert
            expect(() => calcularSubtotal(1000, 0)).toThrow(
                'La cantidad debe ser un entero mayor a 0'
            )
        })
    })

    describe('calcularTotal', () => {
        it('suma los subtotales de los productos del carrito', () => {
            // Arrange
            const items = [
                { precio: 1000, cantidad: 2 },
                { precio: 500, cantidad: 3 },
            ]

            // Act
            const resultado = calcularTotal(items)

            // Assert
            expect(resultado).toBe(3500)
        })
    })

    describe('carritoVacio', () => {
        it('indica que un carrito sin productos está vacío', () => {
            // Act
            const resultado = carritoVacio([])

            // Assert
            expect(resultado).toBe(true)
        })

        it('indica que un carrito con productos no está vacío', () => {
            // Arrange
            const items = [{ id: 1, precio: 1000, cantidad: 1 }]

            // Act
            const resultado = carritoVacio(items)

            // Assert
            expect(resultado).toBe(false)
        })
    })
})