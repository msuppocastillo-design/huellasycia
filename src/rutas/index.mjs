import { Router } from "express";
import rutasProductos from "../modulos/productos/productos.rutas.mjs";

const router = Router();

router.use("/productos", rutasProductos);


export default router;
