<template>
    <div class = "header">
        <div class="imgDiv">
            <nuxt-link to="/"><img class="logoImg" src="/dongne_b.png"></nuxt-link>
        </div>
        <div class="mainMenu">
            <nuxt-link to="/">공지사항</nuxt-link>
            <nuxt-link to="/">상품</nuxt-link>
            <nuxt-link to="/">제작가이드</nuxt-link>
            <nuxt-link to="/">이밴트</nuxt-link>
            <nuxt-link to="/">리뷰</nuxt-link>
        </div>
        <hr class="head-line" noshade />
        <div class = "subMenu">
            <nuxt-link to="/signup" v-if="! isLogin">회원가입</nuxt-link>
            <nuxt-link to="/signin" v-if="! isLogin">로그인</nuxt-link>
            <nuxt-link to="/mypage" v-if="isLogin">마이페이지</nuxt-link>
            <nuxt-link to="/signout" v-if="isLogin">로그아웃</nuxt-link>
            <nuxt-link to="/cart"> 장바구니 </nuxt-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            isLogin: 'users/isLogin'
        })
    }
}

</script>

<style scoped>

.imgDiv{width:150px; height:150px; display: block; margin-left: auto; margin-right: auto;}
.logoImg{width:100%; margin-top: 15% }
.header
{
    text-align: center; 
    background-color: #e57a65
}
.head-line{
    
 size:10 ;
 color:#ffffff  ;  

}
a{
    padding:10px;
    font-family: "KBIZ한마음고딕 B", "맑은고딕", "나눔고딕","고딕", arial, helvetica, sans-serif;

    color: #454545; font-size : 18px;
}

</style>