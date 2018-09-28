const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let orderDetailSchema = new Schema({
    xSize: {
        type: Number,
        default: 4,
        required: true,
        validator: function(value) {
            return value >= 0;
        }
    },
    ySize: {
        type: Number,
        default: 4,
        required: true,
        validator: function(value) {
        return value >= 0;
        }
    },
    thick: {
        type: String,
        default: "3mm",
        required: true
    },

    stand : Number,

    subItem: {
        type: String,
        default: "oppOnly",
        required: true
    },

    packing: {
        type: String,
        default: "noPack",
        required: true
    },

    printside: {
        type: String,
        default: "front",
        required: true
    },
    price:Number,
    quantity:Number
});

let orderSchema = new Schema({
    name: String,
    uid: String,
    orderId:Number,
    totalAmount:Number,
    orderDate : {
        type: Date,
        default:Date.now
    },
    address:String,
    orderDetail:{type:[orderDetailSchema], default:[]},
    img:String,
    status: String,
    purchaseId:String
});

module.exports = mongoose.model('order', orderSchema);

