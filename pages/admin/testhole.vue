<template>
    <div class="container">
        <button class="callEvent" @click="initClient"> CallEvent </button>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    layout:'admin',

    methods:{
        
        async initClient(){
            let couponData = await axios.get('/api/coupon')
            if(couponData.status == 201||!couponData){
                    alert("error")
                }
                let coupons = couponData.data.coupon.length
                console.log(couponData.data.coupon.length)
            /*
            let date = new Date();
            let purchaseDataTime = date;
            let targetMonth = date.getMonth()-3
            const targetDate = date.getDate().toString();
            let targetYear = date.getFullYear().toString();
            if(targetMonth<0){
                targetMonth = (12+targetMonth).toString();
                targetYear = (date.getFullYear()-1).toString();
            }
            else{
                targetMonth = targetMonth.toString();
            }

            const target = new Date(targetYear+"-"+targetMonth+"-"+targetDate)
            let targetDataTime = target
            console.log(target);
            console.log(date);
            /*let url = '/api/users/auth/google'
            try{
                window.open(url)
            }catch(err){
                console.error(err)
            }
                    //order.uid = req.user.uid;
            order.totalAmount = data.totalAmount;
            order.orderName = data.orderName;
            order.dName = data.dName;
            order.phoneNum = data.phoneNumber;
            order.totalDiscountAmount = data.totalDiscountAmount;
            order.deliveryPrice = data.deliveryPrice;
            order.postCode = data.postCode;
            order.address = data.address;
            order.orderId = data.orderId;
            order.purchaseId = data.purchaseId;
            order.orderDate = nowTime;
            order.count = 3;
            order.status = "ready"
            let url = '/api/purchase/save'
            try{
                let postData = await axios.post(url,{
                    "cart" : [{ 
                        "xsize" : 4,
                            "goodsType":"아크릴 스탠드", 
                            "ysize" : 4, 
                            "thick" : "3mm", 
                            "subItem" : "oppOnly", 
                            "packing" : "noPack", 
                            "printside" : "front", 
                            "quantity" : 1, 
                            "price" : 10000000, 
                            "img" : 
                            "KakaoTalk_20181001_114754625.jpg" 
                        },{ 
                            "xsize" : 4,
                            "goodsType":"아크릴 스탠드", 
                            "ysize" : 4, 
                            "thick" : "3mm", 
                            "subItem" : "oppOnly", 
                            "packing" : "noPack", 
                            "printside" : "front", 
                            "quantity" : 1, 
                            "price" : 1, 
                            "img" : 
                            "KakaoTalk_20181001_114754625.jpg" 
                        }], 
                        "uid" : "testid", 
                        "totalAmount" : 100000001, 
                        "orderName":"testhole",
                        "dName":"testhole",
                        "phoneNumber":"000-0000-0000",
                        "totalDiscountAmount":0,
                        "deliveryPrice":0,
                        "postCode":"000-000",
                        "address" : "self self", 
                        "orderId" : 8, 
                        "purchaseId" : "87898715", 
                        "status" : "file-confirm", 
                        "usePoint":0,
                    })
            }catch(err){
                console.error(err)
            }*/
        }
    }
}
</script>

<style>

</style>
