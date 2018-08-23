const express = require('express');
let router = express.Router();

const admin = require('./admin.js');
const goods = require('./goods.js');
const purchase = require('./purchase.js');
const users = require('./users.js');
const cart = require('./cart.js');

router.use('/admin',admin);
router.use('/goods',goods);
router.use('/purchase',purchase);
router.use('/users',users);
router.use('/cart',cart);

module.exports = router;
