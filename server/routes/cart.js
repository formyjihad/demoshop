const express = require('express');
let router = express.Router();

const file = require('../utils/fileUpload');

router.post('/', (req,res,next)=>{
    //console.log('put in a box')
    
    let cartData = [];
    //console.log(req.body)

    req.session.cart = req.body;
    //console.log(cartData);
    //console.log(req.session.cart);
    req.session.save(err =>{
        if(err){
            throw err
        };
        //console.log(req.session.cart);
        res.json(req.session.cart);
    });
    //console.log(req.session)
})

router.get('/' , (req, res)=>{
    if(typeof req.session.cart !== 'undefined'){
        const resData = req.session.cart;
        res.json(resData);
    } else{
        res.send('no data');
    }
});
    
module.exports = router;