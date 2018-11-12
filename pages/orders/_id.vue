<template>
    <div class = "container">
        <div class="head">
            <h1>order history</h1>
            <h2>주문 내역</h2>
        </div>
        <div class="checkOrder">
            <table class="t_wrap">
                <thead>
                    <tr class="t_head">
                        <th class="cols">주문일</th>
                        <th class="cols">주문번호</th>
                        <th class="headName">상품명</th>
                        <th class="cols">주문금액</th>
                        <th class="cols">예상적립</th>
                        <th class="cols">상태</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="t_body" v-if="order.bankName">
                        <td>{{order.bankName}}</td>
                        <td>{{order.bankNum}}</td>
                        <td>{{order.bankHolder}}</td>
                        <td>{{order.price}}원</td>
                        <td>{{order.orderId}}</td>
                        <td>{{status}}</td>
                    </tr>
                    <tr class="t_body">
                        <td>{{order.bankName}}</td>
                        <td>{{order.bankNum}}</td>
                        <td>{{order.bankHolder}}</td>
                        <td>{{order.price}}원</td>
                        <td>{{order.orderId}}</td>
                        <td>{{status}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            order:[],
            orderid:this.$route.params.id,
            status:[]
        }
    },
    async created (){
        //console.log(this.orderId)
        let url = `/api/purchase/checkOrder?id=${this.orderid}`
        const checkData = await axios.get(url)
        console.log(checkData)
        if(checkData.status == 201){
            this.order = checkData.data.purchase
            this.status = checkData.data.status
            //console.log(this.order)
        }
        //console.log(this.order)
        
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
}

</style>
