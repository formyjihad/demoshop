<template>
    <div class="index">
        <div class="main_img_container right-3 up-3">
            <div><img class="main_img" src="/main_C2.jpg"></div>
        </div>
        <section class = "container">
            <div class="pi_imgs" v-for ="good in goods" :key="good['_id']">
                <nuxt-link :to='{path:"/goods/"+good["_id"]}'>
                    <img :src="'/uploads/' + good['img']">
                    <div class="item">{{good['name']}} 제작하기</div>
                </nuxt-link>
            </div>
        </section>
        <div class="COMPANY_INFO">
            <div class="company">
                <h3>COMPANY INFO</h3>
            </div>
            <div class="Info">
                <p>© Copyright 2018 | All Rights Reserved by 동네공작소 |</p>
                <p>사업자 등록 번호 875-29-00481 | 통신 판매업 신고번호 제2018-서울동작-0422호 |</p>
                <p>서울시 동작구 상도로34나길 12, A동 지하 301호 | 070-8848-8489 | craft.dongne@gmail.com |</p>
                <P>이용약관 | 개인정보취급방침</P>
            </div>
        </div>
            
    </div>
</template>

<script>
import axios from 'axios'

export default {
    async asyncData(){
        let url = "/api/goods"
        let data = await axios.get(url)
        return{
            goods: data.data.good,
            totalCount:data.data.totalCount,
            limit : data.data.limit,
            currentPage: data.data.currentPage,
        } 
    },
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
    width: 30%;
    display: inline-block;
    text-align: center;
    margin-top: 10%;
    margin-bottom: 10%;
    
    text-decoration: none;
    color:#454545;
}
.pi_imgs img{
    width: 200px;
    height: 200px;
}    
.a_item img{
    width: 400px;
}
.item{
    font-family: "KBIZ한마음고딕 B", "맑은고딕", "나눔고딕","고딕", arial, helvetica, sans-serif;
    color: #454545;
    font-size: 15px;
    text-align: center;
}
.main_img_container{
    width:100%;
    height:auto;
    overflow: hidden;
}
.main_img_container .main_img{
    width:100%;
    max-width:100%;
    height:auto;
    -ms-interpolation-mode: bicubic;
}
.main_img_container div{
    position: relative;
    max-width: none;
    height:auto;
}

.COMPANY_INFO{
    background-color: #dfdfdf;
    padding: 50px 50px 50px 50px;
}
.company{
    text-align: center;
    margin-bottom: 30px;
    color: #454545
}
.Info{
    text-align: center;
    font-size: 14px;
    color: #454545;
}
@media(max-width: 986px){
    .main_img_container div{
        margin:-3em -3em; 
    }
    .up-3 div{
        margin-top:-1.5em;
        margin-bottom:-1.5em;
    }
    .right-3 div{
        margin-left:-6em;
        margin-right:-6em;
    }
}
</style>
