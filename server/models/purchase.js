const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let purchaseSchema = new Schema({
    count:{
        type:Number,
        default:1
    },
    uid:{
        type:String,
        ref: 'user'
    },
    name:{
        type:String,
        ref: 'good'
    },
    price:{
        type:Number
    }
});

module.exports = mongoose.model('purchase', purchaseSchema);