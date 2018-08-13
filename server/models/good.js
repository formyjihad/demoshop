const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let goodSchema = new Schema({
    name : String,
    price : Number,
    img : String,
    purchases:[{type:Schema.Types.ObjectId, ref:'purchase'}]
});

module.exports = mongoose.model('good', goodSchema);