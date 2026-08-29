import { useAuth } from '../modulos/autenticacion/ProveedorAutenticacion.jsx'
import { Box, Typography, Paper } from '@mui/material'

export default function Perfil() {
    const { usuario } = useAuth()

    return (
        <Box maxWidth={500} mx="auto">
            <Paper sx={{ p: 3, mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Perfil del usuario
                </Typography>
                <Typography variant="body1">
                    Bienvenid@, {usuario?.nombre || 'Usuario'} 🐾
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Email: {usuario?.email || 'no disponible'}
                </Typography>
            </Paper>
        </Box>
    )
}