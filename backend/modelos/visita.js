let mongoose = require('mongoose');

let Schema = mongoose.Schema;
let inmueble = mongoose.model('Inmueble');
let usuario = mongoose.model('Usuario');

let estadosValidos = {
    values: ['ACEPTADA', 'RECHAZADA'],
    message: '{VALUE} no es un estado permitido'
}

let visitaSchema = new Schema({
    fecha: {type: Date, default: Date.now, required: [true, 'La fecha es necesaria']},
    descripcion: {type: String, required: false},
    estado: {type: String,required:false, enum: estadosValidos},
    inmueble: {type: Schema.Types.ObjectId, ref: 'Inmueble'},
    usuarioarrendatario: {type: Schema.Types.ObjectId, ref: 'Usuario'},
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Visita', visitaSchema);