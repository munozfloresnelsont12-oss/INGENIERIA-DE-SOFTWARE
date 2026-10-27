/* vistas/inv-datos.js — Inventario > pestaña Datos (respaldo) */

VISTAS.invDatos = `
    <section id="tab-datos" class="tab-content">
      <h2>Respaldo de la base de datos</h2>
      <p class="ayuda">
        Toda la información se guarda en el navegador (localStorage). Usa estos botones para
        respaldar tu información o pasarla a otra computadora.
      </p>
      <div class="formulario">
        <button type="button" id="btn-exportar">⬇ Exportar respaldo (.json)</button>
        <label>⬆ Importar respaldo <input type="file" id="input-importar" accept=".json"></label>
        <button type="button" id="btn-reiniciar" class="btn-peligro">↺ Restaurar datos de ejemplo</button>
      </div>
    </section>
`;
