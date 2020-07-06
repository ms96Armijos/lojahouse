let express = require("express");
let bcrypt = require("bcryptjs");
let generarPassword = require("generate-password");
let nodemailer = require('nodemailer');

let app = express();

let Usuario = require("../modelos/usuario");

//OBTENER TODOS LOS USUARIOS
app.get("/", (req, res, next) => {
  Usuario.find(
    {},
    "nombre apellido correo imagen cedula movil convencional estado rol"
  ).exec((err, usuarios) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error cargando usuario",
        errors: err,
      });
    }

    res.status(200).json({
      ok: true,
      usuarios: usuarios,
    });
  });
});

//ACTUALIZAR UN NUEVO USUARIO
app.put("/:id", (req, res) => {
  let id = req.params.id;
  const {nombre, apellido, correo, cedula, movil, convencional, estado, rol} = req.body;

  Usuario.findById(id, (err, usuario) => {
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
        mensaje: "El usuario con el id: " + id + " no existe",
        errors: { message: "No existe un usuario con ese ID" },
      });
    }

    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.correo = correo;
    usuario.cedula = cedula;
    usuario.movil = movil;
    usuario.convencional = convencional;
    usuario.estado = estado;
    usuario.rol = rol;

    usuario.save((err, usuarioGuardado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: "Error al actualizar usuario",
          errors: err,
        });
      }
      usuarioGuardado.password = ";)";
      res.status(200).json({
        ok: true,
        usuario: usuarioGuardado,
      });
    });
  });
});

//CREAR UN NUEVO USUARIO
app.post("/", (req, res) => {
  let body = req.body;

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
var mailOptions = {
  from: 'testplagios@gmail.com',
  to: body.correo,
  subject: 'Generaciónde contraseña',
  html: `
  <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
    <tr height="200px">
      <td bgcolor="" width="600"px>
        <h1 style="color: #fff; text-align:center">Bienvenido ${body.nombre+' '+body.apellido}</h1>
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

// Enviamos el email
transporter.sendMail(mailOptions, function(error, info){
  if (error){
      console.log(error);
      res.send(500, error.message);
  } else {
      console.log("Email sent");
      res.status(200).json(req.body);
  }
});
  
  let usuario = new Usuario({
    nombre: body.nombre,
    apellido: body.apellido,
    correo: body.correo,
    password: bcrypt.hashSync(passwordGenerada, 10),
    imagen: body.imagen,
    cedula: body.cedula,
    movil: body.movil,
    convencional: body.convencional,
    estado: body.estado,
    rol: body.rol,
  });

  usuario.save((err, usuarioGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: "Error al crear usuario",
        errors: err,
      });
      
    }
    res.status(201).json({
      ok: true,
      usuario: usuarioGuardado,
      //password: passwordGenerada
    });
  });
});

//ELIMINAR UN USUARIO
app.delete("/:id", (req, res) => {
  let id = req.params.id;

  Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al borrar usuario",
        errors: err,
      });
    }

    if (!usuarioBorrado) {
      return res.status(400).json({
        ok: false,
        mensaje: "No existe un usuario con ese ID",
        errors: { message: "No existe un usuario con ese ID" },
      });
    }

    res.status(200).json({
      ok: true,
      usuario: usuarioBorrado,
    });
  });
});

module.exports = app;
