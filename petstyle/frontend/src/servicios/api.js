import axios from 'axios'

export const api = axios.create({
    baseURL: '/api',
})

api.interceptors.request.use((config) => {
    const u = localStorage.getItem('tw_usuario')
    if (u) {
        const { token } = JSON.parse(u)
        if (token) config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const ProductosServicio = {
    async listar() {
        const { data } = await api.get('/productos')
        return data
    },
}

export const CarritoServicio = {
    async crear(pedido) {
        const { data } = await api.post('/pedidos', pedido)
        return data
    },
}