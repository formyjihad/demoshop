<template>
    <div class = "panel panel-primary" v-if="cart.length >0">
        <div class = "panel-heading">장바구니</div>
        <div class = "panel-body">
            <div class = "panel" v-for="cart in cart" :key="cart.id">
                <div class = "panel-body">
                    <div class = "row">
                        <div class = "col-xs-12 col-sm-4">
                            <h6>{{cart.name}}</h6>
                        </div>
                        <div class = "col-xs-12 col-sm-2">
                            <h6>{{cart.price}}</h6>
                        </div>
                        <div class = "col-xs-12 col-sm-2">
                            <h6>수량 : <span class="label label-success">{{cart.quantity}}</span></h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class = "amount">
            <div>
                <h6>Total amount:{{totalAmount}}</h6>
            </div>
        </div>
        <div class = "delivery">
            <input type="radio" id = "poradio" value="postoffice" v-model="delivery">
            <label for = "poradio">우체국 택배</label>
            <input type="radio" id = "toradio" value="takeout" v-model="delivery">
            <label for = "toradio">직접 수령</label>
        </div>
        <div class = "address" v-if="delivery === 'postoffice'">
                <!-- 우체국 API는 이곳에 위치 -->
            <p>주소를 입력하세요</p>
            <input type="text" v-model="addressInput">
                <!-- <input type="text" v-model="addressInput" readonly> -->
            <p>상세 주소를 입력하세요</p>
            <input type="text" v-model="addressDetail">
        </div>
        <div class = "payment">
            <p> 결제 방식 </p>
            <input type="radio" id = "card" value="card" v-model="paymentType">
            <label for="card">카드결제</label>
            <input type="radio" id = "cash" value="cash" v-model="paymentType">
            <label for="cash">현금결제</label>
        </div>
        <button type="button" @click="checkout">결제</button>    
    </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex';
export default {
    computed:{
        cart(){
            return this.cart()
        },
        totalAmount(){
            return this.totalAmount()
        },
        ...mapGetters({
            isLogin:'users/isLogin',
            cart:'carts/cart',
            totalAmount:'carts/totalAmount'
        }),
    },
    props:{
        delivery:{
            defalut: "postoffice",
            required: true
        },
        addressInput:{
            defalut : "직접수령",
            required : true
        },
        addressDetail:{
            defalut : "직접수령",
            required: true
        },
        paymentType:{
            defalut:"Card",
            required:true
        }
    },
    created(){
        this.$store.dispatch('carts/getCart')
    },
    methods:{
        async checkout(){
            //console.log(this.totalAmount)
//order 정보 post -> purchase
            let url;
            if(this.isLogin==null){
                console.log("비로그인 감지");
                //let tempid = "DN"+Date.now;
                url = '/api/purchase/noSign'
            }// 비로그인 주문 코드. DN + 현재 시간.
            else{
                url = '/api/purchase'
            }
            

            console.log("post 시작");
            const data = await axios.post(url, {
                //tempid:this.tempid,
                address:this.addressInput,
                addressDetail:this.addressDetail,
                cart:this.cart,
                totalAmount:this.totalAmount
            });
            console.log("post 종료");
            if(data.status == 201){
                alert('테스트, 구매하였습니다.')
                this.$nuxt.$router.replace({path:'/'})
            }else if(data.status == 204){
                alert('잘못된 정보입니다.');
            }/*else if(data.status == 205){
                alert('비로그인 입니다. 로그인 페이지로 이동합니다.');
                this.$nuxt.$router.replace({path:'/signin'})
            }*/
        },
        ...mapActions({
            addToCart : 'carts/addToCart',
            updateCart : 'carts/updateCart',
            deleteCart : 'carts/deleteCart'
        })
    }    
}
</script>

<style>

</style>
