<template>
    <div class="modal-body">
        <form @submit.prevent="uploadImg">
            <label><input type="file" id="img"/>도안 파일</label>
            <button type="submit">업로드</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props:[
        'orderid'
    ],
    methods:{
        async uploadImg(){
            console.log("등록 대기")
            let formData = new FormData();
            let fileDom = document.querySelector('#img');
            formData.append("img", fileDom.files[0]);
            formData.append("orderid",this.orderid);
        
            let data = await axios.post('/api/fileUpload/order',formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            console.log("post 종료");
            if(data.status == 200){
                alert('도안 파일이 정상적으로 등록되었습니다.');
            }else if(data.status == 204){
                alert('도안파일 업로드가 실패 하였습니다.');
            }
        }
    }
}

</script>

<style>

</style>

