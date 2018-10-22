<template>
    <div class="bg_color">
        <div class="main">
            <div class = "row">
                <div class="logo mains col"><nuxt-link to="/"><img src="/dongne_b.png"></nuxt-link></div>
                <div class="mains col"><nuxt-link to="/notice">공지사항</nuxt-link></div>
                <div class="mains col"><nuxt-link to="/" class="mains col">상품</nuxt-link></div>
                <div class="mains col"><nuxt-link to="/" class="mains col">제작가이드</nuxt-link></div>
                <div class="mains col"><nuxt-link to="/event" class="mains col">이밴트</nuxt-link></div>
                <div class="menu mains col" @click="getOut()">
                    <img src="menu_logo.png" @click="displayToggle()">
                    <sidebar class ="sidebar" 
                        @close-tab="displayToggle()"
                        style="display:none;"
                    />
                </div>
                <!--<nuxt-link to="/">리뷰</nuxt-link>-->
        <!--        <div class = "subMenu">
                    <nuxt-link to="/agreement" v-if="! isLogin">회원가입</nuxt-link>
                    <nuxt-link to="/signin" v-if="! isLogin">로그인</nuxt-link>
                    <nuxt-link to="/mypage" v-if="isLogin">마이페이지</nuxt-link>
                    <nuxt-link to="/signout" v-if="isLogin">로그아웃</nuxt-link>
                    <nuxt-link to="/cart"> 장바구니 </nuxt-link>
                </div>-->
            </div>
        </div>
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
            if(target[0].style.display=='none'){
                target[0].style.display= 'block'
            }
            else{
                target[0].style.display = 'none'
            }
        },
    },
    components:{
        sidebar:sidebar
    }
}

</script>

<style scoped>
.bg_color{
    background-color: #FFF4B5;
}
body, div{
    margin: 0 auto;
}
.main{
    text-align: center;
}
.main .row {
    margin-top: 20px;
    vertical-align: middle;
 }
.logo img{
    height: 50px;
}
.mains{
    display: inline-block;
    line-height: 50px;
    font-size: 18px;
    font-family: Arial, Helvetica, sans-serif;
    color: #454545;
    font-weight: bold;
    }
.menu img{
    height: 25px;
    float: right;
    margin-right: 30px;
    margin-top: 9px;
    cursor: pointer; /* hand-shaped cursor */
}

</style>