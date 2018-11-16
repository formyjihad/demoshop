<template>
    <div class="section1">
        <div class="wrap4">
            <div class="section1_box1">
                <h1>주문 결제</h1>
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
                            {{cart.price*cart.quantity+(cart.design*5500)}}
                        </td>
                        <td class="cols">                    
                            {{cart.quantity}}
                        </td>
                        <td>
                            {{(cart.price*cart.quantity+(cart.design*5500))*(discountRate/100)}}
                        </td>
                        <td>
                            {{(cart.price*cart.quantity+(cart.design*5500))-(cart.price*cart.quantity+(cart.design*5500))*(discountRate/100)}}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class = "userInfo">
                <h3>주문자 정보</h3>
                <table>
                    <tr>
                        <td>주문자명</td>
                        <td>{{userName}}</td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td>{{email}}</td>
                    </tr>
                    <tr>
                        <td>전화번호</td>
                        <td>{{phoneNumber}}</td>
                    </tr>
                </table>
            </div>
        <!--
            <input id="name" type="text" v-model="name"><br>
            <label for="email"> 주문자 이메일</label>
            <input id="email" type="email" v-model="email"><br>
            <label for="phone"> 전화번호</label>
            <input id="phone" type="tel" v-model="phone"><br>
        -->
        <div class = "delivery">
            <div class="header">
                <h3>배송지 정보</h3>
                <label><input type="checkbox" id="self" @click="selfDelivery" />직접수령</label>
            </div>
            <div class="body">
                <label><input type="radio" id="userAdd" v-model="deliveryType" value="userAddress"/>기본 배송지</label>
                <label><input type="radio" id="newAdd" v-model="deliveryType" value="newAddress"/>신규 배송지</label>
            </div>
            <div class = "address" v-if="deliveryType=='newAddress'">
                <input id="d-name" type="text" v-model="dName" placeholder="주문자 성명"><br>
                <input id="d-phoneNumber" type="text" v-model="dPhoneNumber" placeholder="주문자 전화번호"><br>
                <input id="d-email" type="email" v-model="dMail" placeholder="주문자 이메일"><br>
                <input id="postCode" type="text" v-model="dPostCode" @click="callPostOffice" autocomplete="off" placeholder="우편번호"><br>
                <input id="address" type="text" v-model="dAddressData" @click="callPostOffice" autocomplete="off" placeholder="주소"><br>
                <input id="addressDetail" type="text" v-model="dAddressDetail" placeholder="상세주소"><br>
            </div>
            <div class = "address" v-else-if="deliveryType=='userAddress'">
                <input id="username" type="text" v-model="userName" placeholder="주문자 성명" disabled><br>
                <input id="userPhoneNum" type="text" v-model="phoneNumber" placeholder="주문자 전화번호" disabled><br>
                <input id="d-email" type="email" v-model="email" placeholder="주문자 이메일" disabled><br>
                <input id="postCode" type="text" v-model="postCode" placeholder="우편번호" disabled><br>
                <input id="address" type="text" v-model="addressData" placeholder="주소" disabled><br>
                <input id="addressDetail" type="text" v-model="addressDetail" placeholder="상세주소" disabled><br>
            </div>
        </div>
        <div class="promotion">
            <div class="promo_left">
                <h3>할인</h3>
                <p>쿠폰</p>
                <!--<input type="text" @change="checkPromo">-->
                <p>마일리지</p>
                <p>TEST</p>
                <!--{{point}}-->
            </div>
            <div class="promo_right">
                <h3>금액</h3>
                <table>
                    <tr>
                        <td>총금액</td>
                        <td>{{totalAmount}}</td>
                    </tr>
                 
                    <tr>
                        <td>배송비</td>
                        <td>3500</td>
                    </tr>
                    <tr>
                        <td>할인 금액</td>
                        <td>{{totalDiscountAmount}}</td>
                    </tr>
                    <!--<p>{{salePrice}}</p>-->
                    <tr>
                        <td>결제 금액</td>
                        <td>{{totalAmount + 3500 - totalDiscountAmount}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class = "payment">
            <h3> 결제 방식 </h3>
            <label><input type="radio" id = "card" value="card" v-model="paymentType">카드결제</label>
            <label><input type="radio" id = "cash" value="vbank" v-model="paymentType">현금결제</label>
        </div>
        <div class="confirm">
            <div class="confirmBtn" @click="checkout">결제</div>
        </div>
        </div>    
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
            dName:"배송자 성함",
            dPhoneNumber:"배송자 휴대전화",
            dMail:"배송자 이메일 주소",
            dPostCode:"배송자 우편번호",
            dAddressData:"배송자 주소",
            dAddressDetail:"배송자 상세 주소",
            discountRate:0
        }
    },
    async asyncData(){
        try{
            let url = '/api/users/checkinfo'
            let checkData = await axios.get(url);
            let userData = checkData.data.userData
            if(userData){
                return{
                    addressData:userData.addressData,
                    addressDetail:userData.addressDetail,
                    phoneNumber:userData.phoneNumber,
                    email:userData.userEmail,
                    userName:userData.userName,
                    postCode:userData.postCode,
                    uid:userData.userid,
                }
            }
        }catch(err){
            console.error(err)
        }
    },
    computed:{
        cart(){
            return this.cart()
        },
        totalAmount(){
            return this.totalAmount()
        },
        totalDiscountAmount(){
            return this.totalDiscountAmount()
        },
        ...mapGetters({
            isLogin:'users/isLogin',
            cart:'carts/cart',
            totalAmount:'carts/totalAmount',
            totalDiscountAmount:'carts/totalDiscountAmount'
        }),
    },
    props:{
        
        deliveryType:{
            default: "userAddress",
            required: true
        },
        paymentType:{
            default:"card",
            required:true
        }
    },
    async created(){
        let url = '/api/users/statusCheck'
        let discountData = await axios(url);
        this.discountRate=discountData.data.rate;
        for(let i = 0; i<this.cart.length;i++ ){
            this.updateDiscount({
                index:i,
                unit:this.discountRate,
                cart:this.cart
            });
        }
        this.$store.dispatch('carts/getCart')
        
    },
    beforeMount() {
        IMP.init(IMP_CODE)
    },
    methods:{
        selfDelivery(){
            
            if(this.deliveryType == 'newAddress'){
                this.dAddressData = 'self'
                this.dAddressDetail = 'self'
            }
            else if(this.deliveryType == 'userAddress'){
                this.addressData = 'self'
                this.addressDetail = 'self'
            }
        },
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
            let buyerAddress = ''
            let amount = Number(this.totalAmount)-Number(this.totalDiscountAmount)+3500
            const date = new Date()
            const month = date.getMonth()+1;
            const day = date.getDay();
            const year = date.getFullYear();
            const nowTime = year+"-"+month+"-"+day;
            let name = this.userName
            let phone = this.phoneNumber
            let mail = this.email
            let pCode = ''
            let adsData = ''
            let adsDetail = ''
            
            if(this.deliveryType == 'newAddress'){
                pCode = this.dPostCode;
                buyerAddress = this.dAddressData +' '+ this.dAddressDetail
            }
            else if(this.deliveryType == 'userAddress'){
                pCode = this.postCode;
                buyerAddress = this.addressData +' '+ this.addressDetail;
            }

            const orderData = {
                orderName:name,
                dName:this.dName,
                postCode:pCode,
                address:buyerAddress,
                cart:this.cart,
                price:this.totalAmount,
                totalAmount:amount,
                totalDiscountAmount:this.totalDiscountAmount,
            }
            
            //console.log(this.paymentType)
            IMP.request_pay({
                pg:'html5_inicis.INIpayTest',
                pay_method:this.paymentType,
                merchant_uid:'merchant_'+ Date.now(),
                name:'주문명:결제테스트',
                amount:amount,
                buyer_email:mail,
                buyer_name:name,
                buyer_tel:phone,
                buyer_address:buyerAddress,
                buyer_postcode:pCode,
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

                    //console.log("post 종료");
                    //console.log(postData)
                    if(postData.status == 201){
                        alert('테스트, 구매하였습니다.')
                        url = '/api/purchase/save'
                        //console.log(postData)
                        let saveData = await axios.post(url, {
                            orderName:res.custom_data.orderName,
                            dName:res.custom_data.dName,
                            postCode:res.custom_data.postCode,
                            address:res.custom_data.address,
                            cart:res.custom_data.cart,
                            price:res.custom_data.price,
                            totalAmount:res.custom_data.totalAmount,
                            totalDiscountAmount:res.custom_data.totalDiscountAmount,
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
.wrap4 { width:80%; height:100%; margin:auto; }

.section1 { 
    width:100%;
    height:750px;
    margin-bottom:30px; }

.section1 .check { width:30px; height:600px; float:left; }
.section1 .check input:nth-child(1) 
{ margin-left:20px; margin-top:150px; }
.section1 .check input:nth-child(2) 
{ margin-left:20px; margin-top:250px; }

.section1_box1 { width:100%;
    height:50px; 
    margin-top:15px;
}
.section1_box1 h1 { font-size:30px; }

.section1 .t_wrap { 
    width:100%; 
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
.userInfo h3 { 
    
    padding:10px 10px 7px; 
    float:left;
    width:100%;
    font-size:20px;
    height:35px;
}
.userInfo table{
    width:50%; height:35px;
    font-size:14px;text-align: left;
    margin-left:50px; 
}

.delivery { width:100%; height:280px;
    border-bottom:1px solid #000; }
.delivery .header { width:100%; }
.delivery .header h3 { 
    padding:10px 10px 7px; 
    float:left;
    font-size:20px;
    height:35px;}
.delivery .header #loadUser { margin-top:15px; }
.delivery .header label { margin-top:15px; margin-right:5px; font-size:14px; }
.delivery .body { width:100%; height:30px; clear: both; margin-left:15px;}
.delivery .address input{
    margin-left:20px
}
.promotion { width:100%; height:200px;
    border-bottom:1px solid #000; }
.promotion .promo_left { width:50%; height:100%; float:left; text-align: left;}
.promotion .promo_left h3 { 
    padding:10px 10px 7px; 
    float:left;
    width:100%;
    font-size:20px;
    height:35px;}
.promotion .promo_left p { padding-left:15px; font-size:14px; margin-bottom:2px; }
.promotion .promo_left input{
    margin-bottom:3px
}
.promotion .promo_right { width:50%; height:100%; float:left; text-align: left; }
.promotion .promo_right h3 { 
    padding:10px 10px 7px;
    width:100%; 
    float:left;
    font-size:20px;
    height:35px;}
.promotion .promo_right table { font-size:14px; margin-left:15px; margin-bottom:5px;}
.payment{
    width:100%; height:100px; border-bottom:1px solid #000; 
}
.payment h3 { 
    padding:10px 10px 7px;
    width:100%; 
    float:left;
    font-size:20px;
    height:35px;
}
.payment label { margin-top:15px; margin-right:5px; font-size:14px; }

.confirm {
    width:100%; height:100px; overflow:hidden;
}
.confirmBtn {
    width:100px; height:30px; background-color:#000; color:#fff; font-size:14px; text-align:center; line-height:30px; margin:15px auto 0; cursor:pointer;
}
</style>
