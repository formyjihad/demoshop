<template>
    <div>
        <div class = "panel panel-primary" v-if="cart.length >0">
            <div class = "panel-heading">장바구니</div>
            <div class = "panel-body">
                <div class = "panel" v-for="(cart, index) in cart" :key="cart._id">
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
                            <div class = "col-xs-12 col-sm-4">
                                <div class = "btn-group" style = "min-width:300px">
                                    <button type="button" class="btn btn-sm btn-default" @click="onDecrement(index, cart.quantity)">-</button>
                                    <button type="button" class="btn btn-sm btn-defalut" @click="onIncrement(index)">+</button>
                                    <button type="button" class="btn btn-sm btn-danger" @click="deleteCart(index)">삭제</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class = "row">
                    <div class = "col-xs-12">
                        <h6>Total amount:{{totalAmount}}</h6>
                        <button class = "btn btn-success btn-sm" @click="onCheckout()">주문하기</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else></div>
    </div>
</template>

<script>
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
        cart:'carts/cart',
        totalAmount:'carts/totalAmount'
    }),
    },
    created(){
        this.$store.dispatch('carts/getCart')
    },
    methods:{
        deleteCart(index){
            this.deleteCart(index)
        },
        onIncrement(index){
            this.updateCart({
                index,
                unit:1,
                cart:this.cart
            })
        },
        onDecrement(index, quantity){
            console.log(this)
            if(quantity > 1){
                this.updateCart({
                    index,
                    unit:-1,
                    cart:this.cart
                })
            }
        },
        onCheckout(){
            alert("주문 페이지로 이동합니다.")
            this.$nuxt.$router.replace({path:'/checkout'})
        },
        ...mapActions({
            addToCart : 'carts/addToCart',
            updateCart : 'carts/updateCart',
            deleteCart : 'carts/deleteCart'
        })
    }    
}
</script>

<style scoped>
.modal-overlay {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.in {
    display: block !important;
}

</style>