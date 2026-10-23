import { Router } from 'express'
import cors from 'cors'
import * as controlador from './productos.controlador.mjs'

const rutasmoduloproductos = new Router()


const corslectura = cors({ origin: '*', methods: ['GET'] })


const origenesadmin = (process.env.CORS_ADMIN_ORIGENES || 'http://localhost:3000')
  .split(',').map((o) => o.trim())
const corsescritura = cors({
  origin: origenesadmin,
  methods: ['POST', 'PUT', 'DELETE']
})


rutasmoduloproductos.options('/api/v1/productos', corsescritura)
rutasmoduloproductos.options('/api/v1/productos/:id', corsescritura)


rutasmoduloproductos.get('/api/v1/productos', corslectura, controlador.obtenerproductos)
rutasmoduloproductos.get('/api/v1/productos/:id', corslectura, controlador.obtenerproductoporid)


rutasmoduloproductos.post('/api/v1/productos', corsescritura, controlador.crearproducto)
rutasmoduloproductos.put('/api/v1/productos/:id', corsescritura, controlador.modificarproducto)
rutasmoduloproductos.delete('/api/v1/productos/:id', corsescritura, controlador.eliminarproducto)

export default rutasmoduloproductos
