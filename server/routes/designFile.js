const express = require('express');
let router = express.Router();
const axios = require('axios')

router.get('/:id', async(req,res)=>{
    let orderId = req.params.id;
    let url = '../uploads/'+orderId
    let orderData = await axios.get(url)

    //console.log(orderData);
    let getData = orderData.data
    res.send(getData);
})

module.exports = router;