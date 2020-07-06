let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROL', 'ARRENDATARIO_ROL', 'ARRENDADOR_ROL'],
    message: '{VALUE} no es un rol permitido'
}



let usuarioSchema = new Schema({
    nombre: {type: String, required: [true, 'Los nombres son necesarios']},
    apellido: {type: String, required: [true, 'Los apellidos son necesarios']},
    correo: {type: String, unique:true, required: [true, 'El correo es necesario']},
    password: {type: String, required: false},
    imagen: {type: String, required: false},
    cedula: {type: String, required: false},
    movil: {type: String, required: [true, 'El número de celular es necesario']},
    convencional: {type: String, required: false},
    estado: {type: String,required:false, default: 'DESACTIVADO'},
    rol: {type: String, required: true, default: 'ADMIN_ROL', enum: rolesValidos}

});

usuarioSchema.plugin(uniqueValidator, {message: 'El {PATH} debe ser único'});

module.exports = mongoose.model('Usuario', usuarioSchema);