/* vistas/inv-merma.js — Inventario > pestaña Merma del día */

VISTAS.invMerma = `
    <section id="tab-merma" class="tab-content">
      <h2>Merma / desperdicio del día</h2>
      <p class="ayuda">Registra el producto que se desperdició. Se resta automáticamente del inventario.</p>
      <form id="form-merma" class="formulario">
        <label>Producto <select id="mer-producto" required></select></label>
        <label>Cantidad <input type="number" step="any" id="mer-cantidad" required></label>
        <label>Fecha <input type="date" id="mer-fecha" required></label>
        <label>Motivo
          <select id="mer-motivo">
            <option value="">Selecciona</option>
            <option value="Caducado">Caducado</option>
            <option value="Dañado">Dañado</option>
            <option value="Error de preparación">Error de preparación</option>
            <option value="Quemado">Quemado</option>
            <option value="Caído al piso">Caído al piso</option>
            <option value="Devolución de cliente">Devolución de cliente</option>
            <option value="Otro">Otro</option>
          </select>
        </label>
        <label>Notas <input type="text" id="mer-notas" placeholder="Opcional"></label>
        <button type="submit">Registrar merma</button>
      </form>

      <div class="resumen">
        <strong>Merma registrada hoy:</strong> <span id="merma-hoy">0 registros</span>
      </div>

      <h3>Historial de merma</h3>
      <div class="table-wrap">
        <table id="tabla-merma">
          <thead>
            <tr>
              <th>Fecha</th><th>Producto</th><th>Tipo</th>
              <th>Cantidad</th><th>Motivo</th><th>Notas</th><th></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </section>
`;
