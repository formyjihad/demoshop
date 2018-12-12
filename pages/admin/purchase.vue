<template>
    <div class="container">
        <table>
            <tr v-for="(order, index) in orders" :key="order['_id']">
                <nuxt-link :to='{path:"./orders/"+order["_id"]}'>
                    <td>{{order['uid']}}</td>
                    <td>{{order['totalAmount']}}원</td>
                    <td>{{order.orderDetail.length}} 주문</td>
                    <td>{{order.status}}</td>
                </nuxt-link>
                <td class="orderDetail" @mouseover="detail(order, index)">미리보기</td>
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
            //console.log(orderDetail);
            
        },
        async detail(order, index){
            //console.log(order);
            let detail = document.getElementsByClassName('orderDetail')
            let detailData = ""
            let orderIndex = index;
            for(let i = 0; i<order.orderDetail.length; i++){
                if(!detailData){
                    detailData = "사이즈 : "+order.orderDetail[i].xSize+"*"+order.orderDetail[i].ySize+"\n"+"두께 : "+order.orderDetail[i].thick+"\n포장 : "+order.orderDetail[i].packing+"\n부자재 : "+order.orderDetail[i].subItem+"\n인쇄면 : "+order.orderDetail[i].printside
                }
                else{
                    detailData = detailData + "\n\n" + "사이즈 : "+order.orderDetail[i].xSize+"*"+order.orderDetail[i].ySize+"\n"+"두께 : "+order.orderDetail[i].thick+"\n포장 : "+order.orderDetail[i].packing+"\n부자재 : "+order.orderDetail[i].subItem+"\n인쇄면 : "+order.orderDetail[i].printside
                }
            }
            //console.log(detailData)
            detail[orderIndex].title = detailData
        }
    },
    layout:'admin'
}
</script>

