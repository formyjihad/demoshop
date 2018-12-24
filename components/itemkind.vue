<template>
    <div class="buttons">
        <div class="button1" @click="checkSubitem(0)"><img class="button_img"></div>
        <div class="button1" @click="checkSubitem(1)"><img class="button_img"></div>
        <div class="button1" @click="checkSubitem(2)"><img class="button_img"></div>
        <div class="button1" @click="checkSubitem(3)"><img class="button_img"></div>
        <div class="button1" @click="checkSubitem(4)"><img class="button_img"></div>
        <div class="button1" @click="checkSubitem(5)"><img class="button_img"></div>
        <div class="button1" @click="checkSubitem(6)"><img class="button_img"></div>
    </div> 
</template>

<script>
export default {
    props:[
        'subitem'
    ],
    mounted() {
        let target = document.getElementsByClassName("button_img")
        
        let subitem = this.subitem
        if(subitem=="none"){
            target[0].src = '/svg/none_active.svg'
            target[1].src = '/svg/OPPonly_nomal.svg'
            target[2].src = '/svg/Oring_nomal.svg'
            target[3].src = '/svg/dogtag_nomal.svg'
            target[4].src = '/svg/Oring+dogtag_nomal.svg'
            target[5].src = '/svg/Oring+strap_nomal.svg'
            target[6].src = '/svg/keyRing_nomal.svg'
        }
        else if(subitem=="OPP"){
            target[0].src = '/svg/none_nomal.svg'
            target[1].src = '/svg/OPPonly_active.svg'
            target[2].src = '/svg/Oring_nomal.svg'
            target[3].src = '/svg/dogtag_nomal.svg'
            target[4].src = '/svg/Oring+dogtag_nomal.svg'
            target[5].src = '/svg/Oring+strap_nomal.svg'
            target[6].src = '/svg/keyRing_nomal.svg'
        }
        else if(subitem=="O링"){
            target[0].src = '/svg/none_nomal.svg'
            target[1].src = '/svg/OPPonly_nomal.svg'
            target[2].src = '/svg/Oring_active.svg'
            target[3].src = '/svg/dogtag_nomal.svg'
            target[4].src = '/svg/Oring+dogtag_nomal.svg'
            target[5].src = '/svg/Oring+strap_nomal.svg'
            target[6].src = '/svg/keyRing_nomal.svg'
        }
        else if(subitem=="군번줄"){
            target[0].src = '/svg/none_nomal.svg'
            target[1].src = '/svg/OPPonly_nomal.svg'
            target[2].src = '/svg/Oring_nomal.svg'
            target[3].src = '/svg/dogtag_active.svg'
            target[4].src = '/svg/Oring+dogtag_nomal.svg'
            target[5].src = '/svg/Oring+strap_nomal.svg'
            target[6].src = '/svg/keyRing_nomal.svg'
        }
        else if(subitem=="O링 + 군번줄"){
            target[0].src = '/svg/none_nomal.svg'
            target[1].src = '/svg/OPPonly_nomal.svg'
            target[2].src = '/svg/Oring_nomal.svg'
            target[3].src = '/svg/dogtag_nomal.svg'
            target[4].src = '/svg/Oring+dogtag_active.svg'
            target[5].src = '/svg/Oring+strap_nomal.svg'
            target[6].src = '/svg/keyRing_nomal.svg'
        }
        else if(subitem=="O링 + 휴대폰줄"){
            target[0].src = '/svg/none_nomal.svg'
            target[1].src = '/svg/OPPonly_nomal.svg'
            target[2].src = '/svg/Oring_nomal.svg'
            target[3].src = '/svg/dogtag_nomal.svg'
            target[4].src = '/svg/Oring+dogtag_nomal.svg'
            target[5].src = '/svg/Oring+strap_active.svg'
            target[6].src = '/svg/keyRing_nomal.svg'
        }
        else if(subitem=="키링"){
            target[0].src = '/svg/none_nomal.svg'
            target[1].src = '/svg/OPPonly_nomal.svg'
            target[2].src = '/svg/Oring_nomal.svg'
            target[3].src = '/svg/dogtag_nomal.svg'
            target[4].src = '/svg/Oring+dogtag_nomal.svg'
            target[5].src = '/svg/Oring+strap_nomal.svg'
            target[6].src = '/svg/keyRing_active.svg'
        }
    },
    methods:{
        async checkSubitem(i){
            let index = ''
            let target = document.getElementsByClassName("button_img")
            
            if(i==0){
                index = "none"  
                target[0].src = '/svg/none_active.svg'
                target[1].src = '/svg/OPPonly_nomal.svg'
                target[2].src = '/svg/Oring_nomal.svg'
                target[3].src = '/svg/dogtag_nomal.svg'
                target[4].src = '/svg/Oring+dogtag_nomal.svg'
                target[5].src = '/svg/Oring+strap_nomal.svg'
                target[6].src = '/svg/keyRing_nomal.svg'
            }
            else if(i==1){
                index = "OPP"
                target[0].src = '/svg/none_nomal.svg'
                target[1].src = '/svg/OPPonly_active.svg'
                target[2].src = '/svg/Oring_nomal.svg'
                target[3].src = '/svg/dogtag_nomal.svg'
                target[4].src = '/svg/Oring+dogtag_nomal.svg'
                target[5].src = '/svg/Oring+strap_nomal.svg'
                target[6].src = '/svg/keyRing_nomal.svg'
            }
            else if(i==2){
                index = "O링"
                target[0].src = '/svg/none_nomal.svg'
                target[1].src = '/svg/OPPonly_nomal.svg'
                target[2].src = '/svg/Oring_active.svg'
                target[3].src = '/svg/dogtag_nomal.svg'
                target[4].src = '/svg/Oring+dogtag_nomal.svg'
                target[5].src = '/svg/Oring+strap_nomal.svg'
                target[6].src = '/svg/keyRing_nomal.svg'
            }
            else if(i==3){
                index = "군번줄"
                target[0].src = '/svg/none_nomal.svg'
                target[1].src = '/svg/OPPonly_nomal.svg'
                target[2].src = '/svg/Oring_nomal.svg'
                target[3].src = '/svg/dogtag_active.svg'
                target[4].src = '/svg/Oring+dogtag_nomal.svg'
                target[5].src = '/svg/Oring+strap_nomal.svg'
                target[6].src = '/svg/keyRing_nomal.svg'
            }
            else if(i==4){
                index = "O링 + 군번줄"
                target[0].src = '/svg/none_nomal.svg'
                target[1].src = '/svg/OPPonly_nomal.svg'
                target[2].src = '/svg/Oring_nomal.svg'
                target[3].src = '/svg/dogtag_nomal.svg'
                target[4].src = '/svg/Oring+dogtag_active.svg'
                target[5].src = '/svg/Oring+strap_nomal.svg'
                target[6].src = '/svg/keyRing_nomal.svg'
            }
            else if(i==5){
                index = "O링 + 휴대폰줄"
                target[0].src = '/svg/none_nomal.svg'
                target[1].src = '/svg/OPPonly_nomal.svg'
                target[2].src = '/svg/Oring_nomal.svg'
                target[3].src = '/svg/dogtag_nomal.svg'
                target[4].src = '/svg/Oring+dogtag_nomal.svg'
                target[5].src = '/svg/Oring+strap_active.svg'
                target[6].src = '/svg/keyRing_nomal.svg'
            }
            else if(i==6){
                index = "키링"
                target[0].src = '/svg/none_nomal.svg'
                target[1].src = '/svg/OPPonly_nomal.svg'
                target[2].src = '/svg/Oring_nomal.svg'
                target[3].src = '/svg/dogtag_nomal.svg'
                target[4].src = '/svg/Oring+dogtag_nomal.svg'
                target[5].src = '/svg/Oring+strap_nomal.svg'
                target[6].src = '/svg/keyRing_active.svg'
            }
            this.$emit('emited_item', index)
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
