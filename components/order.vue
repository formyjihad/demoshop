<template>
    <section id="form-section">
        <vue-good-wizard :steps="steps" :onNext="nextClicked" :onBack="backClicked">
            <div class="buttons" slot="slot1">
                <p>칼선을 포함한 가로와 세로길이를 입력해주세요. </p>
                <input type="number" min="4" max="59" v-model="xsize" placeholder="4"> *
                <input type="number" min="4" max="59" v-model="ysize" placeholder="4">
                <p>주문 사이즈 : {{ xsize }} * {{ ysize }} cm / {{ xsize*0.3937 }} * {{ ysize*0.3937 }} inch</p>
            </div>
            <div class="buttons" slot="slot2">
                <p>원하시는 아크릴의 두께를 선택하세요</p>
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
            </div>
            <div class="buttons" slot="slot3">
                <p>원하시는 아크릴 바닥 부품의 크기를 선택하세요.</p>
                <input type="radio" id="oneStand" value="4cm" v-model="stand">
                <label for="oneStand">없음</label>
                <br>
                <input type="radio" id="twoStand" value="6cm" v-model="stand">
                <label for="twoStand">opp만</label>
                <br>
                <input type="radio" id="threeStand" value="8cm" v-model="stand">
                <label for="threeStand">O링만+OPP</label>
                <br>
                <span>선택:{{stand}}</span>
            </div>
            <div class="buttons" slot="slot4">
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
            </div>
            <div class="buttons" slot="slot5">
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
            </div>
            <div class="buttons" slot="slot6">
                <h5>인쇄면</h5>
                <input type="radio" id="onePrint" value="front" v-model="printside">
                <label for="onePrint">단면</label>
                <br>
                <input type="radio" id="twoPrint" value="both" v-model="printside">
                <label for="twoPrint">양면</label>
                <br>
                <span>선택 : {{ printside }}</span>
            </div>
            <div class="buttons" slot="slot7">
                <span> 갯수 : </span>
                <input type="number" id="quantity" v-model="quantity">
            </div>
            <div class="buttons" slot="slot8">
                <h5>도안 파일 업로드</h5>
                <input type="file" id="uploadImg"><br>
            </div>
            <!--<button type="button" @click="buy">구매하기</button>-->
        </vue-good-wizard>
    </section>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from 'vuex';
import { GoodWizard } from 'vue-good-wizard';

export default {
    components: {
        'vue-good-wizard': GoodWizard,
    },
    vaildate({params}){
        return true
    },
    
    data(){
        return {
            steps: [
                {
                    label: 'Select Size',
                    slot: 'slot1',
                },
                {
                    label: 'Select Thickness',
                    slot: 'slot2',
                },
                {
                    label: 'Select Stand',
                    slot: 'slot3',
                },
                {
                    label: 'Select Sub Items',
                    slot: 'slot4',
                },
                {
                    label: 'Select Packing',
                    slot: 'slot5',
                },
                {
                    label: 'Select Print Side',
                    slot: 'slot6',
                },
                {
                    label: 'Order Amount',
                    slot: 'slot7',
                },
                {
                    label: 'Upload File',
                    slot: 'slot8',
                }
            ],
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
        stand: {
            type: String,
            default:"4cm"
        },
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
        async nextClicked(currentPage) {
            console.log('next clicked', currentPage)
            if(currentPage == 7){
                let formData = new FormData();
                let fileDom = document.querySelector('#uploadImg');
                console.log(fileDom)
                let uploadImg = fileDom.files[0];
                formData.append("img", fileDom.files[0]);
                const timeStamp = Date.now()
                const goods = [{
                    _id:this.goodsId,
                    name:this.name,
                    quantity:this.quantity,
                    price:this.price,
                    xsize:this.xsize,
                    ysize:this.ysize,
                    thick:this.thick,
                    stand:this.stand,
                    packing:this.packing,
                    printside:this.printside,
                    img:uploadImg.name,
                    orderDate:timeStamp
                    //img:uploadImg
                }];
                console.log('breakpoint')
                console.log(goods);

                
                if(this.cart.length>0){
                    let _id = this._id
                    let cartIndex = this.cart.findIndex(cart => {
                        return cart._id == _id
                    })
                    if (cartIndex == -1){
                        this.addToCart(goods);
                        console.log("post 대기")
                        let fileData = await axios.post('/api/fileUpload',formData,{
                            headers:{
                                'Content-Type':'multipart/form-data'
                            }
                        })
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
                }
            }
            return true; //return false if you want to prevent moving to next page
        },
        backClicked(currentPage) {
            console.log('back clicked', currentPage);
            return true; //return false if you want to prevent moving to previous page
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
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 30px;
    overflow: auto;
}

.item-image {
  width: 300px;
  height: 300px;
}
.product_img {
    float: left;

}
.options{
    float:right;
    text-align: left;
}
.buttons{    
    text-align: center;
    margin-top: 4%;
}
p {
    margin: 0 auto;
    font-family: Arial, Helvetica, sans-serif;
    color: #454545;
    font-weight: bold;
}

</style>
