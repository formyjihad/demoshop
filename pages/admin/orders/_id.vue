<template>
    <div class = "detail">
        <section class = "orderInfo">
            <div class = "userInfo">
                    <h3>{{orders}}</h3>  
                    <!--<table>
                        <tr v-for="orderDetail in orderDetails" :key="orderDetail['_id']">
                            <td>{{orderDetail['xSize']}}</td>
                            <td>{{orderDetail['ySize']}}</td>
                        </tr>
                    </table>-->
            </div>
        </section>
    </div>

    <!--
            <section id="form-section">
                <h1 class="section-subtitle">주문 페이지</h1>
                <h5>아크릴 사이즈</h5>
                <p>칼선을 포함한 가로와 세로길이를 입력해주세요. </p>
                <input type="number" v-model="xsize"> *
                <input type="number" v-model="ysize">
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
                <button type="button" @click="edit">수정하기</button>
            </section>-->
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from 'vuex';
export default {
    vaildate({params}){
        return true
    },
    layout:'admin',
    data(){
        return{
            id:this.$route.params.id
        }
    },
    async created() {
        //console.log(this.$route.params.id)
        let url = `/api/admin/purchase/update?orderid=${this.id}`
        let data = await axios.get(url)
        console.log(this.order);
        this.order = data.data.order
//        this.orderDetails = data.data.orderDetail
    },/*
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
    methods:{
        /*
        async buy(){
            let url = 'http://localhost:3000/api/v1.0/purchase'
            let data = await axios.post(url, {
                name:this.name,
                price:this.price,
                xsize:this.xsize,
                ysize:this.ysize,
                thick:this.thick,
                stand:this.stand,
                packing:this.packing,
                printside:this.printside
            })
            if(data.status == 201){
                alert('해당 제품 구매를 완료했습니다.');
            }else if(data.status == 204){
                alert('결제에 실패하였습니다.');
            }
        }
    }
}
        */
        async edit(){
            //console.log(this.cart)

            //비회원 결제 - orderid 를 추가하여 uid에 추가.
            let url = 'api/purchase/editOrder'
            let data = await axios.post(url, {
                goodsid:this.goodsId,
                name:this.name,
                quantity:this.quantity,
                price:this.price,
                xsize:this.xsize,
                ysize:this.ysize,
                thick:this.thick,
                stand:this.stand,
                packing:this.packing,
                printside:this.printside
            })
            if(data.status == 201){
                alert('수정하였습니다.');
            }else if(data.status == 204){
                alert('수정에 실패하였습니다.');
            }
        }
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