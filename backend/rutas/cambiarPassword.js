let express = require("express");
let bcrypt = require("bcryptjs");
let mdwareAutenticacion = require('../middlewares/autenticacion');

let app = express();

let Usuario = require("../modelos/usuario");


//ACTUALIZAR CONTRASEÑA
app.put("/:id", mdwareAutenticacion.verificaToken, (req, res) => {
    let id = req.params.id;
    const { password } = req.body;
    let respuestaPassword = false;

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

        if (password.length < 6) {
            return res.status(400).json({
                ok: false,
                mensaje: "debe contener mínimo 6 caracteres",
                errors: { message: "debe contener mínimo 6 caracteres" },
            });
        } else if (password.search(/\d/) == -1) {
            return res.status(400).json({
                ok: false,
                mensaje: "debe contener un número",
                errors: { message: "debe contener un número" },
            });
        } else if (password.search(/[a-z]/) == -1) {
            return res.status(400).json({
                ok: false,
                mensaje: "debe contener una letra minúscula",
                errors: { message: "debe contener una letra minúscula" },
            });
        } else if (password.search(/[A-Z]/) == -1) {
            return res.status(400).json({
                ok: false,
                mensaje: "debe contener una letra mayúscula",
                errors: { message: "debe contener una letra mayúscula" },
            });
        }
        usuario.password = bcrypt.hashSync(password, 10);
        //console.log(password)

        usuario.save((err, usuarioPasswordActualizada) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "Error al actualizar usuario",
                    errors: err,
                });
            }
            usuarioPasswordActualizada.password = ";)";
            res.status(200).json({
                ok: true,
                usuario: usuarioPasswordActualizada,
            });
        });
    });
});

module.exports = app;