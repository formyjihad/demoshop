const express = require('express');
let router = express.Router();

const goods = require('../models/good.js');
const file = require('../utils/fileUpload');
const users = require('../models/user.js');
const orders = require('../models/order.js');
const auth = require('../utils/auth')
const {google} = require('googleapis');
const axios = require('axios')
const purchases = require('../models/purchase.js')
const vips = require('../models/vip.js')

router.get('/', (req,res,next)=>{
    if(req.user.status){
        res.status(200).json();
    }else{
        res.send('/signin');
    }
});


router.get('/purchase', (req, res) => {
    let page = req.query.page || 0;
    let limit = 5;
    let offset = page * limit
    orders.find()
    .select({})
    .limit(limit)
    .skip(offset)
    .exec(function(err, order){
        orders.countDocuments().exec(function(err, count){
            res.json({
                order:order,
                limit:limit,
                currentPage:page,
                totalCount:count
            });
        });
    });
});

router.get('/purchase/update', async (req, res) => {
    let id = req.query.orderId;
    //console.log(id)
    try {
        let orderData = await orders.findOne({'_id':id})
        //console.log(orderData)
        res.status(200).json({orderData})
    }catch(err){
        console.error(err)
    }
});


router.post('/purchase/delete', async (req, res) => {
    let orderId = req.body.orderId;
    let index = req.body.index;
    let author = ["deleted by "] //+ admin id 누가 삭제했는가

    try{
        let order = await orders.findOne({"_id":orderId});
        let deleteData = order.orderDetail[index]._id
        let newOrder = await orders.findOneAndUpdate({"_id":orderId},{orderDetail:index},{"orderDetail.$":""});

        //console.log(newOrder)
        res.status(200).json({})
    }catch(err){
        return res.status(204).json({err});
    }
});

router.post('/purchase/status', async(req,res)=>{
    let orderId = req.body.orderId;
    let status = req.body.status;
    try{
        let statusData = await orders.findOneAndUpdate({"_id":orderId},{$set:{status:status}})
        res.status(200).json();

    }catch(err){
        return res.status(204).json({err});
    }
});

router.post('/purchase/editOrder', (req, res)=>{
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
        
        let totalAmountCalc=0
        for(let i=0; i<order.orderDetail.length;i++){
            totalAmountCalc = totalAmountCalc+order.orderDetail[i].price;
        }
        order.totalAmount = totalAmountCalc;

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



//let users = new user();
router.get('/users', (req, res)=>{
    let page = req.query.page || 0;
    let limit = 5;
    let offset = page*limit
    users.find()
    .select({})
    .limit(limit)
    .skip(offset)
    .exec(function(err, user){
        users.countDocuments().exec(function(err, count){
            res.json({
                user:user,
                limit:limit,
                currentPage:page,
                totalCount:count
            });
        });
    });/*
    user.find(function(err, users){
        //limit = limit;
        offset = page * limit;
        if(err) return res.status(500).send({error: 'database failure'});
        res.json({
            totalCount: userCount,
            user: users,
            limit: limit,
            currentPage: page
        });
    });*/
});

router.post('/goods/registry', file.single('img'), async (req,res)=>{
    let good = new goods()
    //console.log(req.body.name)
    //console.log(req.body.price)
    //console.log(req.file.filename)

    good.name = req.body.name;
    good.price = req.body.price;
    good.img = req.file.filename;

    //console.log("this is working?")
    try{
        await good.save()
        res.status(200).json();
    }
    catch(err){
        console.error(err);
        res.status(204).json();
    }
    

});

router.get('/goods', (req,res)=>{
    let page = req.query.page || 0
    let limit = 5;
    let offset = page * limit
    /*let totalCount;
    good.count(function(err,count){
        if(err) return res.status(500).send({error: 'database failure'});
        totalCount = count;
    });*/
    goods.find()
    .select({})
    .limit(limit)
    .skip(offset)
    .exec(function(err, good){
        goods.countDocuments().exec(function(err, count){
            res.json({
                good:good,
                limit:limit,
                currentPage:page,
                totalCount:count
            });
        });
    });
});

function parseDate() {
    let date = new Date()
    let d = date.getDate().toString();
    let m = date.getMonth().toString();
    let y = date.getFullYear().toString();
    let h = date.getHours().toString();
    let n = date.getMinutes().toString();
    let s = date.getSeconds().toString();
    return y+"-"+m+"-"+d
}

router.post('/google', async(req, res)=>{
    let token = await auth()
    let accessToken = token.access_token;
    let tokenType = token.token_type;
    //let expriyDate = token.expiry_date;
    //let refresh_token = token.refresh_token;
    let spreadsheetId = '1s28fRvlw6YHL6nWtcmA3UZ3gTmhEBBtgek4we2XBGYc';
    let range = "SS2018:A1"
    //let url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?access_token=${access_token}?valueInputOption=USER_ENTERED`
    let postUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`
    //let getUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`
    let tokenData = `${tokenType} ${accessToken}`
    let data = req.body
    let values = []
    let value = []
    let nowTime = parseDate()

    try{
        for(let i = 0; i<data.orderDetail.length; i++){
            value.push(data.orderId, nowTime, data.uid, /*data.name,*/"", "", /*data.phoneNumber,*/ data.address)
            //value.push(data.orderDetail[i].type)  //아크릴 상품 타입
            value.push(data.orderDetail[i].printside)
            value.push(data.orderDetail[i].xSize)
            value.push(data.orderDetail[i].ySize)
            //value.push(data.orderDetail[i].bottom)    //바닥부품
            value.push(data.orderDetail[i].thick)
            //value.push(data.orderDetail[i].amount)    //갯수
            //value.push(data.orderDetial[i].subItem)   //부속품
            value.push(data.orderDetail[i].packing)
            value.push(data.totalAmount)
            value.push(data.orderDetail[i].img)
            value.push(data.status)
            values.push(value)
        }
        //console.log(accessToken)
        //const sheets = google.sheets('v4')
        
        let sheetData = await axios({
            url: postUrl,
            method: "post", // POST method
            headers: { "Content-Type": "application/json", 'Authorization':tokenData }, // "Content-Type": "application/json"
            data:{
                values:values
            }
        })
    
        //console.log(sheetData)
        let sheet = JSON.stringify(sheetData.data)
        res.status(200).json({sheet});
    }
    catch(err){
        console.error(err)
        res.status(204).json()
    }
})



module.exports = router;