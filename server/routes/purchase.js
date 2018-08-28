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
                console.log(result)
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
/*
    order.uid = req.user.uid;
    order.name = req.body.name;
    order.price = req.body.price;
    order.quantity = req.body.quantity;
    order.xsize = req.body.xsize;
    order.ysize = req.body.ysize; 
    order.thick = req.body.thick;
    order.stand = req.body.stand;
    order.packing = req.body.packing;
    order.printside = req.body.printside;
    order.goodsid = req.body.goodsid;*/
    

    users.findOne({'uid':order.uid})
    .then((result)=>{
        if(result['price'] >= order.price){
            return order.update(function(err, order){
                if(err){
                    console.error(err);
                    res.json({result:0});
                    return;
                }
                console.log(result)
                res.status(201).json({order});
            });
        }else{
            res.status(204).json({});
        }
    })
});


module.exports = router;