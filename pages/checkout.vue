<template>
    <div class="section1">
            <div class="section1_box1">
                <h1>장바구니</h1>
            </div>
            <table class="t_wrap">
                <thead>
                    <tr class="t_head">
                        <th class="headName">상품</th>
                        <th class="cols">가격</th>
                        <th class="cols">수량</th>
                        <th class="cols">할인</th>
                        <th class="cols">총계</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="t_body" v-for="cart in cart" :key="cart._id">
                        <td class="bodyName">
                            {{cart.name}}
                        </td>
                        <td class="cols">
                            {{cart.price}}
                        </td>
                        <td class="cols">                    
                            {{cart.quantity}}
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                    </tr>
                </tbody>
            </table>
        <div class = "userInfo">
            <label for="name"> 주문자명</label>
            <input id="name" type="text" v-model="name"><br>
            <label for="email"> 주문자 이메일</label>
            <input id="email" type="email" v-model="email"><br>
            <label for="phone"> 전화번호</label>
            <input id="phone" type="tel" v-model="phone"><br>
        </div>
        
        <div class = "delivery">
            <input type="radio" id = "postoffice" value="postoffice" v-model="delivery">
            <label for = "postoffice">우체국 택배</label>
            <input type="radio" id = "self" value="self" v-model="delivery">
            <label for = "self">직접 수령</label>
        </div>
        <div class = "address" v-if="delivery === 'postoffice'">
            <input type="checkbox" id="loadcheck" @click="loadCheck">
            <label type="loadcheck">주문자와 동일</label>
            <label for="postCode">우편번호</label>
            <input id="postCode" type="text" v-model="postCode" @click="callPostOffice"><br>
            <label for="address">주소</label>
            <input id="address" type="text" v-model="addressData" @click="callPostOffice"><br>
            <label id="addressDetail">상세주소</label>
            <input id="addressDetail" type="text" v-model="addressDetail"><br>
        </div>
        <div class = "payment">
            <p> 결제 방식 </p>
            <input type="radio" id = "card" value="card" v-model="paymentType">
            <label for="card">카드결제</label>
            <input type="radio" id = "cash" value="vbank" v-model="paymentType">
            <label for="cash">현금결제</label>
        </div>
        <button type="button" @click="checkout">결제</button>    
    </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex';
import postOffice from '../components/modals/postOffice.vue'
import {IMP_CODE} from '../config/constants'

export default {
    components:{
        postOffice
    },
    data(){
        return{
            postCode:'',
            addressData:'self',
        }
    },
    computed:{
        cart(){
            return this.cart()
        },
        totalAmount(){
            return this.totalAmount()
        },
        ...mapGetters({
            isLogin:'users/isLogin',
            cart:'carts/cart',
            totalAmount:'carts/totalAmount'
        }),
    },
    props:{
        delivery:{
            default: "self",
            required: true
        },
        address:{
            default : "self",
            required : true
        },
        addressDetail:{
            default : "self",
            required: true
        },
        paymentType:{
            default:"card",
            required:true
        }
    },
    created(){
        this.$store.dispatch('carts/getCart')
        
    },
    beforeMount() {
        IMP.init(IMP_CODE)
    },
    methods:{
        async callPostOffice(){
          this.$modal.show(postOffice,{},{
                height:'auto',
                scrollable:"true"
            })
            this.$nuxt.$on('post-code', data=>{
                this.postCode = data
            })
            this.$nuxt.$on('address-data', data=>{
                this.addressData = data
            })
        },
        async checkout(){
            //console.log(this.totalAmount)
//order 정보 post -> purchase
            let url;
            //console.log(this.cart)
            if(this.isLogin==null){
                console.log("비로그인 감지");
                //let tempid = "DN"+Date.now;
                url = '/api/purchase/noSign'
            }// 비로그인 주문 코드. DN + 현재 시간.
            else{
                url = '/api/purchase'
            }
            let buyerAddress = this.addressData +' '+ this.addressDetail
            let amount = Number(this.totalAmount)
            const orderData = {
                address:buyerAddress,
                cart:this.cart,
                totalAmount:amount,
            }
            
            //console.log(this.paymentType)
            IMP.request_pay({
                pg:'html5_inicis.INIpayTest',
                pay_method:this.paymentType,
                merchant_uid:'merchant_'+ Date.now(),
                name:'주문명:결제테스트',
                amount:amount,
                buyer_email:this.email,
                buyer_name:this.name,
                buyer_tel:this.phone,
                buyer_address:buyerAddress,
                buyer_postcode:this.postCode,
                custom_data:orderData
            }, async function(res){
                
                if(res.success){
                    //alert("구매 완료");
                    let postData = await axios.post(url, {
                //tempid:this.tempid,?
                /*
                        address:this.addressInput,
                        addressDetail:this.addressDetail,
                        cart:this.cart,
                        totalAmount:this.totalAmount,
                        */
                        imp_uid:res.imp_uid,
                        totalAmount:amount
                    });

                    console.log("post 종료");
                    //console.log(postData)
                    if(postData.status == 201){
                        alert('테스트, 구매하였습니다.')
                        url = '/api/purchase/save'
                        //console.log(postData)
                        let saveData = await axios.post(url, {
                            address:res.custom_data.address,
                            cart:res.custom_data.cart,
                            totalAmount:res.custom_data.totalAmount,
                            purchaseId:postData.data.purchase._id,
                            orderId:postData.data.purchase.orderId
                        })
                        //console.log(saveData)
                        location.href = "/checkConfirm/"+postData.data.purchase._id
                    }else if(postData.status == 204){
                        alert('잘못된 정보입니다.');
                    }else if(postData.status == 206){
                        alert('error');
                    }else if(postData.status == 209){
                        alert('클라이언트 변조가 감지되었습니다. 결제를 취소합니다.')
                    }
                }else{
                    alert("구매 실패");
                }
            })
/*
            console.log("post 시작");
            */
        },
        ...mapActions({
            addToCart : 'carts/addToCart',
            updateCart : 'carts/updateCart',
            deleteCart : 'carts/deleteCart'
        })
    }    
}
</script>

<style scoped>


.section1 { 
    width:100%;
    height:750px;
    border:1px solid #000;
    margin-bottom:30px; }

.section1 .check { width:30px; height:600px; float:left; }
.section1 .check input:nth-child(1) 
{ margin-left:20px; margin-top:150px; }
.section1 .check input:nth-child(2) 
{ margin-left:20px; margin-top:250px; }

.section1_box1 { width:95%;
    height:50px; 
    float:right; 
    margin-top:15px;
}
.section1_box1 h1 { font-size:30px; }

.section1 .t_wrap { 
    width:90%; 
    /*height:550px;*/
    margin-left:auto;
    margin-right:auto;
    border-bottom:1px solid #000;
    margin-bottom:20px; 
}

.section1 .t_wrap .t_head { 
    width:100%;
    /*height:50px; */
    border-bottom:1px solid #000;
    line-height:60px;
    margin-left: 30px; 
    text-align: center;
    padding:10px;
}
.section1 .t_wrap .t_head th.headName{
    width:40%;
}
.section1 .t_wrap .t_head th.headCheck{
    width:5%;
    margin-top:auto;
    margin-bottom:auto;
}
.section1 .t_wrap .t_body {
    padding: 10px;
    height: 50px;
    font-size:14px;
    font-weight:900;
    text-align:center;
}

.section1 .t_wrap .t_body td.bodyName{
    width:40%; 
}

.section1 .t_wrap .t_body td.bodyCheck{
    margin-top: auto;
    margin-bottom:auto;
}

.section1 .btn{
    display: inline;
}

.section1 .btn .bt1 {
    display:inline-block;
    width:250px;
    height:50px;
    border:2px solid #000;
    text-align:center;
    line-height:50px;
    overflow:hidden;
    font-weight:900;
    margin-left:55%;
    margin-right:10px;
}

.section1 .t_body .cols .b2_1{
    width:33%;
    height: 100%; 
    border:1px solid #000;
}

.section1 .btn .bt2 { 
    display:inline-block;
    width:250px;
    height:50px;
    border:2px solid #000;
    text-align:center;
    line-height:50px;
    overflow:hidden;
    font-weight:900;
    margin-right:10px;
}


.userInfo { width:100%; height:200px;
        border-bottom:1px solid #000; }
.userInfo h2 {  padding:10px 10px 7px; text-align: left;
    font-size:20px;}
.userInfo p { width:100%; height:35px;
        font-size:14px;text-align: left;
        margin-left:50px; 
        }

</style>
