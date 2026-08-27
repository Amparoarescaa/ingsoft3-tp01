import React from 'react'
import { Box, Button, Container, Paper, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import PetsIcon from '@mui/icons-material/Pets'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'

export default function Inicio() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Encabezado */}
            <Box textAlign="center" mb={3}>
                <Typography variant="h3" component="h1" fontWeight={600} gutterBottom>
                    Bienvenidos a PetStyle!
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Tu tienda de accesorios para mascotas 🐾
                </Typography>
            </Box>

            {/* Hero  */}
            <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 3, position: 'relative' }}>
                <Box
                    component="img"
                    src="/mascotas/portada.jpg"
                    alt="Mascotas felices con accesorios"
                    onError={(e) => { e.currentTarget.src = '/mascotas/1.jpg' }} 
                    sx={{
                        width: '100%',
                        height: { xs: 280, sm: 340, md: 400 },
                        objectFit: 'contain',    
                        objectPosition: 'center',
                        display: 'block',
                        backgroundColor: '#f6e9f0'
                    }}
                />
            </Paper>

            {/* Acciones */}
            <Box mt={3} textAlign="center">
                <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    component={RouterLink}
                    to="/productos"
                    startIcon={<ShoppingBagIcon />}
                    sx={{ px: 4, borderRadius: 3 }}
                >
                    Ver productos
                </Button>
                <Button
                    size="large"
                    variant="text"
                    color="primary"
                    component={RouterLink}
                    to="/perfil"
                    startIcon={<PetsIcon />}
                    sx={{ ml: 2 }}
                >
                    Mi perfil
                </Button>
            </Box>

        </Container>
    )
}
