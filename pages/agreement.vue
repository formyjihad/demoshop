<template>
    <div class = "container">
        <div class = "agreement">
            <textarea class="ageement-text">
            </textarea>
        <input type="checkbox" id="agree" @click="checkCall"/>
        </div>
        <div class = "personal-agreement">
            <textarea class="personal-text">
            </textarea>
        <input type="checkbox" id="person-agree" @click="checkCall"/>
        </div>
        <div class = "button-area">
            <button id ="send-btn" @click="send" disabled>본인 인증</button>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    methods:{
        checkCall(){
            let agree = document.getElementById('agree');
            let personAgree = document.getElementById('person-agree');
            let sendBtn = document.getElementById('send-btn');
            let agreeChecked = agree.checked;
            let personAgreeChecked = personAgree.checked;
            //console.log(agreeChecked)
            //console.log(personAgreeChecked)
            if (agreeChecked == true && personAgreeChecked == true){
                console.log("true")
                sendBtn.disabled = false
            }
        },
        send(){
            
            this.$nuxt.$router.replace({path:'/signup'})
        }
    }
}
</script>

<style>

</style>
