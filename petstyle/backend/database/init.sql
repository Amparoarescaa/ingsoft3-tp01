CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    categoria VARCHAR(50),
    imagen VARCHAR(255)
);

TRUNCATE TABLE productos RESTART IDENTITY;

INSERT INTO productos (nombre, descripcion, precio, stock, categoria, imagen)
VALUES
('Set Paseo Floral', 'Set de paseo con collar, correa y accesorios con diseño floral', 12900.00, 15, 'Accesorios', '/mascotas/1.jpg'),
('Buzo de Peluche', 'Buzo abrigado de peluche para mascota', 18900.00, 10, 'Ropa', '/mascotas/2.jpg'),
('Cama Cuadros', 'Cama acolchada con diseño a cuadros y almohadones', 29900.00, 7, 'Camas', '/mascotas/3.jpg'),
('Hueso Mordillo', 'Juguete mordillo con textura para perros', 4900.00, 25, 'Juguetes', '/mascotas/4.jpg'),
('Sweater Flores', 'Sweater tejido con diseño de flores', 14900.00, 12, 'Ropa', '/mascotas/5.jpg'),
('Botella de Agua Portátil', 'Botella dispensadora de agua portátil para paseos', 8900.00, 20, 'Accesorios', '/mascotas/6.jpg');