/* ===========================================================================
   js/datos/semilla.js — DATOS DE EJEMPLO
   Se cargan la primera vez que se abre la página (o al restaurar el ejemplo).
   Para cambiar los productos o el menú de inicio, edita este archivo.
   =========================================================================== */

function datosIniciales() {
  const productos = [
    { id: 1,  nombre: "Carne de res 100% Angus",     tipo: "Congelado",   unidad: "kg",    stock: 20,  minimo: 5 },
    { id: 2,  nombre: "Pechuga de pollo",            tipo: "Congelado",   unidad: "kg",    stock: 15,  minimo: 5 },
    { id: 3,  nombre: "Tocino",                      tipo: "Refrigerado", unidad: "kg",    stock: 8,   minimo: 2 },
    { id: 4,  nombre: "Pan de hamburguesa clásico",  tipo: "Congelado",   unidad: "pza",   stock: 100, minimo: 20 },
    { id: 5,  nombre: "Pan de hamburguesa premium",  tipo: "Congelado",   unidad: "pza",   stock: 60,  minimo: 15 },
    { id: 6,  nombre: "Queso americano",             tipo: "Refrigerado", unidad: "pza",   stock: 150, minimo: 30 },
    { id: 7,  nombre: "Queso pepper jack",           tipo: "Refrigerado", unidad: "pza",   stock: 60,  minimo: 15 },
    { id: 8,  nombre: "Lechuga",                     tipo: "Fresco",      unidad: "kg",    stock: 10,  minimo: 3 },
    { id: 9,  nombre: "Tomate",                      tipo: "Fresco",      unidad: "kg",    stock: 10,  minimo: 3 },
    { id: 10, nombre: "Cebolla blanca",              tipo: "Fresco",      unidad: "kg",    stock: 8,   minimo: 2 },
    { id: 11, nombre: "Aros de cebolla empanizada",  tipo: "Congelado",   unidad: "kg",    stock: 12,  minimo: 3 },
    { id: 12, nombre: "Pepinillos",                  tipo: "Refrigerado", unidad: "kg",    stock: 5,   minimo: 1 },
    { id: 13, nombre: "Salsa BBQ",                   tipo: "Refrigerado", unidad: "litro", stock: 10,  minimo: 2 },
    { id: 14, nombre: "Mayonesa",                    tipo: "Refrigerado", unidad: "litro", stock: 10,  minimo: 2 },
    { id: 15, nombre: "Ketchup",                     tipo: "Seco",        unidad: "litro", stock: 10,  minimo: 2 },
    { id: 16, nombre: "Salsa especial El Diablo",    tipo: "Refrigerado", unidad: "litro", stock: 5,   minimo: 1 },
    { id: 17, nombre: "Jalapeños",                   tipo: "Refrigerado", unidad: "kg",    stock: 4,   minimo: 1 },
    { id: 18, nombre: "Papas a la francesa",         tipo: "Congelado",   unidad: "kg",    stock: 25,  minimo: 5 },
  ];

  const hamburguesas = [
    {
      id: 1,
      nombre: "Famous Star con Queso",
      precio: 89,
      descripcion: "Carne de res, queso americano, lechuga, tomate, cebolla, pepinillos, ketchup y mayonesa.",
      ingredientes: [
        { productoId: 4,  cantidad: 1 },
        { productoId: 1,  cantidad: 0.15 },
        { productoId: 6,  cantidad: 1 },
        { productoId: 8,  cantidad: 0.03 },
        { productoId: 9,  cantidad: 0.03 },
        { productoId: 10, cantidad: 0.02 },
        { productoId: 12, cantidad: 0.01 },
        { productoId: 15, cantidad: 0.02 },
        { productoId: 14, cantidad: 0.02 },
      ],
    },
    {
      id: 2,
      nombre: "Super Star con Queso",
      precio: 109,
      descripcion: "Carne Angus de mayor tamaño, queso americano y vegetales frescos en pan premium.",
      ingredientes: [
        { productoId: 5,  cantidad: 1 },
        { productoId: 1,  cantidad: 0.23 },
        { productoId: 6,  cantidad: 1 },
        { productoId: 8,  cantidad: 0.04 },
        { productoId: 9,  cantidad: 0.04 },
        { productoId: 10, cantidad: 0.02 },
        { productoId: 12, cantidad: 0.015 },
        { productoId: 15, cantidad: 0.02 },
        { productoId: 14, cantidad: 0.02 },
      ],
    },
    {
      id: 3,
      nombre: "Western Bacon Cheeseburger",
      precio: 99,
      descripcion: "Carne de res, queso americano, tocino, aros de cebolla y salsa BBQ.",
      ingredientes: [
        { productoId: 4,  cantidad: 1 },
        { productoId: 1,  cantidad: 0.15 },
        { productoId: 6,  cantidad: 1 },
        { productoId: 3,  cantidad: 0.03 },
        { productoId: 11, cantidad: 0.04 },
        { productoId: 13, cantidad: 0.03 },
      ],
    },
    {
      id: 4,
      nombre: "Double Western Bacon Cheeseburger",
      precio: 129,
      descripcion: "Doble carne, doble queso, tocino, aros de cebolla y salsa BBQ.",
      ingredientes: [
        { productoId: 4,  cantidad: 1 },
        { productoId: 1,  cantidad: 0.30 },
        { productoId: 6,  cantidad: 2 },
        { productoId: 3,  cantidad: 0.05 },
        { productoId: 11, cantidad: 0.06 },
        { productoId: 13, cantidad: 0.04 },
      ],
    },
    {
      id: 5,
      nombre: "El Diablo",
      precio: 115,
      descripcion: "Carne de res, queso pepper jack, jalapeños, tocino y salsa especial picante.",
      ingredientes: [
        { productoId: 5,  cantidad: 1 },
        { productoId: 1,  cantidad: 0.17 },
        { productoId: 7,  cantidad: 1 },
        { productoId: 17, cantidad: 0.02 },
        { productoId: 3,  cantidad: 0.03 },
        { productoId: 16, cantidad: 0.03 },
      ],
    },
    {
      id: 6,
      nombre: "Big Carl",
      precio: 119,
      descripcion: "Doble carne, doble queso americano, lechuga, pepinillos, cebolla y salsa especial.",
      ingredientes: [
        { productoId: 5,  cantidad: 1 },
        { productoId: 1,  cantidad: 0.30 },
        { productoId: 6,  cantidad: 2 },
        { productoId: 8,  cantidad: 0.03 },
        { productoId: 12, cantidad: 0.02 },
        { productoId: 10, cantidad: 0.02 },
        { productoId: 16, cantidad: 0.02 },
      ],
    },
    {
      id: 7,
      nombre: "Charbroiled Chicken Club",
      precio: 105,
      descripcion: "Pechuga de pollo asada, tocino, queso americano, lechuga, tomate y mayonesa.",
      ingredientes: [
        { productoId: 5,  cantidad: 1 },
        { productoId: 2,  cantidad: 0.18 },
        { productoId: 3,  cantidad: 0.03 },
        { productoId: 6,  cantidad: 1 },
        { productoId: 8,  cantidad: 0.03 },
        { productoId: 9,  cantidad: 0.03 },
        { productoId: 14, cantidad: 0.02 },
      ],
    },
  ];

  return { productos, hamburguesas, ingresos: [], merma: [] };
}
