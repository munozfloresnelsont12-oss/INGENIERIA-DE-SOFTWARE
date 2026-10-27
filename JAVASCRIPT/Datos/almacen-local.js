/* ===========================================================================
   js/datos/almacen-local.js — ALMACÉN LOCAL (localStorage)
   Se usa cuando Firebase no está configurado o no hay conexión.
   Llave: "carlsjr_db".
   =========================================================================== */

const LLAVE = "carlsjr_db";

const AlmacenLocal = {
  nombre: "local",

  iniciar() {
    try {
      const guardado = localStorage.getItem(LLAVE);
      baseDatos = guardado ? JSON.parse(guardado) : datosIniciales();
    } catch (error) {
      console.warn("No se pudo leer el almacenamiento, se usarán datos de ejemplo.", error);
      baseDatos = datosIniciales();
    }
    return Promise.resolve();
  },

  guardar() {
    try {
      localStorage.setItem(LLAVE, JSON.stringify(baseDatos));
    } catch (error) {
      alert("No se pudo guardar la información en el navegador: " + error.message);
    }
  },
};
