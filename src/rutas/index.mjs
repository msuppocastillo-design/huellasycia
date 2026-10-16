import { Router } from "express";
import rutasProductos from "../modulos/productos/productos.rutas.mjs";

const router = Router();

router.use("/productos", rutasProductos);
// router.use("/turnos", rutasTurnos);   <- futuros modulos

export default router;
