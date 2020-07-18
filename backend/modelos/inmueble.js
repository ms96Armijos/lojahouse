let mongoose = require('mongoose');

let Schema = mongoose.Schema;


let estadosValidos = {
    values: ['DISPONIBLE', 'OCUPADO', 'MANTENIMIENTO'],
    message: '{VALUE} no es un estado permitido'
}

let inmuebleSchema = new Schema({
    nombre: {type: String, required: [true, 'El nombre del inmueble es necesario']},
    descripcion: {type: String, required: [true, 'La descripcion del inmueble es necesario']},
    direccion: {type: String, required: [true, 'La direccion del inmueble es necesario']},
    codigo: {type: String, required: [true, 'El codigo del inmueble es necesario']},
    tipoInmueble: {type: String, required: [true, 'El tipo de inmueble es necesario']},
    servicio: {type: Array,default: [], required: [true,'Los servicios que incluyen son necesarios']},
    imagen: {type: Array,default: []},
    precioNormal: {type: Number, required: [true, 'El precioNormal del inmueble es necesario']},
    precioOferta: {type: Number, required: [true, 'El precioOferta del inmueble es necesario']},
    precioAlquiler: {type: Number, required: [true, 'El precioAlquiler del inmueble es necesario']},
    estado: {type: String, required: true, default: 'OCUPADO', enum: estadosValidos},
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuario'}
}, { collation: 'inmuebles'});

module.exports = mongoose.model('Inmueble', inmuebleSchema);