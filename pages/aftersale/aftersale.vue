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
							<text class="time">{{timestampToTime(item.createTime)}}</text>
							<text class="state" :style="{color: item.stateTipColor}">{{item.stateTip}}</text>
						</view>
						
						<scroll-view v-if="item.products.length > 1" class="goods-box" scroll-x>
							<view
								v-for="(goodsItem, goodsIndex) in item.products" :key="goodsIndex"
								class="goods-item"
							>
								<image class="goods-img" :src="goodsItem.productPic" mode="aspectFill"></image>
							</view>
						</scroll-view>
						<view 
							v-if="item.products.length === 1" 
							class="goods-box-single"
							v-for="(goodsItem, goodsIndex) in item.products" :key="goodsIndex"
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
							<text class="price">{{item.returnAmount}}</text>
						</view>
						<view class="action-box b-t" v-if="item.state == 0">
							<button class="action-btn" @click="cancelOrder(item)">取消退款</button>
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
	import {
	    mapState,
		mapMutations
	} from 'vuex'; 
	export default {
		components: {
			empty
		},
		data() {
			return {
				tabCurrentIndex: 0,
				navList: [{
						state: 0,
						text: '退款',
						pages:1,
						loadingType: 'more',
						orderList: []
					},
					{
						state: 1,
						text: '退货',
						pages:1,
						loadingType: 'more',
						orderList: []
					}
				],
			}
		},
		onLoad(options) {
			this.loadData("refresh",this.tabCurrentIndex)
		},
		onShow() {
			
		},
		methods:{
			//顶部tab点击
			tabClick(index){
				this.tabCurrentIndex = index;
			},
			//swiper 切换
			changeTab(e){
				this.tabCurrentIndex = e.target.current;
				this.loadData('tabChange',this.tabCurrentIndex);
			},
			//获取订单列表
			loadData(source ,index){
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
				if(navItem.state == 0) {
					this.loadRefund(navItem);
				}
			},
			loadRefund(navItem){
				let params = {
					'pages':navItem.pages,
					'size':20
				}
				this.$store.dispatch('OrderRefundList',params).then((result)=>{
					console.log(result);
					let orderList = result;
					orderList.forEach(item=>{
					 	item = Object.assign(item, this.orderStateExp(item.status));
						navItem.orderList.push(item);
					})
					navItem.pages ++;
					this.$set(navItem, 'loaded', true);
					navItem.loadingType = orderList.length < 20 ? 'nomore' : 'more';
					
				}).catch((e)=>{
					console.log(e);
				})
			},
			//订单状态文字和颜色
			orderStateExp(state){
				let stateTip = '',
					stateTipColor = '#fa436a';
				switch(state){
					case 0:
					    stateTip = '退款中'; break;
					case 1:
						stateTip = '退款中'; break;
					case 2:
						stateTip = '已退款'; break;
					case 3:
					    stateTip = '已拒绝'; break;
					case 4:
						stateTip = '已取消'; break;
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
</style>
