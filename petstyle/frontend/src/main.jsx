import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline, ThemeProvider, GlobalStyles } from '@mui/material'
import Aplicacion from './aplicacion.jsx'
import tema from './tema.js'
import { ProveedorAutenticacion } from './modulos/autenticacion/ProveedorAutenticacion.jsx'

if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
        dsn: import.meta.env.VITE_SENTRY_DSN,
        environment: import.meta.env.MODE,
        integrations: [
            Sentry.browserTracingIntegration(),
        ],
        tracesSampleRate: 1.0,
    })
}

import * as Sentry from '@sentry/react'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={tema}>
            <CssBaseline />
            <GlobalStyles styles={{ body: { backgroundColor: '#FFF8E1' } }} />
            <BrowserRouter>
                <ProveedorAutenticacion>
                    <Aplicacion />
                </ProveedorAutenticacion>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
)