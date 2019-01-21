<template>
	<div class = "container">
		<form @submit.prevent="signup">
			<div class="signup">
				<div class="row">
					<div class="left col-2"><p>아이디</p></div>
					<div class="right col-10"><input id="uid" type="text" v-model="uid"  @change="idCheck(uid)"><p v-if="checkFail == true">중복된 아이디가 존재합니다.</p>(영문 소문자/숫자, 4~16자)</div>
					
					<div class="left col-2"><p>전화번호</p></div>
					<div class="right col-10"><input id="phoneNumber" type="tel" v-model="phoneNumber" autocomplete="false" @change="ableBtn()"><button class="certBtn" type="button" @click="phoneCheck(phoneNumber)" disabled>본인인증</button></div>

					<div class="left col-2"><p>이름</p></div>
					<div class="right col-10"><input id="name" type="name" v-model="userName" disabled></div>
			
					<div class="left col-2"><p>이메일</p></div>
					<div class="right col-10"><input id="email" type="email" v-model="email"></div>
				
					<div class="left col-2"><p>비밀번호</p></div>
					<div class="right col-10"><input id="password" type="password" v-model="password">
						(영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10~16자)</div>
				
					<div class="left col-2"><p>비밀번호 확인</p></div>
					<div class="right col-10"><input id="passwordConfirm" type="password" v-model="passwordConfirm" @change="passwordCheck($event.target.value)"></div>
					
					<div class="left col-2"><p>우편번호</p></div>
					<div class="right col-10"><input id="postCode" type="text" v-model="postCode" @click="callPostOffice"></div>

					<div class="left col-2"><p>주소</p></div>
					<div class="right col-10"><input id="address" type="text" v-model="addressData" disabled></div>

					<div class="left col-2"><p>상세주소</p></div>
					<div class="right col-10"><input id="addressDetail" type="text" v-model="addressDetail"></div>
				</div>
			</div>
			<div class="sec_btn">
				<button class="btn" type="submit">회원가입</button>
			</div>
		</form>
	</div>
</template>

<script>
import axios from 'axios'

import {IMP_CODE} from '../config/constants'
import sha256 from 'js-sha256'
import postOffice from '../components/modals/postOffice.vue'
export default {
	components:{
		postOffice
	},
	data(){
		return{
			checkFail:'',
			postCode:'',
			phoneNumber:'',
			addressData:'',
			addressDetail:'',
			passwordConfirm:'',
			email:'',
			uid:'',
			password:'',
			userName:'',
		}
	},
	beforeMount() {
		IMP.init(IMP_CODE)
	},
	methods:{
		ableBtn(){
			if(isNaN(this.phoneNumber)==false){
				let num = this.phoneNumber
				let num_change = num.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3")
				this.phoneNumber = num_change;
				let target = document.getElementsByClassName("certBtn")
				target[0].disabled = false
			}else{
				alert("대시(-)없이 숫자만 입력하세요.\nEx)01012345678")
				let target = document.getElementById("phoneNumber")
				this.phoneNumber = '';
				target[0].focus();
			}
		},
		async phoneCheck(pn){
			const url = '/api/users/phoneCheck'
			IMP.certification({
				merchant_uid : 'merchant_' + new Date().getTime(),
				phone : pn,
				popup:true // param
			}, async (res) => { // callback
				//console.log(res)
				if (res.success) {
					const checkData = await axios.post(url,{
						impUid:res.imp_uid
					})
					console.log(checkData)
					let target = document.getElementById("phoneNumber")
					target.disabled = true
					this.userName = checkData.data.userName;
					alert("본인 인증에 성공하였습니다.")
					
					//this.phoneNumber = 
				} else {
					alert(`인증에 실패하였습니다. 에러 내용: ${res.error_msg}`);
				}
			})
		},
		passwordCheck(value){
			if(value != this.password){
				alert("패스워드가 잘못되었습니다");
				let passwordFocus = document.getElementById('password')
				passwordFocus.focus();
			}
		},
		async idCheck(value){
			let uid = value;
			const url = `/api/users/idCheck`
			let idData = await axios.post(url,{
				id:uid
			})
			if(idData.status == 201){
				let idBox = document.getElementById('uid');
				idBox.style="border: 1px solid #ff0000;"
				this.checkFail = true
			}
			else{
				let idBox = document.getElementById('uid');
				idBox.style =""
				this.checkFail = false
			}
		},
		async callPostOffice(){/*
			let regkey = '401652aa7e13e7f751535698618290'
			let url = `http://biz.epost.go.kr/KpostPortal/openapi?regkey=${regkey}target=postNew&query=${value}countPerPage=20`
			let data = await axios.get(url)
*/          this.$modal.show(postOffice,{},{
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
				let addressBox = document.getElementById('addressDetail');
				addressBox.disabled = false;
			})
			
		},
		async signup (){
			if(this.uid && this.password){
				let url ='/api/users/signup'
				let password = sha256(this.password)
				let signData = await axios.post(url, {
					uid:this.uid,
					userName:this.userName,
					addressData:this.addressData,
					addressDetail:this.addressDetail,
					phoneNumber:this.phoneNumber,
					email:this.email,
					postCode:this.postCode,
					password:password,
				})
				//console.log(data)
				if(signData.status == 200){
					alert('해당 아이디는 이미 존재합니다.');
				}else if(signData.status == 201){
					this.$nuxt.$router.replace({ path:'/'})
				}
			}else{
				alert("양식이 비어있습니다.");
			}
		}
	}
}
</script>

<style >
.container{
	text-align: center;
	margin-top: 30px;
}
.signup{
	max-width: 1000px;
	text-align: left;
	margin-top: 50px;
	border-bottom: 1px solid #000000;
}
.signup div{
	width: 100%;
	height: 100%;
	line-height: 50px;
	text-align: left;
}
.signup input{
	width: 25%;
	height: 30px;
	margin-right: 10px;
	text-align: left;
}
.signup .left{
    border-top: 1px solid #000000;
    border-right: 1px solid #000000;
    padding-left:20px;
    background-color: #b6b6b6;
    color: #000;


    
}
.signup .left p{
    font-size: 14px;
    height: 100%;
    margin: 0;
}

.signup .right{
	border-top: 1px solid #000000;
	font-size: 12px;
	width:65%;
}
.signup .last{
	border-bottom:1px solid #000;
}


.sec_btn .btn{
    width:150px;
    height:100%;
    background-color:#000;
    color:#FFF;
    font-size:18px;
    text-align: center;
    margin-top: 30px;
}

.certBtn{
   display: inline-block;
	font-weight: 400;
	text-align: center;
	white-space: nowrap;
	vertical-align: middle;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	border: 1px solid transparent;
	padding: 6px 12px;
	padding: 0.375rem 0.75rem;
	font-size: 16px;
	font-size: 1rem;
	line-height: 1.5;
	border-radius: 0.25rem;
	-webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
	transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
	transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
}




</style>
