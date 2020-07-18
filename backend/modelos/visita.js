let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let estadosValidos = {
    values: ['VISITADO', 'NOVISITADO'],
    message: '{VALUE} no es un estado permitido'
}

let visitaSchema = new Schema({
    fecha: {type: Date, default: Date.now, required: [true, 'La fecha es necesaria']},
    descripcion: {type: String, required: false},
    estado: {type: String,required:false, default: 'NOVISITADO', enum: estadosValidos},
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'El usuario es necesario']},
    inmueble: {type: Schema.Types.ObjectId, ref: 'Inmueble', required: [true, 'El inmueble es necesario']}
});

module.exports = mongoose.model('Visita', visitaSchema);