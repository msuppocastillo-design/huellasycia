import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import productosRouter from './src/routes/productos.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la API
app.use('/api/productos', productosRouter);

// Cualquier ruta no encontrada dentro de /api devuelve 404 en JSON
app.use('/api', (req, res) => {
    res.status(404).json({ error: 'Endpoint no encontrado' });
});

app.listen(PORT, () => {
    console.log(`Servidor Huellas & Cia corriendo en http://localhost:${PORT}`);
});
