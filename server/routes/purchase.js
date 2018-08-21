const express = require('express');
let router = express.Router();
const users = require('../models/user.js')
const orders = require('../models/order.js');
const cors = require('cors')
let order = new orders();
router.post('/', cors(), (req, res, next)=>{
    if(!req.body){
        return res.status(200).json({msg:"비로그인입니다"});
    }

    order.uid = req.user.uid;
    order.name = req.body.name;
    order.price = req.body.price;
    order.xsize = req.body.xsize;
    order.ysize = req.body.ysize; 
    order.thick = req.body.thick;
    order.stand = req.body.stand;
    order.packing = req.body.packing;
    order.printside = req.body.printside;
    
    
    let leftPrice = 0;

    users.findOne({'uid':order.uid})
    .then((result)=>{
        if(result['price'] >= order.price){
            leftPrice = result['price'] - order.price;
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


module.exports = router;