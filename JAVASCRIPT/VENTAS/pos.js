/* ventas/pos.js — arranque y refresco de la pantalla de Simulación de Venta */

/* Se llama al entrar a la pantalla para tomar cambios hechos en Inventario */
function refrescarPOS() {
  const activa = document.querySelector(".cat-btn.active");
  pintarCatalogo(activa ? activa.dataset.cat : "hamburguesas");
  pintarIngredientesOrden();
  pintarStockSim();
  pintarProyeccion();
}

/* ---------------------------------------------------------------------------
   ARRANQUE DEL MÓDULO
   --------------------------------------------------------------------------- */
function iniciarPOS() {
  pintarCatalogo("hamburguesas");
  pintarCarrito();
  pintarHistorialVentas();
  pintarStockSim();
  pintarProyeccion();
}

document.getElementById("btn-volver-panel-2").addEventListener("click", () => mostrarPantalla("dashboard"));
document.getElementById("btn-cerrar-sesion-3").addEventListener("click", cerrarSesion);
