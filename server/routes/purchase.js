const express = require('express');
let router = express.Router();
const users = require('../models/user.js')
const orders = require('../models/order.js');
const file = require('../utils/fileUpload');
const { IMP_KEY, IMP_SECRET } = require('../../config/constants');
const axios = require('axios');


router.post('/', (req, res)=>{
    
    const impUid = req.body.imp_uid;
    axios({
        url: "https://api.iamport.kr/users/getToken",
        method: "post", // POST method
        headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
        data: {
            imp_key: IMP_KEY, // REST API키
            imp_secret: IMP_SECRET // REST API Secret
        }
    }).then((result) =>{
        if(result.data.code !== 0){
            console.log("토큰 취득 실패")
            
            res.status(204).json({});
        }else{
            console.log(result)
            console.log(impUid)
            const author = "Bearer "+result.data.response.access_token
            console.log(author)
            axios({
                url: 'https://api.iamport.kr/payments/'+impUid,
                method: "get", // GET method
                headers: {
                    "Content-Type": "application/json", // "Content-Type": "application/json"
                    "Authorization": author // 발행된 액세스 토큰
                }
            }).then((result)=>{
                console.log(result)
                if(result.data.code !== 0){
                    console.log("this error is shit-ass-fuck")
                    
                    res.status(204).json({});/*
                    let order = new orders();
                    if(!req.body){
                        return res.status(200).json({msg:"비로그인입니다"});
                    }
                    order.uid = req.user.uid;
                    order.totalAmount = req.body.totalAmount;
                    order.address = req.body.address;
                    order.addressDetail = req.body.addressDetail;
                    //order.img = req.file.filename;
                    
                    for(let i=0; i<req.body.length; i++){
                        //console.log(order.orderDetail[i].xSize)
                        //order.orderDetail[i] = req.body.cart[i]
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
                    })*/
                }
                else{
                    console.log(result)
                    res.status(201).json(result);
                }
            })
        }
    })
});

router.post('/noSign', (req, res)=>{
    let order = new orders();

    order.uid = "DN"+Date.now()   // 고유 ID api 호출
    order.totalAmount = req.body.totalAmount;
    order.address = req.body.address;
    order.addressDetail = req.body.addressDetail;

    for(let i=0; i<req.body.cart.length; i++){
        //console.log(order.orderDetail[i].xSize)
        order.orderDetail[i] = req.body.cart[i]
    }

    order.save(function(err, order){
        if(err){
            console.error(err);
            res.json({result:0});
            return;
        }
        res.status(201).json({order});
    });
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

module.exports = router;