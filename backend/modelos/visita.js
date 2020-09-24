let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let estadosValidos = {
    values: ['ACEPTADA', 'RECHAZADA', 'PENDIENTE'],
    message: '{VALUE} no es un estado permitido'
}

let visitaSchema = new Schema({
    fecha: {type: Date, default: Date.now, required: [true, 'La fecha es necesaria']},
    descripcion: {type: String, required: false},
    estado: {type: String,required:false, default: 'PENDIENTE', enum: estadosValidos},
    inmueble: {type: Schema.Types.ObjectId, ref: 'Inmueble'},
    usuarioarrendatario: {type: Schema.Types.ObjectId, ref: 'Usuario'},
}, {timestamps: true});

module.exports = mongoose.model('Visita', visitaSchema);