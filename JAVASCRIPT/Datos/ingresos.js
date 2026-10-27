/* js/datos/ingresos.js — ingresos de producto (abastecimiento): SUMAN al stock */

Object.assign(DB, {
  agregarIngreso({ productoId, cantidad, fecha, caducidad, proveedor, notas }) {
    const db = cargarDB();
    const producto = DB.buscarProducto(productoId);
    if (!producto) throw new Error("Producto no encontrado.");
    if (Number(cantidad) <= 0) throw new Error("La cantidad debe ser mayor a cero.");

    const nuevo = {
      id: siguienteId(db.ingresos),
      productoId: Number(productoId),
      cantidad: Number(cantidad),
      fecha,
      caducidad: caducidad || "",
      proveedor: proveedor || "",
      notas: notas || "",
    };
    db.ingresos.push(nuevo);
    producto.stock = redondear(producto.stock + nuevo.cantidad);
    guardarDB();
    return nuevo;
  },

  eliminarIngreso(id) {
    const db = cargarDB();
    const ingreso = db.ingresos.find((i) => i.id === Number(id));
    if (!ingreso) return;
    const producto = DB.buscarProducto(ingreso.productoId);
    if (producto) producto.stock = redondear(Math.max(0, producto.stock - ingreso.cantidad));
    db.ingresos = db.ingresos.filter((i) => i.id !== Number(id));
    guardarDB();
  },
});
