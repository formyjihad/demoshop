<template>
    <div class="wrap">
        <div class="section1">
            <div class="section1_box1">
                <h1>장바구니</h1>
            </div>
            <div class="section1_table">
                <table class="t_wrap">
                    <thead>
                        <tr class="t_head">
                            <th class="headCheck"><input type="checkbox"></th>
                            <th class="headName">상품</th>
                            <th class="cols">도안수량</th>
                            <th class="cols">주문수량</th>
                            <th class="headPrice">가격</th>
                            <th class="cols">할인</th>
                            <th class="cols">총계</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="t_body" v-for="(cart, index) in cart" :key="cart._id">
                            <td class="bodyCheck"><input type="checkbox" class="bodyCheckbox" @click="indexCheck(index)"/></td>
                            <td class="bodyName">
                                {{cart.goodsType}}
                            </td>
                            <td class="cols">                    
                                <button type="button" class="b2_1" @click="onDesignDecrement(index, cart.design)">-</button>
                                {{cart.design}}
                                <button type="button" class="b2_1" @click="onDesignIncrement(index)">+</button>
                            </td>
                            <td class="cols">                    
                                <button type="button" class="b2_1" @click="onDecrement(index, cart.quantity)">-</button>
                                {{cart.quantity}}
                                <button type="button" class="b2_1" @click="onIncrement(index)">+</button>
                            </td>
                            <td class="cols">
                                {{cart.price*cart.quantity}}
                            </td>
                            <td class="cols">
                                {{Math.ceil((cart.price*cart.quantity)*(discountRate/100))}}
                            </td>
                            <td class="cols">
                                {{(cart.price*cart.quantity)-Math.ceil((cart.price*cart.quantity)*(discountRate/100))}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="btn">
                <div class="bt1" @click="deleteSelectCart(checkArray)">선택삭제</div>
                <div class="bt2" @click="deleteAllCart()">전체삭제</div>
            </div>
        </div><!--
        <div class="coupon">
            <form class="code" @submit.prevent="checkCoupon">
                <div class="code_label"><p>쿠폰코드</p></div>
                <div class="code_input"><input class="code_enter" type="text" v-model="couponCode"></div>
                <div class="code_button"><button class="btn" type="submit">쿠폰입력</button></div>
            </form>
        </div>           -->
        <div class="section3">
            <h3>장바구니 총계</h3>
            <ul class="box box1">
                <li>소계</li>
                <li>{{totalAmount}}</li>
            </ul>
            <ul class="box box3">
                <li>할인</li>
                <li>{{totalDiscountAmount}}</li>
            </ul>
            <ul class="box box3">
                <li>총계</li>
                <li>{{fullPrice}}</li>
            </ul>
            <div class="bt4" @click="onCheckout()">결제 진행</div>
        </div>
    </div> 
</template>

<script>
import axios from '~/plugins/axios'
import { mapActions, mapGetters } from 'vuex';
export default {
    computed:{
        cart(){
            return this.cart()
        },
        totalAmount(){
            return this.totalAmount()
        },
        fullPrice(){
            return parseInt(this.totalAmount)-(parseInt(this.totalDiscountAmount))
        },
        totalDiscountAmount(){
            return parseInt(this.totalDiscountAmount())
        },
        ...mapGetters({
            isLogin: 'users/isLogin',
            cart:'carts/cart',
            totalAmount:'carts/totalAmount',
            totalDiscountAmount:'carts/totalDiscountAmount'
        }),
    },
    data(){
        return{
            checkArray:[],
            discountRate:this.setDiscountRate(),
        }
    },
    created() {
        this.$store.dispatch('carts/getCart')
    },
    methods:{
        
        async setDiscountRate(){
            let url = '/api/users/statusCheck'
            let discountData = await axios.get(url);
            
            let discountRate=discountData.data.rate;
            this.updateDiscount({
                unit:discountRate,
                cart:this.cart
            });
            this.discountRate = discountRate
        },
        async indexCheck(index){
            let checkArr = this.checkArray;
            
            if(checkArr.length==0){
                checkArr.push(index)
                //console.log(checkArr)
            }else{
                for (let i = 0; i<checkArr.length; i++){
                    if(checkArr[i] == index){
                        checkArr.splice(i, 1)
                        //console.log(checkArr)
                        return{
                            checkArray:checkArr
                        }
                    }
                }
                checkArr.push(index)
                return{
                    checkArray:checkArr
                }
            }
        },
        deleteCarts(index){
            //console.log(index)
            this.deleteCart(index)
        },
        deleteSelectCart(checkArray){
            let indexArr = checkArray //[0:0, 1:1]
            let length = indexArr.length // 2
            //console.log("삭제")
            for(let i = 0; i<length; i++){
                let index = indexArr[0]
                this.deleteCart(index)
            }
            return{
                checkArray:indexArr
            }
        },
        deleteAllCart(){
            let length = this.cart.length
            for(let i =0; i<length;i++){
                this.deleteCart(0)
            }
        },
        onDesignIncrement(index){
            this.updateDesignCart({
                index,
                unit:1,
                cart:this.cart
            })
        },
        onDesignDecrement(index, design){
            //console.log(this)
            if(design > 1){
                this.updateDesignCart({
                    index,
                    unit:-1,
                    cart:this.cart
                })
            }
        },
        onIncrement(index){
            this.updateCart({
                index,
                unit:1,
                cart:this.cart
            })
        },
        onDecrement(index, quantity){
            //console.log(this)
            if(quantity > 1){
                this.updateCart({
                    index,
                    unit:-1,
                    cart:this.cart
                })
            }
        },
        onCheckout(){
            let cartLength = this.cart
            //console.log(cartLength)
            if(cartLength==0){
                alert("장바구니가 비어있습니다.")
            }
            else{
                if(!this.isLogin){
                    alert("로그인이 필요합니다.")
                }
                else{
                    alert("주문 페이지로 이동합니다.")
                    this.$nuxt.$router.replace({path:'/checkout'})
                }
            }
        },
        ...mapActions({
            getCart : 'carts/getCart',
            addToCart : 'carts/addToCart',
            updateCart : 'carts/updateCart',
            deleteCart : 'carts/deleteCart',
            updateDesignCart : 'carts/updateDesignCart',
            updateDiscount:'carts/updateDiscount'
        })
    }    
}
</script>

<style scoped>

* { margin: 0; padding: 0; list-style: none; }
a { text-decoration: none; color:inherit; }
.wrap { width:80%; margin:50px auto; }

.section1 { 
    width:100%;
    height:750px;
    border:1px solid #000;
    margin-bottom:30px; 
    text-align: center;}

.section1 .check { width:30px; height:600px; float:left; }
.section1 .check input:nth-child(1) 
{ margin-left:20px; margin-top:150px; }
.section1 .check input:nth-child(2) 
{ margin-left:20px; margin-top:250px; }

.section1_box1 { width:95%;
    height:50px; 
    float:right; 
    margin-top:15px;
}
.section1_box1 h1 { font-size:30px; text-align: left; }
.section1 .section1_table{height:600px;text-align: center}

.section1 .t_wrap { 
    width:90%; 
    margin-left:auto;
    margin-right:auto;
}

.section1 .t_wrap .t_head { 
    width:100%;
    /*height:50px; */
    border-bottom:1px solid #000;
    line-height:60px;
    margin-left: 30px; 
    text-align: center;
    padding:10px;
}
.section1 .t_wrap .t_head th.headName{
    width:40%;
}
.section1 .t_wrap .t_head th.headCheck{
    width:5%;
    margin-top:auto;
    margin-bottom:auto;
}
.section1 .t_wrap .t_head th{
    width:11%
}
.section1 .t_wrap .t_body {
    padding: 10px;
    height: 50px;
    font-size:14px;
    font-weight:900;
    text-align:center;
}

.section1 .t_wrap .t_body td.bodyName{
    width:40%; 
}

.section1 .t_wrap .t_body td.bodyCheck{
    margin-top: auto;
    margin-bottom:auto;
}

.section1 .btn{
    width:95%;
    padding-top:5px;
    display: inline-block;
    text-align: right;
    border-top:1px solid #000;
}

.section1 .btn .bt1 {
    display:inline-block;
    width:250px;
    height:50px;
    border:2px solid #000;
    text-align:center;
    line-height:50px;
    overflow:hidden;
    font-weight:900;
    margin-right:10px;
}

.section1 .t_body .cols .b2_1{
    width:33%;
    height: 100%; 
    border:1px solid #000;
    outline: 0;
}

.section1 .btn .bt2 { 
    display:inline-block;
    width:250px;
    height:50px;
    border:2px solid #000;
    text-align:center;
    line-height:50px;
    overflow:hidden;
    font-weight:900;
    margin-right:10px;
}

.section3 { width:100%;
    height:450px;
    padding:3%;
    border:1px solid #000; }
.section3 h3 { width:100%;
    height:50px;
    border-bottom:1px solid #000;
    margin-bottom:30px;
    font-size:30px; }
.section3 .box { width:100%; height:50px; line-height:50px; }
.section3 .box1 {  }
.section3 .box2 { border-bottom:1px solid #000; }
.section3 .box3 li:nth-child(2) { font-weight:900; }

.section3 .box li { height:100%; }
.section3 .box li:nth-child(1) { width:50%;float:left; text-align: left; }
.section3 .box li:nth-child(2) { width:50%; float:right; text-align:right; }

.section3 .bt4  { 
    line-height:50px;
    overflow:hidden;
    font-weight:900;
    width:250px;
    height:60px;
    float:right;
    border:2px solid #000;
    text-align:center;
    line-height:60px; 
    margin-top:40px;
    cursor: pointer;
}

.coupon { 
    width:100%;
    height:50px;
    border:1px solid #000;
    margin-bottom:30px; 
    text-align: center;
}
    

.coupon .code { width:100%; height:100%;}

.coupon .code { height:100%; text-align:center; }
.coupon .code .code_label { width:20%;height:100%;
                                display:inline-block;
}
.coupon .code .code_label p{font-size:30px;}
.coupon .code .code_input { width:60%; height:100%;
                                display: inline-block;
                                }

.coupon .code .code_button { width:10%;height:100%;
                                margin-left:40px;
                                display: inline-block;
                                }

.coupon .code .code_input .code_enter{ 
    height:100%;
    width:100%;
    border:1px solid #000;
    font-size:27px;
    text-align: center;
}
.coupon .code .code_button button{width:100%;height:90%; margin-left:15px;
                    border: solid 1px #CCC;
                    padding-right:30px;
                    padding-left:30px;
                    padding:5px;
                    margin-bottom:15px;
                    background: #fff;
                    text-shadow: 0px 1px 0px #000;
                    font-size: 20px;
                    color: #565656;
                    border-radius: 5px;
                    -moz-border-radius: 5px;
                    -webkit-border-radius: 5px;
                    box-shadow: 0 1px 3px #111;
                    -moz-box-shadow: 2px 2px 1px #999;
                    -webkit-box-shadow: 2px 2px 1px #999;}
                              
  


</style>