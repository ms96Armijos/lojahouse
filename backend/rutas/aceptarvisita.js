let express = require("express");
let mdwareAutenticacion = require('../middlewares/autenticacion');

let app = express();

let Visita = require("../modelos/visita");

//ACTUALIZAR UN NUEVA VISITA
app.put("/:id", mdwareAutenticacion.verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;
  
    Visita.findById(id, (err, visita) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error al buscar visita",
          errors: err,
        });
      }
  
      if (!visita) {
        return res.status(400).json({
          ok: false,
          mensaje: "El visita con el id: " + id + " no existe",
          errors: { message: "No existe un visita con ese ID" },
        });
      }
  
      visita.estado = body.estado;
  
  
      visita.save((err, visitaGuardado) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            mensaje: "Error al actualizar visita",
            errors: err,
          });
        }
        
        res.status(200).json({
          ok: true,
          visita: visitaGuardado,
        });
      });
    });
  });

  

module.exports = app;