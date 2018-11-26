<template>
    <div class = "container">
            
        <div class="section1">
            <h1>My Page</h1>
            <div class="sec1_1"><p>내용잔뜩</p></div>
        </div>
        <h2>최근주문내역</h2>
        <div class = "section2">
            <div class="section2_table">
                <table class="t_wrap">
                    <thead>
                        <tr class="t_head">
                            <th class="headNum">주문번호</th>
                            <th class="headCols">주문일자</th>
                            <th class="headName">주문상품</th>
                            <th class="headCols">주문상태</th>
                            <th class="headCols">주문금액</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="t_body" v-for="order in orders" :key="order['_id']" v-if="isLogin">
                            <td class="bodyNum"><nuxt-link :to='{path:"/orders/"+order["purchaseId"]}'>{{order['orderId']}}</nuxt-link></td>
                            <td class="cols"><nuxt-link :to='{path:"/orders/"+order["purchaseId"]}'>{{order['orderDate']}}</nuxt-link></td>
                            <td class="bodyName"><nuxt-link :to='{path:"/orders/"+order["purchaseId"]}'>{{order['goodsName']}}</nuxt-link></td>
                            <td class="cols"><nuxt-link :to='{path:"/orders/"+order["purchaseId"]}'>{{order['status']}}</nuxt-link></td>
                            <td class="cols"><nuxt-link :to='{path:"/orders/"+order["purchaseId"]}'>{{order['totalAmount']}} 원</nuxt-link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class = "pagination">
                <a href ="#" @click='getPage(p)' v-for="p in pagination" :key="p">
                    {{p+1}}</a>
            </div>
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
        let goodsName;
        let orderData = getData.data.order
        let orderDetailLength;
        for(let i=0;i<orderData.length;i++){
            if(orderData[i].orderDetail.length>1){
                orderDetailLength = orderData[i].orderDetail.length -1
                goodsName = orderData[i].orderDetail[0].goodsType + "외 " + orderDetailLength + "건"
            }
            else if(orderData[i].orderDetail.length == 1){
                goodsName = orderData[i].orderDetail[0].goodsType
            }
            orderData[i].goodsName = goodsName;
        }
        return {
            orders : orderData,
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
            let goodsName;
            let orderData = getData.data.order
            let orderDetailLength;
            for(let i=0;i<orderData.length;i++){
                if(orderData[i].orderDetail.length>1){
                    orderDetailLength = orderData[i].orderDetail.length -1
                    goodsName = orderData[i].orderDetail[0].goodsType + "외 " + orderDetailLength + "건"
                }
                else if(orderData[i].orderDetail.length == 1){
                    goodsName = orderData[i].orderDetail[0].goodsType
                }
                orderData[i].goodsName = goodsName;
            }/*
            if(getData.data.order.orderDetail.length > 1){
                goodsName = getData.data.order.orderDetail[0].goodsName + "외 " + getData.data.order.orderDetail.length +"건"
            }*/
            console.log(orderData);
            this.orders = orderData
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
    justify-content: center;
    align-items: center;
    text-align: center;
    width:80%;margin:auto; margin-top:100px;
}

.container h2{
    font-size:14px; padding-left:7px; margin-top:25px; margin-bottom:10px;
}

.section1_box1 h1 { font-size:30px; text-align: left; }

.section2 { width:100%; height:350px; overflow:hidden; border:1px solid #000; margin-bottom:100px; }
    
.section2 .section2_table{height:300px;text-align: center;}




.section2 .t_wrap{margin-left:auto; margin-right:auto;width:90%;}
.section2 .t_head {
    width:90%;
    margin:auto;
    line-height:60px;
    margin-left: 30px;  
    border-bottom:1px solid #000;
}
.section2 .t_head .headNum {width:7%;}
.section2 .t_head .headName{width:45%; font-weight:900;}
.section2 .t_head .headCols{width:15%}
.section2 .t_body {
    height: 50px;
    font-size:14px;
    text-align:center;
    padding:10px}
.section2 .t_body td{height:15px;}
.section2 .t_body .bodyNum{width:7%;}
.section2 .t_body .bodyName{width:45%; }
.section2 .t_body .cols{width:15%}

.section2 .pagination{
    width:95%;
    margin-top:5px;
    padding-top: 5px;
    border-top: 1px solid #000;
    display:inline-block
}
.section2 .pagination a{
    text-align: center;
}
</style>
