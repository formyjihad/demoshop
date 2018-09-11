const express = require('express');
let router = express.Router();

const file = require('../utils/fileUpload');

router.post('/', file.single('uploadImg'), (req,res,next)=>{
    //console.log('put in a box')
    
    let cartData = [];
    //console.log(req)
    cartData.cart = JSON.parse(req.body.cart);
    cartData.uploadImg = req.file.filename;
    

    req.session.cart = cartData;
    //console.log(cartData);
    //console.log(req.session.cart);
    req.session.save(err =>{
        if(err){
            throw err
        };
        //console.log(req.session.cart);
        res.json(req.session.cart);
    });
    console.log(req.session)
})

router.get('/' , (req, res)=>{
    if(typeof req.session.cart !== 'undefined'){
        console.log("get대기")
        console.log(req.session.cart);
        res.json(req.session.cart);
    } else{
        res.send('no data');
    }
});
    
module.exports = router;