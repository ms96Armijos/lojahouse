let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let servicioSchema = new Schema({
    nombre: {type: String, required: true, unique: true}
});

module.exports = mongoose.model('Servicio', servicioSchema);