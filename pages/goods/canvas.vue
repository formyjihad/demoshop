<template>
    <div class="goodsBody">
        <canvasOrder/>
    </div>
</template>

<script>
import canvasOrder from '../../components/canvasOrder'
export default {
    components:{
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
