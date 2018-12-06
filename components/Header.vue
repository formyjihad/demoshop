<template>
    <div class="header">
        <div class="logo"><nuxt-link to="/"><img src="/dongne_b.png"></nuxt-link></div>
        <div class="cols"><nuxt-link to="/notice">공지사항</nuxt-link></div>
        <div class="cols"><nuxt-link to="/main">상품</nuxt-link></div>
        <div class="cols"><nuxt-link to="/">제작가이드</nuxt-link></div>
        <div class="cols"><nuxt-link to="/event">이밴트</nuxt-link></div>
        <sidebar class ="sidebar" @close-tab="displayToggle()" style="width:0px"/>
        <!--<nuxt-link to="/">리뷰</nuxt-link>-->
<!--        <div class = "subMenu">
            <nuxt-link to="/agreement" v-if="! isLogin">회원가입</nuxt-link>
            <nuxt-link to="/signin" v-if="! isLogin">로그인</nuxt-link>
            <nuxt-link to="/mypage" v-if="isLogin">마이페이지</nuxt-link>
            <nuxt-link to="/signout" v-if="isLogin">로그아웃</nuxt-link>
            <nuxt-link to="/cart"> 장바구니 </nuxt-link>
        </div>-->
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import sidebar from "./sidebar"
export default {
    computed: {
        ...mapGetters({
            isLogin: 'users/isLogin'
        })
    },
    methods:{
        displayToggle(){
            let target = document.getElementsByClassName("sidebar")
            if(target[0].style.width=='0px'){
                target[0].style.width = '300px'
            }
            else{
                target[0].style.width = '0px'
            }
        },
    },
    components:{
        sidebar:sidebar
    }
}

</script>

<style scoped>
.header{
    display: inline-block;
    height:18vh;
    width:100%;
    background-color: #565656;
    vertical-align:middle;
}
.header .logo{
    display: inline-block;
    margin-top:20px;
    height: 100px;
    width:15%;
    text-align: center;
}
.header .logo img{
    height: 80%;
}
.header .cols{
    display: inline-block;
    font-size: 18px;
    width:21%;
    font-family: Arial, Helvetica, sans-serif;
    
    font-weight: bold;
    text-align: center;
}

.header .cols a{
    color: #ccc;
    text-decoration: none;
}

.menu img{
    height: 25px;
    float: right;
    margin-right: 30px;
    margin-top: 9px;
    cursor: pointer; /* hand-shaped cursor */
}

</style>