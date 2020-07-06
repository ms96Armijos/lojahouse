let express = require("express");
let bcrypt = require("bcryptjs");

let app = express();

let Usuario = require("../modelos/usuario");


app.post('/', (req, res) => {

    let body = req.body;

    Usuario.findOne({ correo: body.correo}, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
              ok: false,
              mensaje: 'Error al buscar usuario',
              errors: err,
            });
          }

        if(!usuarioDB){
                return res.status(400).json({
                  ok: false,
                  mensaje: 'Los datos ingresados están incorrectos - correo',
                  errors: err,
                });
        }

        if(!bcrypt.compareSync(body.password, usuarioDB.password)){
                return res.status(400).json({
                  ok: false,
                  mensaje: 'Los datos ingresados están incorrectos - password',
                  errors: err,
                });
        }

        usuarioDB.password=':)';

        res.status(200).json({
            ok: true,
            mensaje: 'Login correcto',
            usuario: usuarioDB,
            id: usuarioDB._id
          });
    });

    
});




module.exports = app;