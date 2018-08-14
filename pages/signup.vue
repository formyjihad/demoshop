<template>
    <div class = "container">
        <form @submit.prevent="signup">
            <label for="아이디">아이디</label>
            <input type="text" v-model="uid"><br>
            <label for="패스워드">패스워드</label>
            <input type="password" v-model="password"><br>
            <button type="submit">회원가입</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            uid:'',
            password:'',
            price:1000
        }
    },
    methods:{
        async signup (){
            if(this.uid && this.password){
                let url ='http://27.255.88.77/api/v1.0/users/signup'
                let data = await axios.post(url, data={
                    uid:this.uid,
                    password:this.password,
                    price:this.price
                })
                console.log(data)
                if(data.status == 200){
                    alert('해당 아이디는 이미 존재합니다.');
                }else if(data.status == 201){
                    this.$nuxt.$router.replace({ path:'/signin'})
                }
            }else{
                alert("양식이 비어있습니다.");
            }
        }
    }
}
</script>
