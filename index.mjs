import express from 'express'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import rutasmoduloproductos from './modulos/productos/productos.rutas.mjs'
import openapi from './docs/openapi.mjs'

dotenv.config()

const puerto = process.env.PUERTO || 3000
const raiz = path.dirname(fileURLToPath(import.meta.url))
const raizsitio = path.join(raiz, 'public') 

const app = express()
app.use(express.json())

// ---- API ----
app.use(rutasmoduloproductos)

// ---- Documentacion (Scalar) ----
app.get('/api/openapi.json', (req, res) => res.json(openapi))
app.get('/api/docs', (req, res) => {
  res.type('html').send(`<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>API Huellas & Cia</title></head>
<body>
  <script id="api-reference" data-url="/api/openapi.json"></script>
  <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
</body></html>`)
})

// ---- Sitio estatico ----
// No usamos express.static(raiz) para NO exponer .env, package.json, etc.
app.use('/css', express.static(path.join(raizsitio, 'css')))
app.use('/js', express.static(path.join(raizsitio, 'js')))
app.use('/recursos', express.static(path.join(raizsitio, 'recursos')))
app.use('/admin', express.static(path.join(raiz, 'admin')))

const paginas = ['index', 'tienda', 'producto', 'carrito', 'turnos', 'confirmacion_turno',
  'nosotros', 'contacto', 'micuenta']
app.get('/', (req, res) => res.sendFile(path.join(raizsitio, 'index.html')))
app.get('/:pagina.html', (req, res, next) => {
  if (!paginas.includes(req.params.pagina)) return next()
  res.sendFile(path.join(raizsitio, `${req.params.pagina}.html`))
})

// ---- 404 y errores ----
app.use((req, res) => res.status(404).json({ mensaje: 'Ruta no encontrada' }))
app.use((err, req, res, next) => {
  if (err.code === 'ENOENT' || err.status === 404) return res.status(404).json({ mensaje: 'Archivo no encontrado' })
  if (err.type === 'entity.parse.failed') return res.status(400).json({ mensaje: 'JSON invalido' })
  console.error(err)
  res.status(500).json({ mensaje: 'Error interno del servidor' })
})

app.listen(puerto, () => {
  console.log(`Servidor en http://localhost:${puerto}  |  Docs: http://localhost:${puerto}/api/docs  |  Admin: http://localhost:${puerto}/admin/`)
})
