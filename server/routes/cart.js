const express = require('express');
let router = express.Router();
let cookieParser = require('cookie-parser');

router.post('/', (req,res,next)=>{
    console.log('put in a box')
    console.log(req.body.id);
    let cart = req.body;

    req.session.cart = cart;

    req.session.save(err =>{
        if(err){
            throw err
        };

        res.json(req.session.cart)
    });
})

router.get('/' , (req, res)=>{
    if(typeof req.session.cart !== 'undefined'){
        res.json(req.session.cart);
    } else{
        res.send('no data');
    }
});
    
module.exports = router;