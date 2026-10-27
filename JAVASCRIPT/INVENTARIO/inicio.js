/* js/inventario/inicio.js — arranque del módulo de inventario */

function pintarTodo() {
  pintarMenu();
  pintarInventario();
  pintarIngresos();
  pintarMerma();
}

function iniciarInventario() {
  $("#ing-fecha").value = fechaHoy();
  $("#mer-fecha").value = fechaHoy();
  pintarTodo();
}
