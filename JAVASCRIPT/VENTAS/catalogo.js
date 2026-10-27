/* ventas/catalogo.js — Catálogo del POS: arma los productos por categoría y los pinta */

/* ---------------------------------------------------------------------------
   CATÁLOGO DEL PUNTO DE VENTA
   Las hamburguesas se toman del menú real (DB.hamburguesas), y se les arma
   un combo automáticamente. Bebidas, papas y paquete infantil son fijos.
   --------------------------------------------------------------------------- */
const PRECIO_PAPAS_COMBO = 35;
const PRECIO_BEBIDA_COMBO = 25;

function catalogoPOS() {
  const hamburguesas = DB.hamburguesas().map((h) => ({
    id: "ham-" + h.id,
    nombre: h.nombre,
    precio: h.precio,
    categoria: "hamburguesas",
  }));

  const combos = DB.hamburguesas().map((h) => ({
    id: "combo-" + h.id,
    nombre: "Combo " + h.nombre,
    precio: redondear2(h.precio + PRECIO_PAPAS_COMBO + PRECIO_BEBIDA_COMBO - 10), // pequeño descuento de combo
    categoria: "combos",
    nota: "Incluye papas medianas y bebida",
  }));

  const acompanamientos = [
    { id: "papas-ch", nombre: "Papas chicas", precio: 28, categoria: "acompanamientos" },
    { id: "papas-med", nombre: "Papas medianas", precio: 35, categoria: "acompanamientos" },
    { id: "papas-crisscut", nombre: "Papas CrissCut", precio: 40, categoria: "acompanamientos" },
    { id: "aros-cebolla", nombre: "Aros de cebolla", precio: 38, categoria: "acompanamientos" },
    { id: "nuggets", nombre: "Nuggets de pollo (6 pz)", precio: 45, categoria: "acompanamientos" },
  ];

  const bebidas = [
    { id: "refresco-ch", nombre: "Refresco chico", precio: 22, categoria: "bebidas" },
    { id: "refresco-med", nombre: "Refresco mediano", precio: 28, categoria: "bebidas" },
    { id: "refresco-gde", nombre: "Refresco grande", precio: 34, categoria: "bebidas" },
    { id: "malteada", nombre: "Malteada", precio: 48, categoria: "bebidas" },
    { id: "agua", nombre: "Agua embotellada", precio: 18, categoria: "bebidas" },
  ];

  const infantil = [
    { id: "kids-hamburguesa", nombre: "Paquete Infantil - Hamburguesa", precio: 65, categoria: "infantil", nota: "Incluye papas chicas, bebida chica y sorpresa" },
    { id: "kids-nuggets", nombre: "Paquete Infantil - Nuggets", precio: 65, categoria: "infantil", nota: "Incluye papas chicas, bebida chica y sorpresa" },
  ];

  return [...hamburguesas, ...combos, ...acompanamientos, ...bebidas, ...infantil];
}

function redondear2(numero) {
  return Math.round(numero * 100) / 100;
}

/* ---------------------------------------------------------------------------
   PINTAR CATÁLOGO
   --------------------------------------------------------------------------- */
function pintarCatalogo(categoria) {
  const contenedor = document.getElementById("pos-productos");
  const productos = catalogoPOS().filter((p) => p.categoria === categoria);

  if (!productos.length) {
    contenedor.innerHTML = "<p class='vacio'>No hay productos en esta categoría todavía.</p>";
    return;
  }

  contenedor.innerHTML = productos
    .map(
      (p) => `
    <button type="button" class="producto-pos" data-id="${p.id}">
      <span class="producto-nombre">${p.nombre}</span>
      ${p.nota ? `<span class="producto-nota">${p.nota}</span>` : ""}
      <span class="producto-precio">$${p.precio.toFixed(2)}</span>
    </button>`
    )
    .join("");
}

document.getElementById("pos-productos").addEventListener("click", (e) => {
  const boton = e.target.closest(".producto-pos");
  if (!boton) return;
  const producto = catalogoPOS().find((p) => p.id === boton.dataset.id);
  if (producto) agregarAlCarrito(producto);
});

document.querySelectorAll(".cat-btn").forEach((boton) => {
  boton.addEventListener("click", () => {
    document.querySelectorAll(".cat-btn").forEach((b) => b.classList.remove("active"));
    boton.classList.add("active");
    pintarCatalogo(boton.dataset.cat);
  });
});

