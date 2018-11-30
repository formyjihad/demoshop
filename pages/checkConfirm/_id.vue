<template>
    <div class = "container">
        <div class = "section1">
            <div class="sec1_1">
                <h1>주문이 완료되었습니다.</h1>
            </div>
            <div class="sec1_2">
                <h2>주문번호</h2>
                {{purchase.orderId}}
            </div>
            <div class="sec1_3">
                <h3>배송지 정보</h3> 
                {{order.dName}}
                {{order.address}}
                {{order.postCode}}
            </div>
            <div class="sec1_4">
                <h4>결제 정보</h4>
                {{purchase.name}}
                {{purchase.price}}
                {{purchase.bankName}}
                {{purchase.bankNum}}
                {{purchase.bankHolder}}
            </div>
        </div>
        <div class="section2">
            <div class="sec2_1">
                <ul>
                    <li>상품</li><li>가격</li><li>수량</li><li>할인</li><li>총계</li>
                </ul>
            </div>
            <div class="sec2_2">
                <ul v-for="orderDetail in orderDetail" :key="orderDetail">
                    <li>{{orderDetail.goodsType}}</li><li>{{orderDetail.price*orderDetail.quantity+(orderDetail.design*5500)}}</li><li>{{orderDetail.quantity}}</li><li><!--{{sale}}--></li><li>{{order.totalAmount}}</li>
                </ul>
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
        console.log("break")
        console.log(checkData.data.orderData)
        if(checkData.status == 201){
            this.purchase = checkData.data.purchase
            this.order = checkData.data.orderData
            this.orderDetail = checkData.data.orderData.orderDetail
            this.status = checkData.data.status
        }
        
    }
}
</script>

<style>

	.wrap { width:80%; height:1000px; margin:80px auto 0; }
	.section1 { width:100%; height:400px; border:1px solid #000; }
	.sec1_1 { width:100%; height:150px; overflow:hidden; border-bottom:1px solid #616161; }
	.sec1_1 h1 { font-size:24px; margin:50px 0 0 25px;  }
	.sec1_1 p { font-size:14px; margin:3px 0 0 25px; }
	.sec1_2 { width:100%; height:50px; overflow:hidden; border-bottom:1px solid #616161; }
	.sec1_2 h2 { font-size:16px; margin:13px 0 0 25px; font-weight: bold}
	.sec1_3 { width:100%; height:100px; overflow:hidden; border-bottom:1px solid #616161; }
	.sec1_3 h3 { font-size:16px; margin:50px 0 0 25px; font-weight: bold}
	.sec1_4 { width:100%; height:97px; overflow:hidden; }
	.sec1_4 h4 { font-size:16px; margin:20px 0 0 25px; font-weight: bold}

	.section2 { width:100%; height:350px; margin-top:10px; border:1px solid #000; }
	.sec2_1 { width:100%; height:50px; border-bottom:1px solid #e9e9e9; }
	.sec2_1 ul { width:90%; height:100%; margin:auto; }
	.sec2_1 ul li { width:12.5%; height:100%; display:inline-block; text-align:center; line-height:50px; font-size:14px; }
	.sec2_1 ul li:nth-child(1) { width:45%; }
	.sec2_2 { width:100%; height:299px; }
    .sec2_2 ul { width:90%; margin:auto; }
	.sec2_2 ul li { width:12.5%; display:inline-block; text-align:center; line-height:50px; font-size:14px; }
	.sec2_2 ul li:nth-child(1) { width:45%; }

	.section3 { width:100%; text-align:center; padding-bottom:70px; border-bottom:1px solid  #e9e9e9; margin-top:70px; }
	.section3 .btn { text-align:center; width:150px; height:40px; background-color:#000; color:#fff; font-size:14px; font-weight:900; display:inline-block; margin-right: 15px; }

</style>
