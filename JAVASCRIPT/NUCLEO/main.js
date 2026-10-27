/* js/nucleo/main.js — ARRANQUE: es lo último que se ejecuta al abrir la página */

// 1) conecta la base de datos (Firebase o local) y espera a tener los datos
// 2) pinta el inventario y el POS, y 3) muestra el login o el panel según la sesión
iniciarBaseDatos().then(() => {
  iniciarInventario();
  iniciarPOS();
  restaurarSesion();
});
