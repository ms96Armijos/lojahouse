let express = require("express");
let mdwareAutenticacion = require('../middlewares/autenticacion');

let app = express();

let Contrato = require("../modelos/contrato");

//OBTENER TODOS LAS VISITA
app.get("/allcontratos/:desde", mdwareAutenticacion.verificaToken, (req, res, next) => {

  /*let desde = req.query.desde || 0;
  desde = Number(desde);*/

  let desde = req.params.desde;
  desde = Number(desde);


  Contrato.find({usuarioarrendador: req.usuario._id})
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

    Contrato.countDocuments({usuarioarrendador: req.usuario._id}, (err, conteo) => {

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

//OBTENER UN INMUEBLE ESPECIFICO
app.get('/:id', mdwareAutenticacion.verificaToken, (req, res) => {
  let id = req.params.id;
  Contrato.findById(id)
  .populate('usuarioarrendatario', 'nombre apellido correo cedula movil')
  .populate('usuarioarrendador', 'nombre apellido correo cedula movil')
  .populate('inmueble')
    .exec((err, contrato) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al buscar contrato',
          errors: err
        });
      }
      if (!contrato) {
        return res.status(400).json({
          ok: false,
          mensaje: 'El contrato con el id: ' + id + ' no existe',
          errors: { message: 'No existe el contrato con ese ID' }
        });
      }

      res.status(200).json({
        ok: true,
        contrato: contrato
      })
    })
});


//ACTUALIZAR UN NUEVA VISITA
app.put("/:id", mdwareAutenticacion.verificaToken, (req, res) => {
  let id = req.params.id;
  let body = req.body;

  Contrato.findById(id, (err, contrato) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar contrato",
        errors: err,
      });
    }

    if (!contrato) {
      return res.status(400).json({
        ok: false,
        mensaje: "El contrato con el id: " + id + " no existe",
        errors: { message: "No existe un contrato con ese ID" },
      });
    }

    contrato.nombrecontrato = body.nombrecontrato;
    contrato.fechainicio = body.fechainicio;
    contrato.fechafin = body.fechafin;
    contrato.monto = body.monto;
    contrato.tiempocontrato = body.tiempocontrato;
    /*contrato.estado = body.estado;
    contrato.acuerdo = body.acuerdo;
    contrato.usuarioarrendador = req.usuario._id;
    contrato.usuarioarrendatario = body.usuarioarrendatario,
    contrato.inmueble = body.inmueble;*/


    contrato.save((err, contratoGuardado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: "Error al actualizar contrato",
          errors: err,
        });
      }
      
      res.status(200).json({
        ok: true,
        contrato: contratoGuardado,
      });
    });
  });
});

//CREAR UN NUEVO VISITA
app.post("/", mdwareAutenticacion.verificaToken, (req, res) => {
  let body = req.body;

  
  console.log(body.nombrecontrato)
  
  let contrato = new Contrato({
    nombrecontrato: body.nombrecontrato,
    fechainicio: body.fechainicio,
    fechafin: body.fechafin,
    monto: body.monto,
    estado: body.estado,
    acuerdo: body.acuerdo,
    tiempocontrato: body.tiempocontrato,
    usuarioarrendador: req.usuario._id,
    usuarioarrendatario: body.usuarioarrendatario,
    inmueble: body.inmueble

  });

  contrato.save((err, contratoGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: "Error al crear contrato",
        errors: err,
      });

    }

    res.status(201).json({
      ok: true,
      contrato: contratoGuardado,
    });
  });
});

//ELIMINAR UN VISITA
app.delete("/:id", mdwareAutenticacion.verificaToken, (req, res) => {
  let id = req.params.id;

  Contrato.findByIdAndRemove(id, (err, contratoBorrado) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al borrar usuario",
        errors: err,
      });
    }

    if (!contratoBorrado) {
      return res.status(400).json({
        ok: false,
        mensaje: "No existe un contrato con ese ID",
        errors: { message: "No existe un contrato con ese ID" },
      });
    }

    res.status(200).json({
      ok: true,
      contrato: contratoBorrado,
    });
  });
});

module.exports = app;
