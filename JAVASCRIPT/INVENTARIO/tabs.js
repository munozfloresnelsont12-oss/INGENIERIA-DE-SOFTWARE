/* inventario/tabs.js — Navegación entre las 5 pestañas del módulo de inventario */

/* ---------------------------------------------------------------------------
   NAVEGACIÓN POR PESTAÑAS
   --------------------------------------------------------------------------- */
$$(".tab-btn").forEach((boton) => {
  boton.addEventListener("click", () => {
    $$(".tab-btn").forEach((b) => b.classList.remove("active"));
    $$(".tab-content").forEach((s) => s.classList.remove("active"));
    boton.classList.add("active");
    $(`#tab-${boton.dataset.tab}`).classList.add("active");
  });
});

