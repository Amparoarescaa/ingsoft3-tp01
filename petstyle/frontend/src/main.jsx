import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline, ThemeProvider, GlobalStyles } from '@mui/material'
import Aplicacion from './aplicacion.jsx'
import tema from './tema.js'
import { ProveedorAutenticacion } from './modulos/autenticacion/ProveedorAutenticacion.jsx'

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