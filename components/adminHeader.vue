<template>
    <div class ="container">
        <nuxt-link to="/admin" v-if="isLogin">메인 페이지</nuxt-link>
        <nuxt-link to="/admin/notice" v-if="isLogin">공지사항 등록</nuxt-link>
        <nuxt-link to="/admin/event" v-if="isLogin">이밴트 등록</nuxt-link>
        <nuxt-link to="/admin/users" v-if="isLogin">유저 리스트</nuxt-link>
        <nuxt-link to="/admin/goods" v-if="isLogin">제품 리스트</nuxt-link>
        <nuxt-link to="/admin/purchase" v-if="isLogin">구매 리스트</nuxt-link>
        <!--<nuxt-link to="/admin/registry" v-if="isLogin">제품 등록</nuxt-link>-->
    </div>
</template>

<script>
import axios from '~/plugins/axios'
import { mapGetters } from 'vuex';
export default {
    computed:{
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

