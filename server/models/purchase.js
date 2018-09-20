const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let purchaseSchema = new Schema({
    bankName:{
        type:String
    },
    bankNum:{
        type:Number
    },
    bankHolder:{
        type:String
    },
    orderId:{
        type:Number
    },
    orderDate:{
        type:String
    },
    uid:{
        type:String,
    },
    name:{
        type:String,
    },
    price:{
        type:Number
    }
});

module.exports = mongoose.model('purchase', purchaseSchema);