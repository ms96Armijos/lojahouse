let express = require('express');
let mdwareAutenticacion = require('../middlewares/autenticacion');

let app = express();
let Inmueble = require("../modelos/inmueble");

//OBTENER TODOS LOS USUARIOS
app.get("/:desde",  mdwareAutenticacion.verificaToken, (req, res, next) => {

    let desde = req.params.desde;
    desde = Number(desde);
  
    Inmueble.find({usuario: req.usuario._id, $and: [ { publicado: {$eq: 'PUBLICO'}}, { estado: {$eq:'DISPONIBLE'}} ]})
    .populate('usuario', 'nombre correo')
      .skip(desde)
      .limit(6)
      .exec((err, inmuebles) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: "Error cargando inmueble",
            errors: err,
          });
        }
  
        Inmueble.countDocuments({usuario: req.usuario._id, $and: [ { publicado: {$eq: 'PUBLICO'}}, { estado: {$eq:'DISPONIBLE'}} ]}, (err, conteo) => {
  
          if (err) {
            return res.status(500).json({
              ok: false,
              mensaje: "Error contando inmuebles",
              errors: err,
            });
          }
  
          res.status(200).json({
            ok: true,
            inmuebles: inmuebles,
            total: conteo
          });
        });
  
  
      });
  });

module.exports = app;