
// ========================================
// 1. DATOS DE PRODUCTOS (ahora vienen de la API)
// ========================================

const petshop = {
    productos: []
};

async function cargarProductosDesdeAPI() {
    try {
        const respuesta = await fetch('/api/productos');
        if (!respuesta.ok) throw new Error('Error al obtener productos');
        petshop.productos = await respuesta.json();
    } catch (error) {
        console.error('No se pudieron cargar los productos desde la API:', error);
        petshop.productos = [];
    }
}

// ========================================
// 2. CARRITO DE COMPRAS
// ========================================

let carrito = JSON.parse(localStorage.getItem('carrito_huellas')) || [];

function guardarCarrito() {
    localStorage.setItem('carrito_huellas', JSON.stringify(carrito));
}

function actualizarContadorCarrito() {
    var contadores = document.querySelectorAll('[aria-label="Carrito de compras"] span');
    var total = carrito.reduce(function(sum, item) { return sum + item.cantidad; }, 0);
    contadores.forEach(function(span) {
        span.textContent = total;
    });
}

function agregarAlCarrito(idProducto, cantidad) {
    if (!cantidad) cantidad = 1;
    var producto = petshop.productos.find(function(p) { return p.id == idProducto; });
    if (!producto) return;

    var itemExistente = carrito.find(function(item) { return item.id == idProducto; });
    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: cantidad
        });
    }
    guardarCarrito();
    actualizarContadorCarrito();
    alert(producto.nombre + ' agregado al carrito!');
}

function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(function(item) { return item.id != idProducto; });
    guardarCarrito();
    actualizarContadorCarrito();
}

function calcularTotalCarrito() {
    return carrito.reduce(function(total, item) {
        return total + (item.precio * item.cantidad);
    }, 0);
}

function renderizarCarrito() {
    var tabla = document.getElementById('tabla-carrito');
    if (!tabla) return;
    var tbody = tabla.querySelector('tbody');
    tbody.innerHTML = '';

    if (carrito.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">Tu carrito está vacío.</td></tr>';
        document.getElementById('subtotal').textContent = '$ 0';
        return;
    }

    carrito.forEach(function(item) {
        var tr = document.createElement('tr');

        var tdProducto = document.createElement('td');
        tdProducto.innerHTML = '<img src="' + item.imagen + '" width="60" alt="' + item.nombre + '"> ' + item.nombre;

        var tdPrecio = document.createElement('td');
        tdPrecio.textContent = '$ ' + item.precio.toLocaleString();

        var tdCantidad = document.createElement('td');
        tdCantidad.innerHTML = '<input type="number" min="1" value="' + item.cantidad + '" data-id="' + item.id + '" class="input-cantidad">';

        var tdTotal = document.createElement('td');
        tdTotal.textContent = '$ ' + (item.precio * item.cantidad).toLocaleString();

        var tdAcciones = document.createElement('td');
        tdAcciones.innerHTML = '<button class="btn-eliminar" data-id="' + item.id + '">Eliminar</button>';

        tr.appendChild(tdProducto);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdCantidad);
        tr.appendChild(tdTotal);
        tr.appendChild(tdAcciones);

        tbody.appendChild(tr);
    });

    var subtotal = calcularTotalCarrito();
    var subtotalElem = document.getElementById('subtotal');
    if (subtotalElem) subtotalElem.textContent = '$ ' + subtotal.toLocaleString();

    var inputsCantidad = document.querySelectorAll('.input-cantidad');
    inputsCantidad.forEach(function(inp) {
        inp.addEventListener('change', function() {
            var id = this.getAttribute('data-id');
            var val = parseInt(this.value) || 1;
            var item = carrito.find(function(i) { return i.id == id; });
            if (item) {
                item.cantidad = val;
                guardarCarrito();
                renderizarCarrito();
                actualizarContadorCarrito();
            }
        });
    });

    var botonesEliminar = document.querySelectorAll('.btn-eliminar');
    botonesEliminar.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var id = this.getAttribute('data-id');
            eliminarDelCarrito(id);
            renderizarCarrito();
            actualizarContadorCarrito();
        });
    });

    var btnVaciar = document.getElementById('vaciar-carrito');
    if (btnVaciar) {
        btnVaciar.addEventListener('click', function() {
            carrito = [];
            guardarCarrito();
            renderizarCarrito();
            actualizarContadorCarrito();
        });
    }
}

// ========================================
// 3. RENDERIZAR PRODUCTOS EN TIENDA
// ========================================

function renderizarProductos(listaProductos) {
    var contenedor = document.getElementById('catalogo-productos');
    if (!contenedor) return;

    contenedor.innerHTML = '';

    if (listaProductos.length === 0) {
        contenedor.innerHTML = '<p style="text-align:center; padding: 20px;">No se encontraron productos.</p>';
        return;
    }

    listaProductos.forEach(function(producto) {
        var li = document.createElement('li');
        li.innerHTML = '<img src="' + producto.imagen + '" alt="' + producto.nombre + '" width="150">' +
            '<h3>' + producto.nombre + '</h3>' +
            '<p>$ ' + producto.precio.toLocaleString() + '</p>' +
            '<a href="./producto.html?id=' + producto.id + '">Ver detalle</a>' +
            '<button type="button" onclick="agregarAlCarrito(' + producto.id + ', 1)">Agregar al carrito</button>';
        contenedor.appendChild(li);
    });
}

function obtenerProductosFiltrados() {
    var resultado = petshop.productos.slice();

    var categoriasSeleccionadas = [];
    var checkboxesCategoria = document.querySelectorAll('aside[aria-label="Filtros de productos"] input[name="categoria"]:checked');
    checkboxesCategoria.forEach(function(cb) {
        categoriasSeleccionadas.push(cb.value);
    });
    if (categoriasSeleccionadas.length > 0) {
        resultado = resultado.filter(function(p) {
            return categoriasSeleccionadas.indexOf(p.categoria) !== -1;
        });
    }

    var marcasSeleccionadas = [];
    var checkboxesMarca = document.querySelectorAll('aside[aria-label="Filtros de productos"] input[name="marca"]:checked');
    checkboxesMarca.forEach(function(cb) {
        marcasSeleccionadas.push(cb.value);
    });
    if (marcasSeleccionadas.length > 0) {
        resultado = resultado.filter(function(p) {
            var marcaSlug = p.marca.toLowerCase().replace(/\s+/g, '');
            return marcasSeleccionadas.indexOf(marcaSlug) !== -1;
        });
    }

    var precioMin = document.getElementById('precio_min');
    var precioMax = document.getElementById('precio_max');
    if (precioMin && precioMin.value) {
        resultado = resultado.filter(function(p) { return p.precio >= parseInt(precioMin.value); });
    }
    if (precioMax && precioMax.value) {
        resultado = resultado.filter(function(p) { return p.precio <= parseInt(precioMax.value); });
    }

    var inputBuscar = document.getElementById('buscar');
    if (inputBuscar && inputBuscar.value) {
        var termino = inputBuscar.value.toLowerCase();
        resultado = resultado.filter(function(p) {
            return p.nombre.toLowerCase().indexOf(termino) !== -1 ||
                   p.categoria.toLowerCase().indexOf(termino) !== -1 ||
                   p.marca.toLowerCase().indexOf(termino) !== -1;
        });
    }

    return resultado;
}

function aplicarFiltros() {
    var productosFiltrados = obtenerProductosFiltrados();
    renderizarProductos(productosFiltrados);
}

// ========================================
// 4. DETALLE DE PRODUCTO
// ========================================

async function cargarDetalleProducto() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');

    if (!id) return;

    var producto = null;
    try {
        var respuesta = await fetch('/api/productos/' + id);
        if (respuesta.ok) producto = await respuesta.json();
    } catch (error) {
        console.error('Error al cargar el detalle del producto:', error);
    }

    if (!producto) return;

    var migasLi = document.querySelector('nav[aria-label="Migas de pan"] li:last-child');
    if (migasLi) migasLi.textContent = producto.nombre;

    var article = document.querySelector('article[aria-label="Detalle del producto"]');
    if (article) {
        article.innerHTML = '<img src="' + producto.imagen + '" alt="' + producto.nombre + '" width="300">' +
            '<h1>' + producto.nombre + '</h1>' +
            '<p>$ ' + producto.precio.toLocaleString() + '</p>' +
            '<p>' + producto.descripcion + '</p>' +
            '<ul>' +
                '<li>Peso: ' + producto.peso + '</li>' +
                '<li>Marca: ' + producto.marca + '</li>' +
                '<li>Para: ' + producto.para + '</li>' +
                '<li>Sabor: ' + producto.sabor + '</li>' +
            '</ul>' +
            '<label for="cantidad">Cantidad</label>' +
            '<input type="number" id="cantidad" name="cantidad" value="1" min="1">' +
            '<button type="button" onclick="var c = parseInt(document.getElementById(\"cantidad\").value || 1); agregarAlCarrito(' + producto.id + ', c)">Agregar al carrito</button>';
    }

    var relacionados = petshop.productos.filter(function(p) {
        return p.categoria === producto.categoria && p.id != producto.id;
    }).slice(0, 2);

    var contenedorRelacionados = document.querySelector('section[aria-label="Productos relacionados"] ul');
    if (contenedorRelacionados && relacionados.length > 0) {
        contenedorRelacionados.innerHTML = '';
        relacionados.forEach(function(p) {
            var li = document.createElement('li');
            li.innerHTML = '<img src="' + p.imagen + '" alt="' + p.nombre + '" width="150">' +
                '<h3>' + p.nombre + '</h3>' +
                '<p>$ ' + p.precio.toLocaleString() + '</p>' +
                '<a href="./producto.html?id=' + p.id + '">Ver detalle</a>';
            contenedorRelacionados.appendChild(li);
        });
    }
}

// ========================================
// 5. TURNOS - RESUMEN EN TIEMPO REAL
// ========================================

function actualizarResumenTurno() {
    var servicioSeleccionado = document.querySelector('input[name="servicio"]:checked');
    var fecha = document.getElementById('fecha');
    var hora = document.getElementById('hora');

    var resumenServicio = document.querySelector('aside[aria-label="Resumen de tu cita"] p:nth-of-type(1) span');
    var resumenFecha = document.querySelector('aside[aria-label="Resumen de tu cita"] p:nth-of-type(2) span');
    var resumenHora = document.querySelector('aside[aria-label="Resumen de tu cita"] p:nth-of-type(3) span');
    var resumenTotal = document.querySelector('aside[aria-label="Resumen de tu cita"] p:nth-of-type(4) span');

    var precios = {
        'bano': 3500,
        'corte': 4500,
        'banocorte': 7000,
        'unas': 1500
    };

    if (resumenServicio) {
        if (servicioSeleccionado) {
            var label = servicioSeleccionado.parentElement.querySelector('label');
            resumenServicio.textContent = label ? label.textContent : 'No seleccionado';
        } else {
            resumenServicio.textContent = 'No seleccionado';
        }
    }
    if (resumenFecha) {
        resumenFecha.textContent = (fecha && fecha.value) ? fecha.value : '--/--/----';
    }
    if (resumenHora) {
        resumenHora.textContent = (hora && hora.value) ? hora.value : '--:--';
    }
    if (resumenTotal) {
        var total = (servicioSeleccionado && precios[servicioSeleccionado.value]) ? precios[servicioSeleccionado.value] : 0;
        resumenTotal.textContent = '$ ' + total.toLocaleString();
    }
}

function guardarTurno(datosTurno) {
    var turnos = JSON.parse(localStorage.getItem('turnos_huellas')) || [];
    turnos.push(datosTurno);
    localStorage.setItem('turnos_huellas', JSON.stringify(turnos));
}

function mostrarConfirmacionTurno() {
    var contenedor = document.querySelector('article[aria-label="Detalles del turno"]');
    if (!contenedor) return;
    var ultimo = null;
    try {
        ultimo = JSON.parse(localStorage.getItem('ultimo_turno')) || null;
    } catch (err) {
        console.warn('Error leyendo ultimo_turno', err);
    }
    if (!ultimo) {
        try {
            var turnos = JSON.parse(localStorage.getItem('turnos_huellas')) || [];
            if (turnos.length > 0) ultimo = turnos[turnos.length - 1];
        } catch (err) {
            console.warn('Error leyendo turnos_huellas', err);
        }
    }

    if (!ultimo) {
        contenedor.innerHTML = '<h2>Detalles</h2><p>No se encontrarón detalles del turno.</p>';
        return;
    }

    var nombresServicio = { 'bano': 'Bano completo', 'corte': 'Corte de pelo', 'banocorte': 'Bano + Corte', 'unas': 'Corte de unas' };

    contenedor.innerHTML = '<h2>Detalles</h2>' +
        '<p><strong>Servicio:</strong> ' + (nombresServicio[ultimo.servicio] || ultimo.servicio) + '</p>' +
        '<p><strong>Fecha:</strong> ' + (ultimo.fecha || '') + '</p>' +
        '<p><strong>Hora:</strong> ' + (ultimo.hora || '') + '</p>' +
        '<p><strong>Mascota:</strong> ' + (ultimo.mascota || '') + '</p>' +
        '<p><strong>Total:</strong> $ ' + (ultimo.total ? ultimo.total.toLocaleString() : '0') + '</p>';
}

function mostrarHistorialTurnos() {
    var panel = document.querySelector('section[aria-label="Panel de usuario"]');
    if (!panel) return;
    var articulo = panel.querySelector('article[aria-label="Historial de turnos"]');
    if (!articulo) return;
    var tbody = articulo.querySelector('tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    var turnos = [];
    try {
        turnos = JSON.parse(localStorage.getItem('turnos_huellas')) || [];
    } catch (err) {
        console.warn('Error leyendo turnos_huellas', err);
    }

    if (turnos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">No hay turnos reservados.</td></tr>';
        return;
    }

    var nombresServicio = { 'bano': 'Bano completo', 'corte': 'Corte de pelo', 'banocorte': 'Bano + Corte', 'unas': 'Corte de unas' };

    turnos.forEach(function(t) {
        var tr = document.createElement('tr');
        var tdFecha = document.createElement('td'); tdFecha.textContent = t.fecha || '';
        var tdServicio = document.createElement('td'); tdServicio.textContent = nombresServicio[t.servicio] || t.servicio || '';
        var tdMascota = document.createElement('td'); tdMascota.textContent = t.mascota || '';
        var tdEstado = document.createElement('td'); tdEstado.textContent = t.estado || '';
        tr.appendChild(tdFecha);
        tr.appendChild(tdServicio);
        tr.appendChild(tdMascota);
        tr.appendChild(tdEstado);
        tbody.appendChild(tr);
    });
}

// ========================================
// 6. FORMULARIO DE CONTACTO
// ========================================

function enviarContacto(event) {
    event.preventDefault();
    var nombre = document.getElementById('nombre');
    var email = document.getElementById('email_contacto');
    var asunto = document.getElementById('asunto');
    var mensaje = document.getElementById('mensaje');

    if (!nombre || !nombre.value || !email || !email.value || !asunto || !asunto.value || !mensaje || !mensaje.value) {
        alert('Por favor completa todos los campos obligatorios.');
        return false;
    }

    var consultas = JSON.parse(localStorage.getItem('consultas_huellas')) || [];
    consultas.push({
        nombre: nombre.value,
        email: email.value,
        asunto: asunto.value,
        mensaje: mensaje.value,
        fecha: new Date().toLocaleString()
    });
    localStorage.setItem('consultas_huellas', JSON.stringify(consultas));

    alert('Gracias ' + nombre.value + '! Tu mensaje fue enviado correctamente. Te responderemos a ' + email.value);
    event.target.reset();
    return false;
}

// ========================================
// 7. MI CUENTA - LOGIN / REGISTRO
// ========================================

function registrarUsuario(event) {
    event.preventDefault();
    var nombre = document.getElementById('nombre_reg');
    var email = document.getElementById('email_reg');
    var password = document.getElementById('password_reg');
    var passwordConfirm = document.getElementById('password_confirm');
    var mascota = document.getElementById('mascota');

    if (!password || !passwordConfirm || password.value !== passwordConfirm.value) {
        alert('Las contrasenas no coinciden.');
        return false;
    }

    var usuarios = JSON.parse(localStorage.getItem('usuarios_huellas')) || [];
    if (usuarios.find(function(u) { return u.email === email.value; })) {
        alert('Ya existe un usuario con ese email.');
        return false;
    }

    usuarios.push({
        nombre: nombre.value,
        email: email.value,
        password: password.value,
        mascota: mascota ? mascota.value : '',
        fechaRegistro: new Date().toLocaleString()
    });
    localStorage.setItem('usuarios_huellas', JSON.stringify(usuarios));

    alert('Registro exitoso! Bienvenido, ' + nombre.value);
    localStorage.setItem('usuario_actual', JSON.stringify({ nombre: nombre.value, email: email.value }));
    mostrarPanelUsuario();
    return false;
}

function iniciarSesion(event) {
    event.preventDefault();
    var email = document.getElementById('email_login');
    var password = document.getElementById('password');

    var usuarios = JSON.parse(localStorage.getItem('usuarios_huellas')) || [];
    var usuario = usuarios.find(function(u) {
        return u.email === email.value && u.password === password.value;
    });

    if (!usuario) {
        alert('Email o contrasena incorrectos.');
        return false;
    }

    localStorage.setItem('usuario_actual', JSON.stringify({ nombre: usuario.nombre, email: usuario.email }));
    alert('Bienvenido de nuevo, ' + usuario.nombre + '!');
    mostrarPanelUsuario();
    return false;
}

function mostrarPanelUsuario() {
    var usuarioActual = JSON.parse(localStorage.getItem('usuario_actual'));
    if (!usuarioActual) return;

    var panel = document.querySelector('section[aria-label="Panel de usuario"]');
    var login = document.getElementById('login');
    var registro = document.getElementById('registro');
    var tabsNav = document.querySelector('nav[aria-label="Opciones de cuenta"]');

    if (panel) {
        var h2 = panel.querySelector('h2');
        if (h2) h2.textContent = 'Bienvenido, ' + usuarioActual.nombre;
        panel.style.display = 'block';
        mostrarHistorialTurnos();
    }
    if (login) login.style.display = 'none';
    if (registro) registro.style.display = 'none';
    if (tabsNav) tabsNav.style.display = 'none';
}

function cerrarSesion() {
    localStorage.removeItem('usuario_actual');
    location.reload();
}

function mostrarLogin() {
    var login = document.getElementById('login');
    var registro = document.getElementById('registro');
    if (login) login.style.display = 'block';
    if (registro) registro.style.display = 'none';
}

function mostrarRegistro() {
    var login = document.getElementById('login');
    var registro = document.getElementById('registro');
    if (login) login.style.display = 'none';
    if (registro) registro.style.display = 'block';
}

// ========================================
// 8. PRODUCTOS DESTACADOS EN INDEX
// ========================================

function renderizarDestacados() {
    var contenedor = document.getElementById('productos-destacados');
    if (!contenedor) return;

    var destacados = petshop.productos.slice(0, 4);
    contenedor.innerHTML = '';

    destacados.forEach(function(producto) {
        var li = document.createElement('li');
        li.innerHTML = '<img src="' + producto.imagen + '" alt="' + producto.nombre + '" width="150">' +
            '<h3>' + producto.nombre + '</h3>' +
            '<p>$ ' + producto.precio.toLocaleString() + '</p>' +
            '<a href="./producto.html?id=' + producto.id + '">Ver en tienda</a>';
        contenedor.appendChild(li);
    });
}

// ========================================
// 9. INICIALIZACION
// ========================================

document.addEventListener('DOMContentLoaded', async function() {
    actualizarContadorCarrito();

    var catalogo = document.getElementById('catalogo-productos');
    var destacadosContenedor = document.getElementById('productos-destacados');
    var articleDetalle = document.querySelector('article[aria-label="Detalle del producto"]');

    // Solo pedimos la lista completa a la API si la vamos a necesitar
    if (catalogo || destacadosContenedor) {
        await cargarProductosDesdeAPI();
    }

    if (catalogo) {
        renderizarProductos(petshop.productos);

        var checkboxes = document.querySelectorAll('aside[aria-label="Filtros de productos"] input[type="checkbox"]');
        checkboxes.forEach(function(cb) {
            cb.addEventListener('change', aplicarFiltros);
        });

        var precioMin = document.getElementById('precio_min');
        var precioMax = document.getElementById('precio_max');
        var buscar = document.getElementById('buscar');
        var formBuscar = document.querySelector('section[aria-label="Buscar productos"] form');

        if (precioMin) precioMin.addEventListener('input', aplicarFiltros);
        if (precioMax) precioMax.addEventListener('input', aplicarFiltros);
        if (buscar) buscar.addEventListener('input', aplicarFiltros);
        if (formBuscar) {
            formBuscar.addEventListener('submit', function(e) {
                e.preventDefault();
                aplicarFiltros();
            });
        }
    }

    if (articleDetalle && window.location.search.indexOf('id=') !== -1) {
        // Para calcular "relacionados" necesitamos el listado completo también
        await cargarProductosDesdeAPI();
        cargarDetalleProducto();
    }

    var resumenCita = document.querySelector('aside[aria-label="Resumen de tu cita"]');
    if (resumenCita) {
        var radiosServicio = document.querySelectorAll('input[name="servicio"]');
        radiosServicio.forEach(function(radio) {
            radio.addEventListener('change', actualizarResumenTurno);
        });

        var fecha = document.getElementById('fecha');
        var hora = document.getElementById('hora');
        if (fecha) fecha.addEventListener('change', actualizarResumenTurno);
        if (hora) hora.addEventListener('change', actualizarResumenTurno);

        var formTurnos = document.getElementById('form-turnos');
        if (formTurnos) {
            formTurnos.addEventListener('submit', function(e) {
                e.preventDefault();
                var servicio = document.querySelector('input[name="servicio"]:checked');
                var fechaVal = document.getElementById('fecha');
                var horaVal = document.getElementById('hora');
                var nombreMascota = document.getElementById('nombre_mascota');
                var nombreDueno = document.getElementById('nombre_dueno');

                if (servicio && fechaVal && fechaVal.value && horaVal && horaVal.value &&
                    nombreMascota && nombreMascota.value && nombreDueno && nombreDueno.value) {
                    var precios = { 'bano': 3500, 'corte': 4500, 'banocorte': 7000, 'unas': 1500 };
                    var nuevoTurno = {
                        servicio: servicio.value,
                        fecha: fechaVal.value,
                        hora: horaVal.value,
                        mascota: nombreMascota.value,
                        dueno: nombreDueno.value,
                        total: precios[servicio.value] || 0,
                        estado: 'Confirmado',
                        fechaReserva: new Date().toLocaleString()
                    };
                    guardarTurno(nuevoTurno);
                    try {
                        localStorage.setItem('ultimo_turno', JSON.stringify(nuevoTurno));
                    } catch (err) {
                        console.warn('No se pudo guardar ultimo_turno en localStorage', err);
                    }
                    window.location.href = './confirmacion_turno.html';
                } else {
                    alert('Por favor completa todos los campos obligatorios para reservar el turno.');
                }
            });
        }
    }

    var formContacto = document.getElementById('form-contacto');
    if (formContacto) {
        formContacto.addEventListener('submit', enviarContacto);
    }

    if (document.getElementById('login')) {
        var formLogin = document.getElementById('form-login');
        var formRegistro = document.getElementById('form-registro');

        if (formLogin) formLogin.addEventListener('submit', iniciarSesion);
        if (formRegistro) formRegistro.addEventListener('submit', registrarUsuario);

        var usuarioActual = JSON.parse(localStorage.getItem('usuario_actual'));
        if (usuarioActual) {
            mostrarPanelUsuario();
        } else {
            mostrarLogin();
        }
    }

    if (destacadosContenedor) {
        renderizarDestacados();
    }

    var confirmSection = document.querySelector('section[aria-label="Confirmacion de turno"]');
    if (confirmSection) {
        mostrarConfirmacionTurno();
    }

    var carritoHeader = document.querySelector('div[aria-label="Carrito de compras"]');
    if (carritoHeader) {
        carritoHeader.style.cursor = 'pointer';
        carritoHeader.addEventListener('click', function() {
            window.location.href = './carrito.html';
        });
    }

    if (document.getElementById('tabla-carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito_huellas')) || [];
        renderizarCarrito();
    }
});
