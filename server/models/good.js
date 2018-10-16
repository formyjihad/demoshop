const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let goodSchema = new Schema({
    name : String,
    price : Number,
    img : String,
});

module.exports = mongoose.model('good', goodSchema);