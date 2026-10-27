/* ===========================================================================
   js/datos/config-firebase.js — CONFIGURACIÓN DE TU PROYECTO DE FIREBASE
   ---------------------------------------------------------------------------
   Pega aquí los datos que te da Firebase (ver GUIA-FIREBASE.md, paso 3).
   Mientras tenga el texto "PEGA_AQUI", el sistema funciona en MODO LOCAL
   (localStorage del navegador) y avisa con una etiqueta abajo a la derecha.
   =========================================================================== */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCa2rBzPRywXYOYvaJqF8CzerYKnmfvIGA",
  authDomain: "carls-jr-dddb4.firebaseapp.com",
  projectId: "carls-jr-dddb4",
  storageBucket: "carls-jr-dddb4.firebasestorage.app",
  messagingSenderId: "1038704250979",
  appId: "1:1038704250979:web:895b30e1076f3af58ca856",
};

function firebaseConfigurado() {
  return Object.values(FIREBASE_CONFIG).every((v) => v && !String(v).includes("PEGA_AQUI"));
}
