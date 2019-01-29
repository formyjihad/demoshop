<template>
	<div>
		<div class="head" @click="navClick()">
			<Header/>
		</div>
		<sidebar class ="sidebar" @close-tab="displayToggle()" style="width:0px"/>
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
.nuxt{
	height: 100%
}

</style>
