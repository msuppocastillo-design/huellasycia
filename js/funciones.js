
// ========================================
// 1. DATOS DE PRODUCTOS 
// ========================================

const petshop = {
    productos: [
        {
            id: 1,
            nombre: 'Alimento Perro Adulto',
            imagen: './recursos/imagenes/ALIMENTO PERRO.jpg',
            precio: 15000,
            categoria: 'alimentos',
            marca: 'Royal Canin',
            descripcion: 'Alimento balanceado premium para perros adultos de todas las razas. Rico en proteinas y vitaminas.',
            peso: '15 kg',
            sabor: 'Pollo y arroz',
            para: 'perros adultos'
        },
        {
            id: 2,
            nombre: 'Rascador para Gatos',
            imagen: './recursos/imagenes/ACCESORIO GATO.png',
            precio: 7500,
            categoria: 'accesorios',
            marca: 'CatLove',
            descripcion: 'Rascador para gatos con base estable y poste de sisal.',
            peso: '2 kg',
            sabor: '-',
            para: 'gatos'
        },
        {
            id: 3,
            nombre: 'Shampoo de Gatos',
            imagen: './recursos/imagenes/HIGIENE GATO.jpg',
            precio: 4200,
            categoria: 'higiene',
            marca: 'PetCare',
            descripcion: 'Shampoo suave especialmente formulado para gatos. pH balanceado.',
            peso: '500 ml',
            sabor: '-',
            para: 'gatos'
        },
        {
            id: 4,
            nombre: 'Collar Ajustable',
            imagen: './recursos/imagenes/Collar ajustable Perros.jpg',
            precio: 2800,
            categoria: 'accesorios',
            marca: 'DogPro',
            descripcion: 'Collar ajustable de nylon resistente con hebilla metalica.',
            peso: '100 g',
            sabor: '-',
            para: 'perros'
        },
        {
            id: 5,
            nombre: 'Alimento Gato',
            imagen: './recursos/imagenes/ALIMENTO GATO.png',
            precio: 13900,
            categoria: 'alimentos',
            marca: 'Whiskas',
            descripcion: 'Alimento completo para gatos adultos con alto contenido proteico.',
            peso: '10 kg',
            sabor: 'Pescado',
            para: 'gatos adultos'
        },
        {
            id: 6,
            nombre: 'Juguete tipo correa para Perros',
            imagen: './recursos/imagenes/JUGUETE PERRO.jpg',
            precio: 6200,
            categoria: 'juguetes',
            marca: 'FunDog',
            descripcion: 'Juguete interactivo con correa para juegos de tirar.',
            peso: '300 g',
            sabor: '-',
            para: 'perros'
        },
        {
            id: 7,
            nombre: 'Juguete Raton',
            imagen: './recursos/imagenes/JUGUETE GATO.jpg',
            precio: 3500,
            categoria: 'juguetes',
            marca: 'CatFun',
            descripcion: 'Juguete en forma de raton con catnip incluido.',
            peso: '50 g',
            sabor: '-',
            para: 'gatos'
        },
        {
            id: 8,
            nombre: 'Shampoo Suave',
            imagen: './recursos/imagenes/HIGIENE GATO.jpg',
            precio: 4200,
            categoria: 'higiene',
            marca: 'PetCare',
            descripcion: 'Shampoo suave para mascotas con piel sensible.',
            peso: '500 ml',
            sabor: '-',
            para: 'perros y gatos'
        },
        {
            id: 9,
            nombre: 'Suplemento Vitaminico',
            imagen: './recursos/imagenes/SALUD GATO.jpg',
            precio: 8900,
            categoria: 'salud',
            marca: 'VetPlus',
            descripcion: 'Suplemento vitaminico completo para fortalecer el sistema inmunologico.',
            peso: '100 comprimidos',
            sabor: '-',
            para: 'perros y gatos'
        },
        {
            id: 10,
            nombre: 'Alimento Premium Perro',
            imagen: './recursos/imagenes/ALIMENTO PERRO.jpg',
            precio: 15000,
            categoria: 'alimentos',
            marca: 'Pro Plan',
            descripcion: 'Alimento super premium para perros adultos. Formula avanzada.',
            peso: '15 kg',
            sabor: 'Cordero y arroz',
            para: 'perros adultos'
        },
        {
            id: 11,
            nombre: 'Bandana para Perros',
            imagen: './recursos/imagenes/ACCESORIO PERRO.png.jpg',
            precio: 3200,
            categoria: 'accesorios',
            marca: 'DogStyle',
            descripcion: 'Bandana ajustable para perros de todos los tamanos. Varios colores.',
            peso: '50 g',
            sabor: '-',
            para: 'perros'
        },
        {
            id: 12,
            nombre: 'Shampoo para Perros',
            imagen: './recursos/imagenes/HIGIENE PERRO.jpg',
            precio: 4500,
            categoria: 'higiene',
            marca: 'PetCare',
            descripcion: 'Shampoo especial para perros con olor agradable duradero.',
            peso: '500 ml',
            sabor: '-',
            para: 'perros'
        },
        {
            id: 13,
            nombre: 'Suplemento Perro',
            imagen: './recursos/imagenes/SALUD PERRO.jpg',
            precio: 9500,
            categoria: 'salud',
            marca: 'VetPlus',
            descripcion: 'Suplemento vitaminico para perros adultos. Fortalece huesos y articulaciones.',
            peso: '120 comprimidos',
            sabor: '-',
            para: 'perros'
        },
        {
            id: 14,
            nombre: 'Kit Adopcion Gato',
            imagen: './recursos/imagenes/adoptar gato.jpg',
            precio: 12000,
            categoria: 'accesorios',
            marca: 'Huellas',
            descripcion: 'Kit completo para recibir a tu nuevo gato: arenero, comedero y juguete.',
            peso: '3 kg',
            sabor: '-',
            para: 'gatos'
        }
    ]
};

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
    var producto = petshop.productos.find(function(p) { return p.id === idProducto; });
    if (!producto) return;

    var itemExistente = carrito.find(function(item) { return item.id === idProducto; });
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
    carrito = carrito.filter(function(item) { return item.id !== idProducto; });
    guardarCarrito();
    actualizarContadorCarrito();
}

function calcularTotalCarrito() {
    return carrito.reduce(function(total, item) {
        return total + (item.precio * item.cantidad);
    }, 0);
}

// Renderizar página de carrito (tabla) y manejar interacciones
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

    // Actualizar subtotal
    var subtotal = calcularTotalCarrito();
    var subtotalElem = document.getElementById('subtotal');
    if (subtotalElem) subtotalElem.textContent = '$ ' + subtotal.toLocaleString();

    // Listeners para inputs de cantidad
    var inputsCantidad = document.querySelectorAll('.input-cantidad');
    inputsCantidad.forEach(function(inp) {
        inp.addEventListener('change', function() {
            var id = parseInt(this.getAttribute('data-id'));
            var val = parseInt(this.value) || 1;
            var item = carrito.find(function(i) { return i.id === id; });
            if (item) {
                item.cantidad = val;
                guardarCarrito();
                renderizarCarrito();
                actualizarContadorCarrito();
            }
        });
    });

    // Listeners para botones eliminar
    var botonesEliminar = document.querySelectorAll('.btn-eliminar');
    botonesEliminar.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var id = parseInt(this.getAttribute('data-id'));
            eliminarDelCarrito(id);
            renderizarCarrito();
            actualizarContadorCarrito();
        });
    });

    // Vaciar carrito
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

    // Filtro por categoria
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

    // Filtro por marca
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

    // Filtro por precio
    var precioMin = document.getElementById('precio_min');
    var precioMax = document.getElementById('precio_max');
    if (precioMin && precioMin.value) {
        resultado = resultado.filter(function(p) { return p.precio >= parseInt(precioMin.value); });
    }
    if (precioMax && precioMax.value) {
        resultado = resultado.filter(function(p) { return p.precio <= parseInt(precioMax.value); });
    }

    // Busqueda
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

function cargarDetalleProducto() {
    var params = new URLSearchParams(window.location.search);
    var id = parseInt(params.get('id'));

    if (!id) return;

    var producto = petshop.productos.find(function(p) { return p.id === id; });
    if (!producto) return;

    // Actualizar migas de pan
    var migasLi = document.querySelector('nav[aria-label="Migas de pan"] li:last-child');
    if (migasLi) migasLi.textContent = producto.nombre;

    // Actualizar detalle
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

    // Actualizar productos relacionados
    var relacionados = petshop.productos.filter(function(p) {
        return p.categoria === producto.categoria && p.id !== producto.id;
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
        // Si no hay "ultimo_turno", intentar tomar el ultimo elemento del array
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

    // Mapear valores legibles para el servicio
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
        // Mostrar historial de turnos para el usuario
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

document.addEventListener('DOMContentLoaded', function() {
    // Actualizar contador del carrito en todas las paginas
    actualizarContadorCarrito();

    // TIENDA: inicializar productos y filtros
    var catalogo = document.getElementById('catalogo-productos');
    if (catalogo) {
        renderizarProductos(petshop.productos);

        // Event listeners para filtros
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

    // PRODUCTO: cargar detalle
    var articleDetalle = document.querySelector('article[aria-label="Detalle del producto"]');
    if (articleDetalle && window.location.search.indexOf('id=') !== -1) {
        cargarDetalleProducto();
    }

    // TURNOS: actualizar resumen en tiempo real
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

        // Guardar turno al enviar
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
                    // Redirigir a la pagina de confirmacion
                    window.location.href = './confirmacion_turno.html';
                } else {
                    alert('Por favor completa todos los campos obligatorios para reservar el turno.');
                }
            });
        }
    }

    // CONTACTO: manejar envio
    var formContacto = document.getElementById('form-contacto');
    if (formContacto) {
        formContacto.addEventListener('submit', enviarContacto);
    }

    // MI CUENTA: manejar login y registro
    if (document.getElementById('login')) {
        var formLogin = document.getElementById('form-login');
        var formRegistro = document.getElementById('form-registro');

        if (formLogin) formLogin.addEventListener('submit', iniciarSesion);
        if (formRegistro) formRegistro.addEventListener('submit', registrarUsuario);

        // Verificar si hay sesion activa
        var usuarioActual = JSON.parse(localStorage.getItem('usuario_actual'));
        if (usuarioActual) {
            mostrarPanelUsuario();
        } else {
            mostrarLogin();
        }
    }

    // INDEX: renderizar destacados
    var destacadosContenedor = document.getElementById('productos-destacados');
    if (destacadosContenedor) {
        renderizarDestacados();
    }

    // CONFIRMACION: mostrar detalles del ultimo turno si estamos en esa pagina
    var confirmSection = document.querySelector('section[aria-label="Confirmacion de turno"]');
    if (confirmSection) {
        mostrarConfirmacionTurno();
    }

    // Hacer clic en el icono del carrito abra la página del carrito
    var carritoHeader = document.querySelector('div[aria-label="Carrito de compras"]');
    if (carritoHeader) {
        carritoHeader.style.cursor = 'pointer';
        carritoHeader.addEventListener('click', function() {
            window.location.href = './carrito.html';
        });
    }

    // Si estamos en la página carrito, renderizar su contenido
    if (document.getElementById('tabla-carrito')) {
        // cargar carrito desde localStorage (en caso de cambios en otra pestaña)
        carrito = JSON.parse(localStorage.getItem('carrito_huellas')) || [];
        renderizarCarrito();
    }
});
