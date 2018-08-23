<template>
    <div>
        <div class = "panel panel-primary" v-if="cart.length >0">
            <div class = "panel-heading">Cart</div>
            <div class = "panel-body">
                <div class = "panel" v-for="cart in cart" :key="cart._id">
                    <div class = "panel-body">
                        <div class = "row">
                            <div class = "col-xs-12 col-sm-4">
                                <h6>{{cart.name}}</h6>
                            </div>
                            <div class = "col-xs-12 col-sm-2">
                                <h6>{{cart.price}}</h6>
                            </div>
                            <div class = "col-xs-12 col-sm-2">
                                <h6>qty <span class="label label-success">{{cart.quantity}}</span></h6>
                            </div>
                            <div class = "col-xs-12 col-sm-4">
                                <div class = "btn-group" style = "min-width:300px">
                                    <button type="button" class="btn btn-sm btn-default" @click="onDecrement(cart._id, cart.quantity)">-</button>
                                    <button type="button" class="btn btn-sm btn-defalut" @click="onIncrement(cart._id)">+</button>
                                    <button type="button" class="btn btn-sm btn-danger" @click="deleteCart(cart._id)">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class = "row">
                    <div class = "col-xs-12">
                        <h6>Total amount:{{totalAmount}}</h6>
                        <button class = "btn btn-success btn-sm" @click="onCheckout()">Proceed to Checkout</button>
                    </div>
                </div>
            </div>
            <div class = "modal fade" :class = "{in: showModal}" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class = "modal-content">
                        <div class = "modal-header">
                            <button type= "button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal()">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 class = "modal-title"> Thank You! </h4>
                        </div>
                        <div class="modal-body">
                            <p> Your order has been saved</p>
                            <p> You will receive an email confirmation</p>
                        </div>
                        <div class = "modal-footer">
                            <div class = "rows">
                                <div class = "col-xs-6">total : {{totalAmount}}</div>
                            </div>
                            <button type = "button" class = "btn btn-default" data-dismiss="modal" @click="closeModal()">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class = "modal-overlay" :class="{in:showModal}"></div>
        </div>
        <div v-else></div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data(){
        return {
            showModal:false
        }
    },
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
        deleteCart(_id){
            this.deleteCart(_id)
        },
        onIncrement(_id){
            this.updateCart({
                _id,
                unit:1,
                cart:this.cart
            })
        },
        onDecrement(_id){
            this.updateCart({
                _id,
                unit:-1,
                cart:this.cart
            })
        },
        onCheckout(){
            this.showModal = !this.showModal
        },
        closeModal(){
            this.showModal = false
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