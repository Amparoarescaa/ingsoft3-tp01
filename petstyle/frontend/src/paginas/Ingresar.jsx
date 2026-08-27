import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Paper, TextField, Button, Typography, Alert } from '@mui/material'
import { useAuth } from '../modulos/autenticacion/ProveedorAutenticacion.jsx'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Ingresar() {
    const [errorLogin, setErrorLogin] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { email: '', password: '' }
    })

    const { iniciarSesion } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const volverA = location.state?.from?.pathname || '/'

    function onSubmit(values) {
        setErrorLogin('')
        const { ok, error } = iniciarSesion(values)
        if (ok) return navigate(volverA, { replace: true })
        setErrorLogin(error || 'No fue posible iniciar sesión')
    }

    return (
        <Box maxWidth={420} mx="auto" id="seccion-ingresar">
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>Ingresar</Typography>

                {errorLogin && <Alert severity="error" sx={{ mb: 2 }}>{errorLogin}</Alert>}

                <Box component="form" id="formulario-ingreso" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        {...register('email', {
                            required: 'Email requerido',
                            pattern: { value: /[^@\s]+@[^@\s]+\.[^@\s]+/, message: 'Email inválido' }
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        label="Contraseña"
                        type="password"
                        fullWidth
                        margin="normal"
                        {...register('password', {
                            required: 'Contraseña requerida',
                            minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} id="boton-entrar">
                        Entrar
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}