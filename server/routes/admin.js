const express = require('express');
let router = express.Router();

const goods = require('../models/good.js');
const file = require('../utils/fileUpload');
const users = require('../models/user.js');
const orders = require('../models/order.js');


router.get('/', (req,res,next)=>{
    res.send('/admin');
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

router.get('/purchase/update', (req, res) => {
    let id = req.query.orderId;
    orders.findOne({'_id':id})
    .then((result) =>{
        res.json({order:result});
    });
});


router.post('/purchase/delete', async (req, res) => {
    let orderId = req.body.orderId;
    let index = req.body.index;
    let author = ["deleted by "] //+ admin id 누가 삭제했는가

    try{
        let order = await orders.findOne({"_id":orderId});
        let deleteData = order.orderDetail[index]._id
        let newOrder = await orders.findOneAndUpdate({"_id":orderId},{orderDetail:index},{"orderDetail.$":""});

        console.log(newOrder)
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

router.post('/goods/registry', file.single('img'), (req,res)=>{
    let good = new goods()
    console.log(req.body.name)
    console.log(req.body.price)
    console.log(req.file.filename)

    good.name = req.body.name;
    good.price = req.body.price;
    good.img = req.file.filename;

    console.log("this is working?")
    good.save(function(err, good){
        if(err){
            console.error(err);
            res.status(204).json();
            return;
        }
        console.log(good)
        res.status(200).json({});
    });
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



module.exports = router;