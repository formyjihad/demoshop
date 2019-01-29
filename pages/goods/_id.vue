<template>
    <div class="goodsBody">
        <div v-if="url=='5b8757a4be2adb37805d15fd'">
            <!--<div v-if="url=='5b83c78108444574c7c5137c'"> commit-->
            <order/>
        </div>
        <div v-else-if="url =='5b98d09fd4565a0b04389949'">
            <canvasOrder/>
        </div>
    </div>
</template>

<script>
import order from '../../components/order'
import canvasOrder from '../../components/canvasOrder'
export default {
    data(){
        return{
            url:this.$route.params.id,
        }
    },
    components:{
        order,
        canvasOrder,
    }
}
</script>


<style scoped>

.goodsBody{
    height: 600pt;
    max-width:1280px;
    margin: 0 auto;
}
@media(max-width: 986px){
    max-width:720px;
}

</style>
