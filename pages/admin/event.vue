<template>
    <div class= "container">
        <p> 공지사항 </p>
        <form @submit.prevent="event">
            <label for="title">제목</label>
            <input type="text" v-model="title"/><br>
            <label for="detail">내용</label>
            <textarea rows="5" cols="30" v-model="detail"/><br>
            <label for="attach">첨부 파일</label>
            <input type="file" id="img"/> <br>
            <button type="submit">등록하기</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    layout:'admin',
    data(){
        return {
            title:'',
            detail:'',
        }
    },
    methods:{
        async event(){
            console.log("등록 대기")
            let formData = new FormData();
            let fileDom = document.querySelector('#img');
            if(this.title && this.detail){
                formData.append("img", fileDom.files[0]);
                formData.append("title",this.title);
                formData.append("detail", this.detail);
                console.log("post 대기");
            
            let data = await axios.post('/api/event',formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            console.log("post 종료");
            if(data.status == 200){
                alert('이밴트가 정상적으로 등록되었습니다.');
            }else if(data.status == 204){
                alert('이밴트 등록을 실패 하였습니다.');
            }
            this.$nuxt.$router.replace({ path: '/admin' });
            }/*else{
                alert ('빈 양식이 있습니다.')
            }*/
        }
    }
}
</script>