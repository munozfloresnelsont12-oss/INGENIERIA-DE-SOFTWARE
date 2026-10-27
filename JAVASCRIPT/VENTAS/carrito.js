/* ventas/carrito.js — Orden actual: agregar, quitar, totales e IVA */

/* ---------------------------------------------------------------------------
   ESTADO DEL CARRITO (solo vive en memoria mientras arma la orden)
   --------------------------------------------------------------------------- */
let carrito = []; // [{ id, nombre, precio, cantidad }]

function agregarAlCarrito(producto) {
  const existente = carrito.find((i) => i.id === producto.id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
  }
  pintarCarrito();
}

function cambiarCantidad(id, delta) {
  const item = carrito.find((i) => i.id === id);
  if (!item) return;
  item.cantidad += delta;
  if (item.cantidad <= 0) {
    carrito = carrito.filter((i) => i.id !== id);
  }
  pintarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  pintarCarrito();
}


/* ---------------------------------------------------------------------------
   PINTAR CARRITO Y TOTALES
   --------------------------------------------------------------------------- */
const IVA = 0.16;

function pintarCarrito() {
  const cont = document.getElementById("carrito-items");
  const vacio = document.getElementById("carrito-vacio");

  if (!carrito.length) {
    vacio.style.display = "block";
    cont.innerHTML = "";
  } else {
    vacio.style.display = "none";
    cont.innerHTML = carrito
      .map(
        (i) => `
      <div class="carrito-fila">
        <div class="carrito-info">
          <span class="carrito-nombre">${i.nombre}</span>
          <span class="carrito-precio-unit">$${i.precio.toFixed(2)} c/u</span>
        </div>
        <div class="carrito-cant">
          <button type="button" class="btn-cant" data-id="${i.id}" data-delta="-1">−</button>
          <span>${i.cantidad}</span>
          <button type="button" class="btn-cant" data-id="${i.id}" data-delta="1">+</button>
        </div>
        <span class="carrito-subtotal">$${(i.precio * i.cantidad).toFixed(2)}</span>
      </div>`
      )
      .join("");
  }

  const subtotal = carrito.reduce((suma, i) => suma + i.precio * i.cantidad, 0);
  const iva = subtotal * IVA;
  const total = subtotal + iva;

  document.getElementById("pos-subtotal").textContent = "$" + subtotal.toFixed(2);
  document.getElementById("pos-iva").textContent = "$" + iva.toFixed(2);
  document.getElementById("pos-total").textContent = "$" + total.toFixed(2);

  calcularCambio();
  pintarIngredientesOrden();
}

document.getElementById("carrito-items").addEventListener("click", (e) => {
  const boton = e.target.closest(".btn-cant");
  if (!boton) return;
  cambiarCantidad(boton.dataset.id, Number(boton.dataset.delta));
});

document.getElementById("btn-vaciar-carrito").addEventListener("click", () => {
  if (!carrito.length) return;
  if (confirm("¿Vaciar la orden actual?")) vaciarCarrito();
});

