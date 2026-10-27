/* ===========================================================================
   js/nucleo/estado-bd.js — ETIQUETA "DÓNDE SE GUARDA LA BASE DE DATOS"
   Muestra abajo a la derecha si el sistema usa Firebase o el modo local.
   Si hay enlace (Firebase), al hacer clic abre la consola con los datos.
   =========================================================================== */

function estadoBD(tipo, texto, enlace) {
  let marca = document.getElementById("estado-bd");
  if (!marca) {
    marca = document.createElement("a");
    marca.id = "estado-bd";
    marca.target = "_blank";
    marca.rel = "noopener";
    document.body.appendChild(marca);
  }
  const iconos = { firebase: "☁", local: "💾", conectando: "⏳", error: "⚠" };
  marca.className = "estado-bd " + tipo;
  marca.textContent = (iconos[tipo] || "") + " " + texto;
  marca.title = enlace ? "Abrir la base de datos en la consola de Firebase" : texto;
  if (enlace) marca.href = enlace;
  else marca.removeAttribute("href");
}

/* Se llama cuando otro equipo cambia datos en Firebase: repinta lo que se ve */
function alCambiarDatos() {
  if (typeof pintarTodo === "function") pintarTodo();
  if (pantallaVentas.style.display === "flex" && typeof refrescarPOS === "function") refrescarPOS();
}
