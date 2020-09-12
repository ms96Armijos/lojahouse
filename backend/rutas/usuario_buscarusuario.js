let express = require("express");
let bcrypt = require("bcryptjs");

let app = express();

let Usuario = require("../modelos/usuario");


//ACTUALIZAR UN NUEVO USUARIO
app.get("/:correo", async (req, res) => {
    let correo = req.params.correo;

    await Usuario.findOne({correo}, "correo nombre apellido cedula", (err, usuario) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error al buscar usuario",
          errors: err,
        });
      }
  
      if (!usuario) {
        return res.status(400).json({
          ok: false,
          mensaje: "El usuario con el correo: " + correo + " no existe",
          errors: { message: "No existe un usuario con ese correo" },
        });
      }

        res.status(200).json({
            ok: true,
            usuario: usuario,
          });
     
    });
  });
  
module.exports = app;