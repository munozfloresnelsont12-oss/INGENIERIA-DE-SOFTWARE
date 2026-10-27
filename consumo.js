/* ventas/consumo.js — Cuántos ingredientes consume cada producto (recetas) */

/* ===========================================================================
   CONEXIÓN CON EL INVENTARIO
   ---------------------------------------------------------------------------
   - Lee las recetas y el stock desde DB (db.js), pero NUNCA los modifica.
   - Lleva un "inventario simulado" aparte (llave carlsjr_stock_simulado) que
     arranca como copia del stock real y se va descontando con cada venta de
     prueba. Se puede reiniciar para volver a copiar el stock real.
   =========================================================================== */

function buscarProductoPorNombre(nombre) {
  return DB.productos().find((p) => p.nombre === nombre);
}

/* Consumo por unidad de los productos que no son hamburguesas.
   Bebidas no aparecen porque no se controlan en el inventario. */
const RECETAS_FIJAS = {
  "papas-ch":         [["Papas a la francesa", 0.10]],
  "papas-med":        [["Papas a la francesa", 0.15]],
  "papas-crisscut":   [["Papas a la francesa", 0.18]],
  "aros-cebolla":     [["Aros de cebolla empanizada", 0.12]],
  "nuggets":          [["Pechuga de pollo", 0.12]],
  "kids-hamburguesa": [
    ["Pan de hamburguesa clásico", 1],
    ["Carne de res 100% Angus", 0.09],
    ["Queso americano", 1],
    ["Papas a la francesa", 0.10],
  ],
  "kids-nuggets":     [["Pechuga de pollo", 0.09], ["Papas a la francesa", 0.10]],
};

const PAPAS_DE_COMBO = 0.15; // kg de papas que lleva cada combo

/* Ingredientes que consume UNA unidad de un producto del POS */
function ingredientesDeItem(id) {
  if (id.startsWith("ham-") || id.startsWith("combo-")) {
    const hamId = Number(id.split("-")[1]);
    const ham = DB.hamburguesas().find((h) => h.id === hamId);
    if (!ham) return [];
    const lista = ham.ingredientes.map((i) => ({ productoId: i.productoId, cantidad: i.cantidad }));
    if (id.startsWith("combo-")) {
      const papas = buscarProductoPorNombre("Papas a la francesa");
      if (papas) lista.push({ productoId: papas.id, cantidad: PAPAS_DE_COMBO });
    }
    return lista;
  }

  const receta = RECETAS_FIJAS[id];
  if (!receta) return [];
  return receta
    .map(([nombre, cantidad]) => {
      const p = buscarProductoPorNombre(nombre);
      return p ? { productoId: p.id, cantidad } : null;
    })
    .filter(Boolean);
}

/* Suma el consumo de una lista [{id, cantidad}] → { productoId: cantidadTotal } */
function consumoDeOrden(items) {
  const total = {};
  items.forEach((item) => {
    ingredientesDeItem(item.id).forEach((ing) => {
      total[ing.productoId] = redondear((total[ing.productoId] || 0) + ing.cantidad * item.cantidad);
    });
  });
  return total;
}
