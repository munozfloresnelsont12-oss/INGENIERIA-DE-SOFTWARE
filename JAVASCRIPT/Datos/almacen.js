/* ===========================================================================
   js/datos/almacen.js — NÚCLEO DE LA BASE DE DATOS
   ---------------------------------------------------------------------------
   Mantiene una copia en memoria (baseDatos) con las 4 colecciones. El resto
   del sistema lee y modifica esa copia con el objeto DB, y al terminar llama
   a guardarDB(). Quién guarda de verdad lo decide js/datos/conexion.js:

     · almacen-firebase.js → Firestore (en la nube)      ← modo normal
     · almacen-local.js    → localStorage del navegador  ← respaldo

   Colecciones:
     productos:    {id, nombre, tipo, unidad, stock, minimo}
     hamburguesas: {id, nombre, precio, descripcion, ingredientes:[{productoId, cantidad}]}
     ingresos:     {id, productoId, cantidad, fecha, caducidad, proveedor, notas}
     merma:        {id, productoId, cantidad, fecha, motivo, notas}
   =========================================================================== */

const COLECCIONES = ["productos", "hamburguesas", "ingresos", "merma"];

let baseDatos = { productos: [], hamburguesas: [], ingresos: [], merma: [] };

function cargarDB() {
  return baseDatos;
}

function guardarDB() {
  Almacen.guardar();
}

function siguienteId(lista) {
  return lista.length ? Math.max(...lista.map((x) => x.id)) + 1 : 1;
}

function redondear(numero) {
  return Math.round(numero * 1000) / 1000;
}

/* Objeto DB: aquí se van montando las operaciones (productos, ingresos...) */
const DB = {
  productos: () => cargarDB().productos,
  hamburguesas: () => cargarDB().hamburguesas,
  ingresos: () => cargarDB().ingresos,
  merma: () => cargarDB().merma,
};
