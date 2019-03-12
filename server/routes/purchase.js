const express = require('express');
let router = express.Router();
const users = require('../models/user.js')
const orders = require('../models/order.js');
const purchases = require('../models/purchase.js');
const file = require('../utils/fileUpload');
const { IMP_KEY, IMP_SECRET } = require('../../config/constants');
const axios = require('axios');
const google = require('googleapis')
const auth = require('../utils/auth')
const coupon = require('../models/coupon.js');
const vips = require('../models/vip.js');

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
            //console.log("토큰 취득 실패")
            
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
    }).then(async (result)=>{
        //console.log(result)
        if(result.data.code !== 0){
            //console.log("this error is shit-ass-fuck")
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
            try{
                let count = await purchases.find().select("orderId").limit(1).sort({"orderId":"desc"})      //주문번호 +1을 위해서 가장 마지막 주문번호를 읽어옴
                if(!count[0].orderId){
                    purchase.orderId = 1;
                }
                else if(!count){
                    purchase.orderId = 1;
                }
                else if(count[0].orderId > 0){
                    purchase.orderId = count[0].orderId+1;
                }
            }catch(err){
                console.error(err)
            }
            
            
            if(result.data.response.amount != req.body.totalAmount){
                res.status(209).json();
            }
            else{
                purchase.save(function(err, purchase){
                    if(err){
                        console.error(err);
                        res.status(204).json();
                        return;
                    }
                    res.status(201).json({purchase});
                })
            //console.log(purchase.impUid)
            //purchase.orderId = result.data.response.imp_uid;    
            // 주문번호 필요. 주문번호는 몽고DB에서 만들어주는 ID 말고 다른 ID를 지정해줄 필요성 발생.
            //setTimeout(400);
            // purchase.orderDate =  결제 날짜 필요.
            }
        }
    })
})

router.get('/', async (req,res,next)=>{
    //console.log(req)
    let userId = '';
    if(!req.user){
        res.status(204).json({})
    }
    else{
        userId = req.user.uid;
    }
    
    //console.log(userId)
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
    catch(err){
        console.error(err);
        res.status(500).send(err);
    }
    
    
})

async function sheetPost(values){
    let token = await auth()
    let accessToken = token.access_token;
    let tokenType = token.token_type;
    let spreadsheetId = '1fssu51C4N-0gYkNgM-87DgeM2gVv024Zaws-XS5EnrU';
    let range = "O2019:A1"
    let postUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`
    let tokenData = `${tokenType} ${accessToken}`
    let postValues = values
    
    try{
        let sheetData = await axios({
            url: postUrl,
            method: "post", // POST method
            headers: { "Content-Type": "application/json", 'Authorization':tokenData }, // "Content-Type": "application/json"
            data:{
                values:postValues
            }
        });
    
        //console.log(sheetData);
        let sheet = JSON.stringify(sheetData.data);
        return sheet;
    }
    catch(err){
        console.error(err);
        return;
    }
}

router.post('/save', async (req, res)=>{
    //주문정보 저장
    let order = new orders();
    let values = []
    
    //console.log(req.body.length)
    //console.log("breakpoint2")
    //console.log(req.body)
    let data = req.body
    order.uid = req.user.uid;
    order.totalAmount = data.totalAmount;
    order.orderName = data.orderName;
    order.dName = data.dName;
    order.phoneNum = data.phoneNumber;
    order.totalDiscountAmount = data.totalDiscountAmount;
    order.deliveryPrice = data.deliveryPrice;
    order.postCode = data.postCode;
    order.address = data.address;
    order.orderId = data.orderId;
    order.purchaseId = data.purchaseId;
    order.count = 3;
    order.status = "ready"
    const date = new Date()
    const nowTime = date.getFullYear().toString()+"-"+(date.getMonth()+1).toString()+"-"+date.getDate().toString();
    

    try{
        for(let i=0; i<req.body.cart.length; i++){
            //console.log(order.orderDetail[i].xSize)
            order.orderDetail[i] = data.cart[i]
            let value = []
            value.push(data.orderId, nowTime, data.dName, data.orderName, "", "", data.phoneNumber,data.address)
            value.push(data.cart[i].goodsType)  //아크릴 상품 타입
            value.push(data.cart[i].printside)
            value.push(data.cart[i].xsize)
            value.push(data.cart[i].ysize)
            value.push(data.cart[i].stand)    //바닥부품
            value.push(data.cart[i].thick)
            value.push(data.cart[i].quantity)    //갯수
            value.push(data.cart[i].subItem)   //부속품
            value.push(data.cart[i].packing)
            value.push(data.totalAmount)
            value.push(data.deliveryPrice)
            value.push(order.orderId+"-DesignFile", "", "")
            values.push(value)
        }
        let sheet = await sheetPost(values)
    }catch(err){
        console.error(err);
        res.status(204).json();
    }
    try{
        let findUser = await users.findOne({"uid":order.uid})
        
        let point = 0;
        if(!findUser){
            res.status(204).json();
        }
        else{
            if(data.usePoint == 0){
                point = findUser.point + Math.ceil(data.totalAmount * 0.03)
            }
            else{
                point = findUser.point - data.usePoint
            }
            if(data.couponCode){
                let couponDrop = await coupon.deleteOne({"code":data.couponCode})
            }
            order.orderDate = new Date(nowTime)
            let orderSave = await order.save();
            let userUpdate = await users.findOneAndUpdate({"uid":order.uid},{$set:{"point":point}})
        }
        try{
            //console.log("checking user rate")
            let uid = req.user.uid;
            let totalAmount = data.totalAmount;
            let orderName = data.orderName;
            let findVip = await vips.findOne({"uid":uid});
            
            if(!findVip){
                let date = new Date();
                let purchaseDataTime = new Date(nowTime)
                let targetMonth = date.getMonth()-2     //3개월 구매 금액 확인
                const targetDate = date.getDate().toString();
                let targetYear = date.getFullYear().toString();
                if(targetMonth<0){
                    targetMonth = (12+targetMonth).toString();
                    targetYear = (date.getFullYear()-1).toString();
                }
                else{
                    targetMonth = targetMonth.toString();
                }
    
                const target = new Date(targetYear+"-"+targetMonth+"-"+targetDate)
                let targetDataTime = target
                //console.log(target)
                let findTarget = await orders.find({"uid":uid, "orderDate":{$gt:targetDataTime, $lt:purchaseDataTime}});
                
                let totalTargetPrice=totalAmount;
                let targetPrice =0;
                if(findTarget.length > 0){
                    for(let i=0; i>=findTarget.length;i++){
                        totalTargetPrice = totalTargetPrice+findTarget[i].totalAmount;
                    }
                }
                if(totalTargetPrice>=1000000){
                    let vip = new vips();
                    vip.ttl = 7889400;
                    vip.uid = uid;
                    vip.userName = orderName;
                    let vipStatus = 2
                    vip.status = vipStatus
                    let userSave = await users.findOneAndUpdate({"uid":uid},{$set:{"status":vipStatus}})
                    let vipSave = await vip.save();
                    res.status(201).json({})
                }
                else if(totalTargetPrice>=2000000){
                    let vip = new vips();
                    vip.ttl = 7889400;
                    vip.uid = uid;
                    vip.userName = orderName;
                    let vipStatus = 3
                    vip.status = vipStatus
                    let userSave = await users.findOneAndUpdate({"uid":uid},{$set:{"status":vipStatus}})
                    let vipSave = await vip.save();
                    res.status(202).json({})
                }
                else if(totalTargetPrice<1000000){
                    targetPrice = 1000000 - totalTargetPrice
                    res.status(200).json({targetPrice})
                }
            }else{
                let dateData = new Date()
                let month = dateData.getMonth()+1;
                let targetMonthOne = month - 1;
                let targetMonthThree = month - 3
                let day = dateData.getDate();
                let year = dateData.getFullYear();
                if(targetMonthOne<=0){
                    year = year-1
                    targetMonthOne = targetMonthOne+12
                }
                if(targetMonthThree<=0){
                    year = year-1
                    targetMonthThree = targetMonthThree+12
                }
                let purchaseDataTime = new Date(nowTime);
                let targetOneDataTime = new Date(year+"-"+targetMonthOne+"-"+day);
                let targetThreeDataTime = new Date(year+"-"+targetMonthThree+"-"+day);
                
                let findTargetOneMonth = await orders.find({"uid":uid, "orderDate":{$gt:targetOneDataTime, $lt:purchaseDataTime}});
                let findTargetThreeMonth = await orders.find({"uid":uid, "orderDate":{$gt:targetThreeDataTime, $lt:purchaseDataTime}});
                let totalTargetPriceOne=totalAmount;
                let totalTargetPriceThree=totalAmount;
                let targetPrice =0;
                if(findTargetOneMonth.length > 0){
                    for(let i=0; i>=findTargetOneMonth.length;i++){
                        totalTargetPriceOne = totalTargetPriceOne+findTargetOneMonth[i].totalAmount;
                    }
                }
                if(findTargetThreeMonth.length > 0){
                    for(let i=0; i>=findTargetThreeMonth.length;i++){
                        totalTargetPriceThree = totalTargetPriceThree+findTargetThreeMonth[i].totalAmount;
                    }
                }
                if(findVip.status==2){
                    if(totalTargetPriceOne >= 2000000){
                        let vipStatus = findVip.status + 1
                        let vipSave = await vips.findOneAndUpdate({"_id":findVip._id},{$set:{"status":vipStatus, ttl:7889400}});
                        let userSave = await users.findOneAndUpdate({"uid":uid},{$set:{"status":vipStatus}})
                        res.status(300).json({})
                    }
                    if(totalTargetPriceThree>=1500000){
                        let vipsave = await vips.findOneAndUpdate({"_id":findVip._id},{$set:{ttl:7889400}});
                        res.status(301).json({})
                    }
                    else if(totalTargetPriceThree<1500000){
                        targetPrice = 1500000 - totalTargetPrice
                        res.status(304).json({targetPrice})
                    }
                }
                else if(findVip.status==3){
                    if(totalTargetPriceThree>=3000000){
                        let vipsave = await vips.findOneAndUpdate({"_id":findVip._id},{$set:{ttl:7889400}});
                        res.status(302).json({})
                    }
                    else if(totalTargetPriceThree<3000000){
                        targetPrice = 3000000 - totalTargetPrice
                        res.status(304).json({targetPrice})
                    }
                }
                
            }
        }catch(err){
            console.error(err);
            res.status(204).json()
        }
    }
    catch(err){
        console.error(err);
        res.status(400).json();
    }
    
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

router.post('/checkStatus', async(req,res)=>{
    let purchaseId = req.body.purchaseId;  //5bb6e96ed3476b1b8cb70833
    let impUid;
    try{
        //console.log("checking")
        if(req.user.uid){
            let purchase = await purchases.findById(purchaseId)
            if(!purchase.impUid){
                res.status(204).json({});
            }
            impUid = purchase.impUid;
            
        }
    }
    catch(err){
        console.error(err);
        res.status(204).json({});
    }
    try{
        let tokenData = await axios.post("https://api.iamport.kr/users/getToken", {
            imp_key: IMP_KEY, // REST API키
            imp_secret: IMP_SECRET // REST API Secret
        })
        //console.log(tokenData)
        if(tokenData.data.code !== 0){
            //console.log("토큰 취득 실패")
            
            res.status(204).json({});
        }else{
            //console.log(result)
            // //console.log(impUid)
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
            let orderData = await orders.findOneAndUpdate({"purchaseId":purchaseId},{$set:{status:statusData.data.response.status}})
            if(orderData.status == 'ready'){
                let status = '결제대기'
                res.status(201).json({status})
            }
            else if(orderData = 'paid'){
                let status = '도안 업로드 대기'
                res.status(201).json({status})
            }
        }
    }
    catch(err){
        console.error(err)
        res.status(204).json(err)
    }
})

router.post('/updateStatus', async(req,res)=>{
    let purchaseId = req.body.purchaseId;
    let status = req.body.statusUpdate
    try{
        //console.log(purchaseId);
        //console.log(status)
        let updateData = await orders.findOneAndUpdate({purchaseId:purchaseId}, {$set:{status:status}})
        //console.log(updateData)
        res.status(200).json();
    }catch(err){
        console.error(err)
        res.status(204).json();
    }
})

router.get('/checkOrder', async (req, res)=>{
    let purchaseId = req.query.id;
    console.log(purchaseId)
    try{
        let purchase = await purchases.findOne({"_id":purchaseId})
        console.log("checking")
        console.log(req.user.uid)
        if(req.user.uid == purchase.uid){
            //console.log(purchase);
            let orderData = await orders.findOne({"purchaseId":purchaseId})
            res.status(200).json({orderData, purchase})
        }
    }
    catch(err){
        console.error(err);
        res.status(500).send(err);
    }
})

router.post('/webhook', async(req, res)=>{
    
    let postData = req.body

    let impUid = postData.imp_uid;
    let status = postData.status;

    try{
        
        let tokenData = await axios.post("https://api.iamport.kr/users/getToken", {
            imp_key: IMP_KEY, // REST API키
            imp_secret: IMP_SECRET // REST API Secret
        })
        //console.log(tokenData)
        if(tokenData.data.code !== 0){
            //console.log("토큰 취득 실패")
            
            res.status(204).json({});
        }else{
            //console.log(result)
            // //console.log(impUid)
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

            let findOrder = await purchases.findOne({"impUid":impUid});
            let orderId = findOrder.orderId
            if(findOrder.price === statusData.data.response.amount){
                await orders.findOneAndUpdate({"orderId":orderId},{$set:{"status":status}});
                await purchases.findOneAndUpdate({"impUid":impUid},{$set:{"status":status}});
            }else{
                res.status(204).json({message:"위조된 결제 시도"})
            }

            
            res.status(200).json();
        }
    }catch(err){
        console.error(err)
        res.status(400).json();
    }
});

module.exports = router;