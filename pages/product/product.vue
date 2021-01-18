<template>
	<view >
		<!-- 规格-模态层弹窗 -->
		<mall-sku @touchmove.stop.prevent="moveHandle"
		:goods="goods" 
		:specChildList="specChildList" 
		:specClass="specClass" 
		:price="price" 
		:stock="stock" 
		:selectSpecDes="selectSpecDes" 
		:specList="specList"
		:specSelectedId="specSelectedId"
		:buyType="buyType"
		@selectSpec="selectSpec"
		@toggleSpec="toggleSpec"
		@buy="buy"
		@addCart="addCart">
		</mall-sku>
		<!-- 分享 -->
		<share 
			ref="share" 
			:contentHeight="580"
			:shareList="shareList"
			v-on:shareToFriend="shareToFriend"
			@touchmove.stop.prevent="moveHandle"
		></share>
		<view class="hchPoster" @touchmove.stop.prevent="moveHandle">
			<qrcode-poster ref="poster" 
			:title="goods.name" 
			:subTitle="goods.subTitle" 
			:headerImg="imgList[0]"
			:price="goods.price">
			</qrcode-poster>
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
		
		<scroll-view  scroll-y class="container" v-if="!loading && !isError">
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
					<text class="price" >{{price}}</text>
					<text class="m-price" v-if="orginPrice>0" >¥{{orginPrice}}</text>
					<!-- <text class="coupon-tip">7折</text> -->
				</view>
				<view class="bot-row">
					<text>销量: {{goods.sale}}</text>
					<text>库存: {{specSelect.stock}}</text>
					<!-- <text>浏览量: 768</text> -->
				</view>
			</view>
			
			<!--  分享 -->
			
			<!-- 小程序 -->
			<!-- #ifdef MP-WEIXIN-->
			<button class="share-section" open-type="share">
				<view class="share-icon">
					<text class="yticon icon-xingxing"></text>
					 返
				</view>
				<text class="tit">该商品分享可领99减5红包</text>
				<text class="yticon icon-bangzhu1"></text>
				<view class="share-btn">
					立即分享
					<text class="yticon icon-you"></text>
				</view>
			</button>
			<!-- #endif -->
			
			<!-- #ifdef APP-PLUS -->
			<view class="share-section" @click="share">
				<view class="share-icon">
					<text class="yticon icon-xingxing"></text>
					 返
				</view>
				<text class="tit">该商品分享可领99减5红包</text>
				<text class="yticon icon-bangzhu1"></text>
				<view class="share-btn">
					立即分享
					<text class="yticon icon-you"></text>
				</view>
			</view>
		     <!-- #endif -->
			 
			<!-- 海报 -->
			<view class="share-section" @click="haibao">
				<text class="tit">商品海报</text>
				<view class="share-btn">
					立即查看
					<text class="yticon icon-you"></text>
				</view>
			</view>
			
			
			<view class="c-list">
				<view class="c-row b-b" @click="toggleSpec('sku')" v-if="specChildList.length > 0">
					<text class="tit">购买类型</text>
					<view class="con">
						<text class="selected-text" >
							{{selectSpecDes}}
						</text>
					</view>
					<text class="yticon icon-you"></text>
				</view>
				<view class="c-row b-b" @click="addGoodsCoupons()">
					<text class="tit">优惠券</text>
					<text class="con t-r red">领取优惠券</text>
					<text class="yticon icon-you"></text>
				</view>
				<view class="c-row b-b" v-if="promotions.length > 0">
					<text class="tit">促销活动</text>
					<view class="con-list">
						<text v-for="(item,index) in promotions" :key="index">
							{{item}}
						</text>
					</view>
				</view>
				<view class="c-row b-b" v-if="services.length>0">
					<text class="tit">服务</text>
					<view class="con-list">
						<text v-for="(item,index) in services" :key="index">
							{{item}}
						</text>
					</view>
				</view>
			</view>
			
			<!-- 评价 -->
		<!-- 	<view class="eva-section">
				<view class="e-header">
					<text class="tit">评价</text>
					<text>(86)</text>
					<text class="tip">好评率 100%</text>
					<text class="yticon icon-you"></text>
				</view> 
				<view class="eva-box">
					<image class="portrait" src="http://img3.imgtn.bdimg.com/it/u=1150341365,1327279810&fm=26&gp=0.jpg" mode="aspectFill"></image>
					<view class="right">
						<text class="name">Leo yo</text>
						<text class="con">商品收到了，79元两件，质量不错，试了一下有点瘦，但是加个外罩很漂亮，我很喜欢</text>
						<view class="bot">
							<text class="attr">购买类型：XL 红色</text>
							<text class="time">2019-04-01 19:21</text>
						</view>
					</view>
				</view>
			</view> -->
			
			<view class="detail-desc" v-if="desc.length>0" >
				<view class="d-header">
					<text>图文详情</text>
				</view>
				<rich-text :nodes='desc'>
				</rich-text>
			</view>
			
			<!-- 底部操作菜单 -->
			<view class="page-bottom" v-if="goods.publishStatus == 1">
				<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
					<text class="yticon icon-xiatubiao--copy"></text>
					<text>首页</text>
				</navigator>
				<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
					<view class="shopcart">
						<text class="yticon icon-gouwuche">
						</text>
						<uni-badge class="uni-badge-left-margin" :text="shoppingCartNumber" type="primary" size="small" v-show="shoppingCartNumber"/>
					</view>
					<text>购物车</text>
				</navigator>
				<view class="p-b-btn" :class="{active: favorite}" @click="toFavorite">
					<text class="yticon icon-shoucang">
					</text>
					<text>收藏</text>
				</view>
				
				<view class="action-btn-group">
					<button type="primary" class=" action-btn no-border buy-now-btn" @click="toggleSpec('buy')">立即购买</button>
					<button type="primary" class=" action-btn no-border add-cart-btn" @click="toggleSpec('cart')">加入购物车</button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
	    mapState,
		mapMutations
	} from 'vuex';  
	import share from '@/components/share';
	import '../../static/css/index.css'
	import html_url from '@/config/htmlSeverConfig.js'
	import QrcodePoster from '@/components/zhangyu-qrcode-poster/zhangyu-qrcode-poster.vue'
	import rfNoData from '@/components/rf-no-data';
	export default{
		components: {
			share,
			QrcodePoster,
			rfNoData
		},
		data() {
			return {
				id:0,
				loading:true,
				isError:false,
				specClass: 'none',
				specSelectedId:0,
				specSelect:{},
				price:0,
				orginPrice:0,
				stock:'',
				selectSpecDes:'',
				favorite: false,
				shareList: [],
				imgList: [],
				desc:'',
				buyType: 'sku',
				errorInfo: null,
				specList: [
					{
						id: 1,
						name: '选择类型',
					}
				],
				specChildList: [],
				goods:{},
				services:[],
				promotions:[],
				deliveryFlag: false,
				canvasFlag: true,
				posterData:{}
			};
		},
		computed:{
			...mapState(['shoppingCartNumber','hasLogin'])	
		},
		async onLoad(options){
	
			//接收传值,id里面放的是标题，因为测试数据并没写id 
			this.id = options.id;
			this.shareList = await this.$api.json('shareList');
			// #ifdef APP-PLUS
			   this.shareList = await this.$api.json('shareListApp');
			// #endif
			
			// #ifdef MP-WEIXIN
			   this.shareList = await this.$api.json('shareListWXApp');
			// #endif
			
			this.loadData();
		},
		// #ifdef  MP-WEIXIN
		  onShareAppMessage(ops) {
			this.addShareCoupon()
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
			...mapMutations(['addShoppingCartNumber','minusShoppingCartNumber','setShoppingCartNumber']),
			moveHandle(){
				return;
			},
			loadData(){
				
				let id = this.id;
				this.loading = true;
				this.isError = false;
				this.$store.dispatch('GoodsDetail',id).then((result)=>{
					this.setShoppingCartNumber(result.shopCartNumber);
					this.goods = result;
					this.favorite = this.goods.collection;
					let albumPicsStr =this.goods.albumPics; //这是一字符串 
					let albumPics= new Array(); //定义一数组 
					albumPics=albumPicsStr.split(","); //字符分割 
					if(albumPics[0].length > 0) {
						this.imgList = albumPics;
					}else{
						this.imgList = [this.goods.pic];
					}
					let desc_html = "";
					if(this.goods.detailMobileHtml.length > 0) {
						desc_html = this.goods.detailMobileHtml;
					}else{
						desc_html = this.goods.detailHtml;
					}
					console.log(desc_html)
					this.desc = desc_html;
					
					this.specChildList = this.goods.skuStockList;  
					if(this.specChildList.length > 0) {
						var spec = this.specChildList[0];
						this.selectSpec(0,spec);
						this.specSelectedId = spec.id;
					}else{
						this.specSelect.stock = this.goods.stock
						this.price  =  this.goods.price
					}
				
					if(this.hasLogin){
					   this.createHistory();
					}
					//规格 默认选中第一条
					this.specList.forEach(item=>{
						for(let cItem of this.specChildList){
							if(cItem.pid === item.id){
								this.$set(cItem, 'selected', true);
								this.specSelected.push(cItem);
								break; //forEach不能使用break
							}
						}
					})
					this.handelServices();
					this.loading = false;
					this.isError = false;
				}).catch((e)=>{
					this.loading = false;
					this.isError = true;
					// console.log(e)
				})
			},
			handelServices(){
				var serviceIds = new Array(); //定义一数组 
				serviceIds = this.goods.serviceIds.split(",");
				console.log(serviceIds);
				let services = [];
				for (let i=0;i<serviceIds.length ;i++ ) 
				{ 
					if(serviceIds[i].toString() === '1'){
						// 1->无忧退货；2->快速退款；3->免费包邮
						services.push('无忧退货');
					}
					if(serviceIds[i].toString() === '2'){
						services.push('快速退款');
					}
					if(serviceIds[i].toString() === '3'){
						services.push('免费包邮');
					}
				}
				this.services = services;
			},
			hanldePromotions(){
				var promotions = new Array();
				
				//打折优惠的促销信息
				for(let i=0;i<this.goods.productLadderList.length ;i++ ) {
					let productLadder = his.goods.productLadderList[i];
					if(productLadder.count != 0){
						let str = '打折优惠：' + '满' + productLadder.count + '件，打' + productLadder.discount +'折'
						promotions.push(str)
					}
				}
				
				//满减促销消息
				for(let i=0;i<this.goods.productFullReductionList.length ;i++ ) {
					let productFullReduction = his.goods.productFullReductionList[i];
					if(productFullReduction.fullPrice != 0){
						let str = '满减优惠：' + '满' + productFullReduction.fullPrice + '元，减' + productFullReduction.reducePrice + '元'
						promotions.push(str)
					}
				}
			},
			addGoodsCoupons(){
				if (this.hasLogin) {
					this.$store.dispatch('AddCoupon',23).then((result)=>{
						uni.showToast({
							title:'领取优惠券成功'
						})
					}).catch((error) => {
						uni.showToast({
							icon:"none",
							title:'领取优惠券成功'
						})
					})
				}else{
					this.$mHelper.backToLogin();
				}
			},
			addShareCoupon(){
				if (this.hasLogin) {
					this.$store.dispatch('AddCoupon',22).then((result)=>{
						uni.showToast({
							title:'领取优惠券成功'
						})
						console.log('领取成功');
					}).catch((error) => {
						console.log('领取失败');
						uni.showToast({
							icon:"none",
							title:'领取优惠券成功'
						})
					})
				}
				
			},
			
			//浏览记录
			createHistory(){
				let data = {
					'productId':this.goods.id,
					'productName':this.goods.name,
					'productPic':this.goods.pic,
					'productSubTitle':this.goods.subTitle,
					'productPic':this.goods.pic,
					'productPrice':this.price,
				};
				this.$store.dispatch('CreateHistory',data).then((result)=>{
					console.log('写入历史记录成功')
				}).catch((error) => {
					
				})
			},
			
			//规格弹窗开关
			toggleSpec(type) {
				if(this.specClass === 'show'){
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				}else if(this.specClass === 'none'){
					this.buyType = type;
					this.specClass = 'show';
				}
			},
			//选择规格
			selectSpec(index, id){
				let list = this.specChildList;
				list.forEach(item=>{
					this.$set(item, 'selected', false);
				})
				var spec = list[index];
				this.specSelect = spec;
                this.specSelectedId = id;
				this.selectSpecDes = '';
				if(spec.sp1){
					this.selectSpecDes = this.selectSpecDes + spec.sp1;
				}
				if(spec.sp2){
					this.selectSpecDes = this.selectSpecDes + ' ';
					this.selectSpecDes = this.selectSpecDes+ spec.sp2;
				}
				
				if(spec.sp3){
					this.selectSpecDes = this.selectSpecDes+ ' ';
					this.selectSpecDes = this.selectSpecDes+ spec.sp3;
				}
				if(spec.promotionPrice){
					this.price = spec.promotionPrice
					this.orginPrice = spec.price;
				}else{
					this.price = spec.price
					this.orginPrice  = 0;
				}
				
				this.stock = spec.stock;
			},
			//分享
			share(){
				
				console.log(this.goods.pic);
				this.$refs.share.toggleMask();	
			},
			shareToFriend(data){
				console.log(html_url+'/pages/product/product?id='+this.id);
				if(data == 0){
					//好友
					uni.share({
					    provider: "weixin",
					    scene: "WXSceneSession",
					    type: 0,
						title:this.goods.name,
					    summary: this.goods.subTitle,
						imageUrl: this.goods.pic + '?x-oss-process=image/resize,m_lfit,h_60,w_60',
						href: html_url+'/pages/product/product?id='+this.id,
					    success: function (res) {
							if (this.hasLogin) {
								this.addShareCoupon();
							}
					        console.log("success:" + JSON.stringify(res));
					    },
					    fail: function (err) {
					        console.log("fail:" + JSON.stringify(err));
					    }
					});
				}
				if (data == 1) {
					//朋友圈
					uni.share({
					    provider: "weixin",
					    scene: "WXSenceTimeline",
					    type: 0,
						title:this.goods.name,
					    summary: this.goods.subTitle,
						imageUrl: this.goods.pic + '?x-oss-process=image/resize,m_lfit,h_60,w_60',
						href: html_url+'/pages/product/product?id='+this.id,
					    success: function (res) {
					        console.log("success:" + JSON.stringify(res));
							if (this.hasLogin) {
								this.addShareCoupon();
							}
							
					    },
					    fail: function (err) {
					        console.log("fail:" + JSON.stringify(err));
					    }
						
					});
					
				}
				if (data == 2) {
					// #ifdef APP-PLUS
					    console.log('分享图片');
						this.sharePoster()
					// #endif
				}
			},
			//收藏
			toFavorite(){
				if(this.hasLogin){
					if(this.favorite){
						let params = {
							'productId':this.goods.id
						}
						this.$store.dispatch('DeleteGoodsCollection',params).then((result)=>{
							this.favorite = !this.favorite;
						}).catch((error) => {
								console.log(error)
						})
					}else{
						let params = {
							'productId':this.goods.id,
							'productPic':this.goods.pic,
							'productSubTitle':this.goods.subTitle,
							'productName': this.goods.name,
							'productPrice': this.price
							}
						this.$store.dispatch('AddGoodsCollection',params).then((result)=>{
							this.favorite = !this.favorite;
						}).catch((error) => {
								console.log(error)
						})
						
					}
				}else{
					this.$mHelper.backToLogin();
				}
			},
			haibao(){
				this.sharePoster()
			},
			
			sharePoster(){
			    //获取带参数二维码
			    this.is_show_model = false
			    this.$refs.poster.showCanvas('https://yoooho.bkbedu.com/poster/hch-code.jpg')
			},
			
			buy(goodsNum){
				if(this.hasLogin){
					let data;
					if(this.specSelect.id){
						data = {
							'type': 1,	
							'data':{
								'productId':this.goods.id,
								'productName':this.goods.name,
								'productSubTitle':this.goods.subTitle,
								'productPic':this.goods.pic,
								'price':this.price,
								'quantity':goodsNum,
								'productSkuCode':this.specSelect.skuCode,
								'productSkuId':this.specSelect.id,
								'sp1':this.specSelect.sp1,
								'sp2':this.specSelect.sp2,
								'sp3':this.specSelect.sp3,
								'productAttr':this.selectSpecDes
							}
						};
					}else{
						data  = {
							'type': 1,	
							'data':{
								'productId':this.goods.id,
								'productName':this.goods.name,
								'productSubTitle':this.goods.subTitle,
								'productPic':this.goods.pic,
								'price':this.price,
								'quantity':goodsNum,
							}
						};
					}
					
					console.log(data)
					this.$store.dispatch('AddShoppingCart', data).then((result) => {
						console.log(result)
						uni.navigateTo({
							url: `/pages/order/createOrder?data=${result.id}&orderType=0`
						})
					}).catch((error) => {
						console.log(error)
					})
					
				
				}else{
					this.$mHelper.backToLogin();
				}
				
			},
			stopPrevent(){},
			//加入购物车
			addCart(goodsNum){
				console.log(goodsNum)
				if(!this.hasLogin){
					this.$mHelper.backToLogin();
					return
				}
				let data;
				if(this.specSelect.id){
						data = {
							'type' : 0,
							'data':{
								'productId':this.goods.id,
								'productName':this.goods.name,
								'productSkuCode':this.specSelect.skuCode,
								'productSkuId':this.specSelect.id,
								'productSubTitle':this.goods.subTitle,
								'productPic':this.goods.pic,
								'price':this.price,
								'quantity':goodsNum,
								'sp1':this.specSelect.sp1,
								'sp2':this.specSelect.sp2,
								'sp3':this.specSelect.sp3,
								'productAttr':this.selectSpecDes
							},
						}
					}else{
						data = {
							'type' : 0,
							'data':{
								'productId':this.goods.id,
								'productName':this.goods.name,
								'productSubTitle':this.goods.subTitle,
								'productPic':this.goods.pic,
								'price':this.price,
								'quantity':goodsNum,
							},
						}
					}
		
					console.log(data)
				this.$store.dispatch('AddShoppingCart', data).then((result) => {
					// console.log(result)
					this.addShoppingCartNumber(1);
				}).catch((error) => {
					console.log(error)
				})
			},
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
	.hchPoster{
		position: absolute;
		z-index:999;
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
	

	
	/*  弹出层 */
	
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
