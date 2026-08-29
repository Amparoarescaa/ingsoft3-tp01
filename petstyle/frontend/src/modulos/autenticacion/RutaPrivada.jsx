import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './ProveedorAutenticacion.jsx'

export default function RutaPrivada({ children }) {
    const { autenticado } = useAuth()
    const ubicacion = useLocation()
    if (!autenticado) {
        return <Navigate to="/ingresar" replace state={{ from: ubicacion }} />
    }
    return children
}