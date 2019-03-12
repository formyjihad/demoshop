const express = require('express');                     //익스프레스 로드
let router = express.Router();                          //익스프레스에서 사용할 라우터

const admin = require('./admin.js');                    //admin
const goods = require('./goods.js');                    //goods
const purchase = require('./purchase.js');
const users = require('./users.js');
const cart = require('./cart.js');
const notice = require('./notice.js');
const event = require('./event.js');
const fileUpload = require('./fileUpload.js');
const passport = require('passport');
const orderCheck = require('./orderCheck.js');
const coupon = require('./coupon.js');
const post = require('./post.js');

router.use('/admin',passport.authenticate('jwt',{session:false}),admin);        // /api/admin 을 받으면 이걸 사용한다.
//router.use('/admin',admin);
router.use('/orderCheck', orderCheck);                                          // /api/orderCheck 를 받으면 이걸 사용한다.
router.use('/goods',goods);                                          // /api/goods 를 받으면 이걸 사용한다.
router.use('/purchase',purchase);
router.use('/users',users);
router.use('/cart',cart);
router.use('/post',post);
router.use('/notice',notice);
router.use('/event',event);
router.use('/fileUpload',fileUpload);
router.use('/coupon',coupon);

module.exports = router;
