/* inventario/eliminar.js — Botones Eliminar de las tablas del inventario */

/* ---------------------------------------------------------------------------
   ACCIONES DE ELIMINAR (delegación de eventos)
   --------------------------------------------------------------------------- */
document.addEventListener("click", (e) => {
  const boton = e.target.closest("[data-accion]");
  if (!boton) return;

  const { accion, id } = boton.dataset;

  if (accion === "quitar-fila") {
    boton.closest(".fila-ingrediente").remove();
    return;
  }

  if (!confirm("¿Seguro que deseas eliminar este registro?")) return;

  try {
    if (accion === "borrar-producto") DB.eliminarProducto(id);
    if (accion === "borrar-hamburguesa") DB.eliminarHamburguesa(id);
    if (accion === "borrar-ingreso") DB.eliminarIngreso(id);
    if (accion === "borrar-merma") DB.eliminarMerma(id);
    pintarTodo();
  } catch (error) {
    alert(error.message);
  }
});

