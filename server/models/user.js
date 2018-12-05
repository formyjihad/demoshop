const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    platformName:String,
    userName:{
        type: String, 
        required:[true, "must need name"]
    }, 
    addressData:{
        type: String
    }, 
    addressDetail:{
        type: String
    }, 
    phoneNumber:{
        type: String
    },  
    postCode:{
        type: String
    }, 
    uid:{
        type: String,
        required:[true, "must need id"]
    },
    password:{
        type: String,
    },
    status:{
        type:Number,
        defalut:1
    },
    userEmail:{
        type:String
    },
    point:{
        type:Number,
        default:0
    },
});

module.exports = mongoose.model('user', userSchema);
