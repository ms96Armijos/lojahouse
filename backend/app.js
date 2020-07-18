//REQUIRES: importacion de librerias externas
let express = require("express");
let mongoose = require("mongoose");
let cors = require('cors');
mongoose.set('useCreateIndex', true);

//INICIALIZANDO VARIABLES
let app = express();

//CORS
app.use(cors());




//middleware body-parser desde express
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//IMPORTAR RUTAS
let usuarioRutas = require('./rutas/usuario');
let loginRutas = require('./rutas/login');
let inmuebleRutas = require('./rutas/inmueble');
let visitaRutas = require('./rutas/visita');
let busquedaRutas = require('./rutas/busqueda');
let uploadRutas = require('./rutas/upload');
let imagenesRutas = require('./rutas/imagenes');
let appRutas = require('./rutas/app');



//CONEXION A LA BASE DE DATOS
mongoose.connection.openUri("mongodb://localhost:27017/lojahouseDB",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) throw err;
    console.log(
      "Base de datos: \x1b[32m%s\x1b[0m","online"
    );
  }
);

//RUTAS
app.use('/usuario', usuarioRutas);
app.use('/inmueble', inmuebleRutas);
app.use('/visita', visitaRutas);
app.use('/login', loginRutas);
app.use('/busqueda', busquedaRutas);
app.use('/upload', uploadRutas);
app.use('/img',imagenesRutas);
app.use('/', appRutas);


//ESCUCHANDO EL PUERTO
app.listen(3000, () => {
  console.log(
    "Servidor de express en el puerto 3000: \x1b[32m%s\x1b[0m",
    "online"
  );
});
