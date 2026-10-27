/* ===========================================================================
   js/nucleo/navegacion.js — NAVEGACIÓN ENTRE PANTALLAS
   Pantallas: login → dashboard (panel gerencial) → inventario | ventas
   =========================================================================== */

const pantallaLogin      = document.getElementById("login-container");
const pantallaDashboard  = document.getElementById("dashboard-container");
const pantallaInventario = document.getElementById("inventario-container");
const pantallaVentas     = document.getElementById("ventas-container");

function mostrarPantalla(cual) {
  pantallaLogin.style.display      = cual === "login"      ? "block" : "none";
  pantallaDashboard.style.display  = cual === "dashboard"  ? "flex"  : "none";
  pantallaInventario.style.display = cual === "inventario" ? "flex"  : "none";
  pantallaVentas.style.display     = cual === "ventas"     ? "flex"  : "none";

  // El body se centra solo en la pantalla de login
  document.body.classList.toggle("modo-login", cual === "login");
  window.scrollTo(0, 0);

  // Al entrar a ventas, tomar los cambios más recientes del inventario
  if (cual === "ventas" && typeof refrescarPOS === "function") refrescarPOS();
}

/* ------------------------- Tarjetas del panel gerencial ------------------- */
const descripciones = {
  proveedores:
    "Apartado para programar órdenes de compra semanales con distribuidores autorizados y verificar estatus de entregas. (Módulo pendiente de desarrollo.)",
  reportes:
    "Visualización de métricas de ventas del día, cortes de caja y administración de turnos del personal de la sucursal. (Módulo pendiente de desarrollo.)",
};

const titulos = {
  proveedores: "Proveedores",
  reportes: "Reportes y Personal",
};

// Módulos que ya abren su propia pantalla completa
const MODULOS_FUNCIONALES = { inventario: "inventario", ventas: "ventas" };

document.querySelectorAll(".card-option").forEach((tarjeta) => {
  tarjeta.addEventListener("click", () => {
    const modulo = tarjeta.dataset.modulo;

    if (MODULOS_FUNCIONALES[modulo]) {
      mostrarPantalla(MODULOS_FUNCIONALES[modulo]);
      return;
    }

    // Los demás módulos, por ahora, solo muestran su descripción
    const vista = document.getElementById("active-section-view");
    vista.style.display = "block";
    document.getElementById("section-title").textContent = "Módulo Activo: " + titulos[modulo];
    document.getElementById("section-desc").textContent = descripciones[modulo];
    vista.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});

/* ----------------------- Volver al panel gerencial ------------------------ */
document.getElementById("btn-volver-panel").addEventListener("click", () => {
  mostrarPantalla("dashboard");
});
