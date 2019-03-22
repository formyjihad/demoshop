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
    .sort({"num":"desc"})
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

router.get('/noticeDelete', async(req, res)=>{      // function (req, res){}
    try{
        let notice = await notices.find()            //notices DB에서 찾는다.
        res.status(200).json({notice})
    }catch(err){
        console.error(err)
        res.status(201).json()
    }
})

router.post('/noticeDelete', async(req, res)=>{
    let targetArray = req.body.targetArray
    let targetDB = await notices.find()
    //targetArray = [0 || 1 || 0,1]
    try{
        for(let i =0;i<targetArray.length;i++){
            let target = targetArray[i]
            let deleteTarget = targetDB[target].num
            await notices.deleteOne({num:deleteTarget})
        }
        res.status(200).json()
    }catch(err){
        console.error(err)
        res.status(201).json()
    }
})

router.post('/', file.single('img'), async (req,res)=>{
    let notice = new notices()
    //console.log(req.body.name)
    //console.log(req.body.price)
    //console.log(req.file.filename)

    //console.log(req.body)

    notice.title = req.body.title;
    notice.detail = req.body.detail;
    let count = await notices.find().count()
    notice.num = count+1
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