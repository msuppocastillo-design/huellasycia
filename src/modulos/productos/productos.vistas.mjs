export const detalle = (p) => ({
    id: p.id,
    nombre: p.nombre,
    precio: p.precio,
    categoria: p.categoria,
    marca: p.marca,
    descripcion: p.descripcion,
    imagen: p.imagen,
    peso: p.peso,
    para: p.para,
    sabor: p.sabor
});

export const lista = (productos) => productos.map(detalle);
