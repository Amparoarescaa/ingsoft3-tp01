import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'
import BarraNavegacion from './BarraNavegacion.jsx'

export default function Disposicion() {
    return (
        <>
            <BarraNavegacion />
            <Container id="contenedor-principal" sx={{ py: 3 }}>
                <Outlet />
            </Container>
        </>
    )
}