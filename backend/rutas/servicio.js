let express = require("express");
let mdwareAutenticacion = require('../middlewares/autenticacion');

let app = express();

let Servicio = require("../modelos/servicio");

//OBTENER TODOS LOS SERVICIOS
app.get("/", (req, res, next) => {

  let desde = req.query.desde || 0;
  desde = Number(desde);

  Servicio.find({})
    .skip(desde)
    .limit(6)
    .exec((err, servicios) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error cargando servicio",
          errors: err,
        });
      }
      
      Servicio.countDocuments({}, (err, conteo) => {
       
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: "Error contando usuarios",
            errors: err,
          });
        }
        res.status(200).json({
          ok: true,
          servicios: servicios,
          total: conteo
        });
      });


    });
});


//OBTENER UN SERVICIO ESPECIFICO
app.get('/:id', (req, res) => {
  let id = req.params.id;
  Servicio.findById(id)
    .exec((err, servicio) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al buscar servicio',
          errors: err
        });
      }
      if (!servicio) {
        return res.status(400).json({
          ok: false,
          mensaje: 'El servicio con el id: ' + id + ' no existe',
          errors: { message: 'No existe el servicio con ese ID' }
        });
      }

      res.status(200).json({
        ok: true,
        servicio: servicio
      })
    })
});



//ACTUALIZAR UN NUEVO SERVICIO
app.put("/:id", mdwareAutenticacion.verificaToken, (req, res) => {
  let id = req.params.id;
  let body = req.body;

  Servicio.findById(id, (err, servicio) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar servicio",
        errors: err,
      });
    }

    if (!servicio) {
      return res.status(400).json({
        ok: false,
        mensaje: "El servicio con el id: " + id + " no existe",
        errors: { message: "No existe un servicio con ese ID" },
      });
    }

    servicio.nombre = body.nombre;


    servicio.save((err, servicioGuardado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: "Error al actualizar servicio",
          errors: err,
        });
      }

      res.status(200).json({
        ok: true,
        servicio: servicioGuardado,
      });
    });
  });
});

//CREAR UN NUEVO SERVICIO
app.post("/", mdwareAutenticacion.verificaToken, (req, res) => {
  let body = req.body;

  let servicio = new Servicio({
    nombre: body.nombre

  });

  servicio.save((err, servicioGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: "Error al crear servicio",
        errors: err,
      });

    }

    res.status(201).json({
      ok: true,
      servicio: servicioGuardado,
    });
  });
});

//ELIMINAR UN SERVICIO
app.delete("/:id", mdwareAutenticacion.verificaToken, (req, res) => {
  let id = req.params.id;

  Servicio.findByIdAndRemove(id, (err, servicioBorrado) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al borrar usuario",
        errors: err,
      });
    }

    if (!servicioBorrado) {
      return res.status(400).json({
        ok: false,
        mensaje: "No existe un servicio con ese ID",
        errors: { message: "No existe un servicio con ese ID" },
      });
    }

    res.status(200).json({
      ok: true,
      servicio: servicioBorrado,
    });
  });
});

module.exports = app;
