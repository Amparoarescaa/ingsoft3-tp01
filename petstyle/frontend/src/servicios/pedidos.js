export async function enviarPedido(pedido, clienteHttp) {
    const { data } = await clienteHttp.post('/pedidos', pedido)
    return data
}