<template>
    <div class="buttons">
        <div class="button1" @click="checkThick(0)"><img class="button_img"></div>
        <div class="button1" @click="checkThick(1)"><img class="button_img"></div>
        <div class="button1" @click="checkThick(2)"><img class="button_img"></div>
        <div class="button1" @click="checkThick(3)"><img class="button_img"></div>
    </div>
</template>

<script>

export default {
    props:[
        'thick'
    ],
    mounted() {
        let target = document.getElementsByClassName("button_img")
        
        let thick = this.thick
        if(thick=="0.7mm"){
            target[0].src = '/SVG/0.7mm_active.svg'
            target[1].src = '/SVG/1mm_nomal.svg'
            target[2].src = '/SVG/3mm_nomal.svg'
            target[3].src = '/SVG/5mm_nomal.svg'
        }
        else if(thick=="1mm"){
            target[0].src = '/SVG/0.7mm_nomal.svg'
            target[1].src = '/SVG/1mm_active.svg'
            target[2].src = '/SVG/3mm_nomal.svg'
            target[3].src = '/SVG/5mm_nomal.svg'
        }
        else if(thick=="3mm"){
            target[0].src = '/SVG/0.7mm_nomal.svg'
            target[1].src = '/SVG/1mm_nomal.svg'
            target[2].src = '/SVG/3mm_active.svg'
            target[3].src = '/SVG/5mm_nomal.svg'
        }
        else if(thick=="5mm"){
            target[0].src = '/SVG/0.7mm_nomal.svg'
            target[1].src = '/SVG/1mm_nomal.svg'
            target[2].src = '/SVG/3mm_nomal.svg'
            target[3].src = '/SVG/5mm_active.svg'
        }

    },
    methods:{
        async checkThick(i){
            let index = ''
            let target = document.getElementsByClassName("button_img")
            
            if(i==0){
                index = "0.7mm"
                target[0].src = '/SVG/0.7mm_active.svg'
                target[1].src = '/SVG/1mm_nomal.svg'
                target[2].src = '/SVG/3mm_nomal.svg'
                target[3].src = '/SVG/5mm_nomal.svg'
            }
            else if(i==1){
                index = "1mm"
                target[0].src = '/SVG/0.7mm_nomal.svg'
                target[1].src = '/SVG/1mm_active.svg'
                target[2].src = '/SVG/3mm_nomal.svg'
                target[3].src = '/SVG/5mm_nomal.svg'
            }
            else if(i==2){
                index = "3mm"
                target[0].src = '/SVG/0.7mm_nomal.svg'
                target[1].src = '/SVG/1mm_nomal.svg'
                target[2].src = '/SVG/3mm_active.svg'
                target[3].src = '/SVG/5mm_nomal.svg'
            }
            else if(i==3){
                index = "5mm"
                target[0].src = '/SVG/0.7mm_nomal.svg'
                target[1].src = '/SVG/1mm_nomal.svg'
                target[2].src = '/SVG/3mm_nomal.svg'
                target[3].src = '/SVG/5mm_active.svg'
            }
            this.$emit('emited_thick', index)
        },
    }
}
</script>

<style scoped>

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
