const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let eventSchema = new Schema({
    title : String,
    detail : String,
    num : Number,
    img : String
});

module.exports = mongoose.model('event', eventSchema);