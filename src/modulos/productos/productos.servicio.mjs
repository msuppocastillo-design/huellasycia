import { MOCKAPI_BASE_URL } from "../../config/config.mjs";

const URL = `${MOCKAPI_BASE_URL}/productos`;

async function pedir(url, opciones) {
    const respuesta = await fetch(url, opciones);
    if (respuesta.status === 404) return null;
    if (!respuesta.ok) throw new Error(`MockAPI respondio ${respuesta.status}`);
    return respuesta.json();
}

const conJson = (metodo, datos) => ({
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
});

export const obtenerTodos = () => pedir(URL);
export const obtenerPorId = (id) => pedir(`${URL}/${id}`);
export const crear = (datos) => pedir(URL, conJson("POST", datos));
export const actualizar = (id, datos) => pedir(`${URL}/${id}`, conJson("PUT", datos));
export const eliminar = (id) => pedir(`${URL}/${id}`, { method: "DELETE" });
