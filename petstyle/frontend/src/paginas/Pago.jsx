import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, Paper, TextField, Typography, Alert } from '@mui/material'
import { CarritoServicio } from '../servicios/api.js'

export default function Pago() {
    const [estado, setEstado] = useState(null)
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { direccion: '', ciudad: '', codigoPostal: '' },
    })

    async function onSubmit(values) {
    const items = JSON.parse(localStorage.getItem('tw_carrito') || '[]')

    if (items.length === 0) {
        return setEstado({
            tipo: 'error',
            msg: 'No hay items en el carrito.'
        })
    }

    try {
        await CarritoServicio.crear({
            direccion: values.direccion,
            ciudad: values.ciudad,
            codigoPostal: values.codigoPostal,
            items: items
        })

        setEstado({
            tipo: 'success',
            msg: `Pedido confirmado para ${values.direccion}, ${values.ciudad}.`
        })

        localStorage.removeItem('tw_carrito')
    } catch (e) {
        setEstado({
            tipo: 'error',
            msg: 'Error procesando el pedido. Intenta de nuevo.'
        })
    }
}

    return (
        <Box maxWidth={520} mx="auto" id="seccion-pago">
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>Pago</Typography>
                <Box component="form" id="formulario-pago" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        label="Dirección"
                        fullWidth
                        margin="normal"
                        {...register('direccion', { required: 'Dirección requerida' })}
                        error={!!errors.direccion}
                        helperText={errors.direccion?.message}
                    />
                    <TextField
                        label="Ciudad"
                        fullWidth
                        margin="normal"
                        {...register('ciudad', { required: 'Ciudad requerida' })}
                        error={!!errors.ciudad}
                        helperText={errors.ciudad?.message}
                    />
                    <TextField
                        label="Código Postal"
                        fullWidth
                        margin="normal"
                        {...register('codigoPostal', { required: 'CP requerido', pattern: { value: /^\d{4,8}$/, message: 'Solo números (4-8 dígitos)' } })}
                        error={!!errors.codigoPostal}
                        helperText={errors.codigoPostal?.message}
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} id="boton-confirmar-pago">
                        Confirmar pedido
                    </Button>
                </Box>
                {estado && <Alert sx={{ mt: 2 }} severity={estado.tipo}>{estado.msg}</Alert>}
            </Paper>
        </Box>
    )
}
