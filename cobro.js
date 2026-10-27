/* ventas/cobro.js — Botón Cobrar: valida el pago y los ingredientes, arma la venta */

/* ---------------------------------------------------------------------------
   COBRAR Y GENERAR TICKET
   --------------------------------------------------------------------------- */

document.getElementById("btn-cobrar").addEventListener("click", () => {
  if (!carrito.length) {
    alert("Agrega al menos un producto a la orden antes de cobrar.");
    return;
  }

  const metodo = selectMetodoPago.value;
  const subtotal = carrito.reduce((suma, i) => suma + i.precio * i.cantidad, 0);
  const iva = subtotal * IVA;
  const total = subtotal + iva;
  const recibido = Number(inputPagoRecibido.value) || 0;

  if (metodo === "efectivo" && recibido < total) {
    alert("El pago recibido es menor al total de la orden.");
    return;
  }

  // Conexión con el inventario: ¿alcanzan los ingredientes en el stock simulado?
  const consumo = consumoDeOrden(carrito);
  const faltantes = faltantesDeConsumo(consumo);
  if (faltantes.length) {
    const detalle = faltantes
      .map((f) => `• ${f.nombre}: necesita ${f.necesario} ${f.unidad}, disponible ${f.disponible} ${f.unidad}`)
      .join("\n");
    const seguir = confirm(
      "Con el inventario simulado actual NO alcanzan estos ingredientes:\n\n" +
        detalle +
        "\n\n¿Cobrar de todos modos? (el stock simulado quedará en 0 para esos productos)"
    );
    if (!seguir) return;
  }

  const cambio = metodo === "efectivo" ? recibido - total : 0;
  const ahora = new Date();

  const venta = {
    folio: "SIM-" + ahora.getTime().toString().slice(-8),
    fechaHora: ahora.toLocaleString("es-MX"),
    items: carrito.map((i) => ({ ...i })),
    subtotal,
    iva,
    total,
    metodo,
    recibido: metodo === "efectivo" ? recibido : total,
    cambio,
    consumo, // ingredientes que se descontaron del stock simulado
  };

  const lista = historialVentas();
  lista.unshift(venta);
  guardarHistorialVentas(lista);

  // Descuenta SOLO del inventario simulado, nunca del inventario real
  descontarStockSim(consumo);

  mostrarTicket(venta);
  pintarHistorialVentas();
  pintarIngredientesOrden();
  pintarStockSim();
});
