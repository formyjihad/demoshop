<template>
    <div class="container">
        <button class="callEvent" @click="initClient"> CallEvent </button>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    methods:{
        async initClient(){
            /*let url = '/api/users/auth/google'
            try{
                window.open(url)
            }catch(err){
                console.error(err)
            }*/
            let url = '/api/admin/google'
            try{
                let postData = await axios.post(url)
            }catch(err){
                console.error(err)
            }
        }
    }
}
</script>

<style>

</style>
