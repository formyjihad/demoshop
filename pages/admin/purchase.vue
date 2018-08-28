<template>
    <div class="container">
        <table>
            <tr v-for="order in orders" :key="order['_id']">
                <nuxt-link :to='{path:"./orders/"+order["_id"]}'>
                    <td>{{order['uid']}}</td>
                    <td>{{order['totalAmount']}}원</td>
                    <td>{{order.orderDetail.length}} 주문</td>
                </nuxt-link>
            </tr>
        </table>
        <div class="pagination">
            <a href="#" @click='getPage(p)' v-for="p in pagination" :key="p">{{p+1}}</a>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
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
    async asyncData(){
        let data = await axios.get('/api/admin/purchase')
        return{
            orders: data.data.order,
            totalCount:data.data.totalCount,
            limit : data.data.limit,
            currentPage: data.data.currentPage,
            pagination:getPagination({
                currentPage:data.data.currentPage,
                totalCount:data.data.totalCount,
                limit:data.data.limit
            })
        }
    },
    methods : {
        async getPage(page){
            let url = `/api/admin/purchase?page=${page}`
            let data = await axios.get(url)
            
            this.orders = data.data.order
            this.orderDetail = data.data.order.orderDetail
            this.totalCount = data.data.totalCount
            this.limit = data.data.limit
            this.currentPage = data.data.currentPage
            this.pagination = getPagination({
                currentPage:data.data.currentPage,
                totalCount:data.data.totalCount,
                limit:data.data.limit
            })
            console.log(orderDetail);
            
        },/*
        async detail(id){
            console.log(id);
            let detail = document.getElementById('orderDetail')
            
            detail.title = "사이즈 : "+id.xSize+"*"+id.ySize+"\n"+"두께 : "+id.thick+"\n포장 : "+id.packing+"\n부자재 : "+id.subItem+"\n인쇄면 : "+id.printside 
        }*/
    },
    layout:'admin'
}
</script>

