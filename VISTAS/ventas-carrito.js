/* vistas/ventas-carrito.js — Simulación de venta > orden actual, totales y pago */

VISTAS.ventasCarrito = `
    <aside class="pos-carrito">
      <h3>Orden actual</h3>
      <div id="carrito-vacio" class="vacio">Agrega productos desde el catálogo.</div>
      <div id="carrito-items" class="carrito-items"></div>

      <div class="pos-totales">
        <div class="fila-total"><span>Subtotal</span><span id="pos-subtotal">$0.00</span></div>
        <div class="fila-total"><span>IVA (16%)</span><span id="pos-iva">$0.00</span></div>
        <div class="fila-total total-grande"><span>Total</span><span id="pos-total">$0.00</span></div>
      </div>

      <div class="pos-pago">
        <label>Método de pago
          <select id="pos-metodo-pago">
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta</option>
          </select>
        </label>
        <label id="campo-pago-recibido">Pago con
          <input type="number" step="any" id="pos-pago-recibido" placeholder="$0.00">
        </label>
        <div class="fila-total" id="fila-cambio" style="display:none;">
          <span>Cambio</span><span id="pos-cambio">$0.00</span>
        </div>
      </div>

      <div class="pos-acciones">
        <button type="button" id="btn-vaciar-carrito" class="btn-secundario-pos">Vaciar orden</button>
        <button type="button" id="btn-cobrar" class="btn-cobrar">Cobrar</button>
      </div>
    </aside>
`;
