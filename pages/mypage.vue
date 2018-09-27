<template>
    <div class = "container">
        <table>
            <tr v-for="order in orders" :key="order['_id']" v-if="isLogin">
                <nuxt-link :to='{path:"/orders/"+order["orderId"]}'>
                    <td>주문번호 : {{order['orderId']}}</td>
                    <td>주문날짜 : {{order['orderDate']}}</td>
                    <td>주문금액 : {{order['totalAmount']}} 원</td>
                </nuxt-link>
            </tr>
        </table>
        <div class = "pagination">
            <a href ="#" @click='getPage(p)' v-for="p in pagination" :key="p">
                {{p+1}}</a>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {mapMutations, mapGetters} from 'vuex'
function getPagination ({currentPage, totalCount, limit}){
    let pn =[]
    let maxPage = Math.floor(totalCount/limit)
    for(let i = currentPage -3; i<currentPage +3 && i <= maxPage; i++){
        if(i>-1){
            pn.push(i)
        }
    }
    return pn;
}
export default {
    async asyncData (){
        let getData = await axios.get("/api/purchase/")
        //console.log(getData)
        return {
            orders : getData.data.order,
            orderDetails : getData.data.order.orderDetail,
            totalCount: getData.data.totalCount,
            limit : getData.data.limit,
            currentPage: getData.data.currentPage,
            pagination:getPagination({
                currentPage:getData.data.currentPage,
                totalCount:getData.data.totalCount,
                limit:getData.data.limit
            })
        }
    },
    computed: {
        ...mapGetters({
            isLogin: 'users/isLogin'
        })
    },
    methods:{
        async getPage(page){
            let url = `/api/purchase?page=${page}`
            let getData = await axios.get(url)
            
            this.orders = getData.data.order
            this.orderDetail = getData.data.order.orderDetail
            this.totalCount = getData.data.totalCount
            this.limit = getData.data.limit
            this.currentPage = getData.data.currentPage
            this.pagination = getPagination({
                currentPage:getData.data.currentPage,
                totalCount:getData.data.totalCount,
                limit:getData.data.limit
            })
        },
        ...mapMutations({
            logout:'users/logout'
        })
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
