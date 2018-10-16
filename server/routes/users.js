const express = require('express');
let router = express.Router();
const users = require('../models/user.js')
const { IMP_KEY, IMP_SECRET } = require('../../config/constants');
const cors = require('cors')
const jwt = require('jsonwebtoken')

router.get('/',(req,res,next)=>{
    res.send('/users');
});

router.post('/idCheck', async (req,res)=>{
    let id = req.body.id
    let idData = await users.findOne({"uid":id})
    //console.log(idData);
    if(idData){
        res.status(201).json();
    }else{
        res.status(200).json();
    }
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

router.post('/phoneCheck', async (req,res)=>{
    const impUid = req.body.impUid; // request의 body에서 imp_uid 추출
    const tokenUrl = "https://api.iamport.kr/users/getToken"
    const certUrl = "https://api.iamport.kr/certifications/"+impUid
    try {
        // 인증 토큰 발급 받기
        const getToken = await axios.post(tokenUrl, {
            imp_key: IMP_KEY, // REST API키
            imp_secret: IMP_SECRET // REST API Secret
        });
        const accessToken = getToken.data.response; // 인증 토큰

        // imp_uid로 인증 정보 조회
        const getCertifications = await axios.get(certUrl,{
            headers: { "Authorization": accessToken } // 인증 토큰 Authorization header에 추가
        });
        const certificationsInfo = getCertifications.data.response; // 조회한 인증 정보
        console.log(certificationsInfo)
        //res.status(201).json({}) crtificationsInfo에서 필요한 정보만 전송.
    } catch(e) {
        console.error(e);
    }
});

const passport = require('passport');

router.post('/signin',
    passport.authenticate('local',{
        successRedirect:'/api/users/signin/success',
        failureRedirect:'/api/users/signin/fail'
    })
);

router.get('/auth/google', cors(), passport.authenticate('google', { scope:
    ['profile']}
    )
);

router.get('/auth/google/callback', passport.authenticate( 'google', { failureRedirect: '/api/users/signin/fail' }),
    function(req, res) {
        res.status(200).redirect('/'); 
});

router.get('/session-check', (req, res) =>{
    //console.log(req.user);
    res.status(200).json(req.user);
});

router.get('/signin/success',(req,res)=>{
    console.log("Sign in Success")
    res.status(200).json();
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
