/* js/nucleo/utilidades.js — funciones de ayuda usadas en todo el sistema */

// Aquí se registran las pantallas (HTML) definidas en la carpeta vistas/
const VISTAS = {};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function fechaHoy() {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");
  return `${hoy.getFullYear()}-${mes}-${dia}`;
}

function nombreProducto(id) {
  const p = DB.buscarProducto(id);
  return p ? p.nombre : "(producto eliminado)";
}

function datosProducto(id) {
  return DB.buscarProducto(id) || { nombre: "(eliminado)", tipo: "-", unidad: "" };
}

function etiquetaTipo(p) {
  return `<span class="etiqueta ${p.tipo.toLowerCase()}">${p.tipo}</span>`;
}
