<template>
    <div class= "container">
        <form @submit.prevent="registry">
            <label for="상품이름">상품 이름</label>
            <input type="text" v-model="name">
            <label for="상품가격">상품 가격</label>
            <input type="number" v-model="price">
            <label for="상품이미지">상품 이미지</label>
            <input type="file" id="img">
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
            name:'',
            price:'',
        }
    },
    methods:{
        async registry(){
            let formData = new FormData();
            let fileDom = document.querySelector('#img');
            if(this.name && this.price && fileDom.files[0]){
                formData.append("img", fileDom.files[0]);
                formData.append("name",this.name);
                formData.append("price", this.price);
                console.log("post 대기");
            
            let data = await axios.post('http://27.255.88.77/api/v1.0/admin/goods/registry',formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            console.log("post 종료");
            alert('제품이 정상적으로 등록되었습니다.');
            this.$nuxt.$router.replace({ path: '/admin' });
            }else{
                alert ('빈 양식이 있습니다.')
            }
        }
    }
}
</script>

