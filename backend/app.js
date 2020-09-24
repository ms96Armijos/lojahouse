//REQUIRES: importacion de librerias externas
let express = require("express");
let mongoose = require("mongoose");
let cors = require('cors');
mongoose.set('useCreateIndex', true);
const morgan = require('morgan');
const helmet = require('helmet');



//INICIALIZANDO VARIABLES
let app = express();


//CORS
app.use(cors());
app.use(helmet());


//middleware body-parser desde express
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//app.use(morgan('dev'));


//IMPORTAR RUTAS
let usuarioRutas = require('./rutas/usuario');
let loginRutas = require('./rutas/login');
let cambiarPassword = require('./rutas/cambiarPassword');
let reseteoPassword = require('./rutas/reseteoPassword');
let inmuebleRutas = require('./rutas/inmueble');
let desactivarInmueble = require('./rutas/desactivarinmueble');
let aceptarVisita = require('./rutas/aceptarvisita');
let servicioRutas = require('./rutas/servicio');
let contratoRutas = require('./rutas/contrato');
let inmueblePublico = require('./rutas/inmueblepublico');
let usuario_visitas_solicitada = require('./rutas/usuario_visitas_solicitadas');
let inmueble_publicado = require('./rutas/inmueble_publicado');
let contrato_arrendatario = require('./rutas/contratos_arrendatario');
let desactivarUsuario = require('./rutas/desactivarusuario');

let enviarmensajes = require('./rutas/enviarmensajes');


let visitaRutas = require('./rutas/visita');
let busquedaRutas = require('./rutas/busqueda');
let buscarUsuario = require('./rutas/usuario_buscarusuario');
let uploadRutas = require('./rutas/upload');
let imagenesRutas = require('./rutas/imagenes');
let appRutas = require('./rutas/app');



//CONEXION A LA BASE DE DATOS
mongoose.connection.openUri("mongodb://localhost/lojahouseDB",
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
app.use('/servicio', servicioRutas);
app.use('/contrato', contratoRutas);
app.use('/visita', visitaRutas);

app.use('/inmueblepublico', inmueblePublico);
app.use('/visitasolicitada', usuario_visitas_solicitada);
app.use('/inmueblepublicado', inmueble_publicado);
app.use('/contratoarrendatario',contrato_arrendatario);
app.use('/desactivarusuario', desactivarUsuario);

app.use('/mensaje',enviarmensajes);

app.use('/login', loginRutas);
app.use('/password', cambiarPassword);
app.use('/resetpassword', reseteoPassword);
app.use('/desactivarinmueble',desactivarInmueble);
app.use('/aceptarvisita',aceptarVisita);
app.use('/busqueda', busquedaRutas);
app.use('/buscarusuario', buscarUsuario);
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
