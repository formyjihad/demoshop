const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let fileSchema = new Schema({
    imgId : String,
    num : Number,
});

module.exports = mongoose.model('file', fileSchema);