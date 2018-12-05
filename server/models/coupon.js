const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let couponSchema = new Schema({
    code:String,
    uid:String,
    rate:{
        type:Number,
        default:0
    },
    amount:{
        type:Number,
        default:0
    }
});

module.exports = mongoose.model('coupon', couponSchema);