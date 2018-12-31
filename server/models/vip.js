const mongoose = require('mongoose');
const ttl = require('mongoose-ttl');

let Schema = mongoose.Schema;

let vipSchema = new Schema({
    userName:{
        type: String, 
    }, 
    uid:{
        type: String,
        required:[true, "must need id"]
    },
    status:{
        type:Number,
        default:1
    }
})

vipSchema.plugin(ttl)
module.exports = mongoose.model('vip', vipSchema);
