<template>
    <div class ="container">
        <nuxt-link to="/admin" v-if="status==true">메인 페이지</nuxt-link>
        <nuxt-link to="/admin/notice" v-if="status==true">공지사항 등록</nuxt-link>
        <nuxt-link to="/admin/event" v-if="status==true">이밴트 등록</nuxt-link>
        <nuxt-link to="/admin/users" v-if="status==true">유저 리스트</nuxt-link>
        <nuxt-link to="/admin/goods" v-if="status==true">제품 리스트</nuxt-link>
        <nuxt-link to="/admin/purchase" v-if="status==true">구매 리스트</nuxt-link>
        <nuxt-link to="/admin/registry" v-if="status==true">제품 등록</nuxt-link>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            status:''
        }
    },
    async beforeCreate() {
        let adminData = await axios.get('/api/admin')
        console.log("adminData :")
        console.log(adminData)
        if(adminData.status ==200){
            this.status = true
        }
    }
}
</script>


<style scoped>
a{
    padding:10px;
}
</style>

