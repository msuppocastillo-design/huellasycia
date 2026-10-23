
import pool from '../../db/conexion.bd.mjs'

const columnas = 'id, nombre, imagen, precio, categoria, marca, descripcion, peso, sabor, para'

export async function obtenerproductos({ categoria, q } = {}) {
  const condiciones = []
  const valores = []
  if (categoria) {
    valores.push(categoria)
    condiciones.push(`categoria = $${valores.length}`)
  }
  if (q) {
    valores.push(`%${q}%`)
    condiciones.push(`(nombre ILIKE $${valores.length} OR marca ILIKE $${valores.length})`)
  }
  const where = condiciones.length ? `WHERE ${condiciones.join(' AND ')}` : ''
  const { rows } = await pool.query(`SELECT ${columnas} FROM productos ${where} ORDER BY id`, valores)
  return rows
}

export async function obtenerproductoporid(id) {
  const { rows } = await pool.query(`SELECT ${columnas} FROM productos WHERE id = $1`, [id])
  return rows[0] || null
}

export async function crearproducto(p) {
  const { rows } = await pool.query(
    `INSERT INTO productos (nombre, imagen, precio, categoria, marca, descripcion, peso, sabor, para)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING ${columnas}`,
    [p.nombre, p.imagen, p.precio, p.categoria, p.marca, p.descripcion, p.peso, p.sabor, p.para]
  )
  return rows[0]
}

export async function modificarproducto(id, p) {
  const { rows } = await pool.query(
    `UPDATE productos SET nombre=$1, imagen=$2, precio=$3, categoria=$4, marca=$5,
            descripcion=$6, peso=$7, sabor=$8, para=$9
     WHERE id=$10 RETURNING ${columnas}`,
    [p.nombre, p.imagen, p.precio, p.categoria, p.marca, p.descripcion, p.peso, p.sabor, p.para, id]
  )
  return rows[0] || null
}

export async function eliminarproducto(id) {
  const { rowCount } = await pool.query('DELETE FROM productos WHERE id = $1', [id])
  return rowCount > 0
}
