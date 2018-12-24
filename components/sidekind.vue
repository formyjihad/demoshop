<template>
    <div class="buttons">
        <div class="button1" @click="checkPrintside(0)"><img class="button_img"></div>
        <div class="button1" @click="checkPrintside(1)"><img class="button_img"></div>
    </div>
</template>

<script>
export default {
    props:[
        'printside'
    ],
    mounted() {
        let target = document.getElementsByClassName("button_img")
        
        let printside = this.printside
        if(printside=="단면"){
            target[0].src = '/svg/oneSide_active.svg'
            target[1].src = '/svg/bothSide_nomal.svg'
        }
        else if(printside=="양면"){
            target[0].src = '/svg/oneSide_nomal.svg'
            target[1].src = '/svg/bothSide_active.svg'
        }
    },
    methods:{
        async checkPrintside(i){
            let index = ''
            let target = document.getElementsByClassName("button_img")
            
            if(i==0){
                index = "단면"
                target[0].src = '/svg/oneSide_active.svg'
                target[1].src = '/svg/bothSide_nomal.svg'
            }
            else if(i==1){
                index = "양면"
                target[0].src = '/svg/oneSide_nomal.svg'
                target[1].src = '/svg/bothSide_active.svg'
            }
            this.$emit('emited_side', index)
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
