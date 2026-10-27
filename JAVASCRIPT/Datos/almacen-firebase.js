/* ===========================================================================
   js/datos/almacen-firebase.js — ALMACÉN EN LA NUBE (Firebase / Firestore)
   ---------------------------------------------------------------------------
   Cada colección de la base de datos es una colección de Firestore:
     productos · hamburguesas · ingresos · merma   (un documento por registro)
     meta/estado                                   (marca que ya se cargaron los datos de inicio)

   Cómo trabaja:
   1. Al abrir la página escucha las 4 colecciones en tiempo real (onSnapshot)
      y mantiene una copia en memoria (baseDatos), así el resto del sistema
      sigue leyendo de forma inmediata.
   2. Cada vez que algo cambia, guardarDB() compara la copia en memoria con lo
      último que hay en Firestore y envía solo lo que cambió (altas, cambios,
      bajas). El stock se envía como incremento (+/-) para que dos terminales
      que muevan el mismo producto no se pisen.
   3. Si otra computadora cambia un dato, la pantalla se actualiza sola.
   =========================================================================== */

/* Texto con las llaves ordenadas: sirve para comparar documentos sin que
   importe el orden de sus campos (Firestore los devuelve ordenados). */
function canon(valor) {
  if (Array.isArray(valor)) return "[" + valor.map(canon).join(",") + "]";
  if (valor && typeof valor === "object") {
    return "{" + Object.keys(valor).sort().map((k) => JSON.stringify(k) + ":" + canon(valor[k])).join(",") + "}";
  }
  return JSON.stringify(valor);
}

function soloCambiaStock(viejo, nuevo) {
  const llaves = new Set([...Object.keys(viejo), ...Object.keys(nuevo)]);
  llaves.delete("stock");
  for (const k of llaves) if (canon(viejo[k]) !== canon(nuevo[k])) return false;
  return viejo.stock !== nuevo.stock;
}

function conTiempoLimite(promesa, ms, mensaje) {
  return new Promise((resolver, rechazar) => {
    const reloj = setTimeout(() => rechazar(new Error(mensaje)), ms);
    promesa.then(
      (v) => { clearTimeout(reloj); resolver(v); },
      (e) => { clearTimeout(reloj); rechazar(e); }
    );
  });
}

const AlmacenFirebase = {
  nombre: "firebase",
  fs: null,
  copia: {},          // copia[coleccion][id] = documento (texto canónico) tal como está en Firestore
  suscripciones: [],  // funciones para dejar de escuchar

  /* ------------------------------- arranque ------------------------------- */
  iniciar() {
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    this.fs = firebase.firestore();
    COLECCIONES.forEach((c) => (this.copia[c] = {}));

    return conTiempoLimite(this._prepararDatos(), 20000, "Firebase no respondió a tiempo")
      .then(() => conTiempoLimite(this._escuchar(), 20000, "Firebase no entregó los datos a tiempo"));
  },

  detener() {
    this.suscripciones.forEach((cancelar) => cancelar());
    this.suscripciones = [];
  },

  /* Primera vez que se usa este proyecto de Firebase: sube los datos iniciales
     (los que ya tenías guardados en este navegador, o los de ejemplo). */
  _prepararDatos() {
    const metaRef = this.fs.collection("meta").doc("estado");
    return metaRef.get().then((doc) => {
      if (doc.exists) return;
      let inicial;
      try {
        const local = localStorage.getItem(LLAVE);
        inicial = local ? JSON.parse(local) : datosIniciales();
      } catch (_) {
        inicial = datosIniciales();
      }
      baseDatos = {
        productos: inicial.productos || [],
        hamburguesas: inicial.hamburguesas || [],
        ingresos: inicial.ingresos || [],
        merma: inicial.merma || [],
      };
      return this._escribirCambios().then(() =>
        metaRef.set({ sembrado: true, fecha: new Date().toISOString() })
      );
    });
  },

  /* Escucha en tiempo real; resuelve cuando llegaron las 4 colecciones. */
  _escuchar() {
    return new Promise((resolver, rechazar) => {
      let pendientes = COLECCIONES.length;
      let listo = false;

      COLECCIONES.forEach((c) => {
        let primera = true;
        const cancelar = this.fs.collection(c).onSnapshot(
          (snap) => {
            const docs = snap.docs.map((d) => d.data()).sort((a, b) => a.id - b.id);
            if (c === "productos") docs.forEach((p) => (p.stock = redondear(p.stock)));

            const nueva = {};
            docs.forEach((d) => (nueva[d.id] = canon(d)));
            this.copia[c] = nueva;

            const cambio = canon(baseDatos[c]) !== canon(docs);
            if (cambio) baseDatos[c] = docs;

            if (primera) {
              primera = false;
              pendientes -= 1;
              if (pendientes === 0) { listo = true; resolver(); }
            } else if (cambio && typeof alCambiarDatos === "function") {
              alCambiarDatos(); // otro equipo cambió algo: repintar pantallas
            }
          },
          (error) => (listo ? this.alError(error) : rechazar(error))
        );
        this.suscripciones.push(cancelar);
      });
    });
  },

  /* ------------------------------- guardado ------------------------------- */
  guardar() {
    this._escribirCambios().catch((error) => this.alError(error));
  },

  _escribirCambios() {
    const ops = [];

    COLECCIONES.forEach((c) => {
      const actual = {};
      baseDatos[c].forEach((d) => (actual[d.id] = canon(d)));
      const previa = this.copia[c];

      Object.keys(actual).forEach((id) => {
        if (previa[id] === actual[id]) return;
        const ref = this.fs.collection(c).doc(String(id));
        const nuevo = JSON.parse(JSON.stringify(baseDatos[c].find((d) => String(d.id) === id)));

        if (previa[id] === undefined) {
          ops.push((lote) => lote.set(ref, nuevo));
          return;
        }
        const viejo = JSON.parse(previa[id]);
        if (c === "productos" && soloCambiaStock(viejo, nuevo)) {
          const delta = redondear(nuevo.stock - viejo.stock);
          ops.push((lote) => lote.update(ref, { stock: firebase.firestore.FieldValue.increment(delta) }));
        } else {
          ops.push((lote) => lote.set(ref, nuevo));
        }
      });

      Object.keys(previa).forEach((id) => {
        if (actual[id] === undefined) {
          const ref = this.fs.collection(c).doc(String(id));
          ops.push((lote) => lote.delete(ref));
        }
      });

      this.copia[c] = actual; // se considera enviado desde ya (evita duplicar incrementos)
    });

    // Firestore permite 500 operaciones por lote
    const lotes = [];
    for (let i = 0; i < ops.length; i += 400) lotes.push(ops.slice(i, i + 400));
    return Promise.all(
      lotes.map((grupo) => {
        const lote = this.fs.batch();
        grupo.forEach((op) => op(lote));
        return lote.commit();
      })
    );
  },

  alError(error) {
    console.error("Error de Firebase:", error);
    estadoBD("error", "⚠ " + mensajeErrorFirebase(error));
  },
};

function mensajeErrorFirebase(error) {
  const codigo = error && error.code ? error.code : "";
  if (codigo === "permission-denied") return "Firestore rechazó el acceso: revisa las reglas (GUIA-FIREBASE.md, paso 5)";
  if (codigo === "unavailable") return "Sin conexión con Firebase; los cambios se enviarán al reconectar";
  return "Error de Firebase: " + (codigo || (error && error.message) || "desconocido");
}
