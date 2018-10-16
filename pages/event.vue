<template>
    <div class="container">
        <section class = "event">
            <div class="event-container" v-for ="(event, index) in events" :key="event['_id']">
                <img class = "event-box" :src='"/uploads/" + event["img"]' @click="displayToggle(index)">
                    
                    <div class = "event-detail" style="display:none">
                        <div class="event-num">{{event['num']}}</div>
                        <div class="event-title">{{event['title']}}</div>
                        <div class="event-subdetail">{{event['detail']}}</div>
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
        let url = "/api/event"
        let data = await axios.get(url)
        return{
            events: data.data.event,
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
            console.log("work")
            const targetIndex = index
            let target = document.getElementsByClassName("event-detail")
            console.log(target)
            if(target[targetIndex].style.display=='none'){
                target[targetIndex].style.display= 'block'
            }
            else{
                target[targetIndex].style.display = 'none'
            }
        },
        async getPage(page){
            let url = `/api/event?page=${page}`
            let data = await axios.get(url)
            
            this.events = data.data.event
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

</style>
