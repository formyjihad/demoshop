<template>
    <div class="index">
        <div class="main_img_container right-3 up-3">
            <div><img class="main_img" src="/main_C2.jpg"></div>
        </div>
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
        </section>
            
    </div>
</template>

<script>
import axios from 'axios'

export default {
    async asyncData(){
        let url = "/api/goods"
        let data = await axios.get(url)
        return{
            acrylic: data.data.good[0],
            canvas:data.data.good[1]
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
