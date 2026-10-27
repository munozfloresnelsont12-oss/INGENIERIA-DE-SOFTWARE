/* inventario/menu.js — Pestaña Menú: tarjetas de hamburguesas y formulario para agregar */

/* ---------------------------------------------------------------------------
   PESTAÑA: MENÚ
   --------------------------------------------------------------------------- */
function pintarMenu() {
  const contenedor = $("#menu-lista");
  const hamburguesas = DB.hamburguesas();

  if (!hamburguesas.length) {
    contenedor.innerHTML = "<p class='vacio'>Todavía no hay hamburguesas en el menú.</p>";
    return;
  }

  contenedor.innerHTML = hamburguesas
    .map((h) => {
      const filas = h.ingredientes
        .map((i) => {
          const p = datosProducto(i.productoId);
          return `<li>${p.nombre} — <strong>${i.cantidad} ${p.unidad}</strong>
                  <span class="etiqueta ${p.tipo?.toLowerCase()}">${p.tipo}</span></li>`;
        })
        .join("");

      return `
      <article class="card">
        <button class="btn-x" data-accion="borrar-hamburguesa" data-id="${h.id}" title="Eliminar">×</button>
        <h3>${h.nombre}</h3>
        <p class="precio">$${h.precio.toFixed(2)}</p>
        <p class="desc">${h.descripcion}</p>
        <strong>Productos necesarios:</strong>
        <ul>${filas}</ul>
      </article>`;
    })
    .join("");
}

/* --- Formulario para agregar hamburguesa con sus ingredientes --- */
function filaIngrediente() {
  const opciones = DB.productos()
    .map((p) => `<option value="${p.id}">${p.nombre} (${p.unidad})</option>`)
    .join("");

  const div = document.createElement("div");
  div.className = "fila-ingrediente";
  div.innerHTML = `
    <select class="sel-ingrediente">${opciones}</select>
    <input type="number" step="any" class="cant-ingrediente" placeholder="Cantidad" required />
    <button type="button" class="btn-x" data-accion="quitar-fila">×</button>`;
  return div;
}

$("#btn-agregar-ingrediente").addEventListener("click", () => {
  $("#ingredientes-contenedor").appendChild(filaIngrediente());
});

$("#form-hamburguesa").addEventListener("submit", (e) => {
  e.preventDefault();

  const ingredientes = [...$$("#ingredientes-contenedor .fila-ingrediente")].map((fila) => ({
    productoId: fila.querySelector(".sel-ingrediente").value,
    cantidad: fila.querySelector(".cant-ingrediente").value,
  }));

  if (!ingredientes.length) {
    alert("Agrega al menos un ingrediente a la hamburguesa.");
    return;
  }

  try {
    DB.agregarHamburguesa({
      nombre: $("#ham-nombre").value.trim(),
      precio: $("#ham-precio").value,
      descripcion: $("#ham-descripcion").value.trim(),
      ingredientes,
    });
    e.target.reset();
    $("#ingredientes-contenedor").innerHTML = "";
    pintarMenu();
  } catch (error) {
    alert(error.message);
  }
});

