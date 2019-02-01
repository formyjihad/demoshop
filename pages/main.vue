<template>
    <div class="index">
        <section class = "container">
            <div class="pi_imgs">
                <nuxt-link :to='{path:"/goods/acrylic"}'>
                    <img :src="'/uploads/' + acrylic.img">
                    <div class="item">{{acrylic.name}}</div>
                    제작하기
                </nuxt-link>
            </div>
            <div class="pi_imgs">
                <nuxt-link :to='{path:"/goods/canvas"}'>
                    <img :src="'/uploads/' + canvas.img">
                    <div class="item">{{canvas.name}}</div>
                    제작하기
                </nuxt-link>
            </div>
        </section><!--
        <div class = "pagination">
            <a href="#" @click='getPage(p)' v-for="p in pagination" :key="p">{{p+1}}</a>
        </div>-->
    </div>
</template>

<script>
import axios from 'axios'
/*function getPagination ({currentPage, totalCount, limit}){
    let pn = []
    let maxPage = Math.floor(totalCount/limit)
    for(let i = currentPage -3; i<currentPage+3 && i<=maxPage; i++){
        if(i>-1){
            pn.push(i);
        }
    }
    return pn
}
*/
export default {
    async asyncData(){
        let url = "/api/goods"
        let data = await axios.get(url)
        console.log(data.data.good)
        return{
            acrylic: data.data.good[0],
            canvas: data.data.good[1]
            //pagination:getPagination({
            //    currentPage:data.data.currentPage,
            //    totalCount:data.data.totalCount,
            //    limit:data.data.limit
            //})
        } 
    },
    methods : {
        async getPage(page){
            let url = `/api/goods?page=${page}`
            let data = await axios.get(url)
            
            this.goods = data.data.good
            this.totalCount = data.data.totalCount
            this.limit = data.data.limit
            this.currentPage = data.data.currentPage
            /*this.pagination = getPagination({
                currentPage:data.data.currentPage,
                totalCount:data.data.totalCount,
                limit:data.data.limit
            })*/
            
       // //console.log(data.data.good)
        }
    }
}
</script>

<style scoped>
/*
메인페이지.
*/
.pi_imgs img {
    margin: 0 auto; padding: 20px; height: 400px;
}
.pi_imgs{
    width: 49%;
    display: inline-block;
    text-align: center;
    margin-top: 10%;  
    
    text-decoration: none;
    color:#454545;
}
.pi_imgs img{
    width: 250px;
    height: 250px;
}    
.a_item img{
    width: 400px;
}
.item{
    font-family: "KBIZ한마음고딕 B", "맑은고딕", "나눔고딕","고딕", arial, helvetica, sans-serif;
    color: #454545;
    font-size: 20px;
}
.item_e{
    font-family: "KBIZ한마음고딕 L", "맑은고딕", "나눔고딕","고딕", arial, helvetica, sans-serif;
    color: #454545;
    font-size: 12px;
}
</style>
