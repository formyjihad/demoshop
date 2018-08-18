<template>
    <div class="container">
        <table>
            <tr v-for="order in orders" :key="order['id']">
                <td>{{order['uid']}}</td>
                <td>{{order['name']}}</td>
                <td>{{order['price']}}원</td>
                <td>{{order['count']}}개</td>
                <td id="orderDetail" @mouseover="detail(order)">주문상세</td>
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
        let data = await axios.get('http://localhost:3000/api/v1.0/admin/purchase')
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
            let url = `http://localhost:3000/api/v1.0/admin/purchase?page=${page}`
            let data = await axios.get(url)
            
            this.orders = data.data.order
            this.totalCount = data.data.totalCount
            this.limit = data.data.limit
            this.currentPage = data.data.currentPage
            this.pagination = getPagination({
                currentPage:data.data.currentPage,
                totalCount:data.data.totalCount,
                limit:data.data.limit
            })
        },
        async detail(id){
            let detail = document.getElementById('orderDetail')
            console.log(id)
            
           detail.title = "사이즈 : "+id.xSize+"*"+id.ySize+"\n"+"두께 : "+id.thick+"\n포장 : "+id.packing+"\n부자재 : "+id.subItem+"\n인쇄면 : "+id.prinside
            
        }
    },
    layout:'admin'
}
</script>

