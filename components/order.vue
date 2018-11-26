<template>
	<section id="form-section">
		<vue-good-wizard :steps="steps" :onNext="nextClicked" :onBack="backClicked" :onCart="cartClicked">
			<div class="slots" slot="slot1">
				<p>칼선을 포함한 가로와 세로길이를 입력해주세요. </p>
				<div class="table-body">
					<input type="number" min="4" max="59" v-model="xsize" placeholder="4"> *
					<input type="number" min="4" max="59" v-model="ysize" placeholder="4">
					<br>
					<span>주문 사이즈 : {{ xsize }} * {{ ysize }} cm / {{ xsize*0.3937 }} * {{ ysize*0.3937 }} inch</span>
				</div>
			</div>
			<div class="slots" slot="slot2">
				<p>원하시는 아크릴의 두께를 선택하세요</p>
				<div class="buttons">
					<div class="button1" id="T0_7" @click="checkThick(1)"><img></div>
					<div class="button1" id="T1" @click="checkThick(2)"><img></div>
					<div class="button1" id="T3" @click="checkThick(3)"><img></div>
					<div class="button1" id="T5" @click="checkThick(4)"><img></div>
				</div>
				<span>선택 : {{ thick }}</span>
			</div>
			<div class="slots" slot="slot3">
				<p>원하시는 아크릴 바닥 부품의 크기를 선택하세요.</p>
				<div class="buttons">
					<div class="button1" id="cm4" @click="checkStand(1)"><img></div>
					<div class="button1" id="cm6" @click="checkStand(2)"><img></div>
					<div class="button1" id="cm8" @click="checkStand(3)"><img></div>
				</div>
				<span>선택:{{stand}}</span>
			</div>
			<div class="slots" slot="slot4">
				<p>원하시는 부자재 옵션을 선택하세요</p>
				<div class="buttons">
					<div class="button1" id="none" @click="checkSubitem(1)"><img></div>
					<div class="button1" id="OPP" @click="checkSubitem(2)"><img></div>
					<div class="button1" id="o링" @click="checkSubitem(3)"><img></div>
					<div class="button1" id="군번줄" @click="checkSubitem(4)"><img></div>
					<div class="button1" id="O링군번줄" @click="checkSubitem(5)"><img></div>
					<div class="button1" id="O링휴대폰줄" @click="checkSubitem(6)"><img></div>
					<div class="button1" id="키링" @click="checkSubitem(7)"><img></div>
				</div> 
				<span>선택 : {{ subitem }}</span>
			</div>
			<div class="slots" slot="slot5">
				<p>원하시는 포장 옵션을 선택하세요</p>
				<div class="buttons">
					<div class="button1" id="none" @click="checkPacking(1)"><img></div>
					<div class="button1" id="O링조립" @click="checkPacking(2)"><img></div>
					<div class="button1" id="OPP개별포장" @click="checkPacking(3)"><img></div>
					<div class="button1" id="다포장" @click="checkPacking(4)"><img></div>
				</div>
				<span>선택 : {{ packing }}</span>
			</div>
			<div class="slots" slot="slot6">
				<p>제작하는 제품의 인쇄면을 선택하세요</p>
				<div class="buttons">
					<div class="button1" id="단면" @click="checkPrintside(1)"><img></div>
					<div class="button1" id="양면" @click="checkPrintside(2)"><img></div>
				</div>
				<span>선택 : {{ printside }}</span>
			</div>
			<div class="slots" slot="slot7">
				<p>제작하는 제품의 도안 갯수와 수량을 입력하세요</p>
				<div class="table-body">
					<label for="design"> 도안 갯수 : </label>
					<input type="number" id="design" v-model="design" min="1" step="1"><br>
					<label for="quantity">주문 갯수 : </label>
					<input type="number" id="quantity" v-model="quantity" min="1" step="1">
				</div>
			</div>
			<div class="slots" slot="slot8">
				<p>주문 상세</p>
				<div class = "table-body">
					<table>
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
					label: 'Select Size',
					slot: 'slot1',
				},
				{
					label: 'Select Thickness',
					slot: 'slot2',
				},
				{
					label: 'Select Stand',
					slot: 'slot3',
				},
				{
					label: 'Select Sub Items',
					slot: 'slot4',
				},
				{
					label: 'Select Packing',
					slot: 'slot5',
				},
				{
					label: 'Select Print Side',
					slot: 'slot6',
				},
				{
					label: 'Order Amount',
					slot: 'slot7',
				},
				{
					label: 'Order Confirm',
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
			default: "none",
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
		async checkThick(i){
			let index = ''
			if(i==1){
				index = "0.7mm"                
			}
			else if(i==2){
				index = "1mm"
			}
			else if(i==3){
				index = "3mm"
			}
			else if(i==4){
				index = "5mm"
			}
			this.thick = index;
		},
		async checkStand(i){
			let index = ''
			if(i==1){
				index = "4cm"                
			}
			else if(i==2){
				index = "6cm"
			}
			else if(i==3){
				index = "8cm"
			}
			this.stand = index;
		},
		async checkSubitem(i){
			let index = ''
			if(i==1){
				index = "none"                
			}
			else if(i==2){
				index = "OPP"
			}
			else if(i==3){
				index = "o링"
			}
			else if(i==4){
				index = "군번줄"
			}
			else if(i==5){
				index = "O링군번줄"
			}
			else if(i==6){
				index = "O링휴대폰줄"
			}
			else if(i==7){
				index = "키링"
			}
			this.subitem = index;
		},
		async checkPacking(i){
			let index = ''
			if(i==1){
				index = "none"                
			}
			else if(i==2){
				index = "O링조립"
			}
			else if(i==3){
				index = "OPP개별포장"
			}
			else if(i==4){
				index = "다포장"
			}
			this.packing = index;
		},
		async checkPrintside(i){
			let index = ''
			if(i==1){
				index = "단면"                
			}
			else if(i==2){
				index = "양면"
			}
			this.printside = index;
		},
		async cartClicked(currentPage){
			const date = new Date()
			const month = date.getMonth()+1;
			const day = date.getDay();
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
				thick:thickPrice,
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
					console.log("post 대기")
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
			console.log('next clicked', currentPage)
			if(currentPage == 7){
				/*
				let formData = new FormData();
				let fileDom = document.querySelector('#uploadImg');
				console.log(fileDom)
				let uploadImg = fileDom.files[0];
				formData.append("img", fileDom.files[0]);*/
				const date = new Date()
				const month = date.getMonth()+1;
				const day = date.getDay();
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
					thick:thickPrice,
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
						console.log("post 대기")
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
			console.log('back clicked', currentPage);
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

.buttons input[type="radio"] {
	display:none;
}

.slots{
	text-align: center;
}

.detail {
	justify-content: center;
	align-items: center;
	text-align: center;
	padding: 30px;
	overflow: auto;
}
.table-body{
	width:100%;
	margin-top:50px;
	text-align:center;
}
.table-body table{
	display:inline-block
}

.item-image {
  width: 300px;
  height: 300px;
}
.product_img {
	float: left;

}
.options{
	float:right;
	text-align: left;
}
.buttons{    
	text-align: center;
	margin-top: 4%;
}

.choice .c_mm{  
	text-align: center;
	margin-top: 7%;
}
.choice .item{
	text-align: center;
}
p {
	margin: 0 auto;
	font-family: Arial, Helvetica, sans-serif;
	color: #454545;
	font-weight: bold;
	font-size: x-large;
}
.choice div{
}
#content{
	margin-top: 50px;
}
.button1 {
	width: 13%;
	height: 150px;
	display: inline-block;
	margin: 0 auto;
	background-size: contain;
	background-repeat: no-repeat;   
	background-position: center center; 
	margin: 2% 4%;    
}
.button1 img{
	max-width: 100%;
	height: auto;

}
.buttons{    
	text-align: center;
	margin-top: 3%;
}
#T0_7{
	background-image:url("/SVG/0.7mm_기본.svg");
}
#T0_7:hover{
	background-image: url("/SVG/0.7mm_기본.svg");
}
#T0_7:active{
	background-image: url("/SVG/0.7mm_확정.svg");
}
#T1{
	background-image:url("/SVG/1mm_기본.svg");
}
#T1:hover{
	background-image: url("/SVG/1mm_기본.svg");
}
#T1:active{
	background-image: url("/SVG/1mm_확정.svg");
}
#T3{
	background-image:url("/SVG/3mm_기본.svg");
}
#T3:hover{
	background-image: url("/SVG/3mm_기본.svg");
}
#T3:active{
	background-image: url("/SVG/3mm_확정.svg");
}
#T5{
	background-image:url("/SVG/5mm_기본.svg");
}
#T5:hover{
	background-image: url("/SVG/5mm_기본.svg");
}
#T5:active{
	background-image: url("/SVG/5mm_확정.svg");
}

#cm4{
	background-image:url("/SVG/4cm_기본.svg");
}
#cm4:hover{
	background-image: url("/SVG/4cm_기본.svg");
}
#cm4:active{
	background-image: url("/SVG/4cm_확정.svg");
}
#cm6{
	background-image:url("/SVG/6cm_기본.svg");
}
#cm6:hover{
	background-image: url("/SVG/6cm_기본.svg");
}
#cm6:active{
	background-image: url("/SVG/6cm_확정.svg");
}
#cm8{
	background-image:url("/SVG/8cm_기본.svg");
}
#cm8:hover{
	background-image: url("/SVG/8cm_기본.svg");
}
#cm8:active{
	background-image: url("/SVG/8cm_확정.svg");
}
#화살표{
	background-image:url("/SVG/화살표_1.svg");
}

#none{
	background-image:url("/SVG/없음_기본.svg");
}
#none:hover{
	background-image: url("/SVG/없음_기본.svg");
}
#none:active{
	background-image: url("/SVG/없음_확정.svg");
}
#OPP{
	background-image:url("/SVG/OPP만_기본.svg");
}
#OPP:hover{
	background-image: url("/SVG/OPP만_기본.svg");
}
#OPP:active{
	background-image: url("/SVG/OPP만_확정.svg");
}
#o링{
	background-image:url("/SVG/O링_기본.svg");
}
#o링:hover{
	background-image: url("/SVG/O링_기본.svg");
}
#o링:active{
	background-image: url("/SVG/O링_확정.svg");
}
#군번줄{
	background-image:url("/SVG/군번줄_기본.svg");
}
#군번줄:hover{
	background-image: url("/SVG/군번줄_기본.svg");
}
#군번줄:active{
	background-image: url("/SVG/군번줄_확정.svg");
}
#O링군번줄{
	background-image:url("/SVG/O링+군번줄_기본.svg");
}
#O링군번줄:hover{
	background-image: url("/SVG/O링+군번줄_기본.svg");
}
#O링군번줄:active{
	background-image: url("/SVG/O링+군번줄_확정.svg");
}
#O링휴대폰줄{
	background-image:url("/SVG/O링+휴대폰줄_기본.svg");
}
#O링휴대폰줄:hover{
	background-image: url("/SVG/O링+휴대폰줄_기본.svg");
}
#O링휴대폰줄:active{
	background-image: url("/SVG/O링+휴대폰줄_확정.svg");
}
#키링{
	background-image:url("/SVG/키링_기본.svg");
}
#키링:hover{
	background-image: url("/SVG/키링_기본.svg");
}
#키링:active{
	background-image: url("/SVG/키링_확정.svg");
}

#O링조립{
	background-image:url("/SVG/오링조립_기본.svg");
}
#O링조립:hover{
	background-image: url("/SVG/오링조립_기본.svg");
}
#O링조립:active{
	background-image: url("/SVG/오링조립_확정.svg");
}
#OPP개별포장{
	background-image:url("/SVG/OPP개별포장_기본.svg");
}
#OPP개별포장:hover{
	background-image: url("/SVG/OPP개별포장_기본.svg");
}
#OPP개별포장:active{
	background-image: url("/SVG/OPP개별포장_확정.svg");
}
#다포장{
	background-image:url("/SVG/많음_기본.svg");
}
#다포장:hover{
	background-image: url("/SVG/많음_기본.svg");
}
#다포장:active{
	background-image: url("/SVG/많음_확정.svg");
}
#단면{
	background-image:url("/SVG/단면_기본.svg");
}
#단면:hover{
	background-image: url("/SVG/단면_기본.svg");
}
#단면:active{
	background-image: url("/SVG/단면_확정.svg");
}
#양면{
	background-image:url("/SVG/양면_기본.svg");
}
#양면:hover{
	background-image: url("/SVG/양면_기본.svg");
}
#양면:active{
	background-image: url("/SVG/양면_확정.svg");
}
</style>
