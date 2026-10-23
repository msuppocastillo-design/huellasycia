
const api = (window.apiurl || '') + '/api/v1/productos'

const $ = (id) => document.getElementById(id)
const form = $('form-producto')
const tabla = $('tabla-productos')
const campos = ['nombre', 'precio', 'categoria', 'marca', 'imagen', 'peso', 'sabor', 'para', 'descripcion']
let productos = []

function mostrar(texto, tipo = 'ok') {
  $('mensaje').textContent = texto
  $('mensaje').className = tipo
}

function rutaimagen(img) {
  if (!img) return ''
  return img.startsWith('./') ? img.slice(1) : img 
}

async function pedir(url, opciones) {
  const resp = await fetch(url, opciones)
  if (resp.status === 204) return null
  const datos = await resp.json().catch(() => ({}))
  if (!resp.ok) throw new Error((datos.errores && datos.errores.join(', ')) || datos.mensaje || 'Error en la solicitud')
  return datos
}

function pintartabla() {
  tabla.innerHTML = ''
  if (!productos.length) {
    tabla.innerHTML = '<tr><td colspan="7">No hay productos cargados.</td></tr>'
    return
  }
  productos.forEach((p) => {
    const tr = document.createElement('tr')
    const celdas = [p.id, null, p.nombre, p.categoria, p.marca || '', '$ ' + p.precio.toLocaleString('es-AR')]
    celdas.forEach((valor, i) => {
      const td = document.createElement('td')
      if (i === 1) {
        if (p.imagen) {
          const img = document.createElement('img')
          img.src = rutaimagen(p.imagen)
          img.alt = p.nombre
          td.appendChild(img)
        }
      } else {
        td.textContent = valor 
      }
      tr.appendChild(td)
    })
    const tdacc = document.createElement('td')
    tdacc.className = 'celda-acciones'
    const btne = document.createElement('button')
    btne.textContent = 'Editar'
    btne.className = 'editar'
    btne.addEventListener('click', () => editar(p))
    const btnb = document.createElement('button')
    btnb.textContent = 'Eliminar'
    btnb.className = 'peligro'
    btnb.addEventListener('click', () => eliminar(p))
    tdacc.append(btne, btnb)
    tr.appendChild(tdacc)
    tabla.appendChild(tr)
  })
}

async function cargar() {
  try {
    productos = await pedir(api)
    pintartabla()
  } catch (e) {
    mostrar('No se pudo cargar el listado: ' + e.message, 'error')
  }
}

function limpiarform() {
  form.reset()
  $('id').value = ''
  $('titulo-form').textContent = 'Nuevo producto'
  $('btn-cancelar').hidden = true
}

function editar(p) {
  $('id').value = p.id
  campos.forEach((c) => { $(c).value = p[c] ?? '' })
  $('titulo-form').textContent = 'Editar producto #' + p.id
  $('btn-cancelar').hidden = false
  form.scrollIntoView({ behavior: 'smooth' })
}

async function eliminar(p) {
  if (!confirm(`Eliminar "${p.nombre}"?`)) return
  try {
    await pedir(`${api}/${p.id}`, { method: 'DELETE' })
    mostrar('Producto eliminado')
    cargar()
  } catch (e) {
    mostrar(e.message, 'error')
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const cuerpo = {}
  campos.forEach((c) => { cuerpo[c] = $(c).value })
  const id = $('id').value
  try {
    await pedir(id ? `${api}/${id}` : api, {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cuerpo)
    })
    mostrar(id ? 'Producto modificado' : 'Producto creado')
    limpiarform()
    cargar()
  } catch (err) {
    mostrar(err.message, 'error')
  }
})

$('btn-cancelar').addEventListener('click', limpiarform)
cargar()
