/* js/datos/merma.js — merma / desperdicio diario: RESTA del stock */

Object.assign(DB, {
  agregarMerma({ productoId, cantidad, fecha, motivo, notas }) {
    const db = cargarDB();
    const producto = DB.buscarProducto(productoId);
    if (!producto) throw new Error("Producto no encontrado.");
    if (Number(cantidad) <= 0) throw new Error("La cantidad debe ser mayor a cero.");
    if (Number(cantidad) > producto.stock) {
      throw new Error(`No hay suficiente stock. Disponible: ${producto.stock} ${producto.unidad}.`);
    }

    const nueva = {
      id: siguienteId(db.merma),
      productoId: Number(productoId),
      cantidad: Number(cantidad),
      fecha,
      motivo: motivo || "",
      notas: notas || "",
    };
    db.merma.push(nueva);
    producto.stock = redondear(producto.stock - nueva.cantidad);
    guardarDB();
    return nueva;
  },

  eliminarMerma(id) {
    const db = cargarDB();
    const registro = db.merma.find((m) => m.id === Number(id));
    if (!registro) return;
    const producto = DB.buscarProducto(registro.productoId);
    if (producto) producto.stock = redondear(producto.stock + registro.cantidad);
    db.merma = db.merma.filter((m) => m.id !== Number(id));
    guardarDB();
  },
});
