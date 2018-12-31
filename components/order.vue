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
					<label for="design" style="margin-right: 10px;"> 도안 갯수  </label>
					<input type="number" id="design" v-model="design" min="1" step="1"><br>
					<label for="quantity" style="margin-right: 10px;" >주문 갯수  </label>
					<input type="number" id="quantity" v-model="quantity" min="1" step="1">
				</div>
			</div>
			<div class="slots" slot="slot8">
				<p>주문 상세</p>
				<div class = "table-body">
					<table>
						<tr>
							<td style="text-align: left;">아크릴 두께</td>
							<td style="padding-left: 20px;">{{thick}}</td>
						</tr>
						<tr>
							<td style="text-align: left;">바닥 크기</td>
							<td style="padding-left: 20px;">{{stand}}</td>
						</tr>
						<tr>
							<td style="text-align: left;">부자재</td>
							<td style="padding-left: 20px;">{{subitem}}</td>
						</tr>
						<tr>
							<td style="text-align: left;">포장 옵션</td>
							<td style="padding-left: 20px;">{{packing}}</td>
						</tr>
						<tr>
							<td style="text-align: left;">인쇄면</td>
							<td style="padding-left: 20px;">{{printside}}</td>
						</tr>
						<tr>
							<td style="text-align: left;">도안 수량</td>
							<td style="padding-left: 20px;">{{design}} 개</td>
						</tr>
						<tr>
							<td style="text-align: left;">인쇄 수량</td>
							<td style="padding-left: 20px;">{{quantity}} 개</td>
						</tr>
					</table>
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
		})
	},
	methods:{
		
		async cartClicked(currentPage){
			const date = new Date()
			const month = date.getMonth()+1;
			const day = date.getDate();
			const year = date.getFullYear();
			const nowTime = year+"-"+month+"-"+day;
			const boardSize = 590*290;
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
			let xSize = this.xsize; //4
			let ySize = this.ysize; //4
			let quantity = this.quantity;   //1
			let design = this.design;   //1
			let surface = 1;
			let optionPrice = 0;    //부자재 옵션 이후 변경
			let packingPrice = 0;   //포장 옵션 이후 변경
			let standSizeT = 0;     //3T용 스탠드 바닥 사이즈
			let standSizeF = 0;     //5T용 스탠드 바닥 사이즈
			let price = Math.ceil(((((50000*(2000/((100-(590*290/(xSize*10+1.5)/(ySize*10+1.5)))^2+2000)*1.5+1)/(590*290/(xSize*10+1.5)/(ySize*10+1.5)))*thickPrice)*1.08^(4-Math.log(quantity)/Math.log(10)))/0.7*thickPrice*sidePrice*surface+optionPrice+packingPrice+standSizeT+standSizeF)/100)*110
			const goods = [{
				_id:this.goodsId,
				//name:this.name,
				goodsType:type,
				quantity:quantity,
				price:price,
				xsize:xSize,
				ysize:ySize,
				thick:this.thick,
				stand:this.stand,
				subItem:this.subitem,
				packing:this.packing,
				printside:this.printside,
				design:design,
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
				/*
				let formData = new FormData();
				let fileDom = document.querySelector('#uploadImg');
				//console.log(fileDom)
				let uploadImg = fileDom.files[0];
				formData.append("img", fileDom.files[0]);*/
				const date = new Date()
				const month = date.getMonth()+1;
				const day = date.getDate();
				const year = date.getFullYear();
				const nowTime = year+"-"+month+"-"+day;
				const boardSize = 590*290;
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
				let xSize = this.xsize; //4
				let ySize = this.ysize; //4
				let quantity = this.quantity;   //1
				let design = this.design;   //1
				let surface = 1;
				let optionPrice = 0;    //부자재 옵션 이후 변경
				let packingPrice = 0;   //포장 옵션 이후 변경
				let standSizeT = 0;     //3T용 스탠드 바닥 사이즈
				let standSizeF = 0;     //5T용 스탠드 바닥 사이즈
				let price = Math.ceil(((((50000*(2000/((100-(590*290/(xSize*10+1.5)/(ySize*10+1.5)))^2+2000)*1.5+1)/(590*290/(xSize*10+1.5)/(ySize*10+1.5)))*thickPrice)*1.08^(4-Math.log(quantity)/Math.log(10)))/0.7*thickPrice*sidePrice*surface+optionPrice+packingPrice+standSizeT+standSizeF)/100)*110
				const goods = [{
					_id:this.goodsId,
					//name:this.name,
					goodsType:type,
					quantity:quantity,
					price:price,
					xsize:xSize,
					ysize:ySize,
					thick:this.thick,
					stand:this.stand,
					subItem:this.subitem,
					packing:this.packing,
					printside:sidePrice,
					design:design,
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
	height: 100px;
}

.slots{
	text-align: center;
}

.table-body{
	width:100%;
	margin-top:50px;
	text-align:center;
}
.table-body table{
	display:inline-block
}

p {
	margin: 0 auto;
	font-family: Arial, Helvetica, sans-serif;
	color: #454545;
	font-weight: bold;
	font-size: x-large;
}
</style>
