const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let countSchema = new Schema({
    id:String,
    purchaseCount:Number
});

module.exports = mongoose.model('count', countSchema);