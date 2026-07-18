// Variables de estado
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// 1. Fetch API para obtener productos
async function cargarServicios() {
    try {
        const response = await fetch('servicios.json');
        const data = await response.json();
        renderizarProductos(data);
    } catch (error) {
        console.error("Error cargando servicios:", error);
    }
}

// 2. Renderizar productos en el DOM
function renderizarProductos(servicios) {
    const container = document.getElementById('productos-container');
    container.innerHTML = '';

    servicios.forEach(servicio => {
        const card = document.createElement('div');
        card.className = 'card h-100';
        card.innerHTML = `
            <img src="${servicio.imagen}" class="card-img-top" alt="${servicio.nombre}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${servicio.nombre}</h5>
                <p class="card-text">${servicio.descripcion}</p>
                <p class="fw-bold mt-auto">$${servicio.precio}</p>
                <button class="btn btn-dark mt-2" onclick="agregarAlCarrito(${servicio.id}, '${servicio.nombre}', ${servicio.precio})">
                    Añadir al carrito
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// 3. Funciones del Carrito
function agregarAlCarrito(id, nombre, precio) {
    const itemExistente = carrito.find(item => item.id === id);
    
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }
    
    actualizarCarrito();
    alert(`${nombre} añadido con éxito.`);
}

function actualizarCarrito() {
    // Guardar en LocalStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Actualizar contador
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    document.getElementById('cart-count').innerText = totalItems;
    
    renderizarModalCarrito();
}

function renderizarModalCarrito() {
    const container = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    container.innerHTML = '';
    
    let total = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        const div = document.createElement('div');
        div.className = 'cart-item border-bottom pb-2 mb-2';
        div.innerHTML = `
            <div>
                <p class="mb-0 fw-bold">${item.nombre}</p>
                <small>Cant: ${item.cantidad} x $${item.precio}</small>
            </div>
            <div>
                <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
            </div>
        `;
        container.appendChild(div);
    });

    totalElement.innerText = `$${total}`;
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

function clearCart() {
    carrito = [];
    actualizarCarrito();
}

function checkout() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    alert("¡Reserva simulada con éxito! Nos contactaremos pronto.");
    clearCart();
}

// 4. Validación de Formulario
document.getElementById('contact-form').addEventListener('submit', function(e) {
    const email = document.getElementById('email').value;
    if (!email.includes('@')) {
        e.preventDefault();
        alert("Por favor ingrese un correo válido.");
    }
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    cargarServicios();
    actualizarCarrito();
});
