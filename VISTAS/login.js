/* vistas/login.js — Pantalla 1: inicio de sesión */

VISTAS.login = `
<div id="login-container">
  <div class="logo-area">
    <h1>CARL'S JR.</h1>
    <span>Acceso Gerencial Exclusivo</span>
  </div>

  <div class="credentials-hint">
    <strong>Acceso de prueba:</strong><br>
    Usuario: <code>gerente</code> &nbsp;|&nbsp; Contraseña: <code>carls2026</code>
  </div>

  <form id="login-form">
    <div class="form-group">
      <label for="username">Usuario Gerencial</label>
      <input type="text" id="username" required placeholder="Ingrese su usuario" autocomplete="username">
    </div>
    <div class="form-group">
      <label for="password">Contraseña</label>
      <input type="password" id="password" required placeholder="Ingrese su contraseña" autocomplete="current-password">
    </div>
    <button type="submit" class="btn">Ingresar al Sistema</button>
    <div id="error-message" class="error-msg">Usuario o contraseña incorrectos.</div>
  </form>
</div>
`;
