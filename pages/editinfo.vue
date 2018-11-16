<template>
    <div class="container">
        <div class="check" v-if="isLogin && passChecked==false">
            <form @submit.prevent="reCheck">
                <p>개인정보 확인을 위해 다시 한번 패스워드를 입력해주세요.</p>
                <label>패스워드 <input type="password" id="checkInput" v-model="targetPass"></label>
                <button type="submit">확인</button>
            </form>
        </div>
        <div class="noLogin" v-if="!isLogin">
            <p> 로그인 이후 확인 할 수 있습니다.</p>
        </div>
        <div class="info" v-if="isLogin && passChecked==true">
            <form @submit.prevent="editInfo">
                <div class="row">
                    <div class="left col-2"><p>아이디</p></div>
                    <div class="right col-10">{{uid}}</div>
                    <div class="left col-2"><p>이름</p></div>
                    <div class="right col-10"><input type="text" class="username" v-model="userName" /></div> <div class="left col-2"><p>신규 비밀번호</p></div>
                    <div class="right col-10"><input type="password" class="password" v-model="password" /> (공백없는 영문 숫자 포함 6-20자)</div>
                    <div class="left col-2"><p>비밀번호 확인</p></div>
                    <div class="right col-10"><input type="password" class="passcheck" v-model="checkPass" @change="passwordCheck($event.target.value)" /></div>
                    <div class="left col-2"><p>전화번호</p></div>
                    <div class="right col-10"><input type="text" class="postCode" v-model="phoneNumber" /></div>
                    <div class="left col-2"><p>이메일</p></div>
                    <div class="right col-10"><input type="email" class="email" v-model="userEmail" /></div>
                    <div class="left col-2"><p>우편번호</p></div>
                    <div class="right col-10"><input type="text" class="postCode" v-model="postCode" @click="callPostOffice" /></div>
                    <div class="left col-2"><p>주소</p></div>
                    <div class="right col-10"><input type="text" class="address" v-model="addressData" @click="callPostOffice" /></div>
                    <div class="left col-2"><p>상세주소</p></div>
                    <div class="right col-10"><input type="text" class="addressDetail" v-model="addressDetail" /></div>
                    <button class="btn" type="submit">정보 변경</button>
                </div>
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
        async callPostOffice(){
                this.$modal.show(postOffice,{},{
                height:'auto',
                scrollable:true
            });
            this.$nuxt.$on('post-code', data=>{
                this.postCode = data
            })
            this.$nuxt.$on('address-data', data=>{
                this.addressData = data
            })
            this.$nuxt.$on('address-detail',data=>{
                this.addressDetail = data
            })
        },
        async editInfo(){
            let url = '/api/users/editInfo'
            let editData = await axios.post(url, {
                //uid:this.uid,
                userName:this.userName,
                addressData:this.addressData,
                addressDetail:this.addressDetail,
                password:this.password,
                userPhoneNumber:this.phoneNumber,
                userEmail:this.userEmail,
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
                let userData = checkData.data.userData
                this.addressData=userData.addressData
                this.addressDetail=userData.addressDetail
                this.userEmail=userData.userEmail
                this.phoneNumber=userData.phoneNumber
                this.email=userData.userEmail
                this.userName=userData.userName
                this.postCode=userData.postCode
                this.uid=userData.uid
                this.passChecked = true
            }
        }
    }

}
</script>

<style>
.info{
    max-width: 1000px;
    text-align: left;
}
.info div{
    height: 100%;
    line-height: 50px;
}
.info input{
    width: 25%;
    height: 30px;
    margin-left: 10px;
    margin-right: 10px;
}
.info .right .t1{
 width:10%; height:50%;
}
.info .left{
    border-top: 1px solid #000000;
    border-right: 1px solid #000000;
    padding-left:20px;

    
}
.info .left p{
    font-size: 14px;
    height: 100%;
    margin: 0;
}

.info .right{
    border-top: 1px solid #000000;
    font-size: 12px;
    width:65%;
}
.info .last{
    border-bottom:1px solid #000;
}
.b1 { width:220px;
    margin:50px auto; }

.b1 btn { width:100px;
    height:30px;
    font-size:14px;
    font-weight:900;
    text-align:center;
    float:left;
    background-color:#000;
    color:#FFF;
    line-height:30px;  }

.b1 .s2 { float:right;
    background-color:#FFF;
    color:#000;
    border:2px solid #000;
    box-sizing:border-box;
    line-height:30px;  }
</style>
