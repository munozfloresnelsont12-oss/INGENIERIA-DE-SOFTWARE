/* vistas/ventas.js — Pantalla 4: Simulación de Venta (junta las secciones del POS) */

VISTAS.ventas = `
<div id="ventas-container">
  <header>
    <h2>Carl's Jr. — Simulación de Venta</h2>
    <div class="header-acciones">
      <button class="logout-btn secundario" id="btn-volver-panel-2">← Volver al panel</button>
      <button class="logout-btn" id="btn-cerrar-sesion-3">Cerrar Sesión</button>
    </div>
  </header>

  <p class="aviso-simulacion">
    ⚠ Modo simulación: estas ventas de prueba <strong>no afectan</strong> el inventario real ni generan cortes de caja oficiales.
  </p>

  <div class="pos-layout">
${VISTAS.ventasCatalogo}
${VISTAS.ventasCarrito}
  </div>

${VISTAS.ventasIngredientes}
${VISTAS.ventasTicket}
${VISTAS.ventasHistorial}
</div>
`;
