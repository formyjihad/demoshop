<template>
    <div class = "header">
        <nuxt-link to="/">메인 페이지</nuxt-link>
        <nuxt-link to="/signup" v-if="! isLogin">회원가입</nuxt-link>
        <nuxt-link to="/signin" v-if="! isLogin">로그인</nuxt-link>
        <nuxt-link to="/mypage" v-if="isLogin">마이페이지</nuxt-link>
        <nuxt-link to="/signout" v-if="isLogin">로그아웃</nuxt-link>
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
a{
    padding:10px;
}
</style>