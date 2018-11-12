<template>
    <div class="container">
        <div class="check" v-if="isLogin && passChecked==false">
            <form @submit.prevent="reCheck">
                <p>개인정보 확인을 위해 다시 한번 패스워드를 입력해주세요.</p>
                <label><input type="password" id="checkInput" v-model="targetPass">패스워드</label>
                <button type="submit">확인</button>
            </form>
        </div>
        <div class="noLogin" v-if="!isLogin">
            <p> 로그인 이후 확인 할 수 있습니다.</p>
        </div>
        <div class="editinfo" v-if="isLogin && passChecked==true">
            <form @submit.prevent="editInfo">
                <p>{{uid}}</p>
                <label>이름<input class="username" v-model="userName" /></label>
                <label>이메일<input class="email" v-model="email" /></label>
                <label>비밀번호<input class="password" v-model="password" /></label>
                <label>비밀번호 확인<input class="passcheck" v-model="checkPass" @change="passwordCheck($event.target.value)" /></label>
                <label>우편번호<input class="postCode" v-model="postCode" /></label>
                <label>주소<input class="address" v-model="addressData" /></label>
                <label>상세주소<input class="addressDetail" v-model="addressDetail" /></label>
                <button type="submit">정보 변경</button>
            </form>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
            targetPass:'',
            passChecked:false
        }
    },
    computed: {
        ...mapGetters({
            isLogin: 'users/isLogin'
        })
    },
    methods:{
        passwordCheck(value){
            if(value != this.password){
                alert("패스워드가 잘못되었습니다");
                let passwordFocus = document.getElementById('password')
                passwordFocus.focus();
            }
        },
        async editInfo(){
            let url = '/api/users/editInfo'
            let editData = await axios.post(url, {
                //uid:this.uid,
                userName:this.userName,
                addressData:this.addressData,
                addressDetail:this.addressDetail,
                //phoneNumber:this.phoneNumber,
                email:this.email,
                postCode:this.postCode,
                password:this.password,
            })
            if(editData.status=200){
                alert("회원정보가 성공적으로 수정되었습니다.");
            }
            else if(editData.status=204){
                alert("잘못된 정보가 있습니다.");;
            }
        },
        async reCheck(){
            let url = '/api/users/checkPass'
            let target = this.targetPass
            let checkData = await axios.post(url, {target:target})
            if(checkData.status==204){
                alert("틀린 비밀번호 입니다. 다시 입력해주세요")
                let passwordFocus = document.getElementById('checkInput')
                passwordFocus.focus();
            }
            else if(checkData.status ==200){
                this.passChecked = true
                //addressData:userData.userAddressData,
                //addressDetail:userData.userAddressDetail,
                //phoneNumber:userData.userphoneNumber,
                //email:userData.userEmail,
                //userName:userData.userName,
                //postCode:userData.postCode,

                this.addressData='test'
                this.addressDetail='testD'
                this.phoneNumber='000'
                this.email='testE'
                this.userName='testN'
                this.postCode='000-000'
                this.uid=checkData.uid
            }
        }
    }

}
</script>

<style>

</style>
