const express = require('express');
let router = express.Router();
const users = require('../models/user.js')
const orders = require('../models/order.js');
const purchases = require('../models/purchase.js');
const counts = require('../models/count.js');
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
            //console.log(result)
            //console.log(impUid)
            const author = "Bearer "+result.data.response.access_token
            //console.log(author)
            return axios({
                url: 'https://api.iamport.kr/payments/'+impUid,
                method: "get", // GET method
                headers: {
                    "Content-Type": "application/json", // "Content-Type": "application/json"
                    "Authorization": author // 발행된 액세스 토큰
                }
            })
        }
    }).then((result)=>{
        //console.log(result)
        if(result.data.code !== 0){
            console.log("this error is shit-ass-fuck")
            res.status(204).json({});
        }
        else{
            //결제정보 저장
            let purchase = new purchases();
            let id = "purchaseId";
            
            purchase.bankName = result.data.response.vbank_name;
            purchase.bankNum = result.data.response.vbank_num;
            purchase.bankHolder = result.data.response.vbank_holder;
            purchase.uid = req.user.uid;
            purchase.name = result.data.response.buyer_name;
            purchase.price = result.data.response.amount;
            purchase.impUid = result.data.response.imp_uid;
            console.log(req.body.totalAmount)
            console.log(result.data.response.amount)
            if(result.data.response.amount != req.body.totalAmount){
                res.status(209).json();
            }
            else{
                counts.findOneAndUpdate({"id":id},{$inc:{"purchaseCount":1}},function(err, count){
                    //console.log(count)
                    if(err){
                        console.error(err)
                    }
                    else{
                        //console.log("success");
                        purchase.orderId = count.purchaseCount;
                        //console.log(purchase)
                        return purchase.save(function(err, purchase){
                            if(err){
                                console.error(err);
                                res.status(204).json();
                                return;
                            }
                            res.status(201).json({purchase});
                        })
                    }
                })
            }
            //console.log(purchase.impUid)
            //purchase.orderId = result.data.response.imp_uid;    
            // 주문번호 필요. 주문번호는 몽고DB에서 만들어주는 ID 말고 다른 ID를 지정해줄 필요성 발생.
            //setTimeout(400);
            // purchase.orderDate =  결제 날짜 필요.
        }
    })
})

router.get('/', (req,res,next)=>{
    //console.log(req)
    let userId = req.user.uid;
    console.log(userId)
    let page = req.query.page || 0
    let limit = 5;
    let offset = page * limit;
    
    orders.find({"uid":userId})
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
            })
        })
    })
})


router.post('/save', (req, res)=>{
    //주문정보 저장
    let order = new orders();
    //console.log(req.body.length)
    //console.log("breakpoint2")
    //console.log(req.body)
    order.uid = req.user.uid;
    order.totalAmount = req.body.totalAmount;
    order.address = req.body.address;
    order.orderId = req.body.orderId;
    order.purchaseId = req.body.purchaseId;
    order.status = "file-confirm"

    //console.log(req.body.cart[0])
    for(let i=0; i<req.body.cart.length; i++){
        //console.log(order.orderDetail[i].xSize)
        order.orderDetail[i] = req.body.cart[i]
    }

    users.findOne({'uid':order.uid})
    .then((result)=>{
        if(!result){
            //leftPrice = result['price'] - order.totalAmount;
            res.status(204).json({});
        }else{
            order.save(function(err, order){
                if(err){
                    console.error(err);
                    res.json({result:0});
                    return;
                }
                //console.log(result)
                res.status(201).json({order})
            });
        }
    })
    //console.log(result.data.response);
    //console.log(purchase);
    //res.status(201).json();
})

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

router.get('/checkOrder', async (req, res)=>{
    let purchaseId = req.query.id;  //5bb6e96ed3476b1b8cb70833
    //console.log(purchaseId);
    try{
        console.log("checking")
        if(req.user.uid){
            let purchase = await purchases.findOne({"_id":purchaseId})
            console.log(purchase);
            let impUid = purchase.impUid;
                        
            let tokenData = await axios.post("https://api.iamport.kr/users/getToken", {
                imp_key: IMP_KEY, // REST API키
                imp_secret: IMP_SECRET // REST API Secret
            })
            //console.log(tokenData)
            if(tokenData.data.code !== 0){
                console.log("토큰 취득 실패")
                
                res.status(204).json({});
            }else{
                //console.log(result)
               // console.log(impUid)
                //console.log(tokenData.data.response.access_token)
                const author = "Bearer "+tokenData.data.response.access_token
                //console.log(author)
                let statusUrl = 'https://api.iamport.kr/payments/'+impUid
                let statusData = await axios.get(statusUrl,{
                    headers: {
                        "Content-Type": "application/json", // "Content-Type": "application/json"
                        "Authorization": author // 발행된 액세스 토큰
                    },
                })
                console.log(statusData)
                console.log(purchase)
                if(statusData.data.response.status == 'ready'){
                    let status = '결제대기'
                    res.status(201).json({purchase, status})
                }
                else if(statusData.data.response.status = 'paid'){
                    let status = '결제확인'
                    res.status(201).json({purchase, status})
                }
            }
        }
    }
    catch(err){
        return res.status(500).send(err);
    }
})

module.exports = router;