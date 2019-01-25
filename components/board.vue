<template>
    <div class="board-body">
        <table>
            <thead class="t_head">
                <th class="cols">번호</th>
                <th class="cols title">제목</th>
                <th class="cols">글쓴이</th>
                <th class="cols">날짜</th>
                <th class="cols">조회 수</th>
            </thead>
            <tbody>
                <tr class="t_body" v-for="post in posts" :key="post['_id']">
                    <td class="cols postNo">{{post['postNo']}}</td>
                    <td class="cols postName"><nuxt-link :to='{path:"/board/"+post["postNo"]}'>{{post['postName']}}</nuxt-link></td>
                    <td class="cols">{{post['postAuthor']}}</td>
                    <td class="cols">{{post['postDate']}}</td>
                    <td class="cols">{{post['postView']}}</td>
                </tr>
            </tbody>
        </table>
        <div class="documentQuery">
            <div v-if="queryTrue==true">
                <form class="queryDetail" submit.prevent="queryStart">
                    <input class="query" type="search" :value="query">
                    <select class="queryType" :value="queryType"> 
                        <option value="name"> 제목 </option>
                        <option value="content"> 내용 </option>
                        <option value="author"> 글쓴이 </option>
                        <option value="name_content"> 제목+내용 </option>
                    </select>
                </form>
            </div>
            <div v-else>
                <button @click="enableBtn">검색</button>
            </div>
        </div>
        <div class="postWrite">
            <nuxt-link :to='{path:"/board/write"}'>글쓰기</nuxt-link>
        </div>
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
    vaildate({params}){
		return true
	},
    data(){
        return{
            query:{
                type:String,
                validate: function(value) {
					return value.length >= 2;
				}
            },
            queryTrue:{
                type:Boolean,
                default:false
            },
            queryType:'name_content',
        }
    },    
    async asyncData(){
        let url = "/api/post"
        let getData = await axios.get(url)
        if(getData.status == 200){
            return{
                posts: getData.data.post,
                totalCount:getData.data.totalCount,
                limit : getData.data.limit,
                currentPage: getData.data.currentPage,
                pagination:getPagination({
                    currentPage:getData.data.currentPage,
                    totalCount:getData.data.totalCount,
                    limit:getData.data.limit
                })
            } 
        }
        else if(getData.status == 204){
            alert("에러 발생 \n"+getData.data.err)
        }
        
    },
    methods:{
        async enableBtn(){
            let target = this.queryTrue
            if(!target){
                this.queryTrue = true
            }
            else{
                this.queryTrue = false
            }
        },
        async queryStart(){
            let query = this.query;
            let queryType = this.queryType
            let url = `/api/post/query?keyword=${query}&type=${queryType}`
            let queryData = await axios.get(url)
            if(queryData.status == 200){
                return{
                    posts: queryData.data.post,
                    totalCount:queryData.data.totalCount,
                    limit : queryData.data.limit,
                    currentPage: queryData.data.currentPage,
                    pagination:getPagination({
                        currentPage:queryData.data.currentPage,
                        totalCount:queryData.data.totalCount,
                        limit:queryData.data.limit
                    })
                } 
            }
            else if(queryData.status == 204){
                alert("에러 발생 \n"+queryData.data.err)
            }
        },

        async getPage(page){
            let url = `/api/post?page=${page}`
            
            let getData = await axios.get(url)
            if(getData.status == 200){
                return{
                    posts: getData.data.post,
                    totalCount:getData.data.totalCount,
                    limit : getData.data.limit,
                    currentPage: getData.data.currentPage,
                    pagination:getPagination({
                        currentPage:getData.data.currentPage,
                        totalCount:getData.data.totalCount,
                        limit:getData.data.limit
                    })
                } 
            }
            else if(getData.status == 204){
                alert("에러 발생 \n"+getData.data.err)
            }
        }
    }
}
</script>
