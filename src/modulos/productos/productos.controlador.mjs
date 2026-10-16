import * as servicio from "./productos.servicio.mjs";
import * as modelo from "./productos.modelo.mjs";
import * as vistas from "./productos.vistas.mjs";

export async function listar(req, res) {
    try {
        const productos = await servicio.obtenerTodos();
        res.json(vistas.lista(productos));
    } catch (error) {
        res.status(502).json({ error: error.message });
    }
}

export async function obtener(req, res) {
    try {
        const producto = await servicio.obtenerPorId(req.params.id);
        if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
        res.json(vistas.detalle(producto));
    } catch (error) {
        res.status(502).json({ error: error.message });
    }
}

export async function crear(req, res) {
    const { valido, errores, datos } = modelo.validar(req.body);
    if (!valido) return res.status(400).json({ errores });
    try {
        const creado = await servicio.crear(datos);
        res.status(201).json(vistas.detalle(creado));
    } catch (error) {
        res.status(502).json({ error: error.message });
    }
}

export async function actualizar(req, res) {
    const { valido, errores, datos } = modelo.validar(req.body);
    if (!valido) return res.status(400).json({ errores });
    try {
        const actualizado = await servicio.actualizar(req.params.id, datos);
        if (!actualizado) return res.status(404).json({ error: "Producto no encontrado" });
        res.json(vistas.detalle(actualizado));
    } catch (error) {
        res.status(502).json({ error: error.message });
    }
}

export async function eliminar(req, res) {
    try {
        const eliminado = await servicio.eliminar(req.params.id);
        if (!eliminado) return res.status(404).json({ error: "Producto no encontrado" });
        res.status(204).end();
    } catch (error) {
        res.status(502).json({ error: error.message });
    }
}
