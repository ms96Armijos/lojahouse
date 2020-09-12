let express = require("express");
let bcrypt = require("bcryptjs");
let generarPassword = require("generate-password");
let nodemailer = require('nodemailer');

let app = express();

let Usuario = require("../modelos/usuario");




//ACTUALIZAR UN NUEVO USUARIO
app.put("/", (req, res) => {
    const { correo } = req.body;
  
    let passwordGenerada = generarPassword.generate({
        length: 5,
        numbers: true,
      });

      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'testplagios@gmail.com',
          pass: 'plagios123'
        }
      });

       // Definimos el email
  let mailOptions = {
    from: 'testplagios@gmail.com',
    to: correo,
    subject: 'Actualización de contraseña',
    html: `
  <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
    <tr height="200px">
      <td bgcolor="" width="600"px>
        <h1 style="color: #fff; text-align:center">Se ha actualizado la contraseña del usuario: ${correo}</h1>
        <p style="color:#fff; text-align:center">
          <span style:"color: #e84393">Tu contraseña temporal es: ${passwordGenerada}</span>
        </p>
      </td>
    </tr>

    <tr bgcolor="#fff">
      <td style="text-align:center">
        <p style="color:#000"><a href="www.google.com">Inicia Sesión en LojaHouse</a></p>
      </td>
    </tr>

  </table>
  `
  };

    Usuario.findOne({correo}, (err, usuario) => {
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
  
      usuario.correo = correo;
      usuario.password = bcrypt.hashSync(passwordGenerada, 10);

      console.log('Recuperada: '+passwordGenerada)
      usuario.save((err, usuarioGuardado) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            mensaje: "Error al resetear contraseña",
            errors: err,
          });
        }
        usuarioGuardado.password = ";)";
        res.status(200).json({
          ok: true,
          usuario: usuarioGuardado,
        });

         // Enviamos el email
        transporter.sendMail(mailOptions, function (error) {
        if (error) {
          console.log(error);
          return res.status(200).json(error.message);
        } else {
          console.log("Correo Electrónico enviado satisfactoriamente: ", correo);
          res.status(200).json(req.body);
        }
      });

      });
    });
  });
  
module.exports = app;