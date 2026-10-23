\c huellas;

CREATE TABLE IF NOT EXISTS productos (
    id          SERIAL PRIMARY KEY,
    nombre      VARCHAR(120)  NOT NULL,
    imagen      VARCHAR(255),
    precio      NUMERIC(10,2) NOT NULL CHECK (precio >= 0),
    categoria   VARCHAR(30)   NOT NULL,
    marca       VARCHAR(60),
    descripcion TEXT,
    peso        VARCHAR(40),
    sabor       VARCHAR(60),
    para        VARCHAR(60),
    creado_en   TIMESTAMP DEFAULT NOW()
);

INSERT INTO productos (nombre, imagen, precio, categoria, marca, descripcion, peso, sabor, para) VALUES
('Alimento Perro Adulto', './recursos/imagenes/ALIMENTO PERRO.jpg', 15000, 'alimentos', 'Royal Canin', 'Alimento balanceado premium para perros adultos de todas las razas. Rico en proteinas y vitaminas.', '15 kg', 'Pollo y arroz', 'perros adultos'),
('Rascador para Gatos', './recursos/imagenes/ACCESORIO GATO.png', 7500, 'accesorios', 'CatLove', 'Rascador para gatos con base estable y poste de sisal.', '2 kg', '-', 'gatos'),
('Shampoo de Gatos', './recursos/imagenes/HIGIENE GATO.jpg', 4200, 'higiene', 'PetCare', 'Shampoo suave especialmente formulado para gatos. pH balanceado.', '500 ml', '-', 'gatos'),
('Collar Ajustable', './recursos/imagenes/Collar ajustable Perros.jpg', 2800, 'accesorios', 'DogPro', 'Collar ajustable de nylon resistente con hebilla metalica.', '100 g', '-', 'perros'),
('Alimento Gato', './recursos/imagenes/ALIMENTO GATO.png', 13900, 'alimentos', 'Whiskas', 'Alimento completo para gatos adultos con alto contenido proteico.', '10 kg', 'Pescado', 'gatos adultos'),
('Juguete tipo correa para Perros', './recursos/imagenes/JUGUETE PERRO.jpg', 6200, 'juguetes', 'FunDog', 'Juguete interactivo con correa para juegos de tirar.', '300 g', '-', 'perros'),
('Juguete Raton', './recursos/imagenes/JUGUETE GATO.jpg', 3500, 'juguetes', 'CatFun', 'Juguete en forma de raton con catnip incluido.', '50 g', '-', 'gatos'),
('Shampoo Suave', './recursos/imagenes/HIGIENE GATO.jpg', 4200, 'higiene', 'PetCare', 'Shampoo suave para mascotas con piel sensible.', '500 ml', '-', 'perros y gatos'),
('Suplemento Vitaminico', './recursos/imagenes/SALUD GATO.jpg', 8900, 'salud', 'VetPlus', 'Suplemento vitaminico completo para fortalecer el sistema inmunologico.', '100 comprimidos', '-', 'perros y gatos'),
('Alimento Premium Perro', './recursos/imagenes/ALIMENTO PERRO.jpg', 15000, 'alimentos', 'Pro Plan', 'Alimento super premium para perros adultos. Formula avanzada.', '15 kg', 'Cordero y arroz', 'perros adultos'),
('Bandana para Perros', './recursos/imagenes/ACCESORIO PERRO.png.jpg', 3200, 'accesorios', 'DogStyle', 'Bandana ajustable para perros de todos los tamanos. Varios colores.', '50 g', '-', 'perros'),
('Shampoo para Perros', './recursos/imagenes/HIGIENE PERRO.jpg', 4500, 'higiene', 'PetCare', 'Shampoo especial para perros con olor agradable duradero.', '500 ml', '-', 'perros'),
('Suplemento Perro', './recursos/imagenes/SALUD PERRO.jpg', 9500, 'salud', 'VetPlus', 'Suplemento vitaminico para perros adultos. Fortalece huesos y articulaciones.', '120 comprimidos', '-', 'perros'),
('Kit Adopcion Gato', './recursos/imagenes/adoptar gato.jpg', 12000, 'accesorios', 'Huellas', 'Kit completo para recibir a tu nuevo gato: arenero, comedero y juguete.', '3 kg', '-', 'gatos');
