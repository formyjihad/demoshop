<template>
	<section id="form-section">
		<div class="margin" />
		<vue-good-wizard :steps="steps" :onNext="nextClicked" :onBack="backClicked" :onCart="cartClicked">
			<div class="slots" slot="slot1">
				<p>칼선을 포함한 가로와 세로길이를 입력해주세요. </p>
				<productsize :xsize="xsize" :ysize="ysize" 
					@emited_size="data=>{
					this.xsize = Number(data.x)
					this.ysize = Number(data.y)}"
				/>
			</div>
			<div class="slots" slot="slot2">
				<p>원하시는 아크릴의 두께를 선택하세요</p>
				<thickness :thick="thick" @emited_thick="data =>{thick=data}"/>
				<span>선택:{{thick}}</span>
			</div>
			<div class="slots" slot="slot3">
				<p>원하시는 아크릴 바닥 부품의 크기를 선택하세요.</p>
				<standsize :stand="stand" @emited_stand="data =>{stand=data}"/>
				<span>선택:{{stand}}</span>
			</div>
			<div class="slots" slot="slot4">
				<p>원하시는 부자재 옵션을 선택하세요</p>
				<itemkind :subitem="subitem" @emited_item="data=>{subitem=data}"/>
				<span>선택 : {{ subitem }}</span>
			</div>
			<div class="slots" slot="slot5">
				<p>원하시는 포장 옵션을 선택하세요</p>
				<packingkind :packing="packing" @emited_packing="data=>{packing=data}"/>
				<span>선택 : {{ packing }}</span>
			</div>
			<div class="slots" slot="slot6">
				<p>제작하는 제품의 인쇄면을 선택하세요</p>
				<sidekind :printside="printside" @emited_side="data=>{printside=data}"/> 
				<span>선택 : {{ printside }}</span>
			</div>
			<div class="slots" slot="slot7">
				<p>제작하는 제품의 도안 갯수와 수량을 입력하세요</p>
				<div class="table-body">
					<label for="design" style="margin-right: 10px; font-weight: bold; color:#565656"> 도안 갯수  </label>
					<input type="number" id="design" v-model="design" min="1" step="1"><br>
					<label for="quantity" style="margin-right: 10px; font-weight: bold;color:#565656" >주문 갯수  </label>
					<input type="number" id="quantity" v-model="quantity" min="1" step="1">
				</div>
			</div>
			<div class="slots8" slot="slot8">
				<p>주문 상세</p>
				<div class = "orderDetail">
					<div class = "orderTable">
						<table class="orderTable-body">
							<tr>
								<td>아크릴 두께</td>
								<td>{{thick}}</td>
							</tr>
							<tr>
								<td>바닥 크기</td>
								<td>{{stand}}</td>
							</tr>
							<tr>
								<td>부자재</td>
								<td>{{subitem}}</td>
							</tr>
							<tr>
								<td>포장 옵션</td>
								<td>{{packing}}</td>
							</tr>
							<tr>
								<td>인쇄면</td>
								<td>{{printside}}</td>
							</tr>
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
							<li>약 {{price}}원</li>
						</ul>
						<ul>
							<li class="header">총 예상 금액</li>
							<li>약 {{fullPrice}}원</li>
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
import productSize from './productsize'
import thickness from './thickness'
import standSize from './standsize'
import itemKind from './itemkind'
import packingKind from './packingkind'
import sideKind from './sidekind'

export default {
	components: {
		'vue-good-wizard': GoodWizard,
		'productsize':productSize,
		'thickness':thickness,
		'standsize':standSize,
		'itemkind':itemKind,
		'packingkind':packingKind,
		'sidekind':sideKind,
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
					label: '아크릴 두께',
					slot: 'slot2',
				},
				{
					label: '스탠드용 바닥 부품',
					slot: 'slot3',
				},
				{
					label: '부자재',
					slot: 'slot4',
				},
				{
					label: '조립/포장',
					slot: 'slot5',
				},
				{
					label: '인쇄면',
					slot: 'slot6',
				},
				{
					label: '도안 갯수/총 수량',
					slot: 'slot7',
				},
				{
					label: '주문상세',
					slot: 'slot8'
				}

			],
			goodsId:this.$route.params.id
		}
	},
	props: {
		xsize: {
			type: Number,
			default: 4,
			required: true,
			validator: function(value) {
				return value >= 0;
			}
		},
		ysize: {
			type: Number,
			default: 4,
			required: true,
			validator: function(value) {
					return value >= 0;
				}
		},
		thick: {
			type: String,
			default: "3mm",
			required: true
		},
		stand: {
			type: String,
			default:"4cm"
		},
		subitem: {
			type: String,
			default: "OPP",
			required: true
		},
		packing: {
			type: String,
			default: "조립 없음",
			required: true
		},
		printside: {
			type: String,
			default: "단면",
			required: true
		},
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
			const thick = this.thick;
			let type='';
			let thickPrice = 0;
			let sidePrice = 0;
			if(this.stand=="none"){
				type="아크릴 챰"
			}
			else if(this.stand=="4cm"||this.stand=="6cm"||this.stand=="8cm"){
				type="아크릴 스탠드"
			}
			if(thick == "0.7mm"){
				thickPrice = 0.8
			}
			else if(thick == "1mm"){
				thickPrice = 0.9
			}
			else if(thick == "3mm"){
				thickPrice = 1
			}
			else if(thick == "5mm"){
				thickPrice = 1.3
			}

			if(this.printside == "단면"){
				sidePrice = 1
			}
			else if(this.printside == "양면"){
				sidePrice = 1.5
			}
			let xSize = this.xsize; 
			let ySize = this.ysize; 
			let quantity = this.quantity;  
			let design = this.design;   
			let surface = 1;
			let optionPrice = 0; 
			if(this.subitem == "none"){
				optionPrice = 0;
			}
			else if(this.subitem == "OPP"){
				optionPrice = 20;
			}
			else if(this.subitem == "O링"){
				optionPrice = 50;
			}
			else if(this.subitem == "군번줄"){
				optionPrice = 100;
			}
			else if(this.subitem == "O링 + 군번줄"){
				optionPrice = 150;
			}
			else if(this.subitem == "O링 + 휴대폰줄"){
				optionPrice = 150;
			}
			else if(this.subitem == "키링"){
				optionPrice = 700;
			}
			let packingPrice = 0;   
			if(this.packing == "조립 없음"){
				packingPrice = 0;
			}
			else if(this.packing == "OPP만"){
				packingPrice = 300;
			}
			else if(this.packing == "오링 조립"){
				packingPrice = 200;
			}
			else if(this.packing == "부자재 조립"){
				packingPrice = 500;
			}
			let standSizeT = 0;     
			if(this.stand == "none"){
				standSizeT = 0;
			}
			else if(this.stand == "4cm"){
				standSizeT = 800;
			}
			else if(this.stand == "6cm"){
				standSizeT = 1200;
			}
			else if(this.stand == "8cm"){
				standSizeT = 1600;
			}
			let standSizeF = 0;     
			let price = Math.ceil(((((50000*(2000/((100-(590*290/(xSize*10+1.5)/(ySize*10+1.5)))^2+2000)*1.5+1)/(590*290/(xSize*10+1.5)/(ySize*10+1.5)))*thickPrice)*1.08^(4-Math.log(quantity)/Math.log(10)))/0.7*thickPrice*sidePrice*surface+optionPrice+packingPrice+standSizeT+standSizeF+(design*5000/quantity))/100)*110
			return price;
		},
		fullPrice(){
			return this.price*this.quantity
		}
	},
	methods:{
		
		async cartClicked(currentPage){
			let date = new Date()
			let month = date.getMonth()+1;
			let day = date.getDate();
			let year = date.getFullYear();
			if(month<0){
				year = year-1
				month = month+12
			}
			const nowTime = year+"-"+month+"-"+day;
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
				orderDate:nowTime,
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
				let date = new Date()
			let month = date.getMonth()+1;
			let day = date.getDate();
			let year = date.getFullYear();
			if(month<0){
				year = year-1
				month = month+12
			}
			const nowTime = year+"-"+month+"-"+day;
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
				orderDate:nowTime,
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

.slots8  p{
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
}

p {
	margin: 0 auto;
	font-family: Arial, Helvetica, sans-serif;
	color: #454545;
	font-weight: bold;
	font-size: x-large;
}
</style>
