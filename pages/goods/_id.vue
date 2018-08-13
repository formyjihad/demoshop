<template>
    <div class = "detail">
        <img class = "item-image" :src='"http://localhost:3000/uploads/" + img'>
        <h3>{{name}}</h3>
        <h3>{{price}}</h3>
        <Order />
       
    </div>
</template>

<script>
import axios from "axios";
import Order from "@/components/order";
export default {
    components: {
        Order
    },
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
        let url = `http://localhost:3000/api/v1.0/goods/detail?goodsId=${this.goodsId}`
        let data = await axios.get(url);
        this.name = data.data.name;
        this.price = data.data.price;
        this.img = data.data.img;
        console.log(this.img)
    },
    methods:{
        async buy(){
            let url = 'http://localhost:3000/api/v1.0/purchase'
            let data = await axios.post(url, {
                name:this.name,
                price:this.price
            })
            if(data.status == 201){
                alert('해당 제품 구매를 완료했습니다.');
            }else if(data.status == 204){
                alert('결제에 실패하였습니다.');
            }
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