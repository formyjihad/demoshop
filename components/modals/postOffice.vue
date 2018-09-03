<template>
    <div class="modal-body">
        우체국 API 호출 예정입니다.
        <input id="argumentInput" type="text" value="arg" placeholder="동, 구, 면을 입력하세요">
        <button @click="callPostOffice(arg)">검색하기</button>
        
    </div>
</template>

<script>
import axios from 'axios'
export default {
    methods:{
        async callPostOffice(value){
            let regkey = '401652aa7e13e7f751535698618290'
            let url = `http://biz.epost.go.kr/KpostPortal/openapi?regkey=${regkey}&target=postNew&qurey=${value}`
            //let data = await axios.post(url)
            console.log("url: "+ url)
        }
    }

}
</script>

<style>

</style>

