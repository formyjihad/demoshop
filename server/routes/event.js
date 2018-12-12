const express = require('express');
let router = express.Router();
const file = require('../utils/fileUpload');
const events = require('../models/event.js');

router.get('/', (req,res,next)=>{
    let page = req.query.page || 0
    let limit = 5;
    let offset = page * limit

    events.find()
    .select({})
    .limit(limit)
    .skip(offset)
    .exec(function(err, event){
        events.countDocuments().exec(function(err, count){
            res.json({
                event:event,
                limit:limit,
                currentPage:page,
                totalCount:count
            });
        });
    });
});

router.post('/', file.single('img'), async (req,res)=>{
    let event = new events()
    //console.log(req.body.name)
    //console.log(req.body.price)
    //console.log(req.file.filename)

    event.title = req.body.title;
    event.detail = req.body.detail;
    event.img = req.file.filename;
    //console.log("this is working?")
    
    //console.log(saveData)
    try{
        let saveData = await event.save();
        //console.log(saveData);
        res.status(200).json();

    }catch(err){
        console.error(err);
    }
});
module.exports = router;