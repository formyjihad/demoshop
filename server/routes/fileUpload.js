const express = require('express');
let router = express.Router();

const file = require('../utils/fileUpload');
const orders = require('../models/order.js')
const axios = require('axios');
const google = require('googleapis')
const auth = require('../utils/auth')

async function sheetPost(target, values){
    let token = await auth()
    let accessToken = token.access_token;
    let tokenType = token.token_type;
    let spreadsheetId = '1s28fRvlw6YHL6nWtcmA3UZ3gTmhEBBtgek4we2XBGYc';
    let range = "SS2018:T1"
    let batchUpdateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`
    let tokenData = `${tokenType} ${accessToken}`
    let targetValues = target
    let postValues = values
    
    try{
        let updateData = await axios.post(batchUpdateUrl,{
            requests:{
                findReplace: {
                    find: targetValues,
                    matchEntireCell: true,
                    range: {
                        sheetId:0
                    },
                    replacement: postValues
                }
            }},
            {
                headers:{ "Content-Type": "application/json", 'Authorization':tokenData },
        })
        //console.log(updateData);
        let sheet = JSON.stringify(updateData.data);
        return sheet;
    }
    catch(err){
        console.error(err);
        return;
    }
}

router.post('/order', file.single('img'), async(req,res)=>{
    let purchaseId = req.body.purchaseId;
    //console.log(purchaseId)
    
    let imgName = "+domain+" + req.file.filename;
    try{
        let orderData = await orders.findOne({"purchaseId":purchaseId})
        //console.log(orderData)
        let targetValues = '';
        if(orderData.count==3){
            targetValues = orderData.orderId + "-DesignFile"
        }
        else{
            targetValues = orderData.imgName
        }
        
        orderData.imgName = imgName;    //도메인 주소로 변경하여 API 호출하기
    
        let sheet = await sheetPost(targetValues,imgName)
//        //console.log("this is working?")
        
        let updateData = await orderData.save();
        let updateCount = await orders.findOneAndUpdate({"purchaseId":purchaseId},{$inc:{count:-1}})
        //console.log(updateCount)
        let count = updateCount.count
        res.status(200).json({count})
    }
    catch(err){
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