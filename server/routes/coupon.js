const express = require('express');
let router = express.Router();
const file = require('../utils/fileUpload');
const coupons = require('../models/coupon.js');

router.post('/', async (req,res)=>{                                 //api/coupon. mypage 쿠폰 asyncData
    let couponCode = req.body.code;
    let targetAmount = req.body.totalAmount;
    //console.log(req.body)
    let discountAmount =0;
    let userId = req.user.uid
    try{
        if(userId){
            let couponData = await coupons.findOne({code:couponCode})
            //console.log(couponData)
            if(couponData.uid==req.user.uid){
                if(couponData.rate==0){
                    discountAmount = targetAmount - couponData.amount;
                }
                else{
                    discountAmount = targetAmount * (couponData.rate/100)
                }
                //console.log(discountAmount)
                res.status(200).json({discountAmount})
            }
            else{
                res.status(204).json();
            }
        }
    }catch(err){
       console.error(err) 
       res.status(204).json()
    }
    
});

router.get('/', async (req,res)=>{
    if(!req.user){
        res.status(204).json()
    }
    else{
        let uid = req.user.uid;
        let couponCurrent = req.query.page || 0
        let limit = 2;
        let offset = couponCurrent * limit;
        let status = req.user.status;
        try{
            let coupon = await coupons.find({"uid":uid}).limit(limit).skip(offset)
            let count = await coupons.countDocuments()
         
            res.status(200).json({coupon,limit,count,couponCurrent, status})
        }
        catch(err){
            console.error(err)
            res.status(201).json()
        }
    }    
})
/*
let page = req.query.page || 0
    let limit = 5;
    let offset = page * limit;
    try{
        //console.log("checking")
        if(req.user){
            orders.find({"uid":userId})
            .select({})
            .limit(limit)
            .skip(offset)
            .sort({"orderId":"desc"})
            .exec(function(err, order){
                orders.countDocuments().exec(function(err, count){
                    res.json({
                        order:order,
                        limit:limit,
                        currentPage:page,
                        totalCount:count
                    })
                })
            })
        }
    }
*/
module.exports = router;