let mongoose = require('mongoose');

let Schema = mongoose.Schema;
let inmueble = mongoose.model('Inmueble');
let usuario = mongoose.model('Usuario');

let estadosValidos = {
    values: ['VISITADO', 'NOVISITADO'],
    message: '{VALUE} no es un estado permitido'
}

let visitaSchema = new Schema({
    fecha: {type: Date, default: Date.now, required: [true, 'La fecha es necesaria']},
    descripcion: {type: String, required: false},
    estado: {type: String,required:false, default: 'NOVISITADO', enum: estadosValidos},
    inmueble: {type: Schema.Types.ObjectId, ref: 'Inmueble'},
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuario'}
});

module.exports = mongoose.model('Visita', visitaSchema);