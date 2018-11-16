<template>
    <div class = "container">
        <div class="head">
            <h1>order history</h1>
            <h2>주문 내역</h2>
        </div>
        <div class="checkOrder">
            <table class="t_wrap">
                <thead>
                    <tr class="t_head" v-if="purchase.bankName">
                        <th class="cols">주문번호</th>
                        <th class="cols">주문일</th>
                        <th class="headName">상품명</th>
                        <th class="cols">주문금액</th>
                        <th class="cols">예상적립</th>
                        <th class="cols">상태</th><!--
                        <th class="cols">입금은행</th>
                        <th class="cols">입금은행계좌</th>
                        <th class="cols">입금은행계좌 주</th>-->
                    </tr>
                    <tr class="t_head" v-if="!purchase.bankName">
                        <th class="cols">주문번호</th>
                        <th class="cols">주문일</th>
                        <th class="headName">상품명</th>
                        <th class="cols">주문금액</th>
                        <th class="cols">예상적립</th>
                        <th class="cols">상태</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="t_body" v-if="purchase.bankName">
                        <td>{{order.orderId}}</td>
                        <td>{{order.orderDate}}</td>
                        <td>{{order.goodsType}}</td>
                        <td>{{order.totalAmount}}원</td>
                        <td>{{order.totalAmount/100}}원</td>
                        <td>{{status}}</td><!--
                        <td>{{purchase.bankName}}</td>
                        <td>{{purchase.bankNum}}</td>
                        <td>{{purchase.bankHolder}}</td>-->
                        
                        
                    </tr>
                    <tr class="t_body" v-if="!purchase.bankName">
                        <td>{{order.orderId}}</td>
                        <td>{{order.orderDate}}</td>
                        <td>{{order.goodsType}}</td>
                        <td>{{order.price}}원</td>
                        <td>{{order.price/10}}원</td>
                        <td>{{status}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="sec_a">
			<h1>배송정보</h1>
			<h2>받으시는분</h2>
		</div>
        <div class="sec2">
            <p>주문배송안내</p>
            <ul class="box2">
                <li>
                    <div class="left">
                      <h3>step1</h3>
                      <p>결제대기</p>
                    </div>
                    <div class="right">
                     >
                    </div>
                </li>
                <li>
                    <div class="left">
                     <h3>step2</h3>
                      <p>주문접수</p>
                    </div>
                    <div class="right">
                     >
                    </div>
                </li>
                <li>
                    <div class="left">
                     <h3>step3</h3>
                      <p>도안검수</p>
                    </div>
                    <div class="right">
                     >
                    </div>
                </li>
                <li>
                    <div class="left">
                     <h3>step4</h3>
                      <p>제작중</p>
                    </div>
                    <div class="right">
                     >
                    </div>
                </li>
                <li>
                    <div class="left">
                      <h3>step5</h3>
                      <p>배송중</p>
                    </div>
                    <div class="right">
                     >
                    </div>
                </li>
                <li>
                    <div class="left">
                      <h3>step6</h3>
                      <p>주문완료</p>
                    </div>
                    <div class="right">
                    </div>
                </li>
            </ul>
    
            <ul class="box2_bottom">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
            </ul>
        </div>
        <div class="sec_a2">
            <div class="a2_1">결제정보</div>
            <div class="a2_2">
                <div class="a2_2_1">할인가</div>
                <div class="a2_2_2">배송비</div>
                <div class="a2_2_3">총금액</div>
            </div>
            <div class="se3">
                <p>배송/교환/환불/취소 안내</p>
                <div class="box3">
                    <h4>내용입니다. 내용이 잔뜩 들어갑니다.</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            purchase:[],
            order:[],
            orderid:this.$route.params.id,
            status:[]
        }
    },
    async created (){
        let url = `/api/purchase/checkOrder?id=${this.orderid}`
        const checkData = await axios.get(url)
        if(checkData.status == 201){
            this.purchase = checkData.data.purchase
            this.order = checkData.data.orderData
            this.status = checkData.data.status
        }
    }
}
</script>

<style scoped>

.container{
    width:80%; height:100%; margin:auto;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.head{
    width:100%;
    height:150px;
    text-align:center;
    overflow:hidden;
}

.checkOrder{
    height: 200px;
}

.t_wrap{
    width:100%;
    border-top:1px solid #000;
    border-bottom:1px solid #000; 
}
.t_wrap .t_head{
    text-align:center;
    line-height:60px;
    font-size:14px;
    border-bottom:2px solid #000;

}
.t_wrap .t_head .headName{
    width:30%;
}

.t_wrap .t_body {
    height: 80px;
}
.sec_a { width:100%; height:120px; text-align:left; border-bottom:1px solid #000; margin-bottom:10px; }
.sec_a h1{ font-size:16px; font-weight:900; }
.sec_a h2{font-size:16px; font-weight:900;}
.sec2 { width:100%; height:170px; }
.sec2 p { text-align:left;
    font-size:12px;
    font-weight:900; }
.sec2 .box2 { width:100%;
    height:60px;
    margin-top:5px;
    border-top:1px solid #000;
    border-bottom:1px solid #000; }

.sec2 .box2 li { width:16%;
    float:left;
    text-align:center;
    margin-top:7px; 
    list-style:none;
}

.sec2 .box2 li:nth-child(1) { margin-left:30px; }
.sec2 .box2 li .left { width:70%; height:30px; float:left; }
.sec2 .box2 li .left h3 { font-size:14px; text-align: center }
.sec2 .box2 li .left p { font-size:14px; text-align: center }
.sec2 .box2 li .right { width:25px; height:31px; float:left; margin-top:10px; }
.sec2 .box2 li .right img { width:100%; }
.sec2 .box2_bottom { width:100%;
    height:60px;
    margin:auto;
    line-height:60px;
    border-bottom:1px solid #000; }
.sec2 .box2_bottom li { width:16%;
    height:100%;
    float:left;
    text-align:center;
    list-style:none;
}
    
.se3 { width:100%; height:200px; }
.se3 p { text-align:left;
    font-size:12px;
    font-weight:900;
    border-bottom:1px solid #000;
    padding-bottom: 3px;}
.se3 .box3 { width:100%; height:100px;}
.se3 .box3 h4 { text-align:left; font-size:12px;}

.sec_a { width:100%; height:120px; text-align:left; border-bottom:1px solid #000; margin-bottom:10px; }
.sec_a h1 { font-size:16px; font-weight:900; }
.sec_a h2 { font-size:16px; font-weight:900; }

.sec_a2 { width:100%; height:72px; text-align:left; border-bottom:1px solid #000; margin-bottom:10px; }
.a2_1 { width:50%; float:left;}
.a2_2 { width:50%; float:left;}
</style>
