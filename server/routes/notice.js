const express = require('express');
let router = express.Router();
const file = require('../utils/fileUpload');
const notices = require('../models/notice.js');

router.get('/', (req,res,next)=>{
    let page = req.query.page || 0
    let limit = 5;
    let offset = page * limit

    notices.find()
    .select({})
    .limit(limit)
    .skip(offset)
    .exec(function(err, notice){
        notices.countDocuments().exec(function(err, count){
            res.json({
                notice:notice,
                limit:limit,
                currentPage:page,
                totalCount:count
            });
        });
    });
});

router.post('/', file.single('img'), async (req,res)=>{
    let notice = new notices()
    //console.log(req.body.name)
    //console.log(req.body.price)
    //console.log(req.file.filename)

    //console.log(req.body)

    notice.title = req.body.title;
    notice.detail = req.body.detail;
    /*if(req.file.filename != undefined){
        notice.img = req.file.filename;
    }*/
    //console.log(notice)

    //console.log("this is working?")
    
    //console.log(saveData)
    try{
        let saveData = await notice.save();
        //console.log(saveData);
        res.status(200).json();

    }catch(err){
        console.error(err);
    }
});
module.exports = router;