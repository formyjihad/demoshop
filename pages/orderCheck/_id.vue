<template>
    <div>
        {{orderData}}
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            orderData:[],
            orderid:this.$route.params.id,
        }
    },
    async created(){
        let url = `/api/orderCheck?id=${this.orderid}`
        let getData = await axios.get(url)
        //console.log(getData.data)
        this.orderData=getData.data.getData
    }

}
</script>

<style>

</style>
