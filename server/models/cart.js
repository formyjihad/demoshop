const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let cartSchema = new Schema({
    name: String,
    uid: String,
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

    orderDate : {
        type: Date,
        default:Date.now
    },

    address : String,
    price : Number,
    img : String
});

module.exports = mongoose.model('cart', cartSchema);