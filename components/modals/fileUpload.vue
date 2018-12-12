<template>
    <div class="modal-body">
        <form @submit.prevent="uploadImg" v-if="count>0">
            <p>앞으로 {{count}}번 업로드 가능</p>
            <input type="file" id="img"/>
            <div class="uprd">
                <button type="submit">업로드</button>
            </div>
        </form>
        <form @submit.prevent="uploadImg" v-else>
            <p>앞으로 {{count}}번 업로드 가능</p>
            <input type="file" id="img" disabled/>
            <div class="uprd">
                <button type="submit" disabled>업로드</button>
            </div>
        </form>
    </div>  
</template>


<script>
import axios from 'axios'

export default {
    props:[
        'purchaseId',
        'count'
    ],
    methods:{
        async uploadImg(){
            //console.log("등록 대기")
            let formData = new FormData();
            let fileDom = document.querySelector('#img');
            formData.append("img", fileDom.files[0]);
            formData.append("purchaseId",this.purchaseId);
        
            let data = await axios.post('/api/fileUpload/order',formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            //console.log("post 종료");
            if(data.status == 200){
                let url = '/api/purchase/updateStatus'
                let postData = await axios.post(url, {
                    purchaseId:this.purchaseId,
                    statusUpdate:"file-confirm"
                })
                alert('도안 파일이 정상적으로 등록되었습니다.');
                this.$emit('close');
            }else if(data.status == 204){
                alert('도안 파일 업로드가 실패 하였습니다.');
            }
        }
    }
}

</script>


<style>
label input{
    border: solid 1px #ccc;
    background-color: #f1f1f1;
}
.uprd button{
    margin-top: 20px;

    padding: 5px 10px 5px 10px;
	border: solid 1px #CCC;

	background: #fff;
	text-shadow: 0px 1px 0px #000;
    font-size: 15px;
    color: #565656;

	border-radius: 5px;
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;

	box-shadow: 0 1px 3px #111;
	-moz-box-shadow: 2px 2px 1px #999;
	-webkit-box-shadow: 2px 2px 1px #999;

	cursor: pointer;
}
.modal-body{
    text-align: center;
}
</style>


