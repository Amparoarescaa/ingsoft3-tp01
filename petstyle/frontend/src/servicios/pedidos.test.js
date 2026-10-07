import { describe, it, expect, vi } from 'vitest'
import { enviarPedido } from './pedidos'

describe('Servicio de pedidos', () => {
    it('envía el pedido usando el cliente HTTP recibido', async () => {
        // Arrange
        const pedido = {
            direccion: 'Av. Colón 123',
            ciudad: 'Córdoba',
            codigoPostal: '5000',
            items: [
                { id: 1, cantidad: 2 },
            ],
        }

        const respuestaEsperada = {
            id: 10,
            total: 5000,
        }

        const clienteHttp = {
            post: vi.fn().mockResolvedValue({
                data: respuestaEsperada,
            }),
        }

        // Act
        const resultado = await enviarPedido(pedido, clienteHttp)

        // Assert
        expect(clienteHttp.post).toHaveBeenCalledWith('/pedidos', pedido)
        expect(clienteHttp.post).toHaveBeenCalledTimes(1)
        expect(resultado).toEqual(respuestaEsperada)
    })
})