<template>
    <div class="buttons">
        <div class="button1" @click="checkPacking(0)"><img class="button_img"></div>
        <div class="button1" @click="checkPacking(1)"><img class="button_img"></div>
        <div class="button1" @click="checkPacking(2)"><img class="button_img"></div>
        <div class="button1" @click="checkPacking(3)"><img class="button_img"></div>
    </div>
</template>

<script>
export default {
    props:[
        'packing'
    ],
    mounted() {
        let target = document.getElementsByClassName("button_img")
        
        let packing = this.packing
        if(packing=="조립 없음"){
            target[0].src = '/SVG/none_active.svg'
            target[1].src = '/SVG/OPP_nomal.svg'
            target[2].src = '/SVG/OringAssamble_nomal.svg'
            target[3].src = '/SVG/itemAssamble_nomal.svg'
        }
        else if(packing=="OPP만"){
            target[0].src = '/SVG/none_nomal.svg'
            target[1].src = '/SVG/OPP_active.svg'
            target[2].src = '/SVG/OringAssamble_nomal.svg'
            target[3].src = '/SVG/itemAssamble_nomal.svg'
        }
        else if(packing=="오링 조립"){
            target[0].src = '/SVG/none_nomal.svg'
            target[1].src = '/SVG/OPP_nomal.svg'
            target[2].src = '/SVG/OringAssamble_active.svg'
            target[3].src = '/SVG/itemAssamble_nomal.svg'
        }
        else if(packing=="부자재 조립"){
            target[0].src = '/SVG/none_nomal.svg'
            target[1].src = '/SVG/OPP_nomal.svg'
            target[2].src = '/SVG/OringAssamble_nomal.svg'
            target[3].src = '/SVG/itemAssamble_active.svg'
        }

    },
    methods:{
        async checkPacking(i){
            let index = ''
            let target = document.getElementsByClassName("button_img")
            
            if(i==0){
                index = "조립 없음"
                target[0].src = '/SVG/none_active.svg'
                target[1].src = '/SVG/OPP_nomal.svg'
                target[2].src = '/SVG/OringAssamble_nomal.svg'
                target[3].src = '/SVG/itemAssamble_nomal.svg'
            }
            else if(i==1){
                index = "OPP만"
                target[0].src = '/SVG/none_nomal.svg'
                target[1].src = '/SVG/OPP_active.svg'
                target[2].src = '/SVG/OringAssamble_nomal.svg'
                target[3].src = '/SVG/itemAssamble_nomal.svg'
            }
            else if(i==2){
                index = "오링 조립"
                target[0].src = '/SVG/none_nomal.svg'
                target[1].src = '/SVG/OPP_nomal.svg'
                target[2].src = '/SVG/OringAssamble_active.svg'
                target[3].src = '/SVG/itemAssamble_nomal.svg'
            }
            else if(i==3){
                index = "부자재 조립"
                target[0].src = '/SVG/none_nomal.svg'
                target[1].src = '/SVG/OPP_nomal.svg'
                target[2].src = '/SVG/OringAssamble_nomal.svg'
                target[3].src = '/SVG/itemAssamble_active.svg'
            }
            this.$emit('emited_packing', index)
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
