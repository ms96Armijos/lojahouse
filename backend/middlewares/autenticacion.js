
let jwt = require('jsonwebtoken');
let SEMILLA = require('../config/config').SEMILLATOKEN;


//VERIFICAR TOKEN DEL USUARIO
exports.verificaToken = function(req, res, next){
    let token = req.query.token;
  
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