import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CtxAuth = createContext(null)

export function ProveedorAutenticacion({ children }) {
    const [usuario, setUsuario] = useState(() => {
        const guardado = localStorage.getItem('tw_usuario')
        return guardado ? JSON.parse(guardado) : null
    })

    const autenticado = Boolean(usuario)

    function iniciarSesion({ email, password }) {
        const emailValido = 'amparo@gmail.com'
        const contraseniaValida  = '123456'

        if (email === emailValido && password === contraseniaValida) {
            const usuario = {
                id: 1,
                nombre: 'Amparo',
                email,
                token: 'token-demo'
            }

            setUsuario(usuario)
            localStorage.setItem('tw_usuario', JSON.stringify(usuario))
            return { ok: true }
        }

        return { ok: false, error: 'Credenciales inválidas' }

    }

    function cerrarSesion() {
        setUsuario(null)
        localStorage.removeItem('tw_usuario')
        localStorage.removeItem('tw_carrito')
    }

    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === 'tw_usuario') {
                setUsuario(e.newValue ? JSON.parse(e.newValue) : null)
            }
        }
        window.addEventListener('storage', onStorage)
        return () => window.removeEventListener('storage', onStorage)
    }, [])

    const valor = useMemo(() => ({
        usuario, autenticado, iniciarSesion, cerrarSesion
    }), [usuario, autenticado])

    return <CtxAuth.Provider value={valor}>{children}</CtxAuth.Provider>
}

export function useAuth() {
    const ctx = useContext(CtxAuth)
    if (!ctx) throw new Error('useAuth debe usarse dentro de ProveedorAutenticacion')
    return ctx
}
