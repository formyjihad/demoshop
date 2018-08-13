const express = require('express');
let router = express.Router();
const users = require('../models/user.js')
const purchases = require('../models/order');

let purchase = new purchases();
router.post('/', (req, res, next)=>{
    if(!req.body){
        return res.status(200).json({msg:"비로그인입니다"});
    }

    purchase.uid = req.user.uid;
    purchase.name = req.body.name;
    purchase.price = req.body.price;
    
    let leftPrice = 0;

    users.findOne({'uid':purchase.uid})
    .then((result)=>{
        if(result['price'] >= purchase.price){
            leftPrice = result['price'] - purchase.price;
            return purchase.save(function(err, purchase){
                if(err){
                    console.error(err);
                    res.json({result:0});
                    return;
                }
                console.log(result)
                res.status(201).json({purchase});
            });
        }else{
            res.status(204).json({});
        }
    })
    .then((result)=>{
        return users.update({'uid':purchase.uid}, {
            price : leftPrice
        })
    })
});


module.exports = router;