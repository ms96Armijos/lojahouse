let mongoose = require('mongoose');

let Schema = mongoose.Schema;


let estadosValidos = {
    values: ['DISPONIBLE', 'OCUPADO'],
    message: '{VALUE} no es un estado permitido'
}

let publicadoValidos = {
    //0=no publicado y 1=publicado
    values: [1,0],
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
    garantia: {type: Number},
    estado: {type: String, required: true, default: 'OCUPADO', enum: estadosValidos},
    publicado: {type: String, required: true, default: 0, enum: publicadoValidos},
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuario'}
}, { collation: 'inmuebles'});

module.exports = mongoose.model('Inmueble', inmuebleSchema);