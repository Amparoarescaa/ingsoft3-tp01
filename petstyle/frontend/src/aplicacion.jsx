import { Routes, Route, Navigate } from 'react-router-dom'
import Disposicion from './modulos/diseno/disposicion.jsx'
import Inicio from './paginas/Inicio.jsx'
import Productos from './paginas/Productos.jsx'
import Ingresar from './paginas/Ingresar.jsx'
import Carrito from './paginas/Carrito.jsx'
import Pago from './paginas/Pago.jsx'
import Perfil from './paginas/Perfil.jsx'
import RutaPrivada from './modulos/autenticacion/RutaPrivada.jsx'

export default function Aplicacion() {
    return (
        <Routes>
            <Route element={<Disposicion />}>
                {/* Públicas */}
                <Route path="/" element={<Inicio />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/ingresar" element={<Ingresar />} />
                {/* Privadas (luego las protegemos) */}
                <Route path="/carrito" element={<RutaPrivada><Carrito /></RutaPrivada>} />
                <Route path="/pago" element={<RutaPrivada><Pago /></RutaPrivada>} />
                <Route path="/perfil" element={<RutaPrivada><Perfil /></RutaPrivada>} />
                {/* Desconocidas */}
                <Route path="*" element={<Navigate to="/" />} />
            </Route>
        </Routes>
    )
}
