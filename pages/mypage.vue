<template>
    <div class = "container" v-if="isLogin">
        <div class="section1">
            <h1>My Page</h1>
            <div class="sec1_1">
                <div class = "vipSection">
                    <p>회원등급</p>
                    <div class = "vipSection_1">
                        <h5 id="statusTitle">{{status}}</h5>
                    </div>
                </div>
                <div class = "couponSection">
                    <p>보유쿠폰갯수 : {{couponCount}}개</p>
                    <div class = "couponTable">
                        <table>
                            <thead>
                                <th>쿠폰이름</th>
                                <th>쿠폰코드</th>
                                <th>유효기간</th>
                            </thead>
                            <tbody v-for='coupon in coupons' :key="coupon['_id']">
                                <tr>
                                    <td>{{coupon['name']}}</td>
                                    <td>{{coupon['code']}}</td>
                                    <td>{{coupon['date']}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class = "pagination">
                        <a href ="#" @click='getCouponPage(p)' v-for="p in couponPage" :key="p">
                        {{p+1}}</a>
                    </div>
                </div>
            </div>
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
                        <tr class="t_body" v-for="order in orders" :key="order['_id']">
                            <td class="bodyNum"><nuxt-link :to='{path:"/orders/"+order["purchaseId"], params:{id:order["purchaseId"]}}'>{{order['orderId']}}</nuxt-link></td>
                            <td class="cols"><nuxt-link :to='{path:"/orders/"+order["purchaseId"], params:{id:order["purchaseId"]}}'>{{order['orderDate']}}</nuxt-link></td>
                            <td class="bodyName"><nuxt-link :to='{path:"/orders/"+order["purchaseId"], params:{id:order["purchaseId"]}}'>{{order['goodsName']}}</nuxt-link></td>
                            <td class="cols"><nuxt-link :to='{path:"/orders/"+order["purchaseId"], params:{id:order["purchaseId"]}}'>{{order['status']}}</nuxt-link></td>
                            <td class="cols"><nuxt-link :to='{path:"/orders/"+order["purchaseId"], params:{id:order["purchaseId"]}}'>{{order['totalAmount']}} 원</nuxt-link></td>
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
    <div v-else>
        로그인이 필요한 서비스 입니다.
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
    console.log(totalCount)
    return pn;
}
export default {
    async mounted() {
        try{
            let getData = await axios.get("/api/purchase/")
            let goodsName;
            if(getData.data){
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
                    let date = new Date(orderData[i].orderDate)
                    let time = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
                    orderData[i].orderDate = time
                    orderData[i].goodsName = goodsName;
                }
                this.orders = orderData,
                this.orderDetails = getData.data.order.orderDetail,
                this.totalCount = getData.data.totalCount,
                this.limit = getData.data.limit,
                this.currentPage = getData.data.currentPage,
                this.pagination = getPagination({
                    currentPage:getData.data.currentPage,
                    totalCount:getData.data.totalCount,
                    limit:getData.data.limit
                })
            }
        }catch(err){
            alret("에러 발생 \n"+err)
        }
        try{
            let couponData = await axios.get('/api/coupon')
            if(couponData.status == 201){
                alert("error")
            }
            else if(couponData.status == 200){
                const coupon = couponData.data.coupon
                this.coupons = coupon
                let target = document.getElementById("statusTitle")
                
                if(couponData.data.status == 1){
                    this.status = "일반"
                    target.title = ""
                }
                else if(couponData.data.status == 2){
                    this.status = "VIP"
                    target.title = ""
                }
                else if(couponData.data.status == 3){
                    this.status = "VVIP"
                    target.title = ""
                }
                for(let i=0; i<coupon.length;i++){
                    let couponDate = new Date(coupon[i].date);
                    let couponMonth = couponDate.getMonth()+1
                    let couponYear = couponDate.getFullYear()
                    let couponDay = couponDate.getDate()
                    coupon[i].date = couponYear+"-"+couponMonth+"-"+couponDay
                }
                
                this.couponCount = couponData.data.count,
                this.couponLimit = couponData.data.limit,
                this.couponCurrent = couponData.data.couponCurrent,
                this.couponPage = getPagination({
                    currentPage:couponData.data.couponCurrent,
                    totalCount:couponData.data.count,
                    limit:couponData.data.limit
                })
            }
        }
        catch(err){
            alert("에러 발생 \n"+err)
        } 
    },
    data(){
        return{
            orders:[],
            orderDetails:[],
            totalCount : '',
            limit:'',
            currentPage:'',
            couponPage:'',
            status:1,
            pagination :'',
            couponCount:'',
            couponLimit:'',
            couponCurrent:'',
            coupons:[],
            couponDate:'',
        }
    },
    computed: {
        ...mapGetters({
            isLogin: 'users/isLogin'
        })
    },

    methods:{
        async getCouponPage(page){
            let couponData = await axios.get(`/api/coupon?page=${page}`)
            if(couponData.status == 201){
                alert("error")
            }
            else if(couponData.status == 200){
                const coupon = couponData.data.coupon
                if(couponData.data.status == 1){
                    this.status = "일반"
                }
                else if(couponData.data.status == 2){
                    this.status = "VIP"
                }
                else if(couponData.data.status == 3){
                    this.status = "VVIP"
                }
                for(let i=0; i<coupon.length;i++){
                    let couponDate = new Date(coupon[i].date);
                    let couponMonth = couponDate.getMonth()+1
                    let couponYear = couponDate.getFullYear()
                    let couponDay = couponDate.getDate()
                    coupon[i].date = couponYear+"-"+couponMonth+"-"+couponDay
                    
                }
                
                this.couponCount = couponData.data.count,
                this.couponLimit = couponData.data.limit,
                this.couponCurrent = couponData.data.couponCurrent,
                this.couponPage = getPagination({
                    currentPage:couponData.data.couponCurrent,
                    totalCount:couponData.data.count,
                    limit:couponData.data.limit
                })
                this.coupons = coupon
            }
        },
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
                let date = new Date(orderData[i].orderDate)
                let time = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
                orderData[i].orderDate = time
                orderData[i].goodsName = goodsName;
            }/*
            if(getData.data.order.orderDetail.length > 1){
                goodsName = getData.data.order.orderDetail[0].goodsName + "외 " + getData.data.order.orderDetail.length +"건"
            }*/
            //console.log(orderData);
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

.vipSection{
    text-align: left;
    width:50%;
    height: 90%;
    float: left;
    
}

.vipSection p{
    margin-left:10%;
    font-weight: bold;
}
.vipSection .vipSection_1{
    text-align: center;
}
.vipSection .vipSection_1 h5{
    font-size:40px;
}
.couponSection{
    text-align: left;
    width: 50%;
    height: 90%;
    float: left;
    border-left : 1px solid #000;
}
.couponSection p{
    margin-left:10%;
    margin-bottom:5px;
    font-weight: bold;
}

.couponSection .pagination{
    width:100%;
    margin-top:3px;
    margin-left: auto;
    margin-right: auto;
    display: inline-block;
    text-align: center;
}


.sec1_1 { width:100%; height:150px; overflow:hidden; border:1px solid #000; margin-top:30px; padding-top:15px;}
.couponSection .couponTable {width: 300px; height:80px; margin-left:auto; margin-right: auto;  text-align: left;}
.couponSection table tr{
    height: 26.8px;
}
.couponSection table thead{
    border-bottom:1px solid #000
}

</style>
