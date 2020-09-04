let express = require("express");
let mdwareAutenticacion = require('../middlewares/autenticacion');

let app = express();

let Visita = require("../modelos/visita");
let Inmueble = require("../modelos/inmueble");

//OBTENER TODOS LAS VISITA
app.get("/allvisitas/:desde", mdwareAutenticacion.verificaToken, async (req, res, next) => {

  /*let desde = req.query.desde || 0;
  desde = Number(desde);*/

  let desde = req.params.desde;
  desde = Number(desde);

  const inmueble = await Inmueble.find({usuario: { $in: req.usuario._id}});
    if(inmueble){
        const visita = await Visita.find({inmueble: { $in: inmueble}})  
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
    }
   

  /*Visita.find({usuarioarrendatario: { $in: req.usuario._id}})
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

    visitas.forEach(visit => {
      console.log(visit.inmueble.usuario)
      
    });
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


    

    
  });*/
});

//OBTENER UN INMUEBLE ESPECIFICO
app.get('/:id', mdwareAutenticacion.verificaToken, (req, res) => {
  let id = req.params.id;
  Visita.findById(id)
    .populate('usuario', 'nombre apellido correo movil cedula').populate('inmueble')
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

    visita.fecha = body.fecha;
    visita.descripcion = body.descripcion;
    visita.estado = body.estado;
    visita.usuarioarrendatario = req.usuarioarrendatario._id;
    visita.inmueble = body.inmueble;


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

//CREAR UN NUEVO VISITA
app.post("/", mdwareAutenticacion.verificaToken, (req, res) => {
  let body = req.body;

  let visita = new Visita({
    fecha: body.fecha,
    descripcion: body.descripcion,
    estado: body.estado,
    usuarioarrendatario: body.usuarioarrendatario,
    inmueble: body.inmueble

  });

  visita.save((err, visitaGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: "Error al crear visita",
        errors: err,
      });

    }

    res.status(201).json({
      ok: true,
      visita: visitaGuardado,
    });
  });
});

//ELIMINAR UN VISITA
app.delete("/:id", mdwareAutenticacion.verificaToken, (req, res) => {
  let id = req.params.id;

  Visita.findByIdAndRemove(id, (err, visitaBorrado) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al borrar usuario",
        errors: err,
      });
    }

    if (!visitaBorrado) {
      return res.status(400).json({
        ok: false,
        mensaje: "No existe un visita con ese ID",
        errors: { message: "No existe un visita con ese ID" },
      });
    }

    res.status(200).json({
      ok: true,
      visita: visitaBorrado,
    });
  });
});

module.exports = app;
