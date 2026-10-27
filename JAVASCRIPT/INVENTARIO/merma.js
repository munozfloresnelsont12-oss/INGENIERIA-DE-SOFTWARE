/* inventario/merma.js — Pestaña Merma del día: registro de desperdicio */

/* ---------------------------------------------------------------------------
   PESTAÑA: MERMA
   --------------------------------------------------------------------------- */
function pintarMerma() {
  const cuerpo = $("#tabla-merma tbody");
  const lista = [...DB.merma()].sort((a, b) => b.fecha.localeCompare(a.fecha) || b.id - a.id);

  const deHoy = lista.filter((m) => m.fecha === fechaHoy());
  $("#merma-hoy").textContent =
    deHoy.length === 1 ? "1 registro" : `${deHoy.length} registros`;

  if (!lista.length) {
    cuerpo.innerHTML = "<tr><td colspan='7' class='vacio'>Sin merma registrada.</td></tr>";
    return;
  }

  cuerpo.innerHTML = lista
    .map((m) => {
      const p = datosProducto(m.productoId);
      return `
      <tr>
        <td>${m.fecha}</td>
        <td>${p.nombre}</td>
        <td><span class="etiqueta ${p.tipo.toLowerCase()}">${p.tipo}</span></td>
        <td>${m.cantidad} ${p.unidad}</td>
        <td>${m.motivo || "—"}</td>
        <td>${m.notas || "—"}</td>
        <td><button class="btn-eliminar" data-accion="borrar-merma" data-id="${m.id}">Eliminar</button></td>
      </tr>`;
    })
    .join("");
}

$("#form-merma").addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    DB.agregarMerma({
      productoId: $("#mer-producto").value,
      cantidad: $("#mer-cantidad").value,
      fecha: $("#mer-fecha").value,
      motivo: $("#mer-motivo").value,
      notas: $("#mer-notas").value.trim(),
    });
    e.target.reset();
    $("#mer-fecha").value = fechaHoy();
    pintarMerma();
    pintarInventario();
  } catch (error) {
    alert(error.message);
  }
});

