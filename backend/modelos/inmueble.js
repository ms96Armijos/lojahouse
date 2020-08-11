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
    codigo: {type: String},
    tipo: {type: String, required: [true, 'El tipo de inmueble es necesario']},
    precioalquiler: {type: Number, required: [true, 'El precio de alquiler del inmueble es necesario']},
    servicio: {type: Array,default: []},
    imagen: {type: Array,default: []},
    precionormal: {type: Number},
    preciooferta: {type: Number},
    garantia: {type: Number},
    estado: {type: String, required: true, default: 'OCUPADO', enum: estadosValidos},
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuario'}
}, { collation: 'inmuebles'});

module.exports = mongoose.model('Inmueble', inmuebleSchema);