/* vistas/inventario.js — Pantalla 3: módulo de Inventario (junta las 5 pestañas) */

VISTAS.inventario = `
<div id="inventario-container">
  <header>
    <h2>Carl's Jr. — Módulo de Inventario</h2>
    <div class="header-acciones">
      <button class="logout-btn secundario" id="btn-volver-panel">← Volver al panel</button>
      <button class="logout-btn" id="btn-cerrar-sesion-2">Cerrar Sesión</button>
    </div>
  </header>

  <nav class="sub-nav">
    <button class="tab-btn active" data-tab="menu">Menú</button>
    <button class="tab-btn" data-tab="inventario">Inventario</button>
    <button class="tab-btn" data-tab="ingresos">Ingresar producto</button>
    <button class="tab-btn" data-tab="merma">Merma del día</button>
    <button class="tab-btn" data-tab="datos">Datos</button>
  </nav>

  <main>
${VISTAS.invMenu}
${VISTAS.invProductos}
${VISTAS.invIngresos}
${VISTAS.invMerma}
${VISTAS.invDatos}
  </main>
</div>
`;
