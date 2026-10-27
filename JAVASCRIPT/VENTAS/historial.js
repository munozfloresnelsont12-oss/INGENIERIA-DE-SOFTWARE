/* ventas/historial.js — Historial de ventas de prueba (llave propia en localStorage) */

const LLAVE_VENTAS_SIM = "carlsjr_ventas_simuladas";

function historialVentas() {
  try {
    return JSON.parse(localStorage.getItem(LLAVE_VENTAS_SIM)) || [];
  } catch (_) {
    return [];
  }
}

function guardarHistorialVentas(lista) {
  localStorage.setItem(LLAVE_VENTAS_SIM, JSON.stringify(lista));
}

/* ---------------------------------------------------------------------------
   HISTORIAL DE VENTAS DE PRUEBA
   --------------------------------------------------------------------------- */
function pintarHistorialVentas() {
  const cuerpo = document.querySelector("#tabla-ventas tbody");
  const lista = historialVentas();

  if (!lista.length) {
    cuerpo.innerHTML = "<tr><td colspan='6' class='vacio'>Todavía no hay ventas simuladas.</td></tr>";
    return;
  }

  cuerpo.innerHTML = lista
    .map(
      (v) => `
    <tr>
      <td>${v.folio}</td>
      <td>${v.fechaHora}</td>
      <td>${v.items.reduce((n, i) => n + i.cantidad, 0)} art.</td>
      <td>$${v.total.toFixed(2)}</td>
      <td>${v.metodo === "efectivo" ? "Efectivo" : "Tarjeta"}</td>
      <td><button type="button" class="btn-eliminar" data-folio="${v.folio}">Eliminar</button></td>
    </tr>`
    )
    .join("");
}

document.querySelector("#tabla-ventas tbody").addEventListener("click", (e) => {
  const boton = e.target.closest(".btn-eliminar");
  if (!boton) return;
  if (!confirm("¿Eliminar esta venta del historial de pruebas?")) return;
  const todas = historialVentas();
  const venta = todas.find((v) => v.folio === boton.dataset.folio);
  if (venta && venta.consumo) devolverStockSim(venta.consumo);
  guardarHistorialVentas(todas.filter((v) => v.folio !== boton.dataset.folio));
  pintarHistorialVentas();
  pintarIngredientesOrden();
  pintarStockSim();
});
