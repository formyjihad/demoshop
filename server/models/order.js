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

    stand : {
        type: String,
        default:"4cm",
    },
    
    goodsType:{
        type:String
    },

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

    printSide: {
        type: String,
        default: "front",
        required: true
    },
    price:Number,
    quantity:Number,
    design:Number,
});

let orderSchema = new Schema({
    name: String,
    uid: String,
    orderId:Number,
    totalAmount:Number,
    orderDate : {
        type: String,
    },
    address:String,
    orderDetail:{type:[orderDetailSchema], default:[]},
    dName:String,
    postCode:String,
    status: String,
    purchaseId:String,
    orderName:String,
    imgName:String,
    count:Number
});

module.exports = mongoose.model('order', orderSchema);

