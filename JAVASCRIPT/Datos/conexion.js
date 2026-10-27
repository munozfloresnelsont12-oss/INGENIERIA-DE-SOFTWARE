/* ===========================================================================
   js/datos/conexion.js — ELIGE DÓNDE SE GUARDA LA BASE DE DATOS
   ---------------------------------------------------------------------------
   · Firebase configurado y cargado  → Firestore (nube)
   · Si no está configurado o falla  → localStorage (con aviso en pantalla)
   =========================================================================== */

let Almacen =
  firebaseConfigurado() && typeof firebase !== "undefined" ? AlmacenFirebase : AlmacenLocal;

function iniciarBaseDatos() {
  if (Almacen === AlmacenLocal) {
    estadoBD(
      "local",
      firebaseConfigurado()
        ? "Modo local: no se pudo cargar Firebase (¿hay internet?)"
        : "Modo local: Firebase sin configurar"
    );
    return AlmacenLocal.iniciar();
  }

  estadoBD("conectando", "Conectando con Firebase…");
  return Almacen
    .iniciar()
    .then(() => {
      estadoBD("firebase", "Firebase · " + FIREBASE_CONFIG.projectId,
        "https://console.firebase.google.com/project/" + FIREBASE_CONFIG.projectId + "/firestore/data");
    })
    .catch((error) => {
      console.error("No se pudo iniciar Firebase:", error);
      AlmacenFirebase.detener();
      Almacen = AlmacenLocal;
      estadoBD("error", "No se pudo conectar con Firebase (" + mensajeErrorFirebase(error) + "). Usando modo local.");
      return AlmacenLocal.iniciar();
    });
}
