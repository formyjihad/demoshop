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
            //console.log(purchase.impUid)
            //purchase.orderId = result.data.response.imp_uid;    
            // 주문번호 필요. 주문번호는 몽고DB에서 만들어주는 ID 말고 다른 ID를 지정해줄 필요성 발생.
            //setTimeout(400);
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
    order.uid = req.user.uid;
    order.totalAmount = req.body.totalAmount;
    order.address = req.body.address;
    order.orderId = req.body.orderId;

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
    let purchaseId = req.query.orderid;
    //console.log(purchaseId);
    try{
        if(req.user.uid){
            let purchase = await purchases.findOne({"orderId":purchaseId})
          //  console.log(purchase);
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
                //let statusUrl = 'https://api.iamport.kr/payments/'+impUid
                let statusData = await axios.get(`https://api.iamport.kr/payments/${impUid}`,{
                    headers: {
                        "Content-Type": "application/json", // "Content-Type": "application/json"
                        "Authorization": author // 발행된 액세스 토큰
                    },
                })
                console.log(statusData)
                console.log(purchase)
                if(statusData.data.response.status == 'ready'){
                    let status = '결제대기'
                    res.status(201).json({purchase,status})
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