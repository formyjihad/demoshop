const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    uid:{
        type: String,
        required:[true, "must need id"]
    },
    password:{
        type: String,
        required:[true, "must need password"]
    },
    status:{
        type:Number,
        defalut:1
    },
    price:{
        type:Number,
        default:0
    },
    purchases:[{type:Schema.Types.ObjectId, ref:'purchase'}]
});

module.exports = mongoose.model('user', userSchema);
