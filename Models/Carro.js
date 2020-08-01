let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let carroSchema = new Schema({
    nome: { type: String, required: true },
    marca: { type: String, required: true },
    ano: { type: String, required: true }

})

module.exports = mongoose.model('Carro', carroSchema)