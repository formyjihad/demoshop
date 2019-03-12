const express = require('express');
let router = express.Router();
const goods = require('../models/good.js');

router.get('/', (req,res,next)=>{           // /api/goods/
    let page = req.query.page || 0
    let limit = 5;
    let offset = page * limit

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

router.get('/detail', (req,res) => {
    let id = req.query.goodsId;
    //console.log(req.query)

    goods.findOne({'_id':id})
    .then((result)=>{
        res.json(result);
    });
});

module.exports = router;
