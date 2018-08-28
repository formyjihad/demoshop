const express = require('express');
let router = express.Router();
const users = require('../models/user.js')
const orders = require('../models/order.js');

let order = new orders();
router.post('/', (req, res, next)=>{
    if(!req.body){
        return res.status(200).json({msg:"비로그인입니다"});
    }

    order.uid = req.user.uid;
    order.totalAmount = req.body.totalAmount;
    order.address = req.body.address;
    order.addressDetail = req.body.addressDetail;

    for(let i=0; i<req.body.cart.length; i++){
        //console.log(order.orderDetail[i].xSize)
        order.orderDetail[i] = req.body.cart[i]
    }
    

    let leftPrice = 0;

    users.findOne({'uid':order.uid})
    .then((result)=>{
        if(result['price'] >= order.totalAmount){
            leftPrice = result['price'] - order.totalAmount;
            return order.save(function(err, order){
                if(err){
                    console.error(err);
                    res.json({result:0});
                    return;
                }
                //console.log(result)
                res.status(201).json({order});
            });
        }else{
            res.status(204).json({});
        }
    })
    .then((result)=>{
        return users.update({'uid':order.uid}, {
            price : leftPrice
        })
    })
});

router.post('/editOrder', (req, res, next)=>{
    if(!req.body){
        return res.status(200).json({msg:"비로그인입니다"});
    }
    let index = req.body.index;
    let id = req.body.id;
    
    let orderData = order.orderDetail;
    console.log(orderData[index]);
    
    orderData.quantity = req.body.quantity;
    orderData.thick = req.body.thick;
    orderData.packing = req.body.packing;
    orderData.printside = req.body.printside;
    orderData.price = req.body.price;

    console.log(order.orderDetail)
/*
    order.update(function(err, order){
        if(err){
            console.error(err);
            res.json({result:0});
            return;
        }
        //res.status(201).json({order});
    });*/
});

module.exports = router;