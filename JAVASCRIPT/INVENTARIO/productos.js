/* inventario/productos.js — Pestaña Inventario: catálogo, stock y alta de productos */

/* ---------------------------------------------------------------------------
   PESTAÑA: INVENTARIO
   --------------------------------------------------------------------------- */
function pintarInventario() {
  const cuerpo = $("#tabla-inventario tbody");
  const productos = DB.productos();

  cuerpo.innerHTML = productos
    .map((p) => {
      const bajo = p.stock <= p.minimo;
      return `
      <tr>
        <td>${p.nombre}</td>
        <td><span class="etiqueta ${p.tipo.toLowerCase()}">${p.tipo}</span></td>
        <td>${p.unidad}</td>
        <td class="${bajo ? "bajo-stock" : ""}">${p.stock}${bajo ? " ⚠️" : ""}</td>
        <td>${p.minimo}</td>
        <td><button class="btn-eliminar" data-accion="borrar-producto" data-id="${p.id}">Eliminar</button></td>
      </tr>`;
    })
    .join("");

  // Refresca los selectores de producto de los otros formularios
  const opciones = productos
    .map((p) => `<option value="${p.id}">${p.nombre} (${p.unidad})</option>`)
    .join("");
  $("#ing-producto").innerHTML = opciones;
  $("#mer-producto").innerHTML = opciones;
}

$("#form-producto").addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    DB.agregarProducto({
      nombre: $("#prod-nombre").value.trim(),
      tipo: $("#prod-tipo").value,
      unidad: $("#prod-unidad").value,
      stock: $("#prod-stock").value,
      minimo: $("#prod-minimo").value,
    });
    e.target.reset();
    pintarInventario();
  } catch (error) {
    alert(error.message);
  }
});

