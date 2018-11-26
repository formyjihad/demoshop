const express = require('express');
let router = express.Router();

const file = require('../utils/fileUpload');
const orders = require('../models/order.js')

router.post('/order', file.single('img'), async(req,res)=>{
    let orderId = req.body.orderid;
    console.log(orderId);
    let imgName = req.file.filename;
    let orderData = await orders.findOne({"_id":orderId})
    orderData.imgName = imgName;

    console.log("this is working?")
    try{
        let update = await orderData.save();
        res.status(200).json({})
    }catch(err){
        console.error(err)
        res.status(204).json();
    }
});
/*
router.get('/', async(req, res)=>{
    let imgName = req.body.imgName
    try{
        let fileData = await files.findOne({"imgId":imgName})
        let imgId = fileData.data.imgName

        res.status(200).json({imgId});
    }catch(err){
        console.error(err);
    }
    
})*/
module.exports = router;