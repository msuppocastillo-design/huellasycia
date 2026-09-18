import { MOCKAPI_BASE_URL } from '../config/config.js';

export async function obtenerProductos() {
    const respuesta = await fetch(`${MOCKAPI_BASE_URL}/productos`);
    if (!respuesta.ok) {
        throw new Error('No se pudo obtener el listado de productos');
    }
    return respuesta.json();
}

export async function obtenerProductoPorId(id) {
    const respuesta = await fetch(`${MOCKAPI_BASE_URL}/productos/${id}`);
    if (!respuesta.ok) {
        throw new Error('Producto no encontrado');
    }
    return respuesta.json();
}
