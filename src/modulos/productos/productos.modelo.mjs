const CATEGORIAS = ["alimentos", "accesorios", "higiene", "salud", "juguetes"];

export function validar(body = {}) {
    const errores = [];

    if (!body.nombre || typeof body.nombre !== "string") errores.push("nombre es obligatorio");
    if (typeof body.precio !== "number" || body.precio <= 0) errores.push("precio debe ser un numero mayor a 0");
    if (!CATEGORIAS.includes(body.categoria)) errores.push(`categoria debe ser una de: ${CATEGORIAS.join(", ")}`);
    if (!body.marca) errores.push("marca es obligatoria");

    const datos = {
        nombre: body.nombre?.trim(),
        precio: body.precio,
        categoria: body.categoria,
        marca: body.marca,
        descripcion: body.descripcion ?? "",
        imagen: body.imagen ?? "",
        peso: body.peso ?? "",
        para: body.para ?? "",
        sabor: body.sabor ?? ""
    };

    return { valido: errores.length === 0, errores, datos };
}
