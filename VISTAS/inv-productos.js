/* vistas/inv-productos.js — Inventario > pestaña Inventario (catálogo y stock) */

VISTAS.invProductos = `
    <section id="tab-inventario" class="tab-content">
      <h2>Inventario actual</h2>
      <p class="ayuda">El stock se actualiza solo cuando registras un ingreso o una merma.</p>
      <div class="table-wrap">
        <table id="tabla-inventario">
          <thead>
            <tr>
              <th>Producto</th><th>Tipo</th><th>Unidad</th>
              <th>Stock actual</th><th>Stock mínimo</th><th></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>

      <h3>Agregar producto al catálogo</h3>
      <form id="form-producto" class="formulario">
        <input type="text" id="prod-nombre" placeholder="Nombre del producto" required>
        <select id="prod-tipo" required>
          <option value="">Tipo de producto</option>
          <option value="Congelado">Congelado</option>
          <option value="Refrigerado">Refrigerado</option>
          <option value="Fresco">Fresco</option>
          <option value="Seco">Seco / No perecedero</option>
        </select>
        <select id="prod-unidad" required>
          <option value="">Unidad de medida</option>
          <option value="kg">kg</option>
          <option value="g">g</option>
          <option value="litro">litro</option>
          <option value="ml">ml</option>
          <option value="pza">pza</option>
        </select>
        <input type="number" step="any" id="prod-stock" placeholder="Stock inicial" value="0">
        <input type="number" step="any" id="prod-minimo" placeholder="Stock mínimo" value="0">
        <button type="submit">Agregar producto</button>
      </form>
    </section>
`;
