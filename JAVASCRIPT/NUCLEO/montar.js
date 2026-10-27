/* js/nucleo/montar.js — arma la página: inserta las 4 pantallas dentro de #app */

document.getElementById("app").innerHTML = [
  VISTAS.login,
  VISTAS.dashboard,
  VISTAS.inventario,
  VISTAS.ventas,
].join("\n");
