/* ventas/stock-simulado.js — Inventario simulado: copia del stock real que se descuenta con cada venta */

const LLAVE_STOCK_SIM = "carlsjr_stock_simulado";

/* ------------------------------ Stock simulado ---------------------------- */
function leerStockSim() {
  let guardado = {};
  try {
    guardado = JSON.parse(localStorage.getItem(LLAVE_STOCK_SIM)) || {};
  } catch (_) {
    guardado = {};
  }
  // Productos nuevos del inventario real que aún no estén en la simulación
  DB.productos().forEach((p) => {
    if (guardado[p.id] === undefined) guardado[p.id] = p.stock;
  });
  return guardado;
}

function guardarStockSim(mapa) {
  localStorage.setItem(LLAVE_STOCK_SIM, JSON.stringify(mapa));
}

function reiniciarStockSim() {
  const mapa = {};
  DB.productos().forEach((p) => (mapa[p.id] = p.stock));
  guardarStockSim(mapa);
}

function descontarStockSim(consumo) {
  const mapa = leerStockSim();
  Object.entries(consumo).forEach(([id, cantidad]) => {
    mapa[id] = redondear(Math.max(0, (mapa[id] || 0) - cantidad));
  });
  guardarStockSim(mapa);
}

function devolverStockSim(consumo) {
  const mapa = leerStockSim();
  Object.entries(consumo).forEach(([id, cantidad]) => {
    mapa[id] = redondear((mapa[id] || 0) + cantidad);
  });
  guardarStockSim(mapa);
}

function faltantesDeConsumo(consumo, mapaStock) {
  const stock = mapaStock || leerStockSim();
  return Object.entries(consumo)
    .filter(([id, cantidad]) => cantidad > (stock[id] ?? 0))
    .map(([id, cantidad]) => {
      const p = DB.buscarProducto(id);
      return {
        nombre: p ? p.nombre : "(producto eliminado)",
        unidad: p ? p.unidad : "",
        necesario: cantidad,
        disponible: stock[id] ?? 0,
      };
    });
}
