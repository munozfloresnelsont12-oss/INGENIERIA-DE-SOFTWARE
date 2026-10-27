# Reporte del Sistema de Inventario y Simulación de Venta - Carl's Jr.

Oct 26, 2026 · @Nelson

## Portada

**Proyecto:** Sistema web de inventario y simulación de venta para un restaurante Carl's Jr.

**Institución:** \[Nombre de la escuela\]

**Materia:** \[Nombre de la materia\]

**Profesor:** \[Nombre del profesor\]

**Alumno:** \[Nombre completo y matrícula\]

**Fecha de elaboración:** 26 de octubre de 2026

Este reporte documenta un sistema web gerencial con inicio de sesión, control de inventario, registro de ingresos y merma, y un simulador de punto de venta conectado al inventario. La información se guarda en una base de datos de Firebase Firestore y el código está escrito en JavaScript.

| Elemento | Tecnología |
| --- | --- |
| Interfaz | HTML y CSS |
| Lógica | JavaScript (sin frameworks) |
| Base de datos | Firebase Firestore |
| Editor y servidor local | Visual Studio Code con Live Server |
| Control de versiones | Git y GitHub |

## Interfaces del sistema

El sistema tiene cuatro pantallas principales y el módulo de inventario se divide en cinco pestañas. Todas comparten los colores de la marca (rojo y amarillo) y se adaptan a pantallas chicas.

### 1. Inicio de sesión

Pantalla de acceso gerencial. Valida el usuario y la contraseña contra la lista de usuarios autorizados; si no coinciden muestra un mensaje de error. La sesión se conserva al recargar la página y se cierra con el botón Cerrar Sesión.

&#91;image: Pantalla de inicio de sesión\]

### 2. Panel gerencial

Menú principal con cuatro módulos: Inventario y Simulación de Venta están activos; Proveedores y Reportes y Personal muestran su descripción y quedan pendientes de desarrollo. Saluda al usuario que inició sesión.

&#91;image: Panel gerencial con los cuatro módulos\]

### 3. Inventario: pestaña Menú

Muestra cada hamburguesa con su precio, su descripción y los productos del inventario que necesita para prepararla (la receta). Abajo hay un formulario para agregar hamburguesas nuevas eligiendo sus ingredientes.

&#91;image: Inventario, pestaña Menú\]

### 4. Inventario: pestaña Inventario

Catálogo de productos con tipo (congelado, refrigerado, fresco o seco), unidad de medida, stock actual y stock mínimo. El stock que queda por debajo del mínimo se marca en rojo. Incluye un formulario para dar de alta productos nuevos.

&#91;image: Inventario, pestaña Inventario\]

### 5. Inventario: pestaña Ingresar producto

Registro manual del abastecimiento: producto, cantidad, fecha de ingreso, fecha de caducidad, proveedor y notas. Cada ingreso se suma automáticamente al stock y queda en el historial de ingresos.

&#91;image: Inventario, pestaña Ingresar producto\]

### 6. Inventario: pestaña Merma del día

Registro manual del desperdicio: producto, cantidad, fecha, motivo (caducado, dañado, quemado, entre otros) y notas. Cada registro se resta del stock, el sistema rechaza mermas mayores al stock disponible y un contador muestra los registros de hoy.

&#91;image: Inventario, pestaña Merma del día\]

### 7. Inventario: pestaña Datos

Respaldo de la información: exporta todo a un archivo JSON, importa un respaldo y restaura los datos de ejemplo.

&#91;image: Inventario, pestaña Datos\]

### 8. Simulación de venta

Punto de venta de práctica. El catálogo se organiza en hamburguesas, combos, acompañamientos, bebidas y paquete infantil. La orden actual calcula subtotal, IVA del 16% y total; el pago puede ser en efectivo (con cálculo de cambio) o con tarjeta. Es un modo de simulación: no modifica el inventario real.

&#91;image: Simulación de venta con una orden armada\]

### 9. Ticket de venta

Ventana emergente que aparece al cobrar, con folio, fecha y hora, artículos, totales, método de pago y cambio. La venta queda en un historial de ventas de prueba.

&#91;image: Ticket generado al cobrar\]

### 10. Consumo de ingredientes y proyección

Sección de la simulación conectada al inventario. Calcula qué ingredientes consume la orden actual, lleva un inventario simulado que se descuenta con cada venta de prueba y proyecta cuánto se necesita de cada ingrediente según las hamburguesas que se espera vender.

&#91;image: Consumo de ingredientes y proyección del menú\]

## La base de datos

La información del sistema se guarda en Firebase Firestore, una base de datos en la nube de Google organizada en colecciones de documentos. Se eligió porque funciona directo desde el navegador, sin servidor propio, y permite ver los datos en una consola web y sincronizarlos en tiempo real entre varias computadoras.

### Creación de la base de datos

1. Crear un proyecto en la consola de Firebase (console.firebase.google.com). ID del proyecto: \[ID de tu proyecto de Firebase\].
2. En Firestore Database, crear la base de datos en modo de prueba y elegir la ubicación.
3. Registrar una app web en la configuración del proyecto y copiar los seis valores de configuración (apiKey, authDomain, projectId, storageBucket, messagingSenderId y appId).
4. Pegar esos valores en el archivo js/datos/config-firebase.js del sistema.
5. Publicar las reglas de seguridad de Firestore (en modo de prueba permiten leer y escribir).
6. Abrir el sistema con Live Server. La primera vez, el propio sistema crea las colecciones y sube los productos y el menú iniciales.

Mientras la configuración no esté pegada, o si no hay internet, el sistema funciona en modo local (guarda en el navegador) y lo avisa con una etiqueta en pantalla.

### Colecciones y campos

| Colección | Qué guarda | Campos de cada documento |
| --- | --- | --- |
| productos | Insumos del inventario | id, nombre, tipo, unidad, stock, minimo |
| hamburguesas | Menú y receta de cada hamburguesa | id, nombre, precio, descripcion, ingredientes (lista de productoId y cantidad) |
| ingresos | Cada abastecimiento de producto | id, productoId, cantidad, fecha, caducidad, proveedor, notas |
| merma | Cada desperdicio registrado | id, productoId, cantidad, fecha, motivo, notas |
| meta | Control interno de la primera carga | documento estado: sembrado, fecha |

### Relaciones entre colecciones

&#91;image: Modelo de datos: colecciones de Firestore y sus relaciones\]

Los ingresos y la merma apuntan a un producto mediante productoId, y cada hamburguesa guarda en su receta los productoId de los insumos que usa.

### Consistencia de los datos

- Al registrar un ingreso, el stock del producto se incrementa; al registrar una merma, se decrementa. El stock se envía a Firestore como incremento, para que dos computadoras que muevan el mismo producto no se pisen.
- El sistema escucha las cuatro colecciones en tiempo real: si otra computadora cambia un dato, la pantalla se actualiza sola.
- Las ventas simuladas y el inventario simulado no se guardan en Firestore: se quedan en el navegador para que la práctica no modifique los datos reales.

### Captura de la consola de Firebase

&#91;Inserta aquí la captura de Firestore Database, pestaña Datos, mostrando las colecciones productos, hamburguesas, ingresos, merma y meta de tu proyecto.\]

## Código fuente

El código está dividido en archivos pequeños, uno por módulo: css/ (estilos), vistas/ (HTML de cada pantalla) y js/ (lógica), que a su vez se separa en datos/ (base de datos), nucleo/ (sesión y navegación), inventario/ y ventas/. Primero se muestra la conexión a la base de datos y después la funcionalidad principal.

### Conexión a la BD: configuración de Firebase

Archivo js/datos/config-firebase.js. Guarda los datos del proyecto de Firebase y la función firebaseConfigurado(), que comprueba que ya se pegaron. La captura muestra marcadores PEGA\_AQUI en lugar de las claves reales del proyecto.

&#91;image: config-firebase.js\]

### Conexión a la BD: elección del almacén

Archivo js/datos/conexion.js. Usa Firebase cuando está configurado y cargado; si no, usa el almacenamiento local del navegador. iniciarBaseDatos() conecta, muestra en pantalla dónde se guarda la información y, si Firebase falla, cae al modo local.

&#91;image: conexion.js\]

### Conexión a la BD: arranque y carga inicial

Archivo js/datos/almacen-firebase.js. iniciar() inicializa Firebase y obtiene Firestore. \_prepararDatos() revisa el documento meta/estado: si no existe es la primera vez, así que sube los datos iniciales y crea esa marca. Cada paso tiene un tiempo límite de 20 segundos.

&#91;image: almacen-firebase.js, arranque\]

### Conexión a la BD: lectura en tiempo real

\_escuchar() abre un listener (onSnapshot) en cada una de las cuatro colecciones y mantiene una copia en memoria. Si otra computadora cambia un dato, la copia se actualiza y las pantallas se repintan.

&#91;image: almacen-firebase.js, lectura en tiempo real\]

### Conexión a la BD: escritura

guardar() y \_escribirCambios() comparan la copia en memoria con lo último que hay en Firestore y envían solo lo que cambió (altas, cambios y bajas) en lotes. Si lo único que cambió de un producto es el stock, lo envía como incremento.

&#91;image: almacen-firebase.js, escritura\]

### Funcionalidad: ingreso de producto

Archivo js/datos/ingresos.js. agregarIngreso() valida el producto y la cantidad, crea el registro y suma la cantidad al stock; eliminarIngreso() revierte el movimiento. Al terminar llama a guardarDB(), que envía el cambio a Firebase.

&#91;image: ingresos.js\]

### Funcionalidad: inicio de sesión

Archivo js/nucleo/auth.js. Define los usuarios autorizados, valida las credenciales del formulario, guarda la sesión y abre el panel gerencial. Esta validación corre en el navegador, por lo que sirve como control de acceso básico y no como seguridad real.

&#91;image: auth.js\]

### Funcionalidad: consumo de ingredientes

Archivo js/ventas/consumo.js. Con las recetas guardadas en la base de datos, ingredientesDeItem() obtiene los insumos de un producto y consumoDeOrden() suma el consumo de toda la orden.

&#91;image: consumo.js\]

### Funcionalidad: cobro en la simulación de venta

Archivo js/ventas/cobro.js. Valida el pago, calcula el consumo de ingredientes y avisa si no alcanzan en el inventario simulado. Después arma la venta, la guarda en el historial de pruebas y descuenta solo el inventario simulado, nunca el real.

&#91;image: cobro.js\]

## Repositorio de GitHub

El código completo del sistema, 68 archivos en total, se guarda en un repositorio de GitHub.

**Enlace del repositorio:** \[Pega aquí el enlace de tu repositorio\]

**Usuario de GitHub:** \[Tu usuario de GitHub\]

### Información que contiene

| Carpeta o archivo | Contenido |
| --- | --- |
| index.html | Página principal; solo carga los estilos y los scripts en orden |
| css/ (15 archivos) | Estilos separados por pantalla y componente |
| vistas/ (14 archivos) | HTML de cada pantalla: login, panel, inventario y simulación de venta |
| js/datos/ (11 archivos) | Base de datos: configuración y conexión a Firebase, almacén local de respaldo, datos de ejemplo y operaciones de productos, hamburguesas, ingresos, merma y respaldo |
| js/nucleo/ (6 archivos) | Utilidades, montaje de pantallas, navegación, inicio de sesión, etiqueta de estado de la base de datos y arranque |
| js/inventario/ (8 archivos) | Un archivo por pestaña del módulo de inventario |
| js/ventas/ (11 archivos) | Simulación de venta: catálogo, carrito, pago, cobro, ticket, historial, consumo de ingredientes y proyección |
| GUIA-FIREBASE.md | Guía paso a paso para crear y conectar la base de datos en Firebase |
| LEEME.md | Descripción de la estructura del proyecto y de dónde editar cada cosa |

El archivo js/datos/config-firebase.js contiene los datos de conexión del proyecto de Firebase. Lo que protege la información son las reglas de seguridad de Firestore, no ocultar ese archivo.

### Captura del repositorio

&#91;Inserta aquí la captura de la página principal del repositorio en GitHub, donde se vean las carpetas y archivos.\]

### Historial de cambios

&#91;Inserta aquí la captura de la lista de commits del repositorio.\]
