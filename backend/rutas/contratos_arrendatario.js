let express = require("express");
let mdwareAutenticacion = require('../middlewares/autenticacion');

let app = express();

let Contrato = require("../modelos/contrato");

//OBTENER TODOS LAS VISITA
app.get("/:desde", mdwareAutenticacion.verificaToken, (req, res, next) => {

    let desde = req.params.desde;
    desde = Number(desde);
  
  
    Contrato.find({usuarioarrendatario: req.usuario._id})
    .populate('usuarioarrendatario', 'nombre apellido correo')
    .populate('usuarioarrendador', 'nombre apellido correo')
    .populate('inmueble')
    .skip(desde)
    .limit(6)
    .exec((err, contratos) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error cargando contrato",
          errors: err,
        });
      }
  
      Contrato.countDocuments({usuarioarrendatario: req.usuario._id}, (err, conteo) => {
  
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: "Error contando contratos",
            errors: err,
          });
        }
  
        res.status(200).json({
          ok: true,
          contratos: contratos,
          total: conteo
        });
      });
  
      
    });
  });
  
  module.exports = app;
