
export function serializarproducto(p) {
  return {
    id: p.id,
    nombre: p.nombre,
    imagen: p.imagen,
    precio: Number(p.precio),
    categoria: p.categoria,
    marca: p.marca,
    descripcion: p.descripcion,
    peso: p.peso,
    sabor: p.sabor,
    para: p.para
  }
}

export function serializarproductos(lista) {
  return lista.map(serializarproducto)
}
