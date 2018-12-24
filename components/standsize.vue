<template>
    <div class="buttons">
        <div class="button1" @click="checkStand(0)"><img class="button_img"></div>
        <div class="button1" @click="checkStand(1)"><img class="button_img"></div>
        <div class="button1" @click="checkStand(2)"><img class="button_img"></div>
        <div class="button1" @click="checkStand(3)"><img class="button_img"></div>
    </div>
</template>

<script>
export default {
    props:[
        'stand'
    ],
    mounted() {
        let target = document.getElementsByClassName("button_img")
        
        let stand = this.stand
        if(stand=="none"){
            target[0].src = '/SVG/none_active.svg'
            target[1].src = '/SVG/4cm_nomal.svg'
            target[2].src = '/SVG/6cm_nomal.svg'
            target[3].src = '/SVG/8cm_nomal.svg'
        }
        else if(stand=="4cm"){
            target[0].src = '/SVG/none_nomal.svg'
            target[1].src = '/SVG/4cm_active.svg'
            target[2].src = '/SVG/6cm_nomal.svg'
            target[3].src = '/SVG/8cm_nomal.svg'
        }
        else if(stand=="6cm"){
            target[0].src = '/SVG/none_nomal.svg'
            target[1].src = '/SVG/4cm_nomal.svg'
            target[2].src = '/SVG/6cm_active.svg'
            target[3].src = '/SVG/8cm_nomal.svg'
        }
        else if(stand=="8cm"){
            target[0].src = '/SVG/none_nomal.svg'
            target[1].src = '/SVG/4cm_nomal.svg'
            target[2].src = '/SVG/6cm_nomal.svg'
            target[3].src = '/SVG/8cm_active.svg'
        }

    },
    methods:{
        async checkStand(i){
            let index = ''
            let target = document.getElementsByClassName("button_img")
            
            if(i==0){
                index = "4cm"
                target[0].src = '/SVG/none_active.svg'
                target[1].src = '/SVG/4cm_nomal.svg'
                target[2].src = '/SVG/6cm_nomal.svg'
                target[3].src = '/SVG/8cm_nomal.svg'
            }
            else if(i==1){
                index = "6cm"
                target[0].src = '/SVG/none_nomal.svg'
                target[1].src = '/SVG/4cm_active.svg'
                target[2].src = '/SVG/6cm_nomal.svg'
                target[3].src = '/SVG/8cm_nomal.svg'
            }
            else if(i==2){
                index = "8cm"
                target[0].src = '/SVG/none_nomal.svg'
                target[1].src = '/SVG/4cm_nomal.svg'
                target[2].src = '/SVG/6cm_active.svg'
                target[3].src = '/SVG/8cm_nomal.svg'
            }
            else if(i==3){
                index = "8cm"
                target[0].src = '/SVG/none_nomal.svg'
                target[1].src = '/SVG/4cm_nomal.svg'
                target[2].src = '/SVG/6cm_nomal.svg'
                target[3].src = '/SVG/8cm_active.svg'
            }
            this.$emit('emited_stand', index)
        },
    }
}
</script>

<style>

.button1 {
	width: 13%;
	height: 150px;
	display: inline-block;
	margin: 0 auto;
	background-size: contain;
	background-repeat: no-repeat;   
	background-position: center center; 
	margin: 2% 4%;    
}
.button_img{
	max-width: 100%;
	height: auto;
}

.button_img:hover{
    filter:opacity(50%);
    -webkit-filter: opacity(50%);
    -ms-filter: opacity(50%);
}

</style>
