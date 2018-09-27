<template>
    <div class="index">
        <section class = "container">
            <div class="item-box" v-for ="good in goods" :key="good['_id']">
                <nuxt-link :to='{path:"/goods/"+good["_id"]}'>
                    <img class="thumbnail" :src="'/uploads/' + good['img']">
                    <div class = "item-title">{{good['name']}}</div>
                    <div class= "price">{{good['price']}} 원</div>
                </nuxt-link>
            </div>
        </section>
        <div class = "pagination">
            <a href="#" @click='getPage(p)' v-for="p in pagination" :key="p">{{p+1}}</a>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
function getPagination ({currentPage, totalCount, limit}){
    let pn = []
    let maxPage = Math.floor(totalCount/limit)
    for(let i = currentPage -3; i<currentPage+3 && i<=maxPage; i++){
        if(i>-1){
            pn.push(i);
        }
    }
    return pn
}

export default {
    async asyncData(){
        let url = "/api/goods"
        let data = await axios.get(url)
        return{
            goods: data.data.good,
            totalCount:data.data.totalCount,
            limit : data.data.limit,
            currentPage: data.data.currentPage,
            pagination:getPagination({
                currentPage:data.data.currentPage,
                totalCount:data.data.totalCount,
                limit:data.data.limit
            })
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
            this.pagination = getPagination({
                currentPage:data.data.currentPage,
                totalCount:data.data.totalCount,
                limit:data.data.limit
            })
            
       // console.log(data.data.good)
        }
    }
}
</script>

<style scoped>
/*
메인페이지.
*/

.index{
    height: 100%;
    overflow: auto;
}

.container{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.item-box{
    text-decoration: none;
    box-sizing: border-box;
    width: 320px;
    height: 400px;
    padding: 8px;
    border: 1px solid #cccccc;
    box-shadow: 0 2px 2px #aaa;
    margin: 25px;
    margin-top: 50px;
}

a {
    text-decoration: none;
}

.item-title{
    text-decoration: none;
    font-family: "KBIZ한마음고딕 B", "맑은고딕", "나눔고딕","고딕", arial, helvetica, sans-serif;
    color: #454545; 
    font-size : 28px;
    text-align: center;
    margin-top: 20px;
}

.thumbnail {
    background-position: center;
    background-size: cover;
    width: 95%;
    height: 250px;
    margin-top: 10px;
}

.price{
    text-decoration: none;
    font-family: "KBIZ한마음고딕 B", "맑은고딕", "나눔고딕","고딕", arial, helvetica, sans-serif;
    color: #454545; 
    font-size : 20px;
    text-align: center;
}
</style>
