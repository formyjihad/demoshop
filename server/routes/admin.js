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
    });/*
    purchase.find(function(err, purchase){
        //limit = limit;
        offset = page * limit;
        if(err) return res.status(500).send({error: 'database failure'});
        res.json({
            totalCount: purchaseCount,
            purchase: purchase,
            limit:limit,
            currentPage : page
        });
    });*/
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
let good = new goods()
router.post('/goods/registry', file.single('img'), (req,res,next)=>{
    
    console.log(req.body.name)
    console.log(req.body.price)
    console.log(req.file.filename)

    good.name = req.body.name;
    good.price = req.body.price;
    good.img = req.file.filename;

    console.log("this is working?")
    good.save(function(err){
        if(err){
            console.error(err);
            res.json({result:0});
            return;
        }
        res.json({result:1});
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