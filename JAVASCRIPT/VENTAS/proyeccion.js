/* ventas/proyeccion.js — Proyección de ingredientes para el menú */

/* -------------- Tabla 3: proyección de ingredientes del menú -------------- */
function pintarProyeccion() {
  const cont = document.getElementById("proy-inputs");

  // Conserva lo que ya se había escrito al volver a pintar
  const previos = {};
  cont.querySelectorAll("input[data-ham]").forEach((i) => (previos[i.dataset.ham] = i.value));

  cont.innerHTML = DB.hamburguesas()
    .map(
      (h) => `
    <label>${h.nombre}
      <input type="number" min="0" step="1" data-ham="${h.id}" value="${previos[h.id] ?? 0}">
    </label>`
    )
    .join("");

  calcularProyeccion();
}

function calcularProyeccion() {
  const entradas = [...document.querySelectorAll("#proy-inputs input[data-ham]")].map((i) => ({
    hamId: Number(i.dataset.ham),
    id: "ham-" + i.dataset.ham,
    cantidad: Math.max(0, Math.floor(Number(i.value) || 0)),
  }));
  const activos = entradas.filter((e) => e.cantidad > 0);

  const cuerpo = document.querySelector("#tabla-proyeccion tbody");
  const resumen = document.getElementById("proy-resumen");

  if (!activos.length) {
    cuerpo.innerHTML =
      "<tr><td colspan='5' class='vacio'>Escribe cuántas unidades esperas vender de cada hamburguesa.</td></tr>";
    resumen.textContent = "";
    return;
  }

  const consumo = consumoDeOrden(activos);
  const hamburguesas = DB.hamburguesas();
  const totalPiezas = activos.reduce((n, e) => n + e.cantidad, 0);
  const ingresoEstimado = activos.reduce((suma, e) => {
    const h = hamburguesas.find((x) => x.id === e.hamId);
    return suma + (h ? h.precio * e.cantidad : 0);
  }, 0);

  let conFalta = 0;
  cuerpo.innerHTML = Object.keys(consumo)
    .map((id) => {
      const p = DB.buscarProducto(id);
      if (!p) return "";
      const necesario = consumo[id];
      const queda = redondear(p.stock - necesario);
      const falta = queda < 0;
      if (falta) conFalta += 1;
      return `
      <tr>
        <td>${p.nombre}</td>
        <td>${etiquetaTipo(p)}</td>
        <td>${necesario} ${p.unidad}</td>
        <td>${p.stock} ${p.unidad}</td>
        <td class="${falta ? "bajo-stock" : ""}">${falta ? "Faltan " + Math.abs(queda) : queda} ${p.unidad}${falta ? " ⚠️" : ""}</td>
      </tr>`;
    })
    .join("");

  resumen.innerHTML =
    `<strong>${totalPiezas}</strong> hamburguesas proyectadas · ventas estimadas (sin IVA): <strong>$${ingresoEstimado.toFixed(2)}</strong> · ` +
    (conFalta
      ? `<span class="bajo-stock">${conFalta} ingrediente(s) no alcanzan con el stock real</span>`
      : "<strong>el stock real alcanza para toda la proyección</strong>");
}

document.getElementById("proy-inputs").addEventListener("input", calcularProyeccion);
