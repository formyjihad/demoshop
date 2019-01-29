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
                        <th class="cols">상태</th>
                        <th class="cols">입금은행</th>
                        <th class="cols">입금은행계좌</th>
                        <th class="cols">입금은행계좌 주</th>
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
                        <td>{{order.goodsName}}</td>
                        <td>{{order.totalAmount}}원</td>
                        <td>{{point}}원</td>
                        <td >{{order.status}}<div class="uploadBtn"><button type="button" @click="modalCheck">도안 업로드</button></div></td>
                        <td>{{purchase.bankName}}</td>
                        <td>{{purchase.bankNum}}</td>
                        <td>{{purchase.bankHolder}}</td>
                        
                        
                    </tr>
                    <tr class="t_body" v-if="!purchase.bankName">
                        <td>{{order.orderId}}</td>
                        <td>{{order.orderDate}}</td>
                        <td>{{order.goodsName}}</td>
                        <td>{{order.totalAmount}}원</td>
                        <td>{{point}}원</td>
                        <td>{{order.status}}<div class="uploadBtn"><button type="button" @click="modalCheck">도안 업로드</button></div></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="sec_a">
			<h1>배송정보</h1>
            <div class = "address">
                <table>
                    <tr>
                     <td>배송자명</td>
                     <td>{{order.dName}}</td>
                    </tr>
                    <tr>
                     <td>연락처</td>
                     <td>{{order.phoneNum}}</td>
                    </tr>
                    <tr>
                     <td>우편번호</td>
                     <td>{{order.postCode}}</td>
                     </tr>
                    <tr>
                     <td>주소</td>
                     <td>{{order.address}}</td>
                    </tr><!--
                    <tr>
                     <td>상세주소</td>
                     <td></td>
                    </tr>
                    <tr>
                     <td>배송시 요청사항</td>
                     <td></td>
                    </tr>-->
                </table>    
            </div>
		</div>
        <div class="sec2">
            <p>주문배송안내</p>
            <ul class="box2">
                <li>
                    <div class="left">
                      <h3>step1<img class="quest" src="/SVG/느낌표.svg" @mouseover="detail(0)"></h3>
                      <p class="step1">결제대기</p>
                    </div>
                    <div class="right">
                     >
                    </div>
                </li>
                <li>
                    <div class="left">
                     <h3>step2<img class="quest" src="/SVG/느낌표.svg" @mouseover="detail(1)"></h3>
                      <p class="step2">주문접수</p>
                    </div>
                    <div class="right">
                     >
                    </div>
                </li>
                <li>
                    <div class="left">
                     <h3>step3<img class="quest" src="/SVG/느낌표.svg" @mouseover="detail(2)"></h3>
                      <p class="step3">도안검수</p>
                    </div>
                    <div class="right">
                     >
                    </div>
                </li>
                <li>
                    <div class="left">
                     <h3>step4<img class="quest" src="/SVG/느낌표.svg" @mouseover="detail(3)"></h3>
                      <p class="step4">제작중</p>
                    </div>
                    <div class="right">
                     >
                    </div>
                </li>
                <li>
                    <div class="left">
                      <h3>step5<img class="quest" src="/SVG/느낌표.svg" @mouseover="detail(4)"></h3>
                      <p class="step5">배송중</p>
                    </div>
                    <div class="right">
                     >
                    </div>
                </li>
                <li>
                    <div class="left">
                      <h3>step6<img class="quest" src="/SVG/느낌표.svg" @mouseover="detail(5)"></h3>
                      <p class="step6">주문완료</p>
                    </div>
                    <div class="right">
                    </div>
                </li>
            </ul>
        </div>
        <div class="sec2_a2">
            <div class="a2_1"><h1>결제정보</h1></div>
            <div class="a2_2">
                <div class="a2_2_1"><div class="a2_2_2_1"><p>할인</p></div><div class="a2_2_2_1">{{order.totalDiscountAmount}}</div></div>
                <div class="a2_2_2"><div class="a2_2_2_1"><p>배송비</p></div><div class="a2_2_2_1">{{order.deliveryPrice}}</div></div>
                <div class="a2_2_3"><div class="a2_2_3_1"><p>총금액</p></div><div class="a2_2_3_1">{{order.totalAmount}}</div></div>
            </div>
            <div class="se3">
                <p>배송/교환/환불/취소 안내</p>
                <div class="box3">
                    <!--<h4>내용입니다. 내용이 잔뜩 들어갑니다.</h4>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import fileUpload from '../../components/modals/fileUpload.vue'

export default {
    components:{
        fileUpload
    },
    data(){
        return {
            purchase:[],
            order:[],
            point:0,
            orderid:this.$route.params.id,
        }
    },
    async created (){
        let url = `/api/purchase/checkOrder?id=${this.orderid}`
        const checkData = await axios.get(url)
        let orderData = checkData.data.orderData
        //console.log(orderData)
        let orderDetailLength;
        let goodsName;
        if(orderData.orderDetail.length>1){
            orderDetailLength = orderData.orderDetail.length -1
            goodsName = orderData.orderDetail[0].goodsType + "외 " + orderDetailLength + "건"
        }
        else if(orderData.orderDetail.length == 1){
            goodsName = orderData.orderDetail[0].goodsType
        }
        orderData.goodsName = goodsName;
        let status = orderData.status

        let date = new Date(orderData.orderDate)
        let time = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
        orderData.orderDate = time

        if(status=="결제대기"){
            let statusDetail = document.getElementsByClassName("step1");
            statusDetail[0].style = "color:blue"
        }
        if(status=="주문접수"){
            let statusDetail = document.getElementsByClassName("step2");
            statusDetail[0].style = "color:blue"
        }
        if (status=="도안 수정 필요"){
            let statusDetail = document.getElementsByClassName("step3");
            statusDetail[0].style = "color:red"
        }
        if(status=="도안검수"){
            let statusDetail = document.getElementsByClassName("step3");
            statusDetail[0].style = "color:blue"
        }
        if(status=="제작중"){
            let statusDetail = document.getElementsByClassName("step4");
            statusDetail[0].style = "color:blue"
        }
        if(status=="배송중"){
            let statusDetail = document.getElementsByClassName("step5");
            statusDetail[0].style = "color:blue"
        }
        if(status=="주문완료"){
            let statusDetail = document.getElementsByClassName("step6");
            statusDetail[0].style = "color:blue"
        }
        let statusTitle = document.getElementsByClassName("quest");
        
        let price = 0;
        let quantity = 0;
        let design = 0;
        if(checkData.status == 201){
            this.purchase = checkData.data.purchase
            this.order = orderData
            this.point = Math.ceil(orderData.totalAmount*0.03)
        }
    },
    methods:{
        detail(index){
            let target = document.getElementsByClassName("quest");
            if(index == 0){
                target[index].title = "주문 후 입금 확인이 되지 않음"
            }else if(index == 1){
                target[index].title = "입금 확인 되었지만 도안 검수가 진행 되지 않음"
            }else if(index == 2){
                target[index].title = "도안 검수 후 메일 회신"
            }else if(index == 3){
                target[index].title = "최종 도안이 회신되어 제작이 진행 중"
            }else if(index == 4){
                target[index].title = "제작이 완료되어 발송됨"
            }else if(index == 5){
                target[index].title = "고객님께서 제품을 받음"
            }
        },
        async modalCheck(){
            //console.log("modalCheck")
            if (this.order.status == "결제대기" || this.order.status == "도안 업로드 대기"){
                this.$modal.show(fileUpload,{
                    purchaseId:this.orderid,
                    count:this.order.count
                },{
                    height:'auto',
                    scrollable:true
                })
                //call Modal "fileUpload"
            }
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
    height:130px;
    text-align:center;
    overflow:hidden;
    margin-top: 20px;
}

.checkOrder{
    height: 150px;
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
.uploadBtn button{
    padding: 5px 10px 5px 10px;
	border: solid 1px #CCC;

	background: #fff;
    font-size: 15px;
    color: #565656;

	border-radius: 5px;
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;

	box-shadow: 0 1px 3px #111;
	-moz-box-shadow: 2px 2px 1px #999;
	-webkit-box-shadow: 2px 2px 1px #999;

	cursor: pointer;
    
    font-size: 10px;
}
.sec_a { width:100%; height:10px; text-align:left;
border-bottom:1px solid #000; margin-bottom:10px;}
.sec_a h1{ font-size:16px; font-weight:900; }
.sec_a h2{font-size:16px; font-weight:900;}

.sec2 { width:100%; height:90px;}
.sec2 p { width: 100%; height:15px;
    text-align:left;
    font-size:12px;
    font-weight:900; }
.sec2 .box2 { width:100%;
    height:60px;
    margin-top:5px;
    border-top:1px solid #000;
    border-bottom:1px solid #000;
    margin-bottom:5px; }
.sec2 .box2 img{
    width:14px;
}

.sec2 .box2 li { width:16%; height:100%;
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

    
.sec3 { width:100%; height:200px; overflow: hidden; }
.sec3 p {
    width:100%;
    height:30px;
    text-align:left;
    font-size:12px;
    font-weight:900;
    border-bottom:1px solid #000;
    margin-top: 15px;
    }

.sec3 .box3 { width:100%; height:100px;}
.sec3 .box3 h4 { text-align:left; font-size:12px;
}

.sec_a { width:100%; height:200px; text-align:left; border-bottom:1px solid #000; margin-bottom:10px;
          }
.sec_a h1 { font-size:18px; font-weight:900; margin-top: 10px; }
.sec2_a2 h1{
    width: 100%; height:15px;
    text-align:left;
    font-size:12px;
    font-weight:900;
}
.sec2_a2 { width:100%; height:100px; text-align:left; padding-top:10px;
            border-bottom:1px solid #000; margin-bottom:10px;}
.a2_1 { width:50%; height:100%; float:left;}
.a2_2 { width:50%; height:100%; float:left;}

.a2_2_2_1{
    width:50px;
    height:15px;
    margin-right:15px;
    display:inline-block;
}
.a2_2_3_1{
    width:50px;
    height:15px;
    margin-right:15px;
    display:inline-block;
}
</style>
