/* ventas/pago.js — Método de pago y cálculo del cambio */

/* ---------------------------------------------------------------------------
   MÉTODO DE PAGO Y CAMBIO
   --------------------------------------------------------------------------- */
const selectMetodoPago = document.getElementById("pos-metodo-pago");
const campoPagoRecibido = document.getElementById("campo-pago-recibido");
const inputPagoRecibido = document.getElementById("pos-pago-recibido");
const filaCambio = document.getElementById("fila-cambio");

selectMetodoPago.addEventListener("change", () => {
  const esEfectivo = selectMetodoPago.value === "efectivo";
  campoPagoRecibido.style.display = esEfectivo ? "flex" : "none";
  filaCambio.style.display = esEfectivo ? "flex" : "none";
  if (!esEfectivo) inputPagoRecibido.value = "";
  calcularCambio();
});

inputPagoRecibido.addEventListener("input", calcularCambio);

function totalActual() {
  const subtotal = carrito.reduce((suma, i) => suma + i.precio * i.cantidad, 0);
  return subtotal * (1 + IVA);
}

function calcularCambio() {
  if (selectMetodoPago.value !== "efectivo") return;
  const total = totalActual();
  const recibido = Number(inputPagoRecibido.value) || 0;
  const cambio = recibido - total;
  document.getElementById("pos-cambio").textContent = "$" + (cambio > 0 ? cambio.toFixed(2) : "0.00");
}

