let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
    fetchServicios();
    actualizarInterfazCarrito();
});

// 1. Fetch API para cargar productos
async function fetchServicios() {
    try {
        const response = await fetch('servicios.json');
        const data = await response.json();
        renderizarProductos(data);
    } catch (error) {
        console.error("Error cargando servicios:", error);
    }
}

// 2. Renderizar Cards con DOM
function renderizarProductos(productos) {
    const container = document.getElementById('productos-container');
    container.innerHTML = '';

    productos.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'col-12 col-md-6 col-lg-4 d-flex';
        div.innerHTML = `
            <div class="card w-100">
                <img src="${prod.imagen}" class="card-img-top" alt="${prod.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${prod.nombre}</h5>
                    <p class="card-text text-muted">${prod.descripcion}</p>
                    <p class="fw-bold mt-auto">$${prod.precio}</p>
                    <button class="btn btn-dark mt-2" onclick="agregarAlCarrito(${prod.id}, '${prod.nombre}', ${prod.precio})">
                        Agregar al Pedido
                    </button>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

// 3. Funciones del Carrito
function agregarAlCarrito(id, nombre, precio) {
    const existe = carrito.find(item => item.id === id);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }
    guardarYActualizar();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarYActualizar();
}

function cambiarCantidad(id, delta) {
    const item = carrito.find(i => i.id === id);
    if (item) {
        item.cantidad += delta;
        if (item.cantidad <= 0) eliminarDelCarrito(id);
        else guardarYActualizar();
    }
}

function guardarYActualizar() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarInterfazCarrito();
}

function actualizarInterfazCarrito() {
    const cartList = document.getElementById('cart-items');
    const totalSpan = document.getElementById('cart-total');
    const countBadge = document.getElementById('cart-count');
    
    cartList.innerHTML = '';
    let total = 0;
    let count = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        count += item.cantidad;
        
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <div>
                <strong>${item.nombre}</strong><br>
                <small>$${item.precio} x ${item.cantidad}</small>
            </div>
            <div>
                <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(${item.id}, -1)">-</button>
                <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(${item.id}, 1)">+</button>
                <button class="btn btn-sm btn-danger ms-2" onclick="eliminarDelCarrito(${item.id})">×</button>
            </div>
        `;
        cartList.appendChild(li);
    });

    totalSpan.innerText = total;
    countBadge.innerText = count;
}

function vaciarCarrito() {
    carrito = [];
    guardarYActualizar();
}

function finalizarCompra() {
    if (carrito.length === 0) return alert("El carrito está vacío");
    alert("¡Gracias por elegir LAVERO H&L! Nos comunicaremos para coordinar el turno.");
    vaciarCarrito();
}

// 4. Validación básica de formulario
document.getElementById('contact-form').addEventListener('submit', (e) => {
    const email = document.getElementById('email').value;
    if (!email.includes('@')) {
        e.preventDefault();
        alert("Por favor ingrese un correo válido.");
    }
});

