import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material'

export default function TarjetaProducto({ producto, onAgregar }) {
    return (
        <Card className="tarjeta-producto" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                image={producto.image}
                height="180"
                alt={producto.title}
                sx={{ objectFit: 'contain', p: 2 }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" gutterBottom noWrap>{producto.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {producto.description}
                </Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>${producto.price}</Typography>
            </CardContent>
            <CardActions>
                <Button fullWidth variant="contained" id="boton-agregar" onClick={() => onAgregar(producto)}>
                    Agregar
                </Button>
            </CardActions>
        </Card>
    )
}