<template>
	<div class="wizard">
		<div ref="wizard-body" class="wizard__body" :class="{'vgw-mobile': isMobile}">
			<div :key="currentSlot" class="wizard__body__step">
				<slot :name="currentSlot"></slot>
			</div>
			<div class="wizard__body__actions clearfix">
				<div class="leftBtn">
					<img src="/SVG/화살표_1.svg"
						v-if="backEnabled"
						class="wizard__back pull-left"
						@click="goBack()">
				</div>
				<div class="rightBtn">
					<img src="/SVG/화살표_2.svg"
						:class="{'disabled': options[currentStep].nextDisabled}"
						v-if="currentStep != steps.length - 1" class="wizard__next pull-right"
						@click="goNext()">
				</div>
				<div class="finalBtn">
					<a
						:class="{'disabled': options[currentStep].nextDisabled}"
						v-if="currentStep == steps.length - 1" class="wizard__next pull-right final-step" @click="goCart()">
						바로 주문하기
					</a>
					<a
						:class ="{'disabled': options[currentStep].nextDisabled}"
						v-if="currentStep == steps.length - 1" class="wizard__next pull-right final-step" @click="goNext()">
						장바구니에 담기
					</a>
				</div>
			</div>
		</div>
		<ul class="wizard__steps">
			<li class="wizard__step"
				:class="{
				'active': isMobile ? currentStep === index : currentStep >= index,
				'vgw-mobile': isMobile,
				}"
				:style="wizardStepStyle"
				v-for="(step, index) of steps" :key="index">
				<span class="wizard__step__line" :class="{'vgw-mobile': isMobile}"></span>
				<span class="wizard__step__label" @click="goTo(index)">{{step.label}}</span>
				<span class="wizard__step__indicator" @click="goTo(index)"></span>
			</li>
			
			<span 
			class="wizard__arrow" 
			:style="{ left: arrowPosition }">
			</span>
		</ul>
	</div>
</template>

<script>
export default {

	name: 'vue-good-wizard',

	props: {
		steps: {},
		previousStepLabel: {default: ''},
		nextStepLabel: {default: ''},
		finalStepLabel: {default: '주문하기'},
		onNext: {},
		onBack: {},
		onCart:{},

	},

	watch: {
		steps: {
			handler() {
				this.parseOptions();
			},
			immediate: true,
		}
	},

	data () {
		return {
			currentStep: 0,
			isMounted: false,
			resizer: null,
			isMobile: false,
			options: [],
			stepEnd:false
		};
	},
	computed: {
		wizardStepStyle() {
			if (this.isMobile) {
				return {
					width: '100%',
				};
			}

			return {
				width: `${100/this.steps.length}%`,
			};
		},
		mobileArrowPosition() {
			return 'calc(50% - 14px)';
		},
		arrowPosition() {
			if (this.isMobile) {
				return this.mobileArrowPosition;
			}
			var stepSize = 100/this.steps.length;
			var currentStepStart = stepSize * this.currentStep;
			var currentStepMiddle = currentStepStart + (stepSize/2);
			if(this.steps.length == 1)
				return 'calc('+currentStepMiddle+'%)'
			else
				return 'calc('+currentStepMiddle+'% - 14px)'
		},
		currentSlot() {
			return this.steps[this.currentStep].slot;
		},
		backEnabled() {
			return this.currentStep != 0;
		}
	},
	methods: {
		goNext (skipFunction) {
			if (!skipFunction && typeof this.onNext == 'function'){
				if(!this.onNext(this.currentStep)) {
			//returned false. don't do anything
					return;
				}
			}
			if (this.currentStep < this.steps.length-1) {
				this.currentStep++;
			}
		},
		goCart (skipFunction) {
			if (!skipFunction && typeof this.onCart == 'function'){
				if(!this.onCart(this.currentStep)) {
			//returned false. don't do anything
					return;
				}
			}
		},
		goBack (skipFunction) {
			if (!skipFunction && typeof this.onBack == 'function'){
				if(!this.onBack(this.currentStep)) {
				//returned false. don't do anything
					return;
				}
			}
			if (this.currentStep > 0) {
				this.currentStep--;
			}
		},

		goTo(step) {
			if (Number.isInteger(step)
				&& step < this.steps.length
				&& step >= 0) {
				this.currentStep = step;
			} 
		},
		
		parseOptions() {
			this.options = [];
			for(let i = 0; i < this.steps.length; i++) {
				this.options.push(this.steps[i].options ? this.steps[i].options : {});
			} 
		},

		handleResize() {
			//console.log('handle resize')
			if (this.resizer) {
				clearTimeout(this.resizer);
			}
			this.resizer = setTimeout(() => {
				//console.log('resizing...');
				this.isMobile = this.$refs['wizard-body'].clientWidth < 620;
			}, 100);
		},
	},
	mounted() {
		this.isMobile = this.$refs['wizard-body'].clientWidth < 620;
		window.addEventListener('resize', this.handleResize)
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.handleResize)
	}
};
</script>

<style scoped>

/* Utilities
*******************************/

.pull-left{
	width:100px;
	margin-top:55px;
	height:100px;
	cursor: pointer;
}

.pull-right{
	margin-top:55px;
	width:100px;
	height:100px;
	cursor: pointer;
}

.check-box{
	margin-top: 0px;
	margin-bottom:15px;
	height:15px;
}

.clearfix::after {
	display: block;
	content: "";
	clear: both;
}

/* Header Steps 
*******************************/
.wizard {
	position: relative;
	margin-top:100px;
	width:  100%;
}

.wizard__steps{
	list-style-type:  none;
	text-align: justify;
	-ms-text-justify: distribute-all-lines;
	text-justify: distribute-all-lines;
	padding:  0;
	height:  70px;
	width: 1200px;
	margin: 0 auto;
	position:  relative;
}

.stretch {
	width: 100%;
	display: inline-block;
	font-size: 0;
	line-height: 0
}

.wizard__step{
	height: 70px;
	vertical-align: bottom;
	display: inline-block;
	text-align: center;
	position:  relative;
	
}

.wizard__step:not(:first-child) .wizard__step__line{
	position: absolute;
	width:  100%;
	left:  -50%;
	bottom:  12px;
	height:  3px;
	background-color: #b9c7d2;
}

.wizard__step__indicator{
	box-sizing: content-box;
	display:  block;
	width:  16px;
	height:  16px;
	background-color:  #f1f1f1;
	border-radius: 50%;
	border: 3px solid #fff;
	position:  absolute;
	left:  50%;
	margin-left:  -10px;
	bottom:  2px;
	z-index: 1;
	cursor: pointer;
}

.wizard__step.active .wizard__step__indicator{
	background-color: gray;
}

.wizard__step.active:not(:first-child) .wizard__step__line{
	background-color: gray;
}

.wizard__step__label{
	color:  #98a4af;
	font-weight: bold;
	cursor: pointer;
}

/* Wizard body 
*******************************/
.wizard__body{
	margin-top:  30px;
	height:600px;
	min-height:  400px;
	margin-left:  50px;
	margin-right:  50px;
	/*border:  1px solid #aebac4;*/
	background-color: #fff;
	position: relative;
	/*border-radius: 5px;*/
	padding-bottom: 50px;
	
}

.wizard__body__step{
	padding:  16px;
	z-index:5
}

.wizard__arrow{
	position:  absolute;
	display: block;
	width:  30px;
	height:  30px;
	/*border:  1px solid #aebac4;*/
	top:  85px; /* height of step + body margin -15 */
	border-top-right-radius: 5px;
	background-color: #fff;
	border-left: none;
	border-bottom:  none;
	transform: rotate(-45deg);
	/*z-index: 2;*/
	-webkit-transition: left 0.3s;
	-o-transition: left 0.3s;
	transition: left 0.3s;
}

/* Wizard body 
*******************************/
.wizard__body__actions{
	position:  absolute;
	top:150px;
	width:100%;  
	pointer-events:none;        
 /* border-top:  1px solid #aebac4;*/
	/*background-color: #b9c7d2;*/
}

.wizard__body__actions .leftBtn{
	pointer-events:auto;        
	float:left !important
}

.wizard__body__actions .rightBtn{
	float:right !important;
	pointer-events:auto;
}
.wizard__body__actions .finalBtn{
	max-width:400px;
	pointer-events:auto;
	margin-left:auto;
	margin-right:auto;
	margin-top: 230px;
}
.wizard__body__actions .finalBtn a{
	backface-visibility: hidden;
	text-decoration: none;
	width:150px;
	position: relative;
	cursor: pointer;
	white-space: nowrap;
	pointer-events:auto;
	background: rgba(77.06191214211341%,45.128128767078024%,41.57993061429631%,0);
	border-radius: 39px;
	border: 6px solid #464646;
	border-width: 6px 6px 6px 6px;
	padding: 20px 30px 20px 30px;
	vertical-align: center;
	text-align:center;
	color: #565656;
	font-size: 15px;
	font-family: arial;
	font-weight: 900;
	font-style: normal;
	margin: 0 auto;
	margin-left: 36px;
}
.wizard__body__actions .finalBtn a:hover{
	color: white;
}

.wizard__body__actions a{
	width:  100px;
	height:  100px;
	color:  white;
	font-weight: bold;
	text-align: center;
	line-height: 50px;
	cursor: pointer;
	border-radius: 100%;
	-webkit-transition: background-color 0.3s;
	-o-transition: background-color 0.3s;
	transition: background-color 0.3s;
}

.wizard__body__actions a.disabled{
	cursor: not-allowed;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	opacity: 0.5;
}

.wizard__body__actions a>.vgw-icon, .wizard__body__actions a>span{
	display: inline-block;
	vertical-align: middle;
	position: relative;
}

.wizard__body__actions .vgw-icon::after{
	position: absolute;
	content: "";
}

.vgw-icon.vgw-next::after{
	background-image:url("/SVG/화살표_1.svg");
	width:100px;
	height: 100px;
}

.vgw-icon.vgw-prev::after{
	border-top: 2px solid gray;
	border-left: 2px solid gray;
	left:-5px;
}

.wizard__body__actions a:hover{
	background-color: #525252;
}


/* mobile */
.wizard__body.vgw-mobile{
	margin-left: 10px;
	margin-right: 10px;
}
.wizard__step.vgw-mobile{
	display: none;
}
.wizard__step .wizard__step__line.vgw-mobile{
	display: none;
}
.wizard__step.active.vgw-mobile{
	display: inline-block;
}
</style>
