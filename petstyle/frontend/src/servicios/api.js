import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:3000/api',
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