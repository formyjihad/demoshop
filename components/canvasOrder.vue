<template>
	<section id="form-section">
		<div class="margin" />
		<vue-good-wizard :steps="steps" :onNext="nextClicked" :onBack="backClicked" :onCart="cartClicked">
			<div class="slots" slot="slot1">
				<p>캔버스 가로와 세로길이를 입력해주세요. </p>
			</div>
			<div class="slots" slot="slot2">
				<p>제작하는 제품의 도안 갯수와 수량을 입력하세요</p>
				<div class="table-body">
					<label for="design" style="margin-right: 10px; font-weight: bold; color:#565656"> 도안 갯수  </label>
					<input type="number" id="design" v-model="design" min="1" step="1"><br>
					<label for="quantity" style="margin-right: 10px; font-weight: bold;color:#565656" >주문 갯수  </label>
					<input type="number" id="quantity" v-model="quantity" min="1" step="1">
				</div>
			</div>
			<div class="slots3" slot="slot3">
				<p>주문 상세</p>
				<div class = "orderDetail">
					<div class = "orderTable">
						<table class="orderTable-body">
							<tr>
								<td>도안 수량</td>
								<td>{{design}} 개</td>
							</tr>
							<tr>
								<td>인쇄 수량</td>
								<td>{{quantity}} 개</td>
							</tr>
						</table>
					</div>
					<div class="recit">
						<ul>
							<li class="header">개당 예상 금액</li>
							<li class="price">약 {{price}}원</li>
						</ul>
						<ul>
							<li class="header">총 예상 금액</li>
							<li class="fullPrice">약 {{fullPrice}}원</li>
						</ul>
					</div>
				</div>
			</div>
		</vue-good-wizard>
	</section>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from 'vuex';
import GoodWizard from './vue-good-wizard';

export default {
	components: {
		'vue-good-wizard': GoodWizard,
	},
	vaildate({params}){
		return true
	},
	
	data(){
		return {
			steps: [
				{
					label: '제품 사이즈',
					slot: 'slot1',
				},
				{
					label: '도안 갯수/총 수량',
					slot: 'slot2',
				},
				{
					label: '주문상세',
					slot: 'slot3'
				}
			],
			goodsId:this.$route.params.id
		}
	},
	props: {
		quantity: {
			type: Number,
			default: 1,
			required: true
		},
		design:{
			type:Number,
			default:1,
			required: true
		}
	},
	computed:{
		cart(){
			return this.cart()
		},
		...mapGetters({
			cart : 'carts/cart'
		}),
		price(){   
			let price = 1
			return price;
		},
		fullPrice(){
			return this.price*this.quantity
		}
	},
	methods:{
		async cartClicked(currentPage){
			const boardSize = 590*290;
			const thick = this.thick;
			let type='';
			if(this.stand=="none"){
				type="아크릴 챰"
			}
			else if(this.stand=="4cm"||this.stand=="6cm"||this.stand=="8cm"){
				type="아크릴 스탠드"
			}
			const goods = [{
				_id:this.goodsId,
				//name:this.name,
				goodsType:type,
				quantity:this.quantity,
				price:this.price,
				xsize:this.xsize,
				ysize:this.ysize,
				thick:this.thick,
				stand:this.stand,
				subItem:this.subitem,
				packing:this.packing,
				printside:this.printside,
				design:this.design,
				//img:uploadImg.name,
				//img:uploadImg
			}];
			//console.log('breakpoint')
			//console.log(goods);

			
			if(this.cart.length>0){
				let _id = this._id
				let cartIndex = this.cart.findIndex(cart => {
					return cart._id == _id
				})
				if (cartIndex == -1){
					this.addToCart(goods);
					//console.log("post 대기")
					/*let fileData = await axios.post('/api/fileUpload',formData,{
						headers:{
							'Content-Type':'multipart/form-data'
						}
					})*/
					alert("장바구니로 이동합니다.")
					this.$nuxt.$router.replace({path:'/cart'})
				} else {
					this.updateCart({
						_id,
						unit:1,
						cart:this.cart
					})
					alert("장바구니로 이동합니다.")
					this.$nuxt.$router.replace({path:'/cart'})
				} 
			}else {
				alert("장바구니로 이동합니다.")
				this.addToCart(goods)
				this.$nuxt.$router.replace({path:'/cart'})
			}
			return true; //return false if you want to prevent moving to next page
		},
		async nextClicked(currentPage) {
			//console.log('next clicked', currentPage)
			if(currentPage == 7){
			const boardSize = 590*290;
			const thick = this.thick;
			let type='';
			if(this.stand=="none"){
				type="아크릴 챰"
			}
			else if(this.stand=="4cm"||this.stand=="6cm"||this.stand=="8cm"){
				type="아크릴 스탠드"
			}
			const goods = [{
				_id:this.goodsId,
				//name:this.name,
				goodsType:type,
				quantity:this.quantity,
				price:this.price,
				xsize:this.xsize,
				ysize:this.ysize,
				thick:this.thick,
				stand:this.stand,
				subItem:this.subitem,
				packing:this.packing,
				printside:this.printside,
				design:this.design,
				//img:uploadImg.name,
				//img:uploadImg
			}];
				//console.log('breakpoint')
				//console.log(goods);

				
				if(this.cart.length>0){
					let _id = this._id
					let cartIndex = this.cart.findIndex(cart => {
						return cart._id == _id
					})
					if (cartIndex == -1){
						this.addToCart(goods);
						//console.log("post 대기")
						/*let fileData = await axios.post('/api/fileUpload',formData,{
							headers:{
								'Content-Type':'multipart/form-data'
							}
						})*/
						alert("장바구니에 추가되었습니다.")
						this.$nuxt.$router.replace({path:'/'})
					} else {
						this.updateCart({
							_id,
							unit:1,
							cart:this.cart
						})
						alert("장바구니에 추가되었습니다.")
						this.$nuxt.$router.replace({path:'/'})
					} 
				}else {
					alert("장바구니에 추가되었습니다.")
					this.addToCart(goods)
					this.$nuxt.$router.replace({path:'/'})
				}
			}
			return true; //return false if you want to prevent moving to next page
		},
		backClicked(currentPage) {
			//console.log('back clicked', currentPage);
			return true; //return false if you want to prevent moving to previous page
		},
			
		...mapActions({
			addToCart : 'carts/addToCart',
			updateCart : 'carts/updateCart',
		})
	},
}

</script>


<style scoped>

.margin{
	height: 50px;
}

.slots{
	text-align: center;
}

.slots3  p{
	border-bottom: 4px solid #bcbcbc;
	width: 160px;
	text-align: center;
}

.detail {
	justify-content: center;
	align-items: center;
	text-align: center;
	padding: 30px;
	overflow: auto;
}
#design {
	width: 60px;
	height: 30px;
	text-align: center;
}
#quantity{
	width: 60px;
	height: 30px;
	text-align: center;
	margin-top: 7px;
}

.table-body{
	width:100%;
	margin-top:20px;
	text-align:center;
	color:#525252;
}

.table-body table{
	display:inline-block
}

.orderDetail{
	height: 300px;
	width:700px;
	margin-top:20px;
	margin-right: auto;
	margin-left: auto;
	text-align:center;
}

.orderDetail .orderTable{
	height: 300px;
	width:300px;
	float:left;
}

.orderDetail .orderTable .orderTable-body{
	width: 100%;
	color:#525252;
}

.orderDetail .orderTable .orderTable-body td{
	padding-bottom: 10px;
}

.orderDetail .orderTable .orderTable-body td:nth-child(1){
	text-align: left; 
	font-weight: bold;
}

.orderDetail .orderTable .orderTable-body td:nth-child(2){
	padding-left: 20px;
}

.orderDetail .recit{
	width:300px;
	height:200px;
	float:left;
	margin-left: 30px;
}
.orderDetail .recit ul{
	padding:0;
	margin:auto;
	list-style:none;
}

.orderDetail .recit .header{
	font-weight:900;
	color:#525252;
	font-size: 16px;
}

.orderDetail .recit .price{
	font-weight:700;
	color:#808080;
	font-size: 25px;
}

.orderDetail .recit .fullPrice{
	font-weight:700;
	color:#808080;
	font-size: 25px;
}

p {
	margin: 0 auto;
	font-family: Arial, Helvetica, sans-serif;
	color: #454545;
	font-weight: bold;
	font-size: x-large;
}
</style>
