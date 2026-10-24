
import * as modelo from './productos.modelo.mjs'
import * as vista from './productos.vistas.mjs'

const categorias = ['alimentos', 'accesorios', 'higiene', 'salud', 'juguetes']

function leerid(req) {
  const id = Number(req.params.id)
  return Number.isInteger(id) && id > 0 ? id : null
}


function validarproducto(body = {}) {
  const errores = []
  const nombre = String(body.nombre ?? '').trim()
  const precio = Number(body.precio)
  const categoria = String(body.categoria ?? '').trim().toLowerCase()

  if (!nombre) errores.push('nombre es obligatorio')
  if (body.precio === undefined || body.precio === '' || Number.isNaN(precio) || precio < 0)
    errores.push('precio debe ser un numero mayor o igual a 0')
  if (!categorias.includes(categoria))
    errores.push(`categoria debe ser una de: ${categorias.join(', ')}`)

  if (errores.length) return { error: errores }
  const texto = (v) => (v === undefined || v === null ? null : String(v).trim() || null)
  return {
    datos: {
      nombre, precio, categoria,
      imagen: texto(body.imagen), marca: texto(body.marca), descripcion: texto(body.descripcion),
      peso: texto(body.peso), sabor: texto(body.sabor), para: texto(body.para)
    }
  }
}

export async function obtenerproductos(req, res) {
  const { categoria, q } = req.query
  const productos = await modelo.obtenerproductos({ categoria, q })
  res.status(200).json(vista.serializarproductos(productos))
}

export async function obtenerproductoporid(req, res) {
  const id = leerid(req)
  if (!id) return res.status(400).json({ mensaje: 'id invalido' })
  const producto = await modelo.obtenerproductoporid(id)
  if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' })
  res.status(200).json(vista.serializarproducto(producto))
}

export async function crearproducto(req, res) {
  const { datos, error } = validarproducto(req.body)
  if (error) return res.status(400).json({ mensaje: 'Datos invalidos', errores: error })
  const nuevo = await modelo.crearproducto(datos)
  res.status(201).json(vista.serializarproducto(nuevo))
}

export async function modificarproducto(req, res) {
  const id = leerid(req)
  if (!id) return res.status(400).json({ mensaje: 'id invalido' })
  const { datos, error } = validarproducto(req.body)
  if (error) return res.status(400).json({ mensaje: 'Datos invalidos', errores: error })
  const actualizado = await modelo.modificarproducto(id, datos)
  if (!actualizado) return res.status(404).json({ mensaje: 'Producto no encontrado' })
  res.status(200).json(vista.serializarproducto(actualizado))
}

export async function eliminarproducto(req, res) {
  const id = leerid(req)
  if (!id) return res.status(400).json({ mensaje: 'id invalido' })
  const ok = await modelo.eliminarproducto(id)
  if (!ok) return res.status(404).json({ mensaje: 'Producto no encontrado' })
  res.status(204).end()
}
