import { Router } from 'express';
import { listarProductos, obtenerProducto } from '../controllers/productos.controller.js';

const router = Router();

// GET /api/productos -> lista completa
router.get('/', listarProductos);

// GET /api/productos/:id -> un producto puntual
router.get('/:id', obtenerProducto);

export default router;
