/* js/datos/respaldo.js — exportar / importar / reiniciar la base de datos */

Object.assign(DB, {
  exportar() {
    return JSON.stringify(cargarDB(), null, 2);
  },

  importar(textoJson) {
    const datos = JSON.parse(textoJson);
    if (!datos.productos || !datos.hamburguesas) {
      throw new Error("El archivo no tiene el formato esperado.");
    }
    baseDatos = {
      productos: datos.productos || [],
      hamburguesas: datos.hamburguesas || [],
      ingresos: datos.ingresos || [],
      merma: datos.merma || [],
    };
    guardarDB();
  },

  reiniciar() {
    baseDatos = datosIniciales();
    guardarDB();
  },
});
