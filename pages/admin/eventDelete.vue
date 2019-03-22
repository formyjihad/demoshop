!<template>
    <div class="container">
        <ul v-for="event in events" :key="event['_id']">
            <li><input type="checkbox" class="event">{{event.title}}</li>
        </ul>
        <button type="button" @click="deleteData">삭제</button>
    </div>
</template>

<script>
import axios from "axios"
export default {
    async asyncData(){
        let url = "/api/event/eventDelete"
        let getData = await axios.get(url)
        if(getData.status == 201){

        }
        else if(getData.status == 200){
            return{
                events:getData.data.event
            }
        }
    },
    methods:{
        async deleteData(){
            let target = document.getElementsByClassName("event")
            let data = [];
            for(let i = 0; i<target.length; i++){
                if(target[i].checked==true){
                    data.push(i)
                }
            }  
            let url = "/api/event/eventDelete"
            let postData = await axios.post(url,{
                targetArray:data
            })
            if(postData.status == 201){
                alert("error")
            }
            else if(postDaata.status == 200){
                alert("삭제 성공")
            }
        }
    }
}

</script>

<style>

</style>
