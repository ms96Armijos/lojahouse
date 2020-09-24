
let jwt = require('jsonwebtoken');
let SEMILLA = require('../config/config').SEMILLATOKEN;

let Inmueble = require("../modelos/inmueble");
let Visita = require("../modelos/visita");


//VERIFICAR TOKEN DEL USUARIO
exports.verificaToken = async function(req, res, next){
    let token = req.query.token;


   /* try {
      const {_id} = await jwt.verify(token, SEMILLA);
      const user = await Usuario.findOne({_id, estado:'1'});

      if(user){
        return user._id;
      }else{
        return false;

      }
    } catch (error) {
      next(e);
    }*/
  
    jwt.verify(token, SEMILLA, (err, decode) => {
  
      if (err) {
        return res.status(401).json({
          ok: false,
          mensaje: "Tu token ha finalizado, por favor inicia sesión nuevamente",
          errors: err,
        });
      }

      req.usuario = decode.usuario;
      next();
    });
}

//VERIFICAR ROL
exports.verificaRol = async function(req, res, next){

  let usuario = req.usuario;

  if(usuario.rol == 'ADMINISTRADOR'){
      next();
      return;
  }else{
  
      return res.status(401).json({
        ok: false,
        mensaje: "Tu token es incorrecto, no puedes acceder",
        errors: {message: 'Acceso no autorizado'}
      });
  
  }
}

//VERIFICAR ROL O MISMO USUARIO
exports.verificaMismoUsuarioRol = async function(req, res, next){

  let usuario = req.usuario;
  let id = req.params.id;


  if(usuario.rol === 'ADMINISTRADOR' || usuario._id === id){
      next();
      return;
  }else{
  
      return res.status(401).json({
        ok: false,
        mensaje: "Tu token es incorrecto, no puedes acceder",
        errors: {message: 'Acceso no autorizado'}
      });
  
  }
}

//VERIFICAR ROL DE QUIEN PUEDE PUBLICAR INMUEBLES
/*exports.verificaMismoUsuarioRol = async function(req, res, next){

  let usuario = req.usuario;
  let id = req.params.id;


  if(usuario.rol == 'ARRENDADOR' || usuario._id === id){
      next();
      return;
  }else{
  
      return res.status(401).json({
        ok: false,
        mensaje: "Tu token es incorrecto, no puedes acceder",
        errors: {message: 'Acceso no autorizado'}
      });
  
  }
}*/


//VERIFICAR ROL O MISMO USUARIO
exports.usuarioActivo = async function(req, res, next){

  let usuario = req.usuario;


  if(usuario.estado == '1'){
      next();
      return;
  }else{
  
      return res.status(401).json({
        ok: false,
        mensaje: "El usuario ha sido inhabilitado",
        errors: {message: 'Acceso no autorizado'}
      });
  
  }
}

//actualizar Solo El Mismo Arrendador
exports.actualizarSoloElMismoArrendador = async function(req, res, next){

  let usuario = req.usuario;
  let id = req.params.id;

  const inmueble = await Inmueble.findById(id);

  if(inmueble.usuario != usuario._id){
    return res.status(401).json({
      ok: false,
      mensaje: "Tu token ha finalizado, por favor inicia sesión nuevamente",
      errors: {message: 'Lo siento'},
    });
  }

    if(inmueble){
      console.log('acceso')
      req.inmueble = inmueble;
      next();
    }
  

  /*if(usuario.rol == 'ADMINISTRADOR' || usuario._id === id){
      next();
      return;
  }else{
  
      return res.status(401).json({
        ok: false,
        mensaje: "Tu token es incorrecto, no puedes acceder",
        errors: {message: 'Acceso no autorizado'}
      });
  
  }*/
}

//validar Contrato
exports.validarVisita = async function(req, res, next){

  let usuario = req.usuario;
  let id = req.params.id;

  const visitaObtenida = await Visita.findById(id);

  const inmueble = await Inmueble.findById(visitaObtenida.inmueble);

  //console.log('visita: '+ inmueble)

  if(inmueble.usuario != usuario._id){
    return res.status(401).json({
      ok: false,
      mensaje: "Tu token ha finalizado, por favor inicia sesión nuevamente",
      errors: {message: 'Lo siento'},
    });
  }

    if(visitaObtenida){
      console.log('acceso')
      req.visita = visitaObtenida;
      next();
    }
}
