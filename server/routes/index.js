const express = require('express');
let router = express.Router();

const admin = require('./admin.js');
const goods = require('./goods.js');
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

router.use('/admin',passport.authenticate('jwt',{session:false}),admin);
//router.use('/admin',admin);
router.use('/orderCheck', orderCheck);
router.use('/goods',goods);
router.use('/purchase',purchase);
router.use('/users',users);
router.use('/cart',cart);
router.use('/post',post);
router.use('/notice',notice);
router.use('/event',event);
router.use('/fileUpload',fileUpload);
router.use('/coupon',coupon);

module.exports = router;
