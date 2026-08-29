import { useEffect, useState } from 'react'
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Carrito() {
    const [items, setItems] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        setItems(JSON.parse(localStorage.getItem('tw_carrito') || '[]'))
    }, [])

    const total = items.reduce((acc, it) => acc + it.precio * it.cantidad, 0)

    return (
        <Box>
            <Typography variant="h4" gutterBottom id="titulo-carrito">Carrito</Typography>
            {items.length === 0 ? (
                <Typography>Tu carrito está vacío.</Typography>
            ) : (
                <>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Producto</TableCell>
                                <TableCell>Cantidad</TableCell>
                                <TableCell>Precio</TableCell>
                                <TableCell>Subtotal</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((it) => (
                                <TableRow key={it.id}>
                                    <TableCell>{it.titulo}</TableCell>
                                    <TableCell>{it.cantidad}</TableCell>
                                    <TableCell>${it.precio}</TableCell>
                                    <TableCell>${(it.precio * it.cantidad).toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Typography variant="h6" sx={{ mt: 2 }}>Total: ${total.toFixed(2)}</Typography>
                    <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/pago')} id="boton-proceder-pago">
                        Proceder al pago
                    </Button>
                </>
            )}
        </Box>
    )
}