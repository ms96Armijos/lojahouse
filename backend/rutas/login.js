let express = require("express");
let bcrypt = require("bcryptjs");
let jwt = require('jsonwebtoken');
let SEMILLA = require('../config/config').SEMILLATOKEN;

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
                  mensaje: 'Los datos ingresados están incorrectos',
                  errors: err,
                });
        }

        if(usuarioDB.estado === '0'){
          return res.status(400).json({
            ok: false,
            mensaje: 'Tu cuenta ha sido bloqueada, comunícate con el administrador para más información',
            errors: err,
          });
        }

        //DATOS QUE SE ENVIAN AL GENERAR EL TOKEN
        payload= {
          _id: usuarioDB._id,
          nombre: usuarioDB.nombre,
          apellido: usuarioDB.apellido,
          cedula: usuarioDB.cedula,
          movil: usuarioDB.movil,
          convencional: usuarioDB.convencional,
          correo: usuarioDB.correo,
          imagen: usuarioDB.imagen,
          estado: usuarioDB.estado,
          rol: usuarioDB.rol
        }


        if(!bcrypt.compareSync(body.password, usuarioDB.password)){
                return res.status(400).json({
                  ok: false,
                  mensaje: 'Los datos ingresados están incorrectos',
                  errors: err,
                });
        }

        usuarioDB.password='';

        //CREANDO UN TOKEN

        let tokenUsuario = jwt.sign({usuario: payload}, SEMILLA, {expiresIn: 28800}); //DURACION DE 8 HORAS EL TOKEN

        res.status(200).json({
            ok: true,
            mensaje: 'Login correcto',
            usuario: payload,
            token: tokenUsuario,
            id: usuarioDB._id,
            menu: obtenerMenu(payload.rol)
          });
    });
});


function obtenerMenu(ROL){

  let menu1 =  {
    titulo: 'Arrendador',
    icono: 'mdi mdi-account',
    submenu: [
      { titulo: ' Dashboard', url: '/dashboard' },
      { titulo: ' Gestión de Inmuebles ', url: '/inmuebles' },
      { titulo: ' Gestión de visitas ', url: '/visitas' },
      { titulo: ' Gestión de Contratos de Alquiler ', url: '/vercontrato' },
      { titulo: ' Alquilar inmueble ', url: '/publicados' }
    ],
  };

  let menu2 = {
    titulo: 'Arrendatario',
    icono: 'mdi mdi-account-outline',
    submenu: [
      { titulo: ' Gestión de visitas ', url: '/visitas-arrendatario' },
      { titulo: ' Gestión de Contratos de Alquiler ', url: '/contratoarrendatario' },
    ],
  };


  let menu3 = {
    titulo: 'Configuraciones',
    icono: 'mdi mdi-account-settings-variant',
    submenu: [
      { titulo: 'Usuarios', url: '/usuarios' },
      { titulo: 'Servicios', url: '/servicios' }
    ]
  };


  var menu = [];
  
  if(ROL === 'ADMINISTRADOR'){
    menu[0] = Object(menu1);
    menu[1] = Object(menu2);
    menu[2] = Object(menu3);
  }
  if(ROL === 'ARRENDADOR'){
    menu[0] = Object(menu1);
  }
  if(ROL === 'ARRENDATARIO'){
    menu[0] = Object(menu2);
  }
 

  return menu;

}
module.exports = app;