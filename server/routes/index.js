const express = require('express');
let router = express.Router();

const admin = require('./admin.js');
const goods = require('./goods.js');
const purchase = require('./purchase.js');
const users = require('./users.js');

router.use('/admin',admin);
router.use('/goods',goods);
router.use('/purchase',purchase);
router.use('/users',users);

module.exports = router;
