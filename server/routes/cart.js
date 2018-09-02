const express = require('express');
let router = express.Router();

const file = require('../utils/fileUpload');

router.post('/', file.single('img'), (req,res,next)=>{
    //console.log('put in a box')
    
    let cartData = req.body
    cartData.cart = JSON.parse(req.body.cart);

    req.session.cart = cartData;
    //console.log(req.session.cart);
    req.session.save(err =>{
        if(err){
            throw err
        };
        //console.log(req.session.cart);
        res.json(req.session.cart);
    });
})

router.get('/' , (req, res)=>{
    if(typeof req.session.cart !== 'undefined'){
        //console.log("get대기")
        //console.log(req.session.cart);
        res.json(req.session.cart);
    } else{
        res.send('no data');
    }
});
    
module.exports = router;