import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../autenticacion/ProveedorAutenticacion.jsx'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PetsIcon from '@mui/icons-material/Pets'

export default function BarraNavegacion() {
    const { autenticado, cerrarSesion } = useAuth()

    return (
        <AppBar position="sticky" color="primary" elevation={2} id="barra-superior">
            <Toolbar id="menu-navegacion" sx={{ gap: 1 }}>
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1, fontWeight: 700 }}
                    component={RouterLink}
                    to="/"
                    color="inherit"
                >
                    <PetsIcon />
                    PetStyle
                </Typography>

                <Button color="inherit" component={RouterLink} to="/productos" className="enlace-navegacion">
                    Productos
                </Button>

                <IconButton color="inherit" component={RouterLink} to="/carrito" aria-label="Carrito">
                    <ShoppingCartIcon />
                </IconButton>

                {autenticado ? (
                    <>
                        <Button color="inherit" component={RouterLink} to="/perfil">Perfil</Button>
                        <Button color="inherit" component={RouterLink} to="/pago">Pago</Button>
                        <Button color="inherit" onClick={cerrarSesion}>Salir</Button>
                    </>
                ) : (
                    <Button color="inherit" component={RouterLink} to="/ingresar" className="enlace-navegacion">
                        Ingresar
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}