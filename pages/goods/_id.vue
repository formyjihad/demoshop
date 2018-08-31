<template>
    <div class = "detail">
        <img class = "item-image" :src='"/uploads/" + img'>
        <h3>{{name}}</h3>
        <h3>{{price}}</h3>
        <section id="form-section">
            <h1 class="section-subtitle">주문 페이지</h1>
            <h5>아크릴 사이즈</h5>
            <p>칼선을 포함한 가로와 세로길이를 입력해주세요. </p>
            <input type="number" v-model="xsize" placeholder="4"> *
            <input type="number" v-model="ysize" placeholder="4">
            <p>주문 사이즈 : {{ xsize }} * {{ ysize }} cm / {{ xsize*0.3937 }} * {{ ysize*0.3937 }} inch</p>
            <h5>아크릴 두께</h5>
            <input type="radio" id="oneThick" value="0.7mm" v-model="thick">
            <label for="oneThick">0.7mm</label>
            <br>
            <input type="radio" id="twoThick" value="1mm" v-model="thick">
            <label for="twoThick">1mm</label>
            <br>
            <input type="radio" id="threeThick" value="3mm" v-model="thick">
            <label for="threeThick">3mm</label>
            <br>
            <input type="radio" id="fourThick" value="5mm" v-model="thick">
            <label for="fourThick">5mm</label>
            <br>
            <span>선택 : {{ thick }}</span>
            <h5>부자재</h5>
            <input type="radio" id="oneItem" value="nothing" v-model="subitem">
            <label for="oneItem">없음</label>
            <br>
            <input type="radio" id="twoItem" value="oppOnly" v-model="subitem">
            <label for="twoItem">opp만</label>
            <br>
            <input type="radio" id="threeItem" value="oRing" v-model="subitem">
            <label for="threeItem">O링만+OPP</label>
            <br>
            <input type="radio" id="fourItem" value="dogTag" v-model="subitem">
            <label for="fourItem">군번줄만+OPP</label>
            <br>
            <input type="radio" id="fiveItem" value="oRingTag" v-model="subitem">
            <label for="fiveItem">O링+군번줄+OPP</label>
            <br>
            <input type="radio" id="sixItem" value="oRingStrap" v-model="subitem">
            <label for="sixItem">O링+휴대폰줄+OPP</label>
            <br>
            <input type="radio" id="sevenItem" value="keyRing" v-model="subitem">
            <label for="sixItem">키링(O링 포함)+OPP</label>
            <br>
            <span>선택 : {{ subitem }}</span>
            <h5>조립/포장여부</h5>
            <input type="radio" id="onePack" value="noPack" v-model="packing">
            <label for="onePack">조립 없음(부자재 동봉)</label>
            <br>
            <input type="radio" id="twoPack" value="oRingPack" v-model="packing">
            <label for="twoPack">O링 조립</label>
            <br>
            <input type="radio" id="threePack" value="initPack" v-model="packing">
            <label for="threePack">OPP 개별 포장(아크릴용)</label>
            <br>
            <input type="radio" id="fourPack" value="oRingInit" v-model="packing">
            <label for="fourPack">O링&부자재 조립+OPP 개별포장(아크릴 참용)</label>
            <br>
            <span>선택 : {{ packing }}</span>
            <h5>인쇄면</h5>
            <input type="radio" id="onePrint" value="front" v-model="printside">
            <label for="onePrint">단면</label>
            <br>
            <input type="radio" id="twoPrint" value="both" v-model="printside">
            <label for="twoPrint">양면</label>
            <br>
            <span>선택 : {{ printside }}</span>
            <br>
            <span> 갯수 : </span>
            <input type="number" id="quantity" v-model="quantity">
            <br>
            <button type="button" @click="buy">구매하기</button>
        </section>
    </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from 'vuex';
export default {
    vaildate({params}){
        return true
    },
    
    data(){
        return {
            name:'',
            price:'',
            img:'',
            goodsId:this.$route.params.id
        }
    },
    async created() {
        let url = `/api/goods/detail?goodsId=${this.goodsId}`
        let data = await axios.get(url);
        this.name = data.data.name;
        this.price = data.data.price;
        this.img = data.data.img;
    },
    props: {
        xsize: {
            type: Number,
            default: 4,
            required: true,
            validator: function(value) {
                return value >= 0;
            }
        },
        ysize: {
            type: Number,
            default: 4,
            required: true,
            validator: function(value) {
                    return value >= 0;
                }
        },
        thick: {
            type: String,
            default: "3mm",
            required: true
        },
        stand: Number,
        subitem: {
            type: String,
            default: "oppOnly",
            required: true
        },
        packing: {
            type: String,
            default: "noPack",
            required: true
        },
        printside: {
            type: String,
            default: "front",
            required: true
        },
        quantity: {
            type: Number,
            default: 1,
            required: true
        }
    },
    computed:{
        cart(){
            return this.cart()
        },
        ...mapGetters({
            cart : 'carts/cart'
        })
    },
    methods:{
        buy(){
            const goods = [{
                _id:this.goodsId,
                name:this.name,
                quantity:this.quantity,
                price:this.price*this.quantity,
                xsize:this.xsize,
                ysize:this.ysize,
                thick:this.thick,
                stand:this.stand,
                packing:this.packing,
                printside:this.printside
            }]
            //console.log(this.cart)
            if(this.cart.length>0){
                let _id = this._id
                let cartIndex = this.cart.findIndex(cart => {
                    return cart._id == _id
                })
                if (cartIndex == -1){
                    this.addToCart(goods);
                    alert("장바구니에 추가되었습니다.")
                    this.$nuxt.$router.replace({path:'/'})
                } else {
                    this.updateCart({
                        _id,
                        unit:1,
                        cart:this.cart
                    })
                    alert("장바구니에 추가되었습니다.")
                    this.$nuxt.$router.replace({path:'/'})
                } 
            }else {
                alert("장바구니에 추가되었습니다.")
                this.addToCart(goods)
                this.$nuxt.$router.replace({path:'/'})
            }/*
            if(data.status == 201){
                alert('해당 제품 구매를 완료했습니다.');
            }else if(data.status == 204){
                alert('결제에 실패하였습니다.');
            }*/
        },
        ...mapActions({
            addToCart : 'carts/addToCart',
            updateCart : 'carts/updateCart',
        })
    },
}
</script>


<style scoped>
.detail {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 30px;
}

.item-image {
  width: 300px;
  height: 300px;
}
</style>