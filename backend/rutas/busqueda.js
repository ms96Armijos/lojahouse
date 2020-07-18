let express = require("express");
let Inmueble = require("../modelos/inmueble");
let Visita = require("../modelos/visita");
let Usuario = require("../modelos/usuario");

let app = express();
//BUSQUEDAS ESPECIFICAS
app.get("/coleccion/:tabla/:busqueda", (req, res) => {
  let busqueda = req.params.busqueda;
  let tabla = req.params.tabla;
  let expresionRegular = new RegExp(busqueda, "i");

  let promesa;

  switch (tabla) {
    case "usuarios":
      promesa = buscarUsuarios(busqueda, expresionRegular);
      break;
    case "visitas":
      promesa = buscarVisitas(busqueda, expresionRegular);
      break;
    case "inmuebles":
      promesa = buscarInmuebles(busqueda, expresionRegular);
      break;

    default:
      return res.status(400).json({
        ok: false,
        mensaje: "Los tipos de búsqueda son: usuarios, visitas, inmuebles",
        error: { message: "Tipo de colección no válida" },
      });
  }

  promesa.then((data) => {
    res.status(200).json({
      ok: true,
      [tabla]: data,
    });
  });
});

//BUSQUEDA GENERAL
app.get("/todo/:busqueda", (req, res, next) => {
  let busqueda = req.params.busqueda;
  let expresionRegular = new RegExp(busqueda, "i");

  Promise.all([
    buscarInmuebles(busqueda, expresionRegular),
    buscarVisitas(busqueda, expresionRegular),
    buscarUsuarios(busqueda, expresionRegular),
  ])
    .then((respuestas) => {
      res.status(200).json({
        ok: true,
        inmuebles: respuestas[0],
        visitas: respuestas[1],
        usuarios: respuestas[2],
      });
    })
    .catch();
});

function buscarInmuebles(busqueda, expresionRegular) {
  return new Promise((resolve, reject) => {
    Inmueble.find({ nombre: expresionRegular })
      .populate("usuario", "nombre apellido correo")
      .exec((err, inmuebles) => {
        if (err) {
          reject("Error al cargar Inmuebles", err);
        } else {
          resolve(inmuebles);
        }
      });
  });
}

function buscarVisitas(busqueda, expresionRegular) {
  return new Promise((resolve, reject) => {
    Visita.find({ descripcion: expresionRegular })
      .populate("usuario", " nombre apellido correo")
      .populate(
        "inmueble",
        "nombre descripcion tipoInmueble direccion precioAlquiler"
      )
      .exec((err, visitas) => {
        if (err) {
          reject("Error al cargar Visitas", err);
        } else {
          resolve(visitas);
        }
      });
  });
}
function buscarUsuarios(busqueda, expresionRegular) {
  return new Promise((resolve, reject) => {
    Usuario.find({}, "nombre apellido correo rol estado")
      .or([{ nombre: expresionRegular }, { correo: expresionRegular }])
      .exec((err, usuarios) => {
        if (err) {
          reject("Error al cargar los usuarios", err);
        } else {
          resolve(usuarios);
        }
      });
  });
}
module.exports = app;
