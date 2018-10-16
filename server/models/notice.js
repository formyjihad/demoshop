const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let noticeSchema = new Schema({
    title : String,
    detail : String,
    num : Number,
});

module.exports = mongoose.model('notice', noticeSchema);