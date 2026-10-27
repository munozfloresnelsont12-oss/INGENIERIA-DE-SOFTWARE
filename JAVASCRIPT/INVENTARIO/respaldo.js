/* inventario/respaldo.js — Pestaña Datos: exportar, importar y restaurar respaldo */

/* ---------------------------------------------------------------------------
   PESTAÑA: DATOS (respaldo)
   --------------------------------------------------------------------------- */
$("#btn-exportar").addEventListener("click", () => {
  const blob = new Blob([DB.exportar()], { type: "application/json" });
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = `respaldo-inventario-${fechaHoy()}.json`;
  enlace.click();
  URL.revokeObjectURL(enlace.href);
});

$("#input-importar").addEventListener("change", (e) => {
  const archivo = e.target.files[0];
  if (!archivo) return;
  const lector = new FileReader();
  lector.onload = () => {
    try {
      DB.importar(lector.result);
      pintarTodo();
      alert("Respaldo importado correctamente.");
    } catch (error) {
      alert("Error al importar: " + error.message);
    }
  };
  lector.readAsText(archivo);
  e.target.value = "";
});

$("#btn-reiniciar").addEventListener("click", () => {
  if (!confirm("Esto borrará todo lo capturado y volverá a los datos de ejemplo. ¿Continuar?")) return;
  DB.reiniciar();
  pintarTodo();
});

