<template>
    <div class="modal-body">
        <label for="argumentInput"><strong>우편 번호 검색</strong></label><br>
        <div class="argumentInput"><input id="argumentInput" type="text" v-model="arg" placeholder="동, 구, 면을 입력하세요">
        <button @click="callPostOffice(arg)">검색하기</button></div>
    
        <div class="addressList">
            <table>
                <tr v-for="address in address" :key="address" @click="sendToConfirm(address)">
                    <td>{{address.zipNo}}</td>
                    <td>{{address.jibunAddr}}</td>
                    <td>{{address.roadAddr}}</td>
                </tr>
            </table>
            <div class="number"><a href="#" @click='getPage(arg, page)' v-for="page in pagination" :key="page">{{page+1}}</a></div>
        </div>
        <div class="addressData">
            <input type="text" v-model="postCode" placeholder="우편번호"><br>
            <input type="text" v-model="addressData" placeholder="주소"><br>
            <input type="text" v-model="addressDetail" placeholder="상세주소">
            <button type="submit" @click="sendToParent(postCode, addressData, addressDetail)">입력</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {JUSO_KEY} from '../../config/constants.js'

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
            postCode:'',
            addressData:''
          //  pagenation:[]
        }
    },
    props:{
        arg:'',
        pagination:'',
    },
    
    methods:{
        sendToConfirm(data){
            this.postCode = data.zipNo
            this.addressData = data.jibunAddr
            //console.log(this.postCode)
            //console.log(this.addressData)
        },
        sendToParent(code, addr, adds){
            this.$nuxt.$emit('post-code',code);
            this.$nuxt.$emit('address-data',addr);
            this.$nuxt.$emit('address-detail',adds)
            this.$emit('close');
        },
        async callPostOffice(value){
            let regkey = JUSO_KEY
            let currentPage = 1;
            let countPerPage = 10;
            let url = `http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=${currentPage}&countPerPage=${countPerPage}&keyword=${value}&confmKey=${regkey}&resultType=json`
            let axiosData = await axios.get(url)
            let totalCount = axiosData.data.results.common.totalCount;
            
            if(axiosData.data.results.common.errorCode=="0"){
                this.address = axiosData.data.results.juso
                this.currentPage = axiosData.data.results.common.currentPage
                this.pagination = getPagination(currentPage, totalCount, countPerPage)
                //console.log(this.address)
            }
            else{
                alert("오류 발생")
            }
        },
        async getPage(value, page){
            let regkey = 'U01TX0FVVEgyMDE4MDkwNDExNDgxNzEwODExMTI='
            let currentPage = page+1;
          //  //console.log(currentPage)
            let countPerPage = 10;
            let url = `http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=${currentPage}&countPerPage=${countPerPage}&keyword=${value}&confmKey=${regkey}&resultType=json`
            let axiosData = await axios.get(url)
            let totalCount = axiosData.data.results.common.totalCount;
            if(axiosData.data.results.common.errorCode=="0"){
                this.address = axiosData.data.results.juso;
                this.currentPage = axiosData.data.results.common.currentPage;
                this.pagination = getPagination(currentPage, totalCount, countPerPage);
              //  //console.log(this.address)
            }
            else{
                alert("오류 발생")
            }
        },
        
    }
    
}

</script>

<style>
.addressData button {padding: 5px 10px 5px 10px;
   border: solid 1px #CCC;

   background: #fff;
   text-shadow: 0px 1px 0px #000;
    font-size: 15px;
    color: #565656;

   border-radius: 5px;
   -moz-border-radius: 5px;
   -webkit-border-radius: 5px;

   box-shadow: 0 1px 3px #111;
   -moz-box-shadow: 2px 2px 1px #999;
   -webkit-box-shadow: 2px 2px 1px #999;
   margin-left: 5px;
}

.modal-body{width: 100%; height: 100%;}
.argumentInput input {width:250px; height: 25px; margin-bottom: 5px; }
.argumentInput button {padding: 5px 10px 5px 10px;
   border: solid 1px #CCC;

   background: #fff;
   text-shadow: 0px 1px 0px #000;
    font-size: 15px;
    color: #565656;

   border-radius: 5px;
   -moz-border-radius: 5px;
   -webkit-border-radius: 5px;

   box-shadow: 0 1px 3px #111;
   -moz-box-shadow: 2px 2px 1px #999;
   -webkit-box-shadow: 2px 2px 1px #999;
   margin-left: 5px;
}
.addressData input {width:250px; height: 25px; margin-bottom: 5px; }

.addressList table{text-align: left; font-size:12px; }

.number{width:100%; height: 20px;
    text-align: center;}

.number a{margin-left:10px;}
</style>


