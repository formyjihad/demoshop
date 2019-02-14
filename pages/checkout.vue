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
                            {{cart.goodsType}}
                        </td>
                        <td class="cols">
                            {{cart.price*cart.quantity}}
                        </td>
                        <td class="cols">                    
                            {{cart.quantity}}
                        </td>
                        <td>
                            {{Math.ceil((cart.price*cart.quantity)*(discountRate/100))}}
                        </td>
                        <td>
                            {{(cart.price*cart.quantity)-Math.ceil((cart.price*cart.quantity)*(discountRate/100))}}
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
                <table>
                    <tr>
                        <td>배송자명</td>
                        <td><input id="d-name" type="text" v-model="dName" placeholder="주문자 성명"></td>
                    </tr>
                    <tr>
                        <td>연락처</td>
                        <td><input id="d-phoneNumber" type="text" v-model="dPhoneNumber" placeholder="주문자 전화번호"></td>
                    </tr>    
                    <tr>
                        <td>이메일</td>
                        <td><input id="d-email" type="email" v-model="dMail" placeholder="주문자 이메일"></td>
                    </tr>
                    <tr>
                        <td>우편번호</td>
                        <td><input id="postCode" type="text" v-model="dPostCode" @click="callPostOffice" autocomplete="off" placeholder="우편번호"></td>
                    </tr>
                    <tr>
                        <td>주소</td>
                        <td><input id="address" type="text" v-model="dAddressData" @click="callPostOffice" autocomplete="off" placeholder="주소"></td>
                    </tr>
                    <tr>
                        <td>상세주소</td>
                        <td><input id="addressDetail" type="text" v-model="dAddressDetail" placeholder="상세주소"></td>
                    </tr>
                </table>        
            </div>
            <div class = "address" v-else-if="deliveryType=='userAddress'">
                <table>
                    <tr>
                     <td>배송자명</td>
                     <td><input id="username" type="text" v-model="userName" placeholder="주문자 성명" disabled></td>
                    </tr>
                    <tr>
                     <td>연락처</td>
                     <td><input id="userPhoneNum" type="text" v-model="phoneNumber" placeholder="주문자 전화번호" disabled></td>
                    </tr>
                    <tr>
                     <td>이메일</td>
                     <td><input id="d-email" type="email" v-model="email" placeholder="주문자 이메일" disabled></td>
                     </tr>
                    <tr>
                     <td>우편번호</td>
                     <td><input id="postCode" type="text" v-model="postCode" placeholder="우편번호" disabled></td>
                    </tr>
                    <tr>
                     <td>주소</td>
                     <td><input id="address" type="text" v-model="addressData" placeholder="주소" disabled></td>
                    </tr>
                    <tr>
                     <td>상세주소</td>
                     <td><input id="addressDetail" type="text" v-model="addressDetail" placeholder="상세주소" disabled></td>
                    </tr>
                </table>    
            </div>
        </div>
        <div class="promotion">
            <div class="promo_left">
                <div><h3>할인</h3> </div>
                <form class="coupon" @submit.prevent="checkCoupon"><p>쿠폰</p><input type="text" v-model="couponCode"><button type="submit">코드입력</button></form>
                <!--<input type="text" @change="checkPromo">-->
                <div class="Mileage"><p>내 마일리지</p><id class="num">{{point}}</id></div>
                <div class="m_Mileage"><p>사용할 마일리지</p><input type="number" min=0 :max="point" v-model="usePoint" @input="changePoint"></div>
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
                        <td>{{deliveryPrice}}</td>
                    </tr>
                    <tr>
                        <td>할인 금액</td>
                        <td>{{totalDiscountAmount+couponDiscount+usePoint}}</td>
                    </tr>
                    <!--<p>{{salePrice}}</p>-->
                    <tr>
                        <td>결제 금액</td>
                        <td>{{fullPrice}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="agreementBody">
            <div class="agreement">
                <agreement/>
            </div>
            <p class="c9">
                <span class="c4">
                    <input type="checkbox" class="checked" @click="checkboxEvent">개인정보 수집 및 이용에 동의합니다.
                </span>
            </p>
            <div class="package">
                <h5 class="c6" id="h.9c8ckh7l0dgg">
                    <span class="c5">
                        주문 상품정보에 동의
                    </span>
                </h5>
                <p class="c9">
                    <span class="c4">
                        <input type="checkbox" class="checked" @click="checkboxEvent">주문 상품의 상품명, 가격, 배송정보, 환불규정에 동의합니다.
                    </span>
                </p>
                <p class="c18">
                    <span class="c17 c19">
                    </span>
                </p>
            </div>
        </div>
        <div class = "payment"  v-if="agreeChecked">
            <h3> 결제 방식 </h3>
            <label><input type="radio" id = "card" value="card" v-model="paymentType">카드결제</label>
            <label><input type="radio" id = "cash" value="vbank" v-model="paymentType">현금결제</label>
            <label><input type="radio" id = "free" value="free" v-model="paymentType">무료구매</label>
        </div>
        <div class="confirm" v-if="agreeChecked">
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
import agreement from '../components/orderAgreement.vue'

export default {
    components:{
        postOffice,agreement
    },
    data(){
        return{
            dName:"배송자 성함",
            dPhoneNumber:"배송자 휴대전화",
            dMail:"배송자 이메일 주소",
            dPostCode:"배송자 우편번호",
            dAddressData:"배송자 주소",
            dAddressDetail:"배송자 상세 주소",
            discountRate:0,
            couponCode:'',
            couponDiscount:0,
            deliveryPrice:3500,
            agreeChecked:false,
            point:0,
            max:this.point
        }
    },
    async asyncData(){
        try{
            let url = '/api/users/checkinfo'
            let checkData = await axios.get(url);
            let userData = checkData.data.userData
            if(checkData.status == 200){
                return{
                    addressData:userData.addressData,
                    addressDetail:userData.addressDetail,
                    phoneNumber:userData.phoneNumber,
                    email:userData.userEmail,
                    userName:userData.userName,
                    postCode:userData.postCode,
                    uid:userData.userid,
                    point:userData.point,
                }
            }
            else if(checkData.status == 203){
                alert("비로그인")
            }
            else{
                alert("회원 정보 읽기 에러")
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
            return parseInt(this.totalAmount())
        },
        fullPrice(){
            let totalAmount = this.totalAmount
            let deliveryPrice = this.deliveryPrice
            let discountAmount = this.totalDiscountAmount+parseInt(this.couponDiscount) + parseInt(this.usePoint)
            let val = totalAmount-discountAmount+deliveryPrice
            return val
        },
        totalDiscountAmount(){
            return parseInt(this.totalDiscountAmount())
        },
        ...mapGetters({
            isLogin:'users/isLogin',
            cart:'carts/cart',
            totalAmount:'carts/totalAmount',
            totalDiscountAmount:'carts/totalDiscountAmount'
        }),
    },
    props:{
        usePoint:{
            default:0,
            type:Number
        },
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
            this.$store.dispatch('carts/updateDiscount',{
                index:i,
                unit:this.discountRate
            });
        }
        this.$store.dispatch('carts/getCart')
        
    },
    beforeMount() {
        IMP.init(IMP_CODE)
    },
    methods:{
		checkboxEvent(){
			let checkbox = document.getElementsByClassName('checked');
			console.log(checkbox)
			if(!checkbox[0].checked && !checkbox[1].checked){
				this.agreeChecked = false
			}
			else if(checkbox[0].checked && checkbox[1].checked){
				this.agreeChecked = true
			}
		},
        async changePoint(){
            let point = this.point
            let target = this.usePoint

            if (target > point){
                this.usePoint = parseInt(point)
            }
            else if(target < 0){
                this.usePoint = 0
            }
            else{
                this.usePoint = parseInt(target)
            }
        },
        async checkCoupon(){
            let url = '/api/coupon/';
            let couponData = await axios.post(url, {code:this.couponCode,totalAmount:this.totalAmount});
            if(couponData.status==200){
                //console.log(couponData)
                this.couponDiscount = parseInt(couponData.data.discountAmount)
            }
            else if(couponData.status==204){
                alert("잘못된 쿠폰 번호 입니다. \n쿠폰번호를 다시 한번 확인해주십시오.")
            }

        },
        selfDelivery(){
            if(this.selfDelivery == true){
                this.deliveryPrice =0;
            }
            
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
                //console.log("비로그인 감지");
                //let tempid = "DN"+Date.now;
                url = '/api/purchase/noSign'
            }// 비로그인 주문 코드. DN + 현재 시간.
            else{
                url = '/api/purchase'
            }
            let buyerAddress = ''
            let amount = this.fullPrice;
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
                phoneNumber:this.phoneNumber,
                dName:this.dName,
                postCode:pCode,
                address:buyerAddress,
                cart:this.cart,
                price:this.totalAmount,
                deliveryPrice:this.deliveryPrice,
                totalAmount:amount,
                usePoint:this.usePoint,
                couponCode:this.couponCode,
                totalDiscountAmount:this.totalDiscountAmount+this.couponDiscount+this.usePoint,
            }
            let paymentType = ''
            //console.log(this.paymentType)
            if(this.paymentType == "free"){
                paymentType = 'vbank'
                amount = 10;
                //console.log("changed")
            }else{
                paymentType = this.paymentType
            }
            IMP.request_pay({
                pg:'html5_inicis.INIpayTest',
                pay_method:paymentType,
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
                    let postData = await axios.post(url, {
                        imp_uid:res.imp_uid,
                        totalAmount:amount
                    });
                    if(postData.status == 201){
                        url = '/api/purchase/save'
                        let saveData = await axios.post(url, {
                            orderName:res.custom_data.orderName,
                            dName:res.custom_data.dName,
                            postCode:res.custom_data.postCode,
                            address:res.custom_data.address,
                            cart:res.custom_data.cart,
                            price:res.custom_data.price,
                            couponCode:res.custom_data.couponCode,
                            totalAmount:res.custom_data.totalAmount,
                            deliveryPrice:res.custom_data.deliveryPrice,
                            usePoint:res.custom_data.usePoint,
                            totalDiscountAmount:res.custom_data.totalDiscountAmount,
                            purchaseId:postData.data.purchase._id,
                            orderId:postData.data.purchase.orderId,
                            phoneNumber:res.custom_data.phoneNumber
                        })
                        let cart = res.custom_data.cart;
                        if(saveData.status == 200){
                            alert("구매 하였습니다.")
                            location.replace("/checkConfirm/"+postData.data.purchase._id)
                        }
                        else if(saveData.status == 201){
                            alert("VIP가 되었습니다.");
                            location.replace("/checkConfirm/"+postData.data.purchase._id)
                        }
                        else if(saveData.status == 202){
                            alert("VVIP가 되었습니다.")
                            location.replace("/checkConfirm/"+postData.data.purchase._id)
                        }
                        else if(saveData.status == 300){
                            alert("VIP에서 VVIP가 되었습니다.")
                            location.replace("/checkConfirm/"+postData.data.purchase._id)
                        }
                        else if(saveData.status == 301){
                            alert("VIP를 3개월 더 유지합니다.")
                            location.replace("/checkConfirm/"+postData.data.purchase._id)
                        }
                        else if(saveData.status == 302){
                            alert("VVIP를 3개월 더 유지합니다.");
                            location.replace("/checkConfirm/"+postData.data.purchase._id)
                        }
                        else if(saveData.status == 304){
                            alert("VIP를 유지하려면 "+saveData.data.targetPrice+"원 만큼 더 주문해야 합니다.")
                            location.replace("/checkConfirm/"+postData.data.purchase._id)
                        }
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
            //console.log("post 시작");
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


.userInfo { width:100%; height:150px;
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
    margin-left:10px; 
}
.userInfo table tr {
    text-align: left;
}
.userInfo table tr td{
    width: 20px; 
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
.delivery .header label { margin-top:15px; margin-right:10px; font-size:14px; }
.delivery .body { width:100%; height:30px; clear: both; margin-left:15px;}
.delivery .body label:nth-child(2) { margin-left: 20px; }
.delivery .address input{
    margin-left:20px
}
.promotion { width:100%; height:150px;
    border-bottom:1px solid #000; }
.promotion .promo_left { width:50%; height:100%; float:left; text-align: left;}
.promotion .promo_left h3 { 
    padding:10px 10px 7px; 
    float:left;
    width:100%;
    font-size:20px;
    height:35px;}
.promotion .promo_left p { padding-left:15px; font-size:14px; margin-bottom:2px; }

.promotion .promo_left .coupon { display: inline-block;}
.promotion .promo_left .coupon p{display: inline-block;}
.promotion .promo_left .coupon input{margin-left:85px; display: inline-block;}
.promotion .promo_left .coupon button{background-color: #000; color:#fff; border: #000 2px solid; margin-left: 5px; font-size: 15px; }
.promotion .promo_left input{
    margin-bottom:3px
}
.promotion .promo_left .Mileage p{display: inline-block;}
.promotion .promo_left .Mileage .num {display: inline-block; margin-left: 40px;}

.promotion .promo_left .m_Mileage p{display: inline-block;}
.promotion .promo_left .m_Mileage input{margin-left:10px; display: inline-block;}

.promotion .promo_right { width:50%; height:100%; float:left; text-align: left; }
.promotion .promo_right h3 { 
    padding:10px 10px 7px;
    width:100%; 
    float:left;
    font-size:20px;
    height:35px;}
.promotion .promo_right table { font-size:14px; margin-left:15px; margin-bottom:5px;}
.promotion .promo_right table tr { }
.promotion .promo_right table tr td { width: 100px;}
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
.payment label { margin-top:5px; margin-right:5px; font-size:14px;}
.payment label:nth-child(3) { margin-left: 20px; }

.confirm {
    width:100%; height:100px; overflow:hidden;
}
.confirmBtn {
    width:100px; height:30px; background-color:#000; color:#fff; font-size:14px; text-align:center; line-height:30px; margin:15px auto 0; cursor:pointer;
}

.address{width:100%; height: 100px; margin-left: 30px;}
.agreementBody{
    text-align: center;
    padding-bottom:5pt;
    border-bottom:1px solid #000; 
}
.agreement{
    overflow: auto;
    display: inline-block;
    border: solid 3px #b3b3b3;
	border-radius: 9px;
    margin-top:5pt;
    margin-right:5pt;
    margin-left:5pt;
    background-color: white;
    width: 100%;
    height:100pt;
}
.c6{
    margin-left:15pt;
    padding-bottom:0pt;
    line-height:1.15;
    text-align:left;
    margin-right:15pt}
.c5{color:#111111;
    font-weight:700;
    text-decoration:none;
    vertical-align:baseline;
    font-size:9pt;
    font-family:"Dotum";
    font-style:normal}
    .c4{background-color:#ffffff;
    color:#666666;
    font-weight:400;
    text-decoration:none;
    vertical-align:baseline;
    font-size:9pt;
    font-family:"Dotum";
    font-style:normal}
    
    .c9{margin-left:15pt;
    padding-top:6pt;
    padding-bottom:0pt;
    line-height:1.8000000000000003;
    text-align:left;
    margin-right:15pt}
</style>
