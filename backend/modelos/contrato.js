let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let acuerdoValidos = {
    values: ['ACEPTADO', 'RECHAZADO'],
    message: '{VALUE} no es un estado permitido'
}


let estadoValidos = {
    values: ['VIGENTE', 'BORRADOR', 'TERMINADO'],
    message: '{VALUE} no es un estado permitido'
}


let contratoSchema = new Schema({
    nombrecontrato: {type: String},
    fechainicio: {type: Date, required: true},
    fechafin: {type: Date, required: true},
    tiempocontrato: {type: Number},
    monto: {type: Number, required: true},
    estado: {type: String, enum: estadoValidos},
    acuerdo: {type: String, enum: acuerdoValidos},
    inmueble: {type: Schema.Types.ObjectId, ref: 'Inmueble'},
    usuarioarrendador: {type: Schema.Types.ObjectId, ref: 'Usuario'},
    usuarioarrendatario: {type: Schema.Types.ObjectId, ref: 'Usuario'},
}, {timestamps: true});

module.exports = mongoose.model('Contrato', contratoSchema);