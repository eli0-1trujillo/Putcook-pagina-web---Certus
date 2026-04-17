let carrito = [];

document.getElementById("cart-btn").addEventListener("click", () => {
  document.getElementById("cart-panel").classList.add("active");
});

function cerrarCarrito() {
  document.getElementById("cart-panel").classList.remove("active");
}

document.querySelectorAll(".add-btn").forEach(btn => {
  btn.addEventListener("click", () => {

    const box = btn.closest(".box");
    const nombre = box.querySelector("h3").innerText;
    const precioTexto = box.querySelector(".precio").innerText;
    const precio = parseFloat(precioTexto.replace("S/", ""));

    const existe = carrito.find(p => p.nombre === nombre);

    if (existe) {
      existe.cantidad++;
    } else {
      carrito.push({
        nombre,
        precio,
        cantidad: 1
      });
    }

    actualizarCarrito();
  });
});


function actualizarCarrito() {
  const contenedor = document.getElementById("cart-items");
  contenedor.innerHTML = "";

  let total = 0;

  carrito.forEach(item => {
    total += item.precio * item.cantidad;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <div>
        <strong>${item.nombre}</strong><br>
        S/ ${item.precio} x ${item.cantidad}
      </div>
      <div>
        <button onclick="cambiarCantidad('${item.nombre}', -1)">-</button>
        <button onclick="cambiarCantidad('${item.nombre}', 1)">+</button>
      </div>
    `;

    contenedor.appendChild(div);
  });

  document.getElementById("total").innerText = "S/ " + total.toFixed(2);
}

function cambiarCantidad(nombre, cambio) {
  const producto = carrito.find(p => p.nombre === nombre);

  if (!producto) return;

  producto.cantidad += cambio;

  if (producto.cantidad <= 0) {
    carrito = carrito.filter(p => p.nombre !== nombre);
  }

  actualizarCarrito();
}


function scrollLeftCustom(btn) {
  const container = btn.parentElement.querySelector('.box-container');

  container.scrollBy({
    left: -container.clientWidth,
    behavior: 'smooth'
  });
}

function scrollRightCustom(btn) {
  const container = btn.parentElement.querySelector('.box-container');

  container.scrollBy({
    left: container.clientWidth,
    behavior: 'smooth'
  });
}

// Bloquear letras, solo permitir números
numDoc.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
});


function openModal() {
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

window.onclick = function(event) {
  let menu = document.getElementById("menu");

  if (event.target === menu) {
    menu.classList.remove("abierto");
  }
}

const buscador = document.getElementById("buscador");
const productos = document.querySelectorAll(".box");
const mensaje = document.getElementById("no-resultados");


buscador.addEventListener("keyup", function() {
  const texto = buscador.value.toLowerCase();
  let encontrados = 0;

  productos.forEach(producto => {
    const nombre = producto.textContent.toLowerCase();

    if (nombre.includes(texto)) {
      producto.style.display = "block";
      encontrados++;
    } else {
      producto.style.display = "none";
    }
  });

  if (encontrados === 0) {
    mensaje.style.display = "block";
  } else {
    mensaje.style.display = "none";
  }
});

function abrirMenu() {
  document.getElementById("menu-lateral").classList.add("active");
  document.getElementById("overlay").classList.add("active");
}

function cerrarMenu() {
  document.getElementById("menu-lateral").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");
}