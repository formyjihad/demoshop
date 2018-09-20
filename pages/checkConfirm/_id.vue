<template>
    <div class = "pageroot">
        <div class="checkOrder">
            <table>
                <tr class = "orderbank" v-if="order.bankName">
                    <td>은행명</td>
                    <td>{{order.bankName}}</td>
                </tr>
                <tr class = "orderbankcount" v-if="order.bankNum">
                    <td>가상계좌</td>
                    <td>{{order.bankNum}}</td>
                </tr>
                <tr class = "orderbankholder" v-if="order.bankHolder">
                    <td>계좌주</td>
                    <td>{{order.bankHolder}}</td>
                </tr>
                <tr class = "totalAmount">
                    <td>결제금액</td>
                    <td>{{order.price}}원</td>
                </tr>
                <tr class = "orderId">
                    <td>주문번호</td>
                    <td>{{order._id}}</td>
                </tr>
                <tr class= "orderName">
                    <td>주문자</td>
                    <td>{{order.name}}</td>
                </tr>
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
        }
    },
    methods:{
    },
    async created (){
        //console.log(this.orderId)
        let url = `/api/purchase/checkOrder?orderid=${this.orderid}`
        const checkData = await axios.get(url)
        //console.log(checkData.data);
        if(checkData.status == 201){
            this.order = checkData.data.result
            //console.log(this.order)
        }
        //console.log(this.order)
        
    }
}
</script>

<style>

</style>
