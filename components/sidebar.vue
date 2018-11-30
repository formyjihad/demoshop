<template>
    <div class="right_menu">
        <button class="close" @click="closetab"><img class='menuimg' src='/menu_logo.png'></button>
            <div class="login">
                <div class="id">
                <form class="signinform" @submit.prevent="signin" v-if="!isLogin">
                    <div class="signin">
                        <input type="text" id ="id" v-model="uid" autocomplete="off"/>
                        <label for="id">ID</label>
                    </div>
                    <div class="signin">
                        <input type="password" id="password" v-model="password">
                        <label for="password">PW</label>
                    </div>
                    <button class="button" type="submit">
                        로그인
                        <div></div>
                        <!--<nuxt-link class="button2" to="/agreement"><img src="/SVG/회원가입.svg"></nuxt-link>-->
                    </button>
                    <nuxt-link class="signup" to="/agreement">
                        회원가입
                        <div></div>
                    </nuxt-link>
                </form>
                <div class="after-login" v-else>
                    <div class="login-info">
                        <h4>{{uid}}님</h4>
                        반갑습니다.
                    </div>
                    <div class="signout" @click="signout()">
                        로그아웃
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="redi">
            <div class="cols">
                <nuxt-link to="/mypage" v-if="isLogin">
                    제작 진행상황
                </nuxt-link>
            </div>
            <div class="cols">
                <nuxt-link to="/cart">
                    장바구니
                </nuxt-link>
            </div>
            <div class="cols" v-if="isLogin">
                <nuxt-link to="/editinfo">
                    회원 정보
                </nuxt-link>
            </div>
        </div>
        <div class="cs">
            <strong>상담 시간</strong>
            <hr align="left" style="border: solid 2px #454545; width: 30%">
            <div>
                <span>영업시간 : 10:00 ~ 18:00</span>
                <p class="휴일">(주말 및 공휴일 휴무)</p>
            </div>
            <div>
                <span>점심시간 : 13:00 ~ 14:00</span>
                <p class="call">
                    <img src="/SVG/전화기_2.svg">070-8848-8489
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {mapMutations, mapGetters} from 'vuex'
export default {
    data(){
        return{
            uid:'',
            password:'',
            status:''
        }
    },
    computed: {
        ...mapGetters({
            isLogin: 'users/isLogin'
        })
    },
    methods:{
        async signin(){
            let url='/api/users/signin'
            let data = await axios.post(url, data={
                uid: this.uid,
                password:this.password
            })
            if(data.status == 200){
                this.login()
            }else if(data.status == 204){
                alert('잘못된 정보입니다.');
            }
        },
        async signout(){
            let confirmed = confirm("로그아웃 하시겠습니까?")
            console.log("확인 결과 "+confirmed)
            if (confirmed == true){
                console.log("try to sign out")
                let url = '/api/users/signout'
                let data = await axios.put(url)
                this.logout();
            }
        },
        async closetab(){
            this.$emit("close-tab");
        },
        ...mapMutations({
            login:'users/login',
            logout:'users/logout'
        })
    },
    async created(){
        let url = "/api/users/sidebarId"
        let infoData = await axios.get(url)
        //this.status = infoData.data.userData.status
        this.uid = infoData.data.userId
    }
}
</script>

<style>
.right_menu{
    position: fixed;
    right: 0;
    height: 100%;
    background-color: #E0E0E0;
    border-left: 1px solid gray;
    margin: 0;
    top: 0;
    background-repeat: no-repeat;
    box-shadow:0px 0px 20px 1px grey;
    transition : 0.3s ease-in-out;
    z-index: 5;
}
.right_menu .close{
    text-decoration: none;
    border: none;
    outline: 0;
}
.right_menu .menuimg {
    height: 25px;
    float: right;
    margin-right: 30px;
    margin-top: 9px;
    cursor: pointer; /* hand-shaped cursor */
}
.right_menu .login{
    margin-left:10px;
    margin-top: 20%;
}
.right_menu .login .id{
	position: relative;
    overflow: hidden;
    margin-left: 5px;
}
.right_menu .login .id .form-title {
	font: 500 16px/1 "Roboto", sans-serif;
	color: #454545;
	text-align: center;
    margin: 35px 0;
}
.right_menu .login .id .signin{
    position: relative;
	height: 50px;
	margin: 35px 0;
	transition: all 300ms;
}
.right_menu .login .id .signin i{
    position: absolute;
	bottom: 28px;
	left: 15px;
	color: #454545;
	height: 0;
	visibility: hidden;
	font-size: 100%;
    transition: height 250ms;
}
.right_menu .login .id .signin label {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 4px;
	font: 400 16px/1 "Roboto", sans-serif;
	color: #454545;
	opacity: 1;
}
.right_menu .login .id .signin input {
	width: calc(100% - 70px);
	font: 500 16px/1 "Roboto", sans-serif;
	padding: 0 20px 0 50px;
	border: none;
	border-radius: 6px;
	outline: 0;
	overflow: hidden;
	position: absolute;
	bottom: 0;
	left: 0;
	transition: all 300ms;
}
.right_menu .login-info{
    height:150px
}
.cols{
    font-weight: 580;
}
.right_menu .redi .cols{
    margin-left:10px;
    margin-top:15px
}
.right_menu .redi .cols a{

    color: #454545;
    text-decoration: none;
}

strong{
    color: #454545;
    font-size: 20px;
    line-height: 20px;
    display: inline-block;
}
span{
    font-weight: bold;
    color: #454545;
    line-height: 22px;
    letter-spacing: -0.025em;
}
.휴일{
    font-size: small;
    line-height: 22px;
    letter-spacing: 0.055em;
    white-space: nowrap;
    color: #666666;
}
.call{
    font-size: 28px;
    font-weight: bold;
    line-height: 52px;
    /*background: url("/SVG/전화기_2.svg")no-repeat;*/
    margin: 17px 0px 16px;
}
.call img{
    width:40px;
}
.button2 {
    border:none;
    width: 100px;
    height: 80px;
    display: inline-block;
    margin-right:10px;
}
.button2 img{
    width:100px;
    height:80px;
}
.cs{
    margin-left:10px;
    margin-top: 30%;
}

.button {
    backface-visibility: hidden;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  background: #5395ff;
  border-radius: 11px;
  border: 3px solid #ffffff;
  border-width: 3px 3px 3px 3px;
  padding: 13px 16px 12px 16px;
  margin-right:5px;
    color: #ffffff;
  font-size: 16px;
  font-family: Arial;
  font-weight: 300;
  font-style: normal
  }
  .button > div {
    color: #999999;
  font-size: 10px;
  font-family: Helvetica Neue;
  font-weight: initial;
  font-style: normal;
  text-align: center;
  margin: 0px 0px 0px 0px
  }
  .button > i {
    font-size: 1em;
  border-radius: 0px;
  border: 0px solid transparent;
  border-width: 0px 0px 0px 0px;
  padding: 0px 0px 0px 0px;
  margin: 0px 0px 0px 13px;
  position: static
  }
  .button > .ld {
    font-size: initial
  }

.signup {
    backface-visibility: hidden;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    background: #7dafff;
    border-radius: 11px;
    border: 3px solid #ffffff;
    border-width: 3px 3px 3px 3px;
    padding: 13px 16px 12px 16px;
    color: #ffffff;
    font-size: 16px;
    font-family: Arial;
    font-weight: 300;
    font-style: normal;
    text-decoration: none;
}
.signup a:hover{
    text-decoration: none;
}
.signup > div {
    color: #999999;
    font-size: 10px;
    font-family: Helvetica Neue;
    font-weight: initial;
    font-style: normal;
    text-align: center;
    margin: 0px 0px 0px 0px
}
.signup > i {
    font-size: 1em;
    border-radius: 0px;
    border: 0px solid transparent;
    border-width: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
    margin: 0px 0px 0px 13px;
    position: static
}
.signup > .ld {
    font-size: initial
}
.signout {
    backface-visibility: hidden;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    background: #5597ff;
    border-radius: 11px;
    border: 3px solid #ffffff;
    border-width: 3px 3px 3px 3px;
    padding: 13px 16px 12px 16px;
    color: #ffffff;
    font-size: 16px;
    font-family: Arial;
    font-weight: 300;
    font-style: normal
}
.signout > div {
    color: #999999;
    font-size: 10px;
    font-family: Helvetica Neue;
    font-weight: initial;
    font-style: normal;
    text-align: center;
    margin: 0px 0px 0px 0px
}
.signout > i {
    font-size: 1em;
    border-radius: 0px;
    border: 0px solid transparent;
    border-width: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
    margin: 0px 0px 0px 13px;
    position: static
}
.signout > .ld {
    font-size: initial
}

</style>
