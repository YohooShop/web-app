<template>
	<view>
		<view class="container" v-if="!loading && goods">
			<!-- 轮播图 -->
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
					<!-- <text>浏览量: 768</text> -->
				</view>
				<!-- 不显示天数 -->
				<view class="bot-row">
					<text> {{flashmessage}}</text>
					<uni-countdown :show-day="false" :hour='0' :minute='0' :second=flashDownTime.s  color="#FFFFFF" background-color="#00B26A" border-color="#00B26A"></uni-countdown>
				</view>
				
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
					<button type="primary" class=" action-btn no-border buy-now-btn"  disabled="true" v-if="goods.deleteStatus==0 && goods.isShow  && goods.killStatus == 0">暂未开始</button>
					<button type="primary" class=" action-btn no-border buy-now-btn" @click="buy"  v-if="goods.deleteStatus==0 && goods.isShow  && goods.killStatus == 1">立即秒杀</button>
					<button type="primary" class=" action-btn no-border buy-now-btn"  disabled="true" v-if="goods.deleteStatus==0 && goods.isShow  && goods.killStatus == 2">秒杀已结束</button>
					<button type="primary" class=" action-btn no-border buy-now-btn"  disabled="true" v-if="goods.deleteStatus==0 && goods.isShow  && goods.killStatus == 3">秒杀光了</button>
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

	import {
	    mapState,
		mapMutations,
		
	} from 'vuex';  
	import share from '@/components/share';
	import '../../static/css/index.css'
	import html_url from '@/config/htmlSeverConfig.js'
	import rfNoData from '@/components/rf-no-data';
	export default{
		components: {
			share,
			rfNoData
		},
		data() {
			return {
				id:0,
				errorInfo: '',
				loading:true,
				isError:false,
				goods:null,
				imgList: [],
				desc:'',
				killPath:'',
				flashmessage:'',
				flashDownTime:{
					h : 0,
					m : 0,
					h : 0,
				}
			}
		},
		computed:{
			...mapState(['hasLogin'])	
		},
		watch:{
			hasLogin(val) {
				if(val){
					console.log('登陆了')
				    this.loadSeckillPath()
				}
			}
		},
		async onLoad(options){
			this.id = options.id;
			this.loadData();
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
		methods:{
			loadData(){
				let id = this.id;
				this.loading = true;
				this.isError = false;
			
				this.$store.dispatch('KillGoodsDetail',id).then((result)=>{
					this.isError = false;
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
					if(this.goods.flashInfo){
						let endTime;
						if(this.goods.killStatus == 0){
							endTime = this.goods.flashInfo.startTime;
							this.flashmessage = '距离秒杀开始'
						}else{
						    endTime = this.goods.flashInfo.endTime;
							this.flashmessage = '距离秒结束'
						}
						
						let endDate = new Date(endTime);
						
						let nowDate = new Date();
						let n_h = nowDate.getHours();
						let n_m = nowDate.getMinutes();
						let n_s = nowDate.getSeconds();
						let startTime =  n_h + ':' +  n_m + ':' +  n_s
					    endTime = endDate.getHours() + ':' +  endDate.getMinutes() + ':' + endDate.getSeconds()
						
					    let chaTime =  this.timeDifference(startTime,endTime);
						this.flashDownTime.s =  chaTime ;
					}else{
						this.flashDownTime.h = 0;
						this.flashDownTime.m = 0;
						this.flashDownTime.s = 0;
					}
				    this.loadSeckillPath();
				    this.loading = false	
				}).catch((e)=>{
				
					this.isError = true;
					console.log(e)
					this.loading = false
				})
			},
			loadSeckillPath(){
				if(this.goods.killStatus == 1 && this.hasLogin) {
					//请求秒杀路径
					console.log("请求秒杀路径")
					let params = {goodsId:this.goods.id}
					this.$store.dispatch('KillPath',params).then((result)=>{
						
						this.killPath = result.path
						
					}).catch((e)=>{
						console.log(e)
					})
				}
			},
			
			//计算时间差（相差秒）
			timeDifference(startTime,endTime){ 
			    console.log(startTime);
				 console.log(endTime);
			    var start1=startTime.split(":");
			    var startAll=parseInt(start1[0]*60 * 60) + parseInt(start1[1] *60) +parseInt(start1[2]);
			    
			    var end1=endTime.split(":");
			    var endAll=parseInt((end1[0])*60*60)+parseInt(end1[1]*60)+parseInt(end1[2]);
			    console.log(startAll)
			    console.log(endAll)
			    console.log("时间差==="+(endAll-startAll));
			
			   return endAll-startAll;
			
			},
			
		    originbuy(){
				let id = this.goods.productId;
			    uni.navigateTo({
			  	url: `/pages/product/product?id=${id}`
			  })
			},
			buy(){
				if(this.hasLogin){
					if(this.killPath) {
							let params = {goodsId:this.goods.id}
							let data = {params:params,path:this.killPath}
							this.$store.dispatch('Kill',data).then((result)=>{
								console.log(result)
								this.queryKillReult();
							}).catch((e)=>{
								console.log(e)
							})
					}
				
				}else{
					this.$mHelper.backToLogin();
				}
			},
			
			//秒杀结果查询
			queryKillReult(){
				let params = {goodsId:this.goods.id}
				this.$store.dispatch('KillResult',params).then((result)=>{
					console.log(result)
					if(result == 0){
						let _this = this;
						setTimeout(function(){
						   _this.queryKillReult();
						},1000)
						console.log("秒杀中")
					}else if(result == -1){
						console.log("秒杀完")
					}else{
						console.log("秒杀到")
						uni.navigateTo({
							url: `/pages/order/createOrder?orderType=1&orderId=${result}`
						})
						
					}
					
				}).catch((e)=>{
					console.log(e)
				})
			}
			
		}
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
		padding-bottom: 160upx;
	}
	
	.icon-you{
		font-size: $font-base + 2upx;
		color: #888;
	}
	.spec-color{
		color: $base-color;
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
	
</style>
