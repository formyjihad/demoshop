<template>
    <div class="container">
        <button class="callEvent" @click="initClient"> CallEvent </button>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    methods:{
        async initClient(){
            /*let url = '/api/users/auth/google'
            try{
                window.open(url)
            }catch(err){
                console.error(err)
            }*/
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
                            "price" : 1, 
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
                        "uid" : "admin", 
                        "totalAmount" : 1, 
                        "orderName":"testhole",
                        "dName":"testhole",
                        "phoneNumber":"000-0000-0000",
                        "totalDiscountAmount":0,
                        "deliveryPrice":0,
                        "postCode":"000-000",
                        "address" : "self self", 
                        "orderId" : 8, 
                        "purchaseId" : "878987", 
                        "status" : "file-confirm", 
                    })
            }catch(err){
                console.error(err)
            }
        }
    }
}
</script>

<style>

</style>
