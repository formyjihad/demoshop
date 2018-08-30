const express = require('express');
let router = express.Router();
const users = require('../models/user.js')
const orders = require('../models/order.js');

router.post('/', (req, res, next)=>{
    let order = new orders();
    if(!req.body){
        return res.status(200).json({msg:"비로그인입니다"});
    }
    /*
    if(req.user.uid==null){
        order.uid = "DN"+Date.now
    }*/
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
    /*if(!req.body){
        return res.status(200).json({msg:"비로그인입니다"});
    }*/
    let order = new orders();
    let index = req.body.index;
    let id = req.body.id;

    let xSize = req.body.xSize;
    let ySize = req.body.ySize;
    let quantity = req.body.quantity;
    let thick = req.body.thick;
    let packing = req.body.packing;
    let subItem = req.body.subItem;
    let printside = req.body.printSide;
    let price = req.body.price;

    
    //console.log(req.body);

    orders.findById(id, function(err, order){
        if(err){
            console.error(err);
            res.status(204).json();
            return;
        }
        order.orderDetail[index].xSize = xSize;
        order.orderDetail[index].ySize = ySize; 
        order.orderDetail[index].subItem = subItem;
        order.orderDetail[index].quantity = quantity;
        order.orderDetail[index].thick = thick;
        order.orderDetail[index].packing = packing;
        order.orderDetail[index].printside = printside;
        order.orderDetail[index].price = price;

        return order.save(function(err, order){
            if(err){
                console.error(err);
                res.json({result:0});
                return;
            }
            //console.log(result)
            res.status(201).json({order});
        });
    });
});

module.exports = router;