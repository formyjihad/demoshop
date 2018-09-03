<template>
    <div class = "container">
        <form @submit.prevent="signup">
            <label for="uid">아이디</label>
            <input id="uid" type="text" v-model="uid"><br>
            <label for="password">비밀번호</label>
            <input id="password" type="password" v-model="password"><br>
            <input id="passwordConfirm" type="password" v-model="passwordConfirm" @input="passwordCheck($event.target.value)">
            <label for="passwordConfirm">비밀번호 확인</label><br>
            <input id="name" type="name">
            <label for="name">이름</label><br>
            <input id="postCode" @click="callPostOffice" v-model="postCode">
            <label for="postCode">우편번호</label><br>
            <input id="address" type="text" v-model="address">
            <label for="address">주소</label><br>
            <input id="addressDetail" type="text" v-model="addressDetail">
            <label id="addressDetail">상세주소</label><br>
            <input id="phoneNumber" type="tel" v-model="phoneNumber" pattern="(010)-\d{4}-d{4}" placeholder="010-0000-0000">
            <label id="phoneNumber">핸드폰 번호</label><br>
            <input id="email" type="email" v-model="email">
            <label id="email">이메일 주소</label><br>
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
        passwordCheck(value){
            if(vaule != this.password){
                alert("패스워드가 잘못되었습니다");
            }
        },
        async callPostOffice(){
            alert("우체국 api 호출");
        },
        async signup (){
            if(this.uid && this.password){
                let url ='/api/users/signup'
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
