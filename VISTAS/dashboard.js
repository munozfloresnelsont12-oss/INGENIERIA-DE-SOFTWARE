/* vistas/dashboard.js — Pantalla 2: panel gerencial con las 4 tarjetas de módulos */

VISTAS.dashboard = `
<div id="dashboard-container">
  <header>
    <h2>Carl's Jr. — Panel Gerencial</h2>
    <button class="logout-btn" id="btn-cerrar-sesion">Cerrar Sesión</button>
  </header>

  <div class="dashboard-content">
    <h3>Bienvenido, Gerente General. Seleccione un módulo de gestión:</h3>

    <div class="grid-options">
      <div class="card-option" data-modulo="inventario">
        <h4>Inventario</h4>
        <p>Control de insumos, carne Angus, papas, menú y mermas.</p>
        <span class="badge-activo">Módulo activo</span>
      </div>
      <div class="card-option" data-modulo="proveedores">
        <h4>Proveedores</h4>
        <p>Gestión de pedidos, entregas y cartera de distribuidores.</p>
      </div>
      <div class="card-option" data-modulo="ventas">
        <h4>Simulación de Venta</h4>
        <p>Pruebas de caja, cobros rápidos y flujo de órdenes.</p>
        <span class="badge-activo">Módulo activo</span>
      </div>
      <div class="card-option" data-modulo="reportes">
        <h4>Reportes y Personal</h4>
        <p>Métricas de sucursal, horarios y rendimiento del equipo.</p>
      </div>
    </div>

    <!-- Vista para los módulos que todavía son descriptivos -->
    <div id="active-section-view">
      <h3 id="section-title">Seleccione una opción arriba</h3>
      <p id="section-desc">Haga clic en cualquiera de las 4 tarjetas superiores para acceder a su contenido operativo.</p>
    </div>
  </div>
</div>
`;
