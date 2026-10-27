/* ===========================================================================
   js/nucleo/auth.js — INICIO Y CIERRE DE SESIÓN
   ---------------------------------------------------------------------------
   Para agregar más usuarios, añade otro objeto al arreglo USUARIOS.
   NOTA: esta validación corre en el navegador, sirve como control de acceso
   básico y para demostración. No es seguridad real: cualquiera que abra el
   código puede leer las contraseñas. Para algo real hace falta un servidor.
   =========================================================================== */

const USUARIOS = [
  { usuario: "gerente",    password: "carls2026", nombre: "Gerente General" },
  { usuario: "subgerente", password: "carls2026", nombre: "Subgerente" },
];

const LLAVE_SESION = "carlsjr_sesion";

const formLogin    = document.getElementById("login-form");
const mensajeError = document.getElementById("error-message");

function saludar(nombre) {
  document.querySelector("#dashboard-container .dashboard-content h3").textContent =
    `Bienvenido, ${nombre}. Seleccione un módulo de gestión:`;
}

/* --------------------------------- LOGIN ---------------------------------- */
formLogin.addEventListener("submit", function (e) {
  e.preventDefault();

  const usuario  = document.getElementById("username").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  const encontrado = USUARIOS.find((u) => u.usuario === usuario && u.password === password);

  if (encontrado) {
    mensajeError.style.display = "none";
    sessionStorage.setItem(
      LLAVE_SESION,
      JSON.stringify({ usuario: encontrado.usuario, nombre: encontrado.nombre })
    );
    saludar(encontrado.nombre);
    formLogin.reset();
    mostrarPantalla("dashboard");
  } else {
    mensajeError.style.display = "block";
    document.getElementById("password").value = "";
  }
});

/* ------------------------------ CERRAR SESIÓN ----------------------------- */
function cerrarSesion() {
  sessionStorage.removeItem(LLAVE_SESION);
  mensajeError.style.display = "none";
  document.getElementById("active-section-view").style.display = "none";
  mostrarPantalla("login");
}

document.getElementById("btn-cerrar-sesion").addEventListener("click", cerrarSesion);
document.getElementById("btn-cerrar-sesion-2").addEventListener("click", cerrarSesion);

/* ------------- MANTENER LA SESIÓN SI SE RECARGA LA PÁGINA ----------------- */
function restaurarSesion() {
  const sesion = sessionStorage.getItem(LLAVE_SESION);
  if (sesion) {
    try {
      saludar(JSON.parse(sesion).nombre);
      mostrarPantalla("dashboard");
      return;
    } catch (_) {
      sessionStorage.removeItem(LLAVE_SESION);
    }
  }
  mostrarPantalla("login");
}
