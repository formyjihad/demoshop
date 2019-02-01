<template>
    <div class="goodsBody">
        <order/>
    </div>
</template>

<script>
import order from '../../components/order'
export default {
    components:{
        order,
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
