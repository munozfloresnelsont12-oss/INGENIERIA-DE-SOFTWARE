/* vistas/inv-ingresos.js — Inventario > pestaña Ingresar producto */

VISTAS.invIngresos = `
    <section id="tab-ingresos" class="tab-content">
      <h2>Ingreso de producto (abastecimiento)</h2>
      <p class="ayuda">Registra aquí cada entrega de mercancía que llega a la sucursal. Se suma automáticamente al inventario.</p>
      <form id="form-ingreso" class="formulario">
        <label>Producto <select id="ing-producto" required></select></label>
        <label>Cantidad <input type="number" step="any" id="ing-cantidad" required></label>
        <label>Fecha de ingreso <input type="date" id="ing-fecha" required></label>
        <label>Fecha de caducidad <input type="date" id="ing-caducidad"></label>
        <label>Proveedor <input type="text" id="ing-proveedor" placeholder="Opcional"></label>
        <label>Notas <input type="text" id="ing-notas" placeholder="Opcional"></label>
        <button type="submit">Registrar ingreso</button>
      </form>

      <h3>Historial de ingresos</h3>
      <div class="table-wrap">
        <table id="tabla-ingresos">
          <thead>
            <tr>
              <th>Fecha</th><th>Producto</th><th>Tipo</th><th>Cantidad</th>
              <th>Caducidad</th><th>Proveedor</th><th>Notas</th><th></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </section>
`;
