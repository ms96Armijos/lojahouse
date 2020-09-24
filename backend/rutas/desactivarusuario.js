let express = require('express');
let mdwareAutenticacion = require('../middlewares/autenticacion');

let app = express();
let Usuario = require("../modelos/usuario");
let Inmueble = require("../modelos/inmueble");

//ACTUALIZAR UN NUEVO INMUEBLE
app.put("/:id", mdwareAutenticacion.verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;
  
    Usuario.findById(id, (err, usuario) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error al buscar inmueble",
          errors: err,
        });
      }
  
      if (!usuario) {
        return res.status(400).json({
          ok: false,
          mensaje: "El inmueble con el id: " + id + " no existe",
          errors: { message: "No existe un inmueble con ese ID" },
        });
      }
  
      usuario.estado = body.estado;

     
  
      usuario.save((err, usuarioGuardado) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            mensaje: "Error al actualizar usuario",
            errors: err,
          });
        }
  
        if(usuario.estado === '1'){
            Inmueble.updateMany({usuario:{$in: usuario._id}},{publicado: "PUBLICO"}, {multi: true }, (err, inmuebleNuevo) =>{
                console.log('hole')
                res.status(200).json({
                    ok: true,
                    usuario: usuarioGuardado,
                  });
            });
          }
          if(usuario.estado === '0'){
            Inmueble.updateMany({usuario:{$in: usuario._id}},{publicado: "PRIVADO"}, {multi: true }, (err, inmuebleNuevo) =>{
                console.log('hole')
                res.status(200).json({
                    ok: true,
                    usuario: usuarioGuardado,
                  });
            });
          }
      });
    });
  });
  

module.exports = app;