const express = require('express');
let router = express.Router();

const file = require('../utils/fileUpload');
const files = require('../models/file.js')

router.post('/', file.single('img'), async(req,res)=>{
    let file = new files();
    
    file.imgId = req.file.filename;

    console.log("this is working?")
    try{
        let fileSave = file.save()
        if(fileSave){
            res.status(200).json({});
        }
    }catch(err){
        console.error(err)
    }
});
/*
router.get('/', async(req, res)=>{
    let imgName = req.body.imgName
    try{
        let fileData = await files.findOne({"imgId":imgName})
        let imgId = fileData.data.imgName

        res.status(200).json({imgId});
    }catch(err){
        console.error(err);
    }
    
})*/
module.exports = router;