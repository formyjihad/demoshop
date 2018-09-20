<template>
  <section class = "container">
    <ul>
      <li v-for ="good in goods" :key="good['_id']">
        <nuxt-link :to='{path:"/goods/"+good["_id"]}'>
          <img :src="'/uploads/' + good['img']">
          <h3>{{good['name']}}</h3>
          <h3>{{good['price']}}</h3>
        </nuxt-link>
      </li>
    </ul>
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
</style>
