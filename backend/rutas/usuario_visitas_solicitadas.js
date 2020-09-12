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


module.exports = app;