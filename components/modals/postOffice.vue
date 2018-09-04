<template>
    <div class="modal-body">
        <label for="argumentInput">우편 번호 검색</label><br>
        <input id="argumentInput" type="text" v-model="arg" placeholder="동, 구, 면을 입력하세요">
        <button @click="callPostOffice(arg)">검색하기</button>
    
        <div class="addressList">
            <table>
                <tr v-for="address in address" :key="address">
                    <td>{{address.zipNo}}</td>
                    <td>{{address.jibunAddr}}</td>
                    <td>{{address.roadAddr}}</td>
                </tr>
                
               <a href="#" @click='getPage(arg, page)' v-for="page in pagination" :key="page">{{page+1}}</a>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

function getPagination (currentPage, totalCount, limit){
    let pn =[]
    let maxPage = Math.floor(totalCount/limit)
    for(let i = currentPage-3 ; i<currentPage+3 && i <= maxPage; i++){
        if(i>-1){
            pn.push(i)
        }
    }
    return pn;
}

export default {
    data(){
        return{
            address:[],
          //  pagenation:[]
        }
    },
    
    methods:{
        async callPostOffice(value){
            let regkey = 'U01TX0FVVEgyMDE4MDkwNDExNDgxNzEwODExMTI='
            let currentPage = 1;
            let countPerPage = 10;
            let url = `http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=${currentPage}&countPerPage=${countPerPage}&keyword=${value}&confmKey=${regkey}&resultType=json`
            let axiosData = await axios.get(url)
            let totalCount = axiosData.data.results.common.totalCount;
            
            if(axiosData.data.results.common.errorCode=="0"){
                this.address = axiosData.data.results.juso
                this.currentPage = axiosData.data.results.common.currentPage
                this.pagination = getPagination(currentPage, totalCount, countPerPage)
                console.log(this.address)
            }
            else{
                alert("오류 발생")
            }
        },
        async getPage(value, page){
            let regkey = 'U01TX0FVVEgyMDE4MDkwNDExNDgxNzEwODExMTI='
            let currentPage = page+1;
            console.log(currentPage)
            let countPerPage = 10;
            let url = `http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=${currentPage}&countPerPage=${countPerPage}&keyword=${value}&confmKey=${regkey}&resultType=json`
            let axiosData = await axios.get(url)
            let totalCount = axiosData.data.results.common.totalCount;
            if(axiosData.data.results.common.errorCode=="0"){
                this.address = axiosData.data.results.juso;
                this.currentPage = axiosData.data.results.common.currentPage;
                this.pagination = getPagination(currentPage, totalCount, countPerPage);
                console.log(this.address)
            }
            else{
                alert("오류 발생")
            }
        },
        
    }
    
}

</script>

<style>

</style>

