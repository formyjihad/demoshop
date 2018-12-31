<template>
    <div class="container">
        <button class="callEvent" @click="initClient"> CallEvent </button>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    layout:'admin',
    methods:{
        async initClient(){
            /*let url = '/api/users/auth/google'
            try{
                window.open(url)
            }catch(err){
                console.error(err)
            }*/
            try{
                let date = new Date;
                console.log("date : "+date)
                let month = date.getMonth()-2
                console.log("month : "+month);
                let day = date.getDate();
                console.log("day : "+day);
                let year = date.getFullYear();
                console.log("year : "+year);
                let fullDate = year+"-"+month+"-"+day
                alert(fullDate);
            }
            catch(err){
                console.error(err);
            }
        }
    }
}
</script>

<style>

</style>
