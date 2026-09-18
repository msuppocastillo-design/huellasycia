// seed-mockapi.mjs
// Uso: node seed-mockapi.mjs
// Carga automáticamente los productos de mockapi-productos.json en tu recurso de MockAPI.

import { readFile } from 'fs/promises';

// 1) Reemplazá esto por la URL base de tu proyecto en MockAPI
const MOCKAPI_BASE_URL = 'https:// 6aacae53a2413bf0ec10ebb6 .mockapi.io / :productos';

async function main() {
    const data = await readFile('./mockapi-productos.json', 'utf-8');
    const productos = JSON.parse(data);

    for (const producto of productos) {
        const respuesta = await fetch(`${MOCKAPI_BASE_URL}/productos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });

        if (respuesta.ok) {
            const creado = await respuesta.json();
            console.log(`✔ Cargado: ${creado.nombre} (id ${creado.id})`);
        } else {
            console.error(`✘ Error al cargar "${producto.nombre}":`, respuesta.status);
        }
    }

    console.log('Listo. Revisá tu recurso en MockAPI.');
}

main().catch(console.error);
