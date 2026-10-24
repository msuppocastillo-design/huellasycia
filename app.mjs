import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import rutasApi from "./rutas/index.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// Todas las APIs bajo /api
app.use("/api", rutasApi);

// 404 para cualquier endpoint de la API que no exista
app.use("/api", (req, res) => {
    res.status(404).json({ error: "Endpoint no encontrado" });
});

export default app;
