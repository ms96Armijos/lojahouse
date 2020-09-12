let express = require("express");
let mdwareAutenticacion = require('../middlewares/autenticacion');

let app = express();

let Inmueble = require("../modelos/inmueble");
const { populate } = require("../modelos/inmueble");

//OBTENER TODOS LOS USUARIOS
app.get("/allinmuebles/:desde", mdwareAutenticacion.verificaToken, (req, res, next) => {

  /*let desde = req.query.desde || 0;
  desde = Number(desde);*/
  let desde = req.params.desde;
  desde = Number(desde);

  Inmueble.find({usuario: req.usuario._id})
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

      Inmueble.countDocuments({usuario: req.usuario._id}, (err, conteo) => {

        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: "Error contando usuarios",
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


//OBTENER UN INMUEBLE ESPECIFICO
app.get('/:id', mdwareAutenticacion.verificaToken, (req, res) => {
  let id = req.params.id;
  Inmueble.findById(id)
    .populate('usuario', 'nombre imagen correo')
    .exec((err, inmueble) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al buscar inmueble',
          errors: err
        });
      }
      if (!inmueble) {
        return res.status(400).json({
          ok: false,
          mensaje: 'El inmueble con el id: ' + id + ' no existe',
          errors: { message: 'No existe el inmueble con ese ID' }
        });
      }

      res.status(200).json({
        ok: true,
        inmueble: inmueble
      })
    })
});


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

    inmueble.nombre = body.nombre;
    inmueble.descripcion = body.descripcion;
    inmueble.direccion = body.direccion;
    inmueble.codigo = body.codigo;
    inmueble.tipo = body.tipo;
    inmueble.servicio = body.servicio;
    inmueble.precioalquiler = body.precioalquiler;
    inmueble.garantia = body.garantia;
    inmueble.estado = body.estado;
    inmueble.publicado = body.publicado;
    inmueble.usuario = body.usuario;


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

//CREAR UN NUEVO HOSPITAL
app.post("/", mdwareAutenticacion.verificaToken, (req, res) => {
  let body = req.body;

  let inmueble = new Inmueble({
    nombre: body.nombre,
    descripcion: body.descripcion,
    direccion: body.direccion,
    codigo: body.codigo,
    tipo: body.tipo,
    servicio: body.servicio,
    precioalquiler: body.precioalquiler,
    garantia: body.garantia,
    estado: body.estado,
    publicado:body.publicado,
    usuario: body.usuario

  });

  inmueble.save((err, inmuebleGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: "Error al crear inmueble",
        errors: err,
      });

    }

    res.status(201).json({
      ok: true,
      inmueble: inmuebleGuardado,
    });
  });
});

//ELIMINAR UN USUARIO
app.delete("/:id", mdwareAutenticacion.verificaToken, (req, res) => {
  let id = req.params.id;

  Inmueble.findByIdAndRemove(id, (err, inmuebleBorrado) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al borrar usuario",
        errors: err,
      });
    }

    if (!inmuebleBorrado) {
      return res.status(400).json({
        ok: false,
        mensaje: "No existe un inmueble con ese ID",
        errors: { message: "No existe un inmueble con ese ID" },
      });
    }

    res.status(200).json({
      ok: true,
      inmueble: inmuebleBorrado,
    });
  });
});

module.exports = app;
