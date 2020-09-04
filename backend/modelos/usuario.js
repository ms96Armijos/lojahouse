let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMINISTRADOR', 'ARRENDATARIO', 'ARRENDADOR'],
    message: '{VALUE} no es un rol permitido'
}

let estadosValidos = {
    values: ['1', '0'],
    message: '{VALUE} no es un estado permitido'
}



let usuarioSchema = new Schema({
    nombre: {type: String, required: false},
    apellido: {type: String, required: false},
    correo: {type: String, unique: false},
    password: {type: String, required: false},
    imagen: {type: String, required: false},
    cedula: {type: String, required: false},
    movil: {type: String, required: false},
    convencional: {type: String, required: false},
    estado: {type: String, required:false, default: '1', enum: estadosValidos},
    rol: {type: String, required: true, default: 'ADMINISTRADOR', enum: rolesValidos},
    timestamp: { type: Date, default: Date.now }

});

usuarioSchema.plugin(uniqueValidator, {message: 'El {PATH} debe ser único'});

module.exports = mongoose.model('Usuario', usuarioSchema);