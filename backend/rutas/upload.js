let express = require("express");
let fileUpload = require("express-fileupload");
let fs = require("fs");

let Usuario = require("../modelos/usuario");
let Inmueble = require("../modelos/inmueble");

let app = express();
app.use(fileUpload());

app.put("/:tipo/:id", (req, res, next) => {
  let tipo = req.params.tipo;
  let id = req.params.id;

  //TIPOS DE COLECCION
  let tiposValidos = ["usuarios", "inmuebles"];

  if (tiposValidos.indexOf(tipo) < 0) {
    return res.status(400).json({
      ok: false,
      mensaje: "Tipo de coleccion no es valida",
      errors: { message: "Los tipos validas son " + tiposValidos.join(", ") },
    });
  }

  if (!req.files) {
    return res.status(400).json({
      ok: false,
      mensaje: "No seleccionó ninguna imagen",
      errors: { message: "Debe seleccionar una imagen" },
    });
  }

  //OBTENER NOMBRE DEL ARCHIVO
  let archivo = req.files.imagen;
  let nombreCortado = archivo.name.split(".");
  let extensionArchivo = nombreCortado[nombreCortado.length - 1];

  let extensionesValidas = ["png", "jpg", "jpeg"];

  if (extensionesValidas.indexOf(extensionArchivo) < 0) {
    return res.status(400).json({
      ok: false,
      mensaje: "Extension no valida",
      errors: {
        message: "Las extensiones validas son " + extensionesValidas.join(", "),
      },
    });
  }

  //NOMBRE DEL ARCHIVO PERSONALIZADO
  let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;

  //MOVER EL ARCHIVO DEL TEMPORAL A UN PATH ESPECIFICO
  let path = `./uploads/${tipo}/${nombreArchivo}`;

  archivo.mv(path, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al mover archivo",
        errors: { message: err },
      });
    }

    subirFotoPorTipo(tipo, id, nombreArchivo, res);

    /* res.status(200).json({
      ok: true,
      mensaje: "Archivo movido",
      extensionArchivo: extensionArchivo,
    });*/
  });
});

function subirFotoPorTipo(tipo, id, nombreArchivo, res) {
  if (tipo === 'usuarios') {
    Usuario.findById(id, (err, usuario) => {

      if(!usuario){
        return res.status(400).json({
          ok: true,
          mensaje: "Usuario no existe",
          errors: {message: 'Usuario no existe en la Base de Datos'},
        });
      }

      let pathViejo = './uploads/usuarios/' + usuario.imagen;
      console.log( 'imagen ' + pathViejo);
      //si existe imagen, la borra
      if (fs.existsSync(pathViejo)) {
        console.log('eliminando ' + pathViejo);
        fs.unlinkSync(pathViejo);
      }
      
      usuario.imagen = nombreArchivo;
      console.log('nueva foto ' + usuario.imagen);
      usuario.save((err, usuarioActualizado) => {
        usuarioActualizado.password = ':)';
        return res.status(200).json({
          ok: true,
          mensaje: "Imagen de usuario actualizada",
          usuario: usuarioActualizado,
        });
      });
    });
  }
  if (tipo === "inmuebles") {
  }
}

module.exports = app;
