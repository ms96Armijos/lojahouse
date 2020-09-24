let express = require("express");
let bcrypt = require("bcryptjs");
let generarPassword = require("generate-password");
let nodemailer = require("nodemailer");
let jwt = require("jsonwebtoken");
let mdwareAutenticacion = require("../middlewares/autenticacion");

let app = express();

let Usuario = require("../modelos/usuario");

//OBTENER TODOS LOS USUARIOS
app.get("/",(req, res, next) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  Usuario.find({}, "nombre apellido correo imagen movil estado rol")
    .skip(desde)
    .limit(5)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error cargando usuario",
          errors: err,
        });
      }

      Usuario.countDocuments({}, (err, conteo) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: "Error contando usuarios",
            errors: err,
          });
        }

        res.status(200).json({
          ok: true,
          usuarios: usuarios,
          total: conteo,
        });
      });
    });
});

//OBTENER UN SERVICIO ESPECIFICO
app.get("/:id", (req, res) => {
  let id = req.params.id;
  Usuario.findById(
    id,
    "nombre apellido correo imagen movil estado rol"
  ).exec((err, usuario) => {
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
        errors: { message: "No existe el usuario con ese ID" },
      });
    }

    res.status(200).json({
      ok: true,
      usuario: usuario,
    });
  });
});

//ACTUALIZAR UN USUARIO
app.put("/:id",[ mdwareAutenticacion.verificaToken, mdwareAutenticacion.verificaMismoUsuarioRol], (req, res) => {
  let id = req.params.id;
  const {
    nombre,
    apellido,
    correo,
    cedula,
    movil,
    convencional,
    estado,
  } = req.body;

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
app.post("/", async (req, res) => {
  const { nombre, apellido, correo, movil, estado, rol } = req.body;

  if (nombre.length <= 0) {
    return res.status(400).json({
      ok: false,
      mensaje: "Debe ingresar sus nombres",
      errors: err,
    });
  }
  if (apellido.length <= 0) {
    return res.status(400).json({
      ok: false,
      mensaje: "Debe ingresar sus apellidos",
      errors: err,
    });
  }
  if (correo.length <= 0) {
    return res.status(400).json({
      ok: false,
      mensaje: "Debe ingresar su correo",
      errors: err,
    });
  }
  if (movil.length <= 0) {
    return res.status(400).json({
      ok: false,
      mensaje: "Debe ingresar su número de celular",
      errors: err,
    });
  }
  if (rol.length <= 0) {
    return res.status(400).json({
      ok: false,
      mensaje: "Debes identificarte (arrendador o arrendatario)",
      errors: err,
    });
  }

  let passwordGenerada = generarPassword.generate({
    length: 5,
    numbers: true,
  });

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "testplagios@gmail.com",
      pass: "plagios123",
    },
    debug: true, // show debug output
    logger: true, // log information in console
  });

  // Definimos el email
  let mailOptions = {
    from: "testplagios@gmail.com",
    to: correo,
    subject: "Generación de contraseña",
    html: `
  <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
    <tr height="200px">
      <td bgcolor="" width="600"px>
        <h1 style="color: #fff; text-align:center">Bienvenido ${nombre +
          " " +
          apellido}</h1>
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
  `,
  };

  let usuario = new Usuario({
    nombre: nombre,
    apellido: apellido,
    correo: correo,
    password: bcrypt.hashSync(passwordGenerada, 10),
    movil: movil,
    /*imagen: body.imagen,
    cedula: body.cedula,
    
    convencional: body.convencional,*/
    estado: estado,
    rol: rol,
  });

  console.log("contraseña: " + passwordGenerada);

  await Usuario.findOne({ correo: usuario.correo }, (err, encontrado) => {
    if (encontrado.correo === usuario.correo) {
      return res.status(400).json({
        ok: false,
        mensaje: "Ya existe el usuario (correo electrónico)",
      });
    }

    if (!encontrado) {
      usuario.save((err, usuarioGuardado) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            mensaje: "Error al crear usuario",
            errors: err,
          });
        }

        // Enviamos el email
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            return console.log(error);
            //return res.status(500).send(error.message);
            //return res.send(500, error.message);
          } else {
            console.log(
              "Correo Electrónico enviado satisfactoriamente: ",
              req.body.nombre
            );
            return res.status(200).json(req.body);
          }
        });

        return res.status(201).json({
          ok: true,
          usuario: usuarioGuardado,
        });
      });
    }
  });
});

//ELIMINAR UN USUARIO
app.delete("/:id", mdwareAutenticacion.verificaToken, (req, res) => {
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




/*¿Cómo autorizar o denegar rutas en Node.JS si un usuario no cumple una condición?
var User = require("../models/user").User;
module.exports = function(req, res, next) {
  User.findById(req.session.user_id, function(err, user) {
    if (user.isAdmin == true) {
      res.locals.user = user;
      next();
      console.log("Si tiene permisos de administrador");
    } else if (user.isAdmin == false || user.isAdmin == null) {
      res.redirect("/app");
      console.log("No tiene permisos para acceder");
    }
  });
};*/
