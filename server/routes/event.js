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
    .sort({"num":"desc"})
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
router.get('/eventDelete', async(req,res)=>{
    try{
        let event = await events.find()
        res.status(200).json({event})
    }catch(err){
        res.status(201).json()
    }
})
router.post('/eventDelete', async(req,res)=>{
    let targetArray = req.body.targetArray
    let targetDB = await events.find()
    try{
        for(let i=0; i<targetArray.length;i++){
            let target = targetArray[i]
            let deleteTarget = targetDB[target].num
            await events.deleteOne({num:deleteTarget})
        }
        res.status(200).json()
    }catch(err){
        res.status(201).json()
    }
})

router.post('/', file.single('img'), async (req,res)=>{
    let event = new events()
    //console.log(req.body.name)
    //console.log(req.body.price)
    //console.log(req.file.filename)

    event.title = req.body.title;
    event.detail = req.body.detail;
    
    try{
        if(!req.file){
            event.img = null
        }
        else{
            event.img = req.file.filename;
        }

    
        let count = await events.find().count()
        event.num = count+1
    //console.log("this is working?")
    
    //console.log(saveData)
    
        let saveData = await event.save();
        //console.log(saveData);
        res.status(200).json();

    }catch(err){
        console.error(err);
        res.status(204).json()
    }
});
module.exports = router;