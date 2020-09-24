let express = require("express");
let mdwareAutenticacion = require('../middlewares/autenticacion');

let app = express();

let Visita = require("../modelos/visita");

//OBTENER TODOS LAS VISITA
app.get("/:desde", mdwareAutenticacion.verificaToken, async (req, res, next) => {

  let desde = req.query.desde || 0;
  desde = Number(desde);
  

          const visita = await Visita.find({usuarioarrendatario: { $in: req.usuario._id}})  
          .populate('usuarioarrendatario', 'nombre apellido correo movil cedula')
          .populate('inmueble')
          .skip(desde)
          .limit(5)
          .exec((err, visitas) => {
            if (err) {
              return res.status(500).json({
                ok: false,
                mensaje: "Error cargando visita",
                errors: err,
              });
            }
          
              Visita.countDocuments({usuarioarrendatario: { $in: req.usuario._id}}, (err, conteo) => {
        
                if (err) {
                  return res.status(500).json({
                    ok: false,
                    mensaje: "Error contando usuarios",
                    errors: err,
                  });
                }
    
                res.status(200).json({
                  ok: true,
                  visitas: visitas,
                  total: conteo
                });
              });   
          });
  });

  //OBTENER UN INMUEBLE ESPECIFICO
app.get('/visitas/:id', [mdwareAutenticacion.verificaToken], (req, res) => {
  let id = req.params.id;

 

  Visita.findById(id)
    .populate('usuarioarrendatario', 'nombre apellido correo movil cedula').populate('inmueble')
    .exec((err, visita) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al buscar visita',
          errors: err
        });
      }
      if (!visita) {
        return res.status(400).json({
          ok: false,
          mensaje: 'El inmueble con el id: ' + id + ' no existe',
          errors: { message: 'No existe el visita con ese ID' }
        });
      }

      res.status(200).json({
        ok: true,
        visita: visita
      })
    })
});


module.exports = app;