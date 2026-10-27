/* ventas/ingredientes.js — Tablas de ingredientes de la orden e inventario simulado */

/* ------------------- Tabla 1: ingredientes de la orden actual ------------- */
function pintarIngredientesOrden() {
  const cuerpo = document.querySelector("#tabla-orden-ingredientes tbody");
  const consumo = consumoDeOrden(carrito);
  const ids = Object.keys(consumo);

  if (!ids.length) {
    cuerpo.innerHTML =
      "<tr><td colspan='5' class='vacio'>Agrega productos a la orden para ver los ingredientes que consumirá.</td></tr>";
    return;
  }

  const stock = leerStockSim();
  cuerpo.innerHTML = ids
    .map((id) => {
      const p = DB.buscarProducto(id);
      if (!p) return "";
      const necesario = consumo[id];
      const disponible = stock[id] ?? 0;
      const queda = redondear(disponible - necesario);
      const falta = queda < 0;
      return `
      <tr>
        <td>${p.nombre}</td>
        <td>${etiquetaTipo(p)}</td>
        <td>${necesario} ${p.unidad}</td>
        <td>${disponible} ${p.unidad}</td>
        <td class="${falta ? "bajo-stock" : ""}">${falta ? "Faltan " + Math.abs(queda) : queda} ${p.unidad}${falta ? " ⚠️" : ""}</td>
      </tr>`;
    })
    .join("");
}

/* ------------------------ Tabla 2: inventario simulado -------------------- */
function pintarStockSim() {
  const cuerpo = document.querySelector("#tabla-stock-sim tbody");
  const sim = leerStockSim();

  cuerpo.innerHTML = DB.productos()
    .map((p) => {
      const simulado = sim[p.id] ?? p.stock;
      const bajo = simulado <= p.minimo;
      return `
      <tr>
        <td>${p.nombre}</td>
        <td>${etiquetaTipo(p)}</td>
        <td>${p.stock} ${p.unidad}</td>
        <td class="${bajo ? "bajo-stock" : ""}">${simulado} ${p.unidad}${bajo ? " ⚠️" : ""}</td>
        <td>${p.minimo} ${p.unidad}</td>
      </tr>`;
    })
    .join("");
}

document.getElementById("btn-reiniciar-stock-sim").addEventListener("click", () => {
  if (!confirm("Esto copiará de nuevo el stock real al inventario simulado. ¿Continuar?")) return;
  reiniciarStockSim();
  pintarStockSim();
  pintarIngredientesOrden();
});
