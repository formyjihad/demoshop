<template>
	<div>
		<div class="head">
			<div  @click="navClick()"><Header /></div>
			
			<button class="sidebarClose" @click="openSidebar()"><img class='menuimg' src='/menu_logo.png'></button>
		</div>
		<div class="side">
			<sidebar class ="sidebar" @close-tab="displayToggle()" style="width:0px"/>
		</div>
		<div class = "nuxt" @click="navClick()">
			<nuxt/>
		</div>
		<div>
			<footerDiv/>
		</div>
	</div>
</template>

<script>
import axios from 'axios'

import Header from '../components/Header.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import sidebar from "../components/sidebar"
import footerDiv from "../components/Footer.vue"
export default {
	computed: {
		...mapGetters({
			isLogin: 'users/isLogin'
		})
	},
	methods:{
		openSidebar(){
			let target = document.getElementsByClassName("sidebar")
			
			if(target[0].style.width=='0px'){
				target[0].style.width = "300px"
			}
			else{
				target[0].style.width = "0px"
			}
			console.log(target[0].style.width)
		},
		navClick(){
			//console.log("click")
			let target = document.getElementsByClassName("sidebar")
			if(target[0].style.width = '300px'){
				target[0].style.width = '0px'
			}
		},
		displayToggle(){
			let target = document.getElementsByClassName("sidebar")
			if(target[0].style.width=='0px'){
				target[0].style.width = '300px'
			}
			else{
				target[0].style.width = '0px'
			}
		},
	},
	components:{
		Header,
		sidebar,
		footerDiv
	}
}

</script>

<style scoped>
html{
	font-family: Arial, Helvetica, sans-serif

}
body{
	margin:0;
}
.nuxt{
	height: 100%
}
.head{
	position: relative;
}

.head .sidebarClose{
	position: absolute;
	top:50px;
	right:0;
	background-color: #565656;
    text-decoration: none;
    border: none;
    outline: 0;
}
.menuimg {
    height: 25px;
    float: right;
    cursor: pointer; /* hand-shaped cursor */
}

</style>
