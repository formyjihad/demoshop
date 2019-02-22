<template>
    <div class="container">
        <section class = "notice">
            <div class="notice-container" v-for ="(notice, index) in notices" :key="notice['_id']">
                <div class = "notice-box" @click="displayToggle(index)">
                    <div class="notice-title">{{notice['title']}}</div>
                    <div class = "notice-detail" style="display:none">{{notice['detail']}}</div>
                </div>
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
        let url = "/api/notice"
        let data = await axios.get(url)
        return{
            notices: data.data.notice,
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
        displayToggle(index){
            //console.log("work")
            const targetIndex = index
            let target = document.getElementsByClassName("notice-detail")
            //console.log(target)
            if(target[targetIndex].style.display=='none'){
                target[targetIndex].style.display= 'block'
            }
            else{
                target[targetIndex].style.display = 'none'
            }
        },
        async getPage(page){
            let url = `/api/notice?page=${page}`
            let data = await axios.get(url)
            
            this.notices = data.data.notice
            this.totalCount = data.data.totalCount
            this.limit = data.data.limit
            this.currentPage = data.data.currentPage
            this.pagination = getPagination({
                currentPage:data.data.currentPage,
                totalCount:data.data.totalCount,
                limit:data.data.limit
            })
        }
    }
}
</script>

<style>
.container{
    text-align: center;
}
.notice{
    height:90vh;
}
.notice-title{
    font-size: 20px;
    font-weight: 400px;
    cursor:pointer;
    display: block;
    width: 200px;
    border-bottom: 2px solid #bcbcbc;
    margin: 10px auto;
}
.notice-detail{
    font-size: 13px;
    margin-top: 5px;
    display:none;
}
.pagination{
    display: inline-block;
}
</style>
