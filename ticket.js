/* ventas/ticket.js — Ventana emergente del ticket y cierre de la venta */

function mostrarTicket(venta) {
  const cont = document.getElementById("ticket-contenido");
  cont.innerHTML = `
    <div class="ticket-encabezado">
      <h2>CARL'S JR.</h2>
      <p>Ticket de venta — SIMULACIÓN</p>
      <p>Folio: ${venta.folio}</p>
      <p>${venta.fechaHora}</p>
    </div>
    <hr>
    <div class="ticket-items">
      ${venta.items
        .map(
          (i) => `
        <div class="ticket-fila">
          <span>${i.cantidad} × ${i.nombre}</span>
          <span>$${(i.precio * i.cantidad).toFixed(2)}</span>
        </div>`
        )
        .join("")}
    </div>
    <hr>
    <div class="ticket-fila"><span>Subtotal</span><span>$${venta.subtotal.toFixed(2)}</span></div>
    <div class="ticket-fila"><span>IVA (16%)</span><span>$${venta.iva.toFixed(2)}</span></div>
    <div class="ticket-fila ticket-total"><span>TOTAL</span><span>$${venta.total.toFixed(2)}</span></div>
    <hr>
    <div class="ticket-fila"><span>Método de pago</span><span>${venta.metodo === "efectivo" ? "Efectivo" : "Tarjeta"}</span></div>
    ${
      venta.metodo === "efectivo"
        ? `<div class="ticket-fila"><span>Pagó con</span><span>$${venta.recibido.toFixed(2)}</span></div>
           <div class="ticket-fila"><span>Cambio</span><span>$${venta.cambio.toFixed(2)}</span></div>`
        : ""
    }
    <p class="ticket-pie">¡Gracias por su compra! (venta de prueba, no fiscal)</p>
  `;
  document.getElementById("ticket-overlay").classList.add("visible");
}

function terminarVenta() {
  cerrarTicket();
  vaciarCarrito();
  inputPagoRecibido.value = "";
  calcularCambio();
}

document.getElementById("btn-cerrar-ticket").addEventListener("click", terminarVenta);
document.getElementById("btn-nueva-venta").addEventListener("click", terminarVenta);

function cerrarTicket() {
  document.getElementById("ticket-overlay").classList.remove("visible");
}
