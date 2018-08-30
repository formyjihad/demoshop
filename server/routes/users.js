const express = require('express');
let router = express.Router();
const users = require('../models/user.js')

router.get('/',(req,res,next)=>{
    res.send('/users');
});

router.post('/signup',(req,res,next)=>{
    let user = new users();
    user.uid = req.body.uid;
    user.password = req.body.password;
    user.price = req.body.price;
    user.status = 1;
    users.findOne({'uid':user.uid})
    .then(result =>{
        if(!result){
            user.save(function(err){
                if(err){
                    console.error(err);
                    res.json({result:0});
                    return;
                }
                res.status(201).json({result:1});
            });
        }else{
            //console.error(result);
            res.status(200).json({result:0});
            //return;
        }
    });
});

const passport = require('passport');

router.post('/signin',
    passport.authenticate('local',{
        successRedirect:'/api/users/signin/success',
        failureRedirect:'/api/users/signin/fail'
    })
);

router.get('/session-check', (req, res) =>{
    //console.log(req.user);
    res.status(200).json(req.user);
});

router.get('/signin/success',(req,res)=>{
    console.log("Sign in Success")
    res.status(200).json({});
});

router.get('/signin/fail',(req,res)=>{
    console.log("Sign in Fail")
    res.status(204).json({});
});

router.put('/signout', (req,res)=>{
    req.logout();
    res.status(201).json({});
});

module.exports = router;
