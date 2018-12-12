<template>
    <div class = "container">
        <div class = "section1">
            <div class="sec1_1">
                <h1>주문이 완료되었습니다.</h1>
            </div>
            <div class="sec1_2">
                <table>
                    <tr>
                <td><h2>주문번호</h2></td>
                <td>{{order.orderId}}</td>
                    </tr>
                </table>
            </div>
            <div class="sec1_3">
                <h3>배송지 정보</h3> 
                <table>
                    <tr>
                        <td>배송자 성함</td>
                        <td>{{order.dName}}</td>
                    </tr>
                    <tr>
                        <td>배송지 주소</td>
                        <td>{{order.address}}</td>
                    </tr>
                    <tr>
                        <td>우편번호</td>
                        <td>{{order.postCode}}</td>
                    </tr>
                </table>

            </div>
            <div class="sec1_4">
                <h4>결제 정보</h4>
                <table>
                    <tr>
                        <td>임금자명</td>
                        <td>{{purchase.name}}</td>
                    </tr>    
                    <tr>
                        <td>임금액</td>
                        <td>{{purchase.price}}</td>
                    </tr>
                    <tr v-if="purchase.bankHolder">    
                        <td>은행명</td>
                        <td>{{purchase.bankName}}</td>
                    </tr>
                    <tr v-if="purchase.bankHolder">
                        <td>계좌번호</td>
                        <td>{{purchase.bankNum}}</td>
                    </tr>
                    <tr v-if="purchase.bankHolder">
                        <td>예금주</td>
                        <td>{{purchase.bankHolder}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="section2">
            <div class="sec2_1">
                <ul>
                    <li>상품</li><li>가격</li><li>수량</li><li>할인</li><li>총계</li>
                </ul>
            </div>
            <div class="sec2_2">
                <div class="sec2_2_1">
                    <ul v-for="orderDetail in orderDetail" :key="orderDetail">
                        <li>{{orderDetail.goodsType}}</li><li>{{orderDetail.price*orderDetail.quantity+(orderDetail.design*5500)}}</li><li>{{orderDetail.quantity}}</li><li><!--{{sale}}--></li><li>{{order.totalAmount}}</li>
                    </ul>
                </div>
                <div class="box">
                    <table>
                        <tr>
                            <td>합계</td>
                            <td>{{price}}</td>
                        </tr>
                        <tr>
                            <td>배송비</td>
                            <td>3500</td>
                        </tr>
                        <tr>
                            <td>지불방법</td>
                            <td>{{paymentType}}</td>
                        </tr>
                        <tr>
                            <td>총계</td>
                            <td>{{order.totalAmount}}</td>
                        </tr>
                    </table>
                </div>            
            </div>
        </div>

        <div class="section3">
            <button class="btn" @click="goToMypage">구매내역보기</button>
            <button class="btn" @click="goToHome">쇼핑몰가기</button>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            order:[],
            orderId:this.$route.params.id,
            purchase:[],
            status:''
        }
    },
    methods:{
        goToMypage(){
            this.$nuxt.$router.replace({path:'/mypage'})
        },
        goToHome(){
            this.$nuxt.$router.replace({path:'/'})
        }
    },
    async created (){
        let url = `/api/purchase/checkOrder?id=${this.orderId}`
        const checkData = await axios.get(url)
        //console.log("break")
        let paymentType = ''
        if(checkData.data.purchase.bankHolder){
            paymentType = '무통장입금'            
        }
        else{
            paymentType = '카드결제'
        }
        let orderData = checkData.data.orderData
        let price = 0;
        let quantity = 0;
        let design = 0;
        let total = 0;
        for(let i = 0; i<orderData.orderDetail.length ;i++){
            total = total+orderData.orderDetail[i].price*orderData.orderDetail[i].quantity+(orderData.orderDetail[i].design*5500);
        }
        
        if(checkData.status == 201){
            this.purchase = checkData.data.purchase
            this.order = orderData
            this.orderDetail = orderData.orderDetail
            this.status = orderData.status
            this.paymentType = paymentType
            this.price = total;
        }
        
    }
}
</script>

<style>

	.wrap { width:80%; height:1000px; margin:80px auto 0; }
	.section1 { width:100%; height:510px; border:1px solid #000; margin-top: 30px; }
	.sec1_1 { width:100%; height:150px; overflow:hidden; border-bottom:1px solid #616161; }
	.sec1_1 h1 { font-size:24px; margin:50px 0 0 25px;  }
	.sec1_1 p { font-size:14px; margin:3px 0 0 25px; }
	.sec1_2 { width:100%; height:50px; overflow:hidden; border-bottom:1px solid #616161; }
	.sec1_2 h2 { font-size:16px; margin:13px 0 10px 25px; font-weight: bold;}
	.sec1_3 { width:100%; height:130px; overflow:hidden; border-bottom:1px solid #616161; padding: 10px 0 10px 25px;}
	.sec1_3 h3 { font-size:16px;font-weight: bold}
	.sec1_4 { width:100%; height:200px; overflow:hidden; padding: 10px 0 10px 25px; }
	.sec1_4 h4 { font-size:16px; font-weight: bold}

	.section2 { width:100%; height:100%; margin-top:10px; border:1px solid #000; }
	.sec2_1 { width:100%; height:50px; border-bottom:1px solid #e9e9e9; }
	.sec2_1 ul { width:90%; height:100%; margin:auto; }
	.sec2_1 ul li { width:12.5%; height:100%; display:inline-block; text-align:center; line-height:50px; font-size:14px; }
	.sec2_1 ul li:nth-child(1) { width:45%; }
    .sec2_2 { width:100%; height:100%; }
    .sec2_2_1 { height:100%;}
    .sec2_2_1 ul { width:90%; margin:auto; }
	.sec2_2 ul li { width:12.5%; display:inline-block; text-align:center; line-height:50px; font-size:14px; }
    .sec2_2 ul li:nth-child(1) { width:45%; }

	.section3 { width:100%; text-align:center; padding-bottom:70px; border-bottom:1px solid  #e9e9e9; margin-top:70px; }
	.section3 .btn { text-align:center; width:150px; height:40px; background-color:#000; color:#fff; font-size:14px; font-weight:900; display:inline-block; margin-right: 15px; }

    .sec1_2 td:nth-child(2) { width:30px; height: 55px;
    text-align: center;
    margin:13px 0 0 25px;}
    .sec1_3 table{width:250px; height:70px;} 
    .sec1_4 table{width:400px; height:70px; } 

    .sec2_2 .box{width:100%; height:150px; border-top:1px solid #616161; margin-top:30px; margin-bottom:5px;}
    .sec2_2 .box table{width:230px; height:50px; float: right; text-align: right; margin-top:40px; margin-right: 20px;}
</style>
