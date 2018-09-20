<template>
  <section class = "container">
    <div class="item-box" v-for ="good in goods" :key="good['_id']">
        <nuxt-link :to='{path:"/goods/"+good["_id"]}'>
            <img class="thumbnail" :src="'/uploads/' + good['img']">
            <h3>{{good['name']}}</h3>
            <h3>{{good['price']}} 원</h3>
        </nuxt-link>
    </div>
    <div class = "pagination">
      <a href="#" @click='getPage(p)' v-for="p in pagination" :key="p">{{p+1}}</a>
    </div>
  </section>
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
.item-box{
  text-decoration: none;
  box-sizing: border-box;
  width: 280px;
  padding: 8px;
  border: 1px solid #cccccc;
  box-shadow: 0 2px 2px #aaa;
  margin: 10px;
}
a {
  text-decoration: none;
  color: black;
}

.thumbnail {
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 300px;
}
</style>
