/* js/datos/hamburguesas.js — operaciones del menú (hamburguesas y sus recetas) */

Object.assign(DB, {
  agregarHamburguesa({ nombre, precio, descripcion, ingredientes }) {
    const db = cargarDB();
    if (db.hamburguesas.some((h) => h.nombre.toLowerCase() === nombre.toLowerCase())) {
      throw new Error("Ya existe una hamburguesa con ese nombre.");
    }
    const nueva = {
      id: siguienteId(db.hamburguesas),
      nombre,
      precio: Number(precio) || 0,
      descripcion: descripcion || "",
      ingredientes: ingredientes.map((i) => ({
        productoId: Number(i.productoId),
        cantidad: Number(i.cantidad),
      })),
    };
    db.hamburguesas.push(nueva);
    guardarDB();
    return nueva;
  },

  eliminarHamburguesa(id) {
    const db = cargarDB();
    db.hamburguesas = db.hamburguesas.filter((h) => h.id !== Number(id));
    guardarDB();
  },
});
