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
            let url = '/api/admin/google'
            try{
                let postData = await axios.post(url,{
                    "orderDetail" : [{ 
                        "xSize" : 4, 
                        "ySize" : 4, 
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
                        "address" : "self self", 
                        "orderId" : 8, 
                        "purchaseId" : "5bbb19931596910bac0e36c2", 
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
