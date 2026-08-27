import { createTheme } from '@mui/material/styles';

const tema = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#81D4FA' },   
        secondary: { main: '#F48FB1' }, 
        background: {
            default: '#FFF8E1',           
            paper: '#FFFFFF'
        },
        text: { primary: '#333' }
    },
    typography: {
        fontFamily: 'Poppins, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
        h4: { fontWeight: 700 },
        h5: { fontWeight: 700 },
        button: { fontWeight: 600, textTransform: 'none' }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: { borderRadius: 14, paddingInline: 16, paddingBlock: 8 }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: { borderRadius: 16, boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: { borderRadius: 0 }
            }
        }
    }
});

export default tema;
