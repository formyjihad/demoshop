<template>
    <div>
        <div class = "container" v-if="cart.length >0">
            <div class = "cart-head">장바구니</div>
            <div class = "cart-body">
                <div class = "cart" v-for="(cart, index) in cart" :key="cart._id">
                    <div class = "body">
                        <div class = "row">
                            <input type="checkbox" class = "indexcheck" value="index" @click="indexCheck(index)"/>
                            <div class = "cart-name">
                                <h6>{{cart.name}}</h6>
                            </div>
                            <div class = "cart-price">
                                <h6>{{cart.price}}</h6>
                            </div>
                            <div class = "cart-price">
                                <h6>수량 : {{cart.quantity}}</h6>
                            </div>
                            <div class = "cart-button">
                                <div class = "btn-group" style = "min-width:300px">
                                    <button type="button" class="btn btn-sm btn-default" @click="onDecrement(index, cart.quantity)">-</button>
                                    <button type="button" class="btn btn-sm btn-default" @click="onIncrement(index)">+</button>
                                    <button type="button" class="btn btn-sm btn-danger" @click="deleteCarts(index)">삭제</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class = "row">
                    <div class = "row-body">
                        <h6>Total amount:{{totalAmount}}</h6>
                        <button class = "order-btn" @click="onCheckout()">주문하기</button>
                        <button type="button" class="btn btn-sm btn-danger" @click="deleteSelectCart(checkArray)">선택삭제</button>
                        <button type="button" class="btn btn-sm btn-danger" @click="deleteAllCart()">장바구니 비우기</button>
                    </div>
                </div>
            </div>
        </div>
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
    data(){
        return{
            checkArray:[]
        }
    },
    created(){
        this.$store.dispatch('carts/getCart')
    },
    methods:{
        indexCheck(index){
            let checkArr = this.checkArray;
            if(checkArr.length==0){
                checkArr.push(index)
                console.log(checkArr)
            }else{
                for (let i = 0; i<checkArr.length; i++){
                    if(checkArr[i] == index){
                        checkArr.splice(i, 1)
                        console.log(checkArr)
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
            console.log(index)
            this.deleteCart(index)
        },
        deleteSelectCart(checkArray){
            let indexArr = checkArray //[0:0, 1:1]
            let length = indexArr.length // 2
            console.log("삭제")
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