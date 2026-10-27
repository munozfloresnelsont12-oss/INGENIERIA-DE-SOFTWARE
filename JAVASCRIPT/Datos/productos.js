/* js/datos/productos.js — operaciones del catálogo de productos */

Object.assign(DB, {
  buscarProducto(id) {
    return cargarDB().productos.find((p) => p.id === Number(id));
  },

  agregarProducto({ nombre, tipo, unidad, stock, minimo }) {
    const db = cargarDB();
    if (db.productos.some((p) => p.nombre.toLowerCase() === nombre.toLowerCase())) {
      throw new Error("Ya existe un producto con ese nombre.");
    }
    const nuevo = {
      id: siguienteId(db.productos),
      nombre,
      tipo,
      unidad,
      stock: Number(stock) || 0,
      minimo: Number(minimo) || 0,
    };
    db.productos.push(nuevo);
    guardarDB();
    return nuevo;
  },

  eliminarProducto(id) {
    const db = cargarDB();
    id = Number(id);
    const enUso = db.hamburguesas.some((h) => h.ingredientes.some((i) => i.productoId === id));
    if (enUso) {
      throw new Error("No se puede eliminar: el producto se usa en al menos una hamburguesa.");
    }
    db.productos = db.productos.filter((p) => p.id !== id);
    db.ingresos = db.ingresos.filter((i) => i.productoId !== id);
    db.merma = db.merma.filter((m) => m.productoId !== id);
    guardarDB();
  },
});
