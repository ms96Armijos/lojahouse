let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let servicioSchema = new Schema({
    nombre: {type: String, required: true, unique: false}
});

servicioSchema.plugin(uniqueValidator, {message: 'El {PATH} debe ser único'});



module.exports = mongoose.model('Servicio', servicioSchema);