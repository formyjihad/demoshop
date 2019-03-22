<template>
    <div class="container">
        <ul v-for="notice in notices" :key="notice['_id']">
            <li><input type="checkbox" class="notice">{{notice.title}}</li>
        </ul>
        <button type="button" @click="deleteData">삭제</button>
    </div>
</template>

<script>
import axios from "axios"
export default {
    async asyncData(){                                  //페이지 생성시 변수 초기화 함수
        let url = "/api/notice/noticeDelete"
        let getData = await axios.get(url)
        if(getData.status == 201){
            //alert("error")
        }
        
        else if(getData.status == 200){
            return{
                notices:getData.data.notice
            }
        }
    },
    methods:{
        async deleteData(){
            let target = document.getElementsByClassName("notice")
            let data = [];
            for(let i = 0; i<target.length; i++){
                console.log(i)
                if(target[i].checked == true){
                    data.push(i)
                }
            }
            let url = "/api/notice/noticeDelete"
            let postData = await axios.post(url,{
                targetArray:data
            })
            if(postData.status==201){
                alert("error")
            }
            else if(postData.status==200){
                alert("삭제 성공")
            }
        }
    }
}
</script>

<style>

</style>
