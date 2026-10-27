/* vistas/inv-menu.js — Inventario > pestaña Menú (hamburguesas y recetas) */

VISTAS.invMenu = `
    <section id="tab-menu" class="tab-content active">
      <h2>Menú de hamburguesas</h2>
      <p class="ayuda">Cada hamburguesa muestra los productos del inventario que se necesitan para prepararla.</p>
      <div id="menu-lista" class="cards"></div>

      <h3>Agregar hamburguesa al menú</h3>
      <form id="form-hamburguesa" class="formulario">
        <input type="text" id="ham-nombre" placeholder="Nombre de la hamburguesa" required>
        <input type="number" step="0.01" id="ham-precio" placeholder="Precio $">
        <input type="text" id="ham-descripcion" placeholder="Descripción">
        <div id="ingredientes-contenedor" class="ingredientes-box"></div>
        <button type="button" id="btn-agregar-ingrediente" class="btn-secundario">+ Agregar ingrediente</button>
        <button type="submit">Guardar hamburguesa</button>
      </form>
    </section>
`;
