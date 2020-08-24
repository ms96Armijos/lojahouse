let express = require('express');
let mdwareAutenticacion = require('../middlewares/autenticacion');

let app = express();
let Inmueble = require("../modelos/inmueble");

//ACTUALIZAR UN NUEVO INMUEBLE
app.put("/:id", mdwareAutenticacion.verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;
  
    Inmueble.findById(id, (err, inmueble) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error al buscar inmueble",
          errors: err,
        });
      }
  
      if (!inmueble) {
        return res.status(400).json({
          ok: false,
          mensaje: "El inmueble con el id: " + id + " no existe",
          errors: { message: "No existe un inmueble con ese ID" },
        });
      }
  
      inmueble.publicado = body.publicado;
      inmueble.usuario = req.usuario._id;
  
  
      inmueble.save((err, inmuebleGuardado) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            mensaje: "Error al actualizar inmueble",
            errors: err,
          });
        }
  
        res.status(200).json({
          ok: true,
          inmueble: inmuebleGuardado,
        });
      });
    });
  });
  

module.exports = app;