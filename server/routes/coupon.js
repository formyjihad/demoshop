const express = require('express');
let router = express.Router();
const file = require('../utils/fileUpload');
const coupons = require('../models/coupon.js');

router.post('/', async (req,res)=>{
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

module.exports = router;