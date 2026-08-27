import { useEffect, useState } from 'react'
import { Grid, Typography, Snackbar, Alert } from '@mui/material'
import { ProductosServicio } from '../servicios/api.js'
import TarjetaProducto from '../modulos/diseno/TarjetaProducto.jsx'

export default function Productos() {
    const [productos, setProductos] = useState([])
    const [msg, setMsg] = useState('')

    useEffect(() => {
        ProductosServicio.listar()
            .then(setProductos)
            .catch(() => setProductos([]))
    }, [])

    function agregarAlCarrito(p) {
        const carrito = JSON.parse(localStorage.getItem('tw_carrito') || '[]')
        const existe = carrito.find(x => x.id === p.id)
        const siguiente = existe
            ? carrito.map(x => x.id === p.id ? { ...x, cantidad: x.cantidad + 1 } : x)
            : [...carrito, { id: p.id, titulo: p.title, precio: p.price, cantidad: 1 }]
        localStorage.setItem('tw_carrito', JSON.stringify(siguiente))
        setMsg(`${p.title} agregado al carrito`)
    }

    const nombres = [
        '~Combo paseo floral',
        '~Traje osito peludo',
        '~Cucha estilo Burberry',
        '~Juguete huesito',
        '~Traje con nombre personalizado',
        '~Botella de agua portable'
    ]
    const precios = [12500, 15000, 37000, 10250, 13000, 7300]

    const productosAMostrar = productos.slice(0, 6).map((p, i) => ({
        ...p,
        image: `/mascotas/${i + 1}.jpg`,
        title: nombres[i],
        description: 'Producto pensado para el confort y diversión de tu mascota 🐾',
        price: precios[i]
    }))

    return (
        <>
            <Typography variant="h4" gutterBottom id="titulo-productos">
                Accesorios para tu mascota
            </Typography>
            <Grid container spacing={2} className="grilla-productos">
                {productosAMostrar.map(p => (
                    <Grid key={p.id} item xs={12} sm={6} md={4} lg={3}>
                        <TarjetaProducto producto={p} onAgregar={agregarAlCarrito} />
                    </Grid>
                ))}
            </Grid>
            <Snackbar open={!!msg} autoHideDuration={2000} onClose={() => setMsg('')}>
                <Alert severity="success">{msg}</Alert>
            </Snackbar>
        </>
    )
}
