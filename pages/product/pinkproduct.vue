<template>
	
	<view>
		<view  class="container" v-if="!loading && goods">
			<view class="carousel">
				<swiper indicator-dots circular=true duration="400">
					<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
						<view class="image-wrapper">
							<image
								:src="item" 
								class="loaded" 
								mode="aspectFill"
							></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			
			<view class="introduce-section">
				<text class="title">{{goods.name}}</text>
				<br>
				<text class="sutitle">{{goods.subTitle}}</text>
				<view class="price-box">
					<text class="price-tip">¥</text>
					<text class="price" >{{goods.price}}</text>
					<text class="m-price" v-if="goods.originalPrice>0" >¥{{goods.originalPrice}}</text>
					<!-- <text class="coupon-tip">7折</text> -->
				</view>
				<view class="bot-row">
					<text>销量: {{goods.sale}}</text>
					<text>库存: {{goods.stock}}</text>
					<text>浏览量: {{goods.browse}}</text>
				</view>
			</view>
			<view class="pinkInfo-section">
				<view class="pink-row">
					<view class="pink-header">
						<text>拼团信息</text>
					</view>
					<view v-for="(item,index) in goods.pinkInfos" :key="index">
						<view class="pink-box">
							<view class="left">
								<image :src="item.buyerIcon ? item.buyerIcon:'../../static/missing-face.png'"></image>
								<text>{{item.pinkBuyer.buyerName}}</text>
							</view>
							<view class="right">
								<view class="text-box">
									<view class="text-top">还差{{item.shortPeople}}人成团</view>
									<view class="text-bottom">剩余{{item.djs}}</view>
								</view>
								<view class="btn" @click="clickItem(item)">
								     <span>去拼团 <i class="iconfont icon-Chevronrightdouble1-24px"></i></span>
								</view>
							</view>
						</view>
					</view>
					
					<!-- <transition name="fade">
						 <view  v-show="isActive">
							<view class="pink-box">
								<view class="left">
									<image></image>
									<text>会笑的眼睛</text>
								</view>
								<view class="right">
									<view class="text-box">
										<view class="text-top">还差2人成团</view>
										<view class="text-bottom">剩余12:00:00</view>
									</view>
									<view class="btn" @click="clickItem(item)">
									     <span>去拼团 <i class="iconfont icon-Chevronrightdouble1-24px"></i></span>
									</view>
								</view>
							</view>
						 </view>
					 </transition> -->
				</view>
				<!-- <button @click="isActive = !isActive">展开/折叠</button> -->
			</view>
			<view class="detail-desc" v-if="desc.length>0" >
				<view class="d-header">
					<text>图文详情</text>
				</view>
				<rich-text :nodes='desc'>
					
				</rich-text>
			</view>
			
			<!-- 底部操作菜单 -->
			<view class="page-bottom" v-if="goods.deleteStatus == 0">
				<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
					<text class="yticon icon-xiatubiao--copy"></text>
					<text>首页</text>
				</navigator>
				<view class="p-b-btn" >
				</view>
				<view class="p-b-btn" >
				</view>
				<view class="action-btn-group">
					<button type="primary" class=" action-btn no-border buy-now-btn" @click="originbuy">原价购买</button>
					<button type="primary" class=" action-btn no-border buy-now-btn"  disabled="true" v-if="goods.deleteStatus==0 && goods.isShow  && goods.pinkStatus == 0">暂未开始</button>
					<button type="primary" class=" action-btn no-border buy-now-btn" @click="buy" v-if="goods.deleteStatus==0 && goods.isShow && goods.pinkStatus == 1" >立即开团</button>
					<button type="primary" class=" action-btn no-border buy-now-btn" disabled="true" v-if="goods.deleteStatus==0 && goods.isShow && goods.pinkStatus == 2" >团购结束</button>
					<button type="primary" class=" action-btn no-border buy-now-btn" disabled="true" v-if="goods.deleteStatus==0 && goods.isShow && goods.pinkStatus == 3" >团购光了</button>
				</view>
			</view>
				
			</view>
			
			<!-- 404页面 -->
			<view v-if="isError && !loading">
				<rf-no-data :custom="true">
					<view class="no-data-title">
						{{ errorInfo || '暂无数据' }}
					</view>
					<view
						@tap="loadData()"
						slot="refresh"
						class="spec-color"
						>重新加载</view
					>
				</rf-no-data>
			</view>
			
			<!--页面加载动画-->
			<rfLoading isFullScreen :active="loading"></rfLoading>
			
		</view>
		
	
	
	
</template>

<script>
	import rfNoData from '@/components/rf-no-data';
	function InitTime(endtime){
	    var dd,hh,mm,ss = null;
	    var time = parseInt(endtime) - new Date().getTime()/1000;
	    if(time<=0){
	        return '结束'
	    }else{
	        dd = Math.floor(time / 60 / 60 / 24);
	        hh = Math.floor((time / 60 / 60) % 24);
	        mm = Math.floor((time / 60) % 60);
	        ss = Math.floor(time  % 60);
	        var str = dd+"天"+hh+"小时"+mm+"分"+ss+"秒";
	        return str;
	    }
	}
	import {
	    mapState,
		mapMutations
	} from 'vuex';  
	import share from '@/components/share';
	import '../../static/css/index.css'
	import html_url from '@/config/htmlSeverConfig.js'
	export default {
		components:{
		  rfNoData	
		},
		computed:{
			...mapState(['hasLogin'])	
		},
		data(){
			return {
				id:0,
				isError:false,
				isActive:false,
				loading:true,
				goods:null,
				imgList: [],
				desc:'',
				pinkPath:'',
				flashDownTime:{
					h : 0,
					m : 0,
					h : 0,
				}
			}
		},
		// #ifdef  MP-WEIXIN
		  onShareAppMessage(ops) {

		    return {
		         title: this.goods.name,
		         path: '/pages/product/product?id='+this.id,
		         imageUrl: this.goods.pic,
				 desc: this.goods.subTitle,
		         success: (res) => {
		           console.log("转发成功", res);
		         },
		         fail: (res) => {
		           console.log("转发失败", res);
		         },
			}
			
		  },
		// #endif
		async onLoad(options) {
			this.id = options.id;
			this.loadData();
		},
		mounted() {
			 setInterval( ()=> {
				for (var key in this.goods.pinkInfos) {
				   var endTimeDate= parseInt(this.goods.pinkInfos[key]["stopTime"])
				   var nowTimeDate = new Date().getTime();
				   var rightTime = endTimeDate - nowTimeDate;
				     if (rightTime > 0) {
				            var dd = Math.floor(rightTime / 1000 / 60 / 60 / 24);
				            var hh = Math.floor((rightTime / 1000 / 60 / 60) % 24);
				            var mm = Math.floor((rightTime / 1000 / 60) % 60);
				            var ss = Math.floor((rightTime / 1000) % 60);
							var time = dd + "天" + hh + "小时" + mm + "分" + ss + "秒";
							console.log(time);
							this.goods.pinkInfos[key]["djs"] = time
				       }
				        
					}
				}, 1000);
			
		},
		methods:{
			loadData(){
				let id = this.id;
				this.loading = true;
				this.isError = false;
				this.$store.dispatch('PinkGoodsDetail',id).then((result)=>{
				
				
					this.goods = result;
					let albumPicsStr =this.goods.albumPics; //这是一字符串
					let albumPics= new Array(); //定义一数组 
					albumPics=albumPicsStr.split(","); //字符分割 
					if(albumPics[0].length > 0) {
						this.imgList = albumPics;
					}else{
						this.imgList = [this.goods.pic];
					}
					
					let desc_html = "";
					if(this.goods.detailMobileHtml && this.goods.detailMobileHtml.length > 0) {
						desc_html = this.goods.detailMobileHtml;
					}else{
						desc_html = this.goods.detailHtml;
					}
					console.log(desc_html)
					this.desc = desc_html;
					
					this.goods.pinkInfos.map( (obj,index)=>{
						console.log(obj)
					        this.$set(
					            obj,"djs",InitTime(obj.stopTime/1000)
					        );
					 })
					this.isError = false;
					this.loading = false	
				}).catch((e)=>{
					this.loading = false	
					this.isError = true;
					console.log(e)
				})
			},
			originbuy(){
				let id = this.goods.productId;
			    uni.navigateTo({
			  	url: `/pages/product/product?id=${id}`
			  })
			},
			clickItem(item){
				uni.navigateTo({
					url: `/pages/product/pinkDetail?pinkId=${item.id}`
				})
				
				
			},
			
			buy(){
				if(this.hasLogin){
					//请求秒杀路径
					console.log("请求团购路径")
					let params = {goodsId:this.goods.id}
					this.$store.dispatch('PinkPath',params).then((result)=>{
						this.pinkPath = result.path
						this.doPink();
					}).catch((e)=>{
						console.log(e)
					})
					
					// uni.navigateTo({
					// 	url: `/pages/order/createOrder?data=${this.goods.id}&orderType=2`
					// })
				}else{
					this.$mHelper.backToLogin();
				}
			},
			doPink(){
				let params = {
						goodsId:this.goods.id,
						pinkType:0,
					}
				let data = {params:params,path:this.pinkPath}
				this.$store.dispatch('DoPink',data).then((result)=>{
					console.log(result)
					this.queryPinkReult();
				}).catch((e)=>{
					console.log(e)
				})
			},
			
			//秒杀结果查询
			queryPinkReult(){
				let params = {goodsId:this.goods.id}
				this.$store.dispatch('PinkResult',params).then((result)=>{
					console.log(result)
					if(result == 0){
						let _this = this;
						setTimeout(function(){
						   _this.queryPinkReult();
						},1000)
						console.log("拼团中")
					}else if(result == -1){
						console.log("拼团完")
					}else{
						console.log("拼团到")
						uni.navigateTo({
							url: `/pages/order/createOrder?orderType=2&orderId=${result}`
						})
						
					}
					
				}).catch((e)=>{
					console.log(e)
				})
			}
			
		},
		
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
		padding-bottom: 160upx;
	}
	.spec-color{
		color: $base-color;
	}
	.icon-you{
		font-size: $font-base + 2upx;
		color: #888;
	}
	.carousel {
		height: 722upx;
		position:relative;
		swiper{
			height: 100%;
		}
		.image-wrapper{
			width: 100%;
			height: 100%;
		}
		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		
	}
	
	/* 标题简介 */
	.introduce-section{
		background: #fff;
		padding: 20upx 30upx;
		
		.title{
			font-size: 32upx;
			color: $font-color-dark;
			height: 50upx;
			line-height: 50upx;
		}
		
		.sutitle{
			display:flex;
			font-size: 18upx;
			color: $font-color-dark;
			line-height:18px
		}
		
		.price-box{
			display:flex;
			align-items:baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color:$uni-color-primary;
		}
		.price{
			font-size: $font-lg + 2upx;
		}
		.m-price{
			margin:0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}
		.coupon-tip{
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx); 
		}
		.bot-row{
			display:flex;
			align-items:center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;
			text{
				flex: 1;
			}
		}
	}
	/* 分享 */
	.share-section{
		display:flex;
		align-items:center;
		color: $font-color-base;
		background: linear-gradient(left, #fdf5f6, #fbebf6);
		padding: 12upx 30upx;
		.share-icon{
			display:flex;
			align-items:center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $uni-color-primary;
			border-radius: 4upx;
			position:relative;
			overflow: hidden;
			font-size: 22upx;
			color: $uni-color-primary;
			&:after{
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -20upx;
				top: -12upx;
				position:absolute;
				background: $uni-color-primary;
			}
		}
		.icon-xingxing{
			position:relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}
		.tit{
			font-size: $font-base;
			margin-left:10upx;
		}
		.icon-bangzhu1{
			padding: 10upx;
			font-size: 30upx;
			line-height: 1;
		}
		.share-btn{
			flex: 1;
			text-align:right;
			font-size: $font-sm;
			color: $uni-color-primary;
		}
		.icon-you{
			font-size: $font-sm;
			margin-left: 4upx;
			color: $uni-color-primary;
		}
	}
	
	.c-list{
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;
		.c-row{
			display:flex;
			align-items:center;
			padding: 20upx 30upx;
			position:relative;
		}
		.tit{
			width: 140upx;
		}
		.con{
			flex: 1;
			color: $font-color-dark;
			.selected-text{
				margin-right: 10upx;
			}
		}
		.bz-list{
			height: 40upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			text{
				display: inline-block;
				margin-right: 30upx;
			}
		}
		.con-list{
			flex: 1;
			display:flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}
		.red{
			color: $uni-color-primary;
		}
	}
	
	/* 评价 */
	.eva-section{
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		margin-top: 16upx;
		.e-header{
			display: flex;
			align-items: center;
			height: 70upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.tit{
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				margin-right: 4upx;
			}
			.tip{
				flex: 1;
				text-align: right;
			}
			.icon-you{
				margin-left: 10upx;
			}
		}
	}
	.eva-box{
		display: flex;
		padding: 20upx 0;
		.portrait{
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
		}
		.right{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26upx;
			.con{
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}
			.bot{
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color:$font-color-light;
			}
		}
	}
	
	/**
	 * pinkInfo
	 */
	.pinkInfo-section{
		background: #fff;
		margin-top: 20upx;
		background: #fff;
	
		
		.pink-row{
			.pink-header{
				display: flex;
				align-items: center;
				height: 80upx;
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				position: relative;
				text{
					padding: 0 30upx;
					background: #fff;
					position: relative;
					z-index: 1;
					
				}
			}
			.pink-box{
				display:flex;
				padding: 0upx 30upx 20upx 30upx;
			
				.left{
					display:flex;
					align-items: center;
					flex:1;
					image{
					   height: 80upx;
					   width: 80upx;
					}
					text{
						padding: 0 20upx;
						color: $font-color-dark;
						font-size:  $font-sm + 2upx;
					}
				}
				.right{
					display:flex;
					align-items: center;
					.btn {
					  color: #ffffff;
					  background: #FC2F44;
					  padding: 5px 10px;
					  border-radius: 4px;
					  font-size: 12px;
					  &.no-start {
					    background: #26a96d;
					  }
					}
					.text-box{
						margin-right: 20upx;
						.text-top{
							font-size: $font-sm ;
							color: $font-color-dark;
						}
						.text-bottom{
							font-size: $font-sm - 2upx;
							color: $font-color-light;
						}
					}
				}
			}
		}
	}
	/*  详情 */
	.detail-desc{
		background: #fff;
		margin-top: 16upx;
		
		.d-header{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;
				
			text{
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}
			&:after{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc; 
			}
		}
		
	}
	
	/* 规格选择弹窗 */
	.attr-content{
		padding: 10upx 30upx;
		.a-t{
			display: flex;
			image{
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -40upx;
				border-radius: 8upx;;
			}
			.right{
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
				line-height: 42upx;
				.price{
					font-size: $font-lg;
					color: $uni-color-primary;
					margin-bottom: 10upx;
				}
				.selected-text{
					margin-right: 10upx;
				}
			}
		}
		.attr-list{
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
		}
		.item-list{
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;
			text{
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 100upx;
				min-width: 60upx;
				height: 60upx;
				padding: 0 20upx;
				font-size: $font-base;
				color: $font-color-dark;
			}
			.selected{
				background: #fbebee;
				color: $uni-color-primary;
			}
		}
	}
	
	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		
		&.show {
			display: block;
			.mask{
				animation: showPopup 0.2s linear both;
			}
			.layer {
				animation: showLayer 0.2s linear both;
			}
		}
		&.hide {
			.mask{
				animation: hidePopup 0.2s linear both;
			}
			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}
		&.none {
			display: none;
		}
		.mask{
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}
		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			min-height: 40vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;
			.btn{
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: $uni-color-primary;
				font-size: $font-base + 2upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}
		}
		@keyframes showPopup {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes hidePopup {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}
			100% {
				transform: translateY(0%);
			}
		}
		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}
			100% {
				transform: translateY(120%);
			}
		}
	}
	
	/* 底部操作菜单 */
	.page-bottom{
		position:fixed;
		left: 30upx;
		bottom:30upx;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 690upx;
		height: 100upx;
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
		border-radius: 16upx;
		
		.p-b-btn{
			display:flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width: 96upx;
			height: 80upx;
			.yticon{
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}
			&.active, &.active .yticon{
				color: $uni-color-primary;
				
			}
			
			.icon-fenxiang2{
				font-size: 42upx;
				transform: translateY(-2upx);
			}
			.icon-shoucang{
				font-size: 46upx;
			}
		}
		.action-btn-group{
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			box-shadow: 0 20upx 40upx -16upx #fa436a;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			background: linear-gradient(to right, #ffac30,#fa436a,#F56C6C);
			margin-left: 20upx;
			position:relative;
			&:after{
				content: '';
				position:absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255,255,255,.5);
			}
			.action-btn{
				display:flex;
				align-items: center;
				justify-content: center;
				width: 180upx;
				height: 100%;
				font-size: $font-base ;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}
	}
	.uni-badge-left-margin {
        text-align: center;
		position: absolute;
		top: -5px;
        left: 70%;
	}
	.shopcart{
		 position: relative;
	}
	
</style>

