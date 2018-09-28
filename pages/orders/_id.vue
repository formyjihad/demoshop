<template>
    <div class = "container">
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
                    <td>{{order.orderId}}</td>
                </tr>
                <tr class= "orderName">
                    <td>주문자</td>
                    <td>{{order.name}}</td>
                </tr>
                <tr class = "purchaseStatus">
                    <td>결제상태</td>
                    <td>{{status}}</td>
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
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

</style>
