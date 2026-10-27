/* vistas/ventas-ingredientes.js — Simulación de venta > consumo de ingredientes (conectado al inventario) */

VISTAS.ventasIngredientes = `
  <section class="pos-ingredientes">
    <h3>Consumo de ingredientes (conectado al inventario)</h3>
    <p class="ayuda">
      Se calcula con las recetas del menú y el stock del módulo Inventario. Nada de esto modifica el
      inventario real. Las bebidas no se controlan en inventario, por eso no aparecen aquí.
    </p>

    <div class="sub-bloque">
      <h4>1. Ingredientes de la orden actual</h4>
      <div class="table-wrap">
        <table id="tabla-orden-ingredientes">
          <thead>
            <tr><th>Ingrediente</th><th>Tipo</th><th>Necesario</th><th>Stock simulado</th><th>Quedaría</th></tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>

    <div class="sub-bloque">
      <h4>2. Inventario simulado (se descuenta con cada venta de prueba)</h4>
      <button type="button" id="btn-reiniciar-stock-sim" class="btn-secundario-pos btn-ancho-auto">↺ Reiniciar con el stock real</button>
      <div class="table-wrap">
        <table id="tabla-stock-sim">
          <thead>
            <tr><th>Producto</th><th>Tipo</th><th>Stock real</th><th>Stock simulado</th><th>Mínimo</th></tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>

    <div class="sub-bloque">
      <h4>3. Proyección de ingredientes para el menú</h4>
      <p class="ayuda">Escribe cuántas hamburguesas esperas vender y verás cuánto necesitarás de cada ingrediente frente al stock real.</p>
      <div id="proy-inputs" class="proy-inputs"></div>
      <p id="proy-resumen" class="proy-resumen"></p>
      <div class="table-wrap">
        <table id="tabla-proyeccion">
          <thead>
            <tr><th>Ingrediente</th><th>Tipo</th><th>Necesario</th><th>Stock real</th><th>Quedaría</th></tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  </section>
`;
