/* inventario/ingresos.js — Pestaña Ingresar producto: abastecimiento manual */

/* ---------------------------------------------------------------------------
   PESTAÑA: INGRESOS
   --------------------------------------------------------------------------- */
function pintarIngresos() {
  const cuerpo = $("#tabla-ingresos tbody");
  const lista = [...DB.ingresos()].sort((a, b) => b.fecha.localeCompare(a.fecha) || b.id - a.id);

  if (!lista.length) {
    cuerpo.innerHTML = "<tr><td colspan='8' class='vacio'>Sin ingresos registrados.</td></tr>";
    return;
  }

  cuerpo.innerHTML = lista
    .map((i) => {
      const p = datosProducto(i.productoId);
      return `
      <tr>
        <td>${i.fecha}</td>
        <td>${p.nombre}</td>
        <td><span class="etiqueta ${p.tipo.toLowerCase()}">${p.tipo}</span></td>
        <td>${i.cantidad} ${p.unidad}</td>
        <td>${i.caducidad || "—"}</td>
        <td>${i.proveedor || "—"}</td>
        <td>${i.notas || "—"}</td>
        <td><button class="btn-eliminar" data-accion="borrar-ingreso" data-id="${i.id}">Eliminar</button></td>
      </tr>`;
    })
    .join("");
}

$("#form-ingreso").addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    DB.agregarIngreso({
      productoId: $("#ing-producto").value,
      cantidad: $("#ing-cantidad").value,
      fecha: $("#ing-fecha").value,
      caducidad: $("#ing-caducidad").value,
      proveedor: $("#ing-proveedor").value.trim(),
      notas: $("#ing-notas").value.trim(),
    });
    e.target.reset();
    $("#ing-fecha").value = fechaHoy();
    pintarIngresos();
    pintarInventario();
  } catch (error) {
    alert(error.message);
  }
});

