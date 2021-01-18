<template>
	<view class="content">
		<view class="navbar">
			<view 
				v-for="(item, index) in navList" :key="index" 
				class="nav-item" 
				:class="{current: tabCurrentIndex === index}"
				@click="tabClick(index)"
			>
				{{item.text}}
			</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view 
					class="list-scroll-content" 
					scroll-y
					@scrolltolower="loadData('loadMore',tabIndex)"
				>
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>
					
					<!-- 订单列表 -->
					<view 
						v-for="(item,index) in tabItem.orderList" :key="index"
						class="order-item"
						@click="goOrderDetail(item)"
					>
						<view class="i-top b-b">
							<text class="time">{{timestampToTime(item.orderTime)}}</text>
							<text class="state" :style="{color: item.stateTipColor}">{{item.stateTip}}</text>
							<text 
								v-if="item.state===4" 
								class="del-btn yticon icon-iconfontshanchu1"
								@click.stop="deleteOrder(index)"
							></text>
						</view>
						
						<scroll-view v-if="item.orderItems.length > 1" class="goods-box" scroll-x>
							<view
								v-for="(goodsItem, goodsIndex) in item.orderItems" :key="goodsIndex"
								class="goods-item"
							>
								<image class="goods-img" :src="goodsItem.productPic" mode="aspectFill"></image>
							</view>
						</scroll-view>
						<view 
							v-if="item.orderItems.length === 1" 
							class="goods-box-single"
							v-for="(goodsItem, goodsIndex) in item.orderItems" :key="goodsIndex"
						>
							<image class="goods-img" :src="goodsItem.productPic" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{goodsItem.productName}}</text>
								<text class="attr-box">{{goodsItem.productAttr}}  x {{goodsItem.productQuantity}}</text>
								<text class="price">{{goodsItem.productPrice}}</text>
							</view>
						</view>
						
						<view class="price-box">
							共
							<text class="num">{{item.productCount}}</text>
							件商品 实付款
							<text class="price">{{item.payAmount}}</text>
						</view>
						
						<view class="price-box">
							配送方式
							<text class="num">{{item.shoppingType | shoppingTypeStatus}}</text>
						</view>
						<view class="action-box b-t" v-if="item.state == 0">
							<button class="action-btn" @click="cancelOrder(item)">取消订单</button>
							<button class="action-btn recom" @click="payOrder(item)">立即支付</button>
						</view>
					</view>
					 
					<uni-load-more :status="tabItem.loadingType"></uni-load-more>
					
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template> 

<script>
	import empty from "@/components/empty";
	import Json from '@/Json';
	import {
	    mapState,
		mapMutations
	} from 'vuex'; 
	
	export default {
		components: {
			empty
		},
		computed: {
			...mapState(['reloadOrderPages']) 
		},
		data() {
			return {
				tabCurrentIndex: 0,
				navList: [{
						state: 0,
						text: '全部',
						pages:1,
						loadingType: 'more',
						orderList: []
					},
					{
						state: 1,
						text: '待付款',
						pages:1,
						loadingType: 'more',
						orderList: []
					},
					{
						state: 2,
						text: '待收货',
						pages:1,
						loadingType: 'more',
						orderList: []
					},
					{
						state: 3,
						text: '已完成',
						pages:1,
						loadingType: 'more',
						orderList: []
					},
					{
						state: 4,
						text: '已取消',
						pages:1,
						loadingType: 'more',
						orderList: []
					}
				],
			};
		},
		watch:{
			reloadOrderPages(val){
				if(val){
					this.setReloadOrderPages(false);
					this.loadData("refresh",0)
					this.loadData("refresh",1)
					this.loadData("refresh",2)
					this.loadData("refresh",3)
					this.loadData("refresh",4)
					this.loadData("refresh",5)
				}
			}
		},
		
		created() {
			this.setReloadOrderPages(false);
		},
		onLoad(options){
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			this.tabCurrentIndex = +options.state;
			// #ifndef MP
			this.loadData("refresh",this.tabCurrentIndex)
			// #endif
			// #ifdef MP
			if(options.state == 0){
				this.loadData("refresh",this.tabCurrentIndex)
			}
			// #endif
			
		},
		 
		 filters:{
			shoppingTypeStatus(shoppingType) {
				if(shoppingType == 1) {
					return "快递"
				}
				if(shoppingType == 2) {
					return "门店自提"
				}
			} 
		 },
		methods: {
			...mapMutations(["setReloadOrderPages"]),
			//获取订单列表
			loadData(source ,index){
				//这里是将订单挂载到tab列表下
				
				let navItem = this.navList[index];
				let state = navItem.state;
				
				if(source === 'tabChange' && navItem.loaded === true){
					//tab切换只有第一次需要加载数据
					return;
				}
				if(navItem.loadingType === 'loading'){
					//防止重复加载
					return;
				}
				
				navItem.loadingType = 'loading';
				if(source === 'refresh'){
					navItem.pages = 0;
					navItem.orderList = [];
					navItem.loadingType = 'more';
				}
				let params = {
					'pages':navItem.pages,
					'size':20,
					'orderType':navItem.state
				}
				this.$store.dispatch('Orders',params).then((result)=>{
					console.log(result);
					let orderList = result;
					orderList.forEach(item=>{
					 	item = Object.assign(item, this.orderStateExp(item.state,item.shoppingType));
						navItem.orderList.push(item);
					})
					navItem.pages ++;
					this.$set(navItem, 'loaded', true);
					navItem.loadingType = orderList.length < 20 ? 'nomore' : 'more';
					
				}).catch((e)=>{
					console.log(e);
				})
			}, 
			goOrderDetail(item){
				uni.navigateTo({
					url: `orderDetail?orderId=${item.id}`
				})
			},
			//swiper 切换
			changeTab(e){
				this.tabCurrentIndex = e.target.current;
				this.loadData('tabChange',this.tabCurrentIndex);
			},
			//顶部tab点击
			tabClick(index){
				this.tabCurrentIndex = index;
			},
			//删除订单
			deleteOrder(index){
				uni.showLoading({
					title: '请稍后'
				})
				let item = this.navList[this.tabCurrentIndex].orderList[index]
				let params = {'id':item.id}
				this.$store.dispatch('DelOrder',params).then((result)=>{
					this.navList[this.tabCurrentIndex].orderList.splice(index, 1);
					uni.hideLoading();
					if(this.tabCurrentIndex == 0) {
						this.loadData("refresh",5)
						uni.hideLoading();
						uni.showToast({
							title:"提交退款申请成功"
						})
					}else{
						this.loadData("refresh",0)
						uni.hideLoading();
					}
				}).catch((e)=>{
					uni.hideLoading();
					console.log(e);
				})
			},
			//支付订单
			payOrder(item){
				
				
			 //    uni.redirectTo({
				// 	url: `/pages/money/pay?orderId=${item.id}&payAmount=${item.payAmount}`
				// })	
			},
			//取消订单
			cancelOrder(item){
				uni.showLoading({
					title: '请稍后'
				})
				let params = {'orderId':item.id}
				this.$store.dispatch('CancelOrder',params).then((result)=>{
					let {stateTip, stateTipColor} = this.orderStateExp(4, item.shoppingType);
					item = Object.assign(item, {
						state: 4,
						stateTip, 
						stateTipColor
					})
					//取消订单后删除待付款中该项
					// let list = this.navList[1].orderList;
					// let index = list.findIndex(val=>val.id === item.id);
					// index !== -1 && list.splice(index, 1);
					
					if(this.tabCurrentIndex == 0) {
						this.loadData("refresh",1)
					}else{
						this.loadData("refresh",0)
					}
					this.loadData("refresh",5)
					uni.hideLoading();
					
				}).catch((e)=>{
					uni.hideLoading();
					console.log(e);
				})
			},

			//订单状态文字和颜色
			orderStateExp(state, shoppingType){
			console.log(state)
				let stateTip = '',
					stateTipColor = '#fa436a';
				switch(state){
					case 0:
						stateTip = '待付款'; break;
					case 1:
						stateTip = '待发货'; break;
					case 2:
					{
						if(shoppingType === 1){
							stateTip = '已发货';
						}
						if(shoppingType === 2){
							stateTip = '待收货';
						}
					}
						 break;
					case 3:
						stateTip = '已完成'; break;
					case 4:
						stateTip = '订单已关闭'; 
						stateTipColor = '#909399';
						break;
					case 5:
						stateTip = '无效订单'; 
						stateTipColor = '#909399';
						break;
					//更多自定义
				}
				return {stateTip, stateTipColor};
			},
			// 时间戳转换成时间
		    timestampToTime (cjsj) {
			    var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			    var Y = date.getFullYear() + '-'
			    var M = this.compensateZero(date.getMonth()+1) + '-'
			    var D = this.compensateZero(date.getDate()) + ' '
			    var h = this.compensateZero(date.getHours()) + ':'
			    var m = this.compensateZero(date.getMinutes()) + ':'
			    var s = this.compensateZero(date.getSeconds())
			    return Y+M+D+h+m+s
			},
			 /**
			     * 如果值小于 10，那么在前面补一个零
			     * @param val
			     * @returns {*}
			     */
			compensateZero: function (val) {
			    if (typeof val == 'number') {
			        return val < 10 ? '0' + val : val;
			    } else {
			        return val;
			       }
			},
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
		height: 100%;
	}
	
	.swiper-box{
		height: calc(100% - 40px);
	}
	.list-scroll-content{
		height: 100%;
	}
	
	.navbar{
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;
			&.current{
				color: $base-color;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.uni-swiper-item{
		height: auto;
	}
	
	.order-item{
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin-top: 16upx;
		.i-top{
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right:30upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;
			.time{
				flex: 1;
			}
			.state{
				color: $base-color;
			}
			.del-btn{
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;
				&:after{
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
		/* 多条商品 */
		.goods-box{
			height: 160upx;
			padding: 20upx 0;
			white-space: nowrap;
			.goods-item{
				width: 120upx;
				height: 120upx;
				display: inline-block;
				margin-right: 24upx;
			}
			.goods-img{
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		/* 单条商品 */
		.goods-box-single{
			display: flex;
			padding: 20upx 0;
			.goods-img{
				display: block;
				width: 120upx;
				height: 120upx;
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;
				.title{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}
				.attr-box{
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}
				.price{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					&:before{
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
					}
				}
			}
		}
		
		.price-box{
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20upx 30upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.num{
				margin: 0 8upx;
				color: $font-color-dark;
			}
			.price{
				font-size: $font-lg;
				color: $font-color-dark;
				&:before{
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}
		.action-box{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}
		.action-btn{
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;
			&:after{
				border-radius: 100px;
			}
			&.recom{
				background: #fff9f9;
				color: $base-color;
				&:after{
					border-color: #f7bcc8;
				}
			}
		}
	}
	
	
	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}
	
	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}
	
	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}
	
	.uni-load-more__img>view {
		position: absolute
	}
	
	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}
	
	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}
	
	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}
	
	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}
	
	.load2 {
		transform: rotate(30deg)
	}
	
	.load3 {
		transform: rotate(60deg)
	}
	
	.load1 view:nth-child(1) {
		animation-delay: 0s
	}
	
	.load2 view:nth-child(1) {
		animation-delay: .13s
	}
	
	.load3 view:nth-child(1) {
		animation-delay: .26s
	}
	
	.load1 view:nth-child(2) {
		animation-delay: .39s
	}
	
	.load2 view:nth-child(2) {
		animation-delay: .52s
	}
	
	.load3 view:nth-child(2) {
		animation-delay: .65s
	}
	
	.load1 view:nth-child(3) {
		animation-delay: .78s
	}
	
	.load2 view:nth-child(3) {
		animation-delay: .91s
	}
	
	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}
	
	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}
	
	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}
	
	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}
	
	@-webkit-keyframes load {
		0% {
			opacity: 1
		}
	
		100% {
			opacity: .2
		}
	}
</style>
