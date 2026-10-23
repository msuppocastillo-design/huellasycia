# Cambio en js/funciones.js: que la tienda consuma la API



```js
const productosrespaldo = [ /* ...los 14 productos actuales, sin cambios... */ ];
const petshop = { productos: productosrespaldo };

async function cargarproductos() {
    try {
        const resp = await fetch('/api/v1/productos');
        if (!resp.ok) throw new Error('HTTP ' + resp.status);
        petshop.productos = await resp.json();
    } catch (err) {
        console.warn('No se pudo leer la API, se usan datos locales', err);
    }
}
```

2. En la inicializacion (seccion 9) hacer el callback `async` y esperar los datos antes de renderizar:

```js
document.addEventListener('DOMContentLoaded', async function() {
    await cargarproductos();      // <-- nueva linea, primera del callback
    actualizarContadorCarrito();
    // ...el resto igual
```
