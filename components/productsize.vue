<template>
    <div id="productsizeview">
        <div id="widthbox">
            <div id="leftbar">&nbsp;</div>
            <div id="widthInput">
                <input id="widthInputvalue" type="number" v-model="xsize" min=4 max=29 step=1 @change="productsizing(xsize, ysize)">
                <p id="widthInputP">cm</p>
            </div>
            <div id="rightbar"></div>
        </div>
        <div></div>
        <div id="sizebox">
            <img src="/SVG/크기 확인.svg"><!--상품이미지 -->
            <div id="fiveWonCoin"><img src="/SVG/백원 사이즈.svg"></div><!--100원이미지-->
        </div>
        <div id="heightbox">
            <div id="abovebar"></div>
            <div id="heightInput"><input id="heightInputvalue" type="number" v-model="ysize" min=4 max=59 step=1 @change="productsizing(xsize, ysize)">cm</div>
            <div id="underbar"></div>
        </div>
    </div>
</template>

<script>
export default {
    props:[
        'xsize', 'ysize'
    ],
    mounted(){
		//console.log("ready function")
		this.productsizing(this.xsize,this.ysize);
	},
    methods:{
        productsizing (x,y){
            let parseX = parseInt(x);
            let parseY = parseInt(y);
            if(parseX!=x){
                x = parseX;
                this.xsize = parseX;
            }
            if(parseY != y){
                y = parseY;
                this.ysize = parseY;
            }
            if(x>=30){
                x = 29;
                this.xsize = 29;
            }
            else if(x<=3){
                x = 4
                this.xsize = 4;
            }

            if(y>=60){
                y = 59;
                this.ysize = 59;
            }
            else if(y<=3){
                y = 4;
                this.ysize = 4;
            }
			let productsizeviewWidth = window.getComputedStyle(document.getElementById("productsizeview"),null).getPropertyValue('width').replace("px","")*1-70;
			let productsizeviewHeight = window.getComputedStyle(document.getElementById("productsizeview"),null).getPropertyValue('height').replace("px","")*1-70;
			let widthInputvalue=x*1;
			let heightInputvalue=y*1;
			if(widthInputvalue >= 4 && heightInputvalue >=4){
				if(widthInputvalue > heightInputvalue){
					document.getElementById("productsizeview").style.gridTemplateColumns= (productsizeviewWidth)+"px 70px";
					document.getElementById("productsizeview").style.gridTemplateRows="70px "+(productsizeviewHeight*heightInputvalue/widthInputvalue)+"px";
					let margintopValue = (productsizeviewHeight-productsizeviewHeight*heightInputvalue/widthInputvalue)/2;
					document.getElementById("widthbox").style.top = margintopValue+"px";
					document.getElementById("sizebox").style.top = margintopValue+"px";
					document.getElementById("heightbox").style.top = margintopValue+"px";
					document.getElementById("widthbox").style.left = "0px";
					document.getElementById("sizebox").style.left = "0px";
					document.getElementById("heightbox").style.left = "0px";
					let coinsize = productsizeviewHeight*2.4/widthInputvalue;
					//console.log(heightInputvalue);
					document.getElementById("fiveWonCoin").style.width = coinsize+"px";
					document.getElementById("fiveWonCoin").style.height = coinsize+"px";
					document.getElementById("fiveWonCoin").style.top = productsizeviewHeight-2*margintopValue-coinsize+"px";
				}else if(widthInputvalue < heightInputvalue){
					document.getElementById("productsizeview").style.gridTemplateColumns= (productsizeviewWidth*widthInputvalue/heightInputvalue)+"px 70px";
					document.getElementById("productsizeview").style.gridTemplateRows="70px "+(productsizeviewHeight)+"px";
					let marginleftValue = (productsizeviewWidth-productsizeviewWidth*widthInputvalue/heightInputvalue)/2;
					document.getElementById("widthbox").style.left = marginleftValue+"px";
					document.getElementById("sizebox").style.left = marginleftValue+"px";
					document.getElementById("heightbox").style.left = marginleftValue+"px";
					document.getElementById("widthbox").style.top = "0px";
					document.getElementById("sizebox").style.top = "0px";
					document.getElementById("heightbox").style.top = "0px";
					let coinsize = productsizeviewWidth*2.4/heightInputvalue;
					//console.log(heightInputvalue);
					document.getElementById("fiveWonCoin").style.width = coinsize+"px";
					document.getElementById("fiveWonCoin").style.height = coinsize+"px";
					document.getElementById("fiveWonCoin").style.top = productsizeviewWidth-coinsize+"px";
				}else{
					document.getElementById("productsizeview").style.gridTemplateColumns= (productsizeviewWidth)+"px 70px";
					document.getElementById("productsizeview").style.gridTemplateRows="70px "+(productsizeviewHeight)+"px";
					document.getElementById("widthbox").style.left = "0px";
					document.getElementById("sizebox").style.left = "0px";
					document.getElementById("heightbox").style.left = "0px";
					document.getElementById("widthbox").style.top = "0px";
					document.getElementById("sizebox").style.top = "0px";
					document.getElementById("heightbox").style.top = "0px";
					let coinsize = productsizeviewHeight*2.4/widthInputvalue;
					//console.log(heightInputvalue);
					document.getElementById("fiveWonCoin").style.width = coinsize+"px";
					document.getElementById("fiveWonCoin").style.height = coinsize+"px";
					document.getElementById("fiveWonCoin").style.top = productsizeviewHeight-coinsize+"px";
				}
			}
			document.getElementById("productsizeview");
			//document.getElementById("widthbox").style.backgroundColor="#cff";
			//document.getElementById("sizebox").style.backgroundColor="#fcf";
			//document.getElementById("heightbox").style.backgroundColor="#ffc";
			let widthboxheight = document.getElementById("widthbox").offsetHeight;
			let widthboxwidth = document.getElementById("widthbox").offsetWidth;
			let widthInputwidth = document.getElementById("widthInput").offsetWidth;
			let heightboxheight = document.getElementById("heightbox").offsetHeight;
			let heightboxwidth = document.getElementById("heightbox").offsetWidth;
			let heightInputheight = document.getElementById("heightInput").offsetHeight;
			document.getElementById("leftbar").style.marginTop= (widthboxheight/2)-1+"px";
			document.getElementById("leftbar").style.width=(widthboxwidth-widthInputwidth)/2+"px";
			document.getElementById("rightbar").style.marginTop= (widthboxheight/2)-1+"px";
			document.getElementById("rightbar").style.width=(widthboxwidth-widthInputwidth)/2+"px";
			document.getElementById("widthInputP").style.lineHeight=widthboxheight+"px";
			document.getElementById("abovebar").style.height=(heightboxheight-heightInputheight)/2+"px";
            document.getElementById("underbar").style.height=(heightboxheight-heightInputheight)/2+"px";
            this.$emit('emited_size', {x,y})
		},
    }
}
</script>

<style scoped>

#productsizeview{
    width:470px;
    height:470px;
    display: grid;
    margin: 0 auto;
}
#widthbox, #sizebox, #heightbox{
    position: relative;
}
#widthbox, #widthInput{
    display: inline-flex;
}
#widthbox p{
    margin: 0;
}
#productsizeview input[type="number"]::-webkit-outer-spin-button,
#productsizeview input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
#leftbar{
    border-top: 2px solid #565656;
    border-left: 2px solid #565656;
    border-top-left-radius: 100%;
    height:50%;
    position: relative;
}
#rightbar{
    border-top: 2px solid #565656;
    border-right: 2px solid #565656;
    border-top-right-radius: 100%;
    height:50%;
    position: relative;
}
#widthInputvalue,#heightInputvalue{
    text-align: center;
    font-size: 20px;
    width:40px;
    height:40px;
    border:0;
    padding:0;
    background-color: none;
}
#widthInputvalue{
    height:70px;
}
#abovebar{
    border-top: 2px solid #565656;
    border-right: 2px solid #565656;
    border-top-right-radius: 100%;
    width:50%;
    position: relative;
}
#underbar{
    border-right: 2px solid #565656;
    border-bottom: 2px solid #565656;
    border-bottom-right-radius: 100%;
    width:50%;
    position: relative;
}
#sizebox img{
    width:100%;
    height: 100%
}
#fiveWonCoin{
    position: absolute;
    background-color: #fff;
    border-radius: 100%;
    line-height: 100%;
    text-align: center;
    margin: o auto;
}
#fiveWonCoin img{
    width: 100%;
    height: 100%
}
</style>
