import { obtenerProductos, obtenerProductoPorId } from '../services/productos.service.js';

export async function listarProductos(req, res) {
    try {
        const productos = await obtenerProductos();
        res.json(productos);
    } catch (error) {
        res.status(502).json({ error: error.message });
    }
}

export async function obtenerProducto(req, res) {
    try {
        const producto = await obtenerProductoPorId(req.params.id);
        res.json(producto);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
