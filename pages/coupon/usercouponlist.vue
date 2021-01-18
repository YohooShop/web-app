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
				<empty v-if="tabItem.loaded === true && tabItem.couponList.length === 0"></empty>
				<!-- 优惠券页面，仿mt -->
				<view class="coupon-item" v-for="(item,index) in tabItem.couponList" :key="index">
					<view class="con">
						<view class="left">
							<text class="title">{{item.coupon.name}}</text>
							<text class="time">有效期至{{timestampToTime(item.coupon.endTime)}}</text>
						</view>
						<view class="right">
							<text class="price">{{item.coupon.amount}}元</text>
							<text>满{{item.coupon.minPoint}}可用</text>
						</view>
						
						<view class="circle l"></view>
						<view class="circle r"></view>
					</view>
					<text class="tips">{{item.coupon.note}}</text>
				</view>
				
				<uni-load-more :status="tabItem.loadingType"></uni-load-more>
							
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>

	import empty from "@/components/empty";
	export default {
		components: {
			
			empty
		},
		computed: {
			
		},
		data() {
			return {
				tabCurrentIndex: 0,
				navList: [
					{
						state: 0,
						text: '未使用',
						pages:1,
						loadingType: 'more',
						couponList: []
					},
					{
						state: 1,
						text: '已使用',
						pages:1,
						loadingType: 'more',
						couponList: []
					},
					{
						state: 2,
						text: '已过期',
						pages:1,
						loadingType: 'more',
						couponList: []
					}
				],
			};
		},
		onLoad(options){
			this.tabCurrentIndex = 0;
			this.loadData("refresh",this.tabCurrentIndex)
			
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
				if(source === 'loadMore' && navItem.loadingType  === 'nomore') {
					return;
				}
				navItem.loadingType = 'loading';
				if(source === 'refresh'){
					navItem.pages = 0;
					navItem.couponList = [];
					navItem.loadingType = 'more';
				}
				
				let params = {
					'pages':navItem.pages,
					'size':20,
					'useStatus':navItem.state
				}
				
				this.$store.dispatch('CouponUserlist',params).then((result)=>{
					console.log(result);
					let couponList = result;
					 couponList.forEach(item=>{
						navItem.couponList.push(item);
					})
					navItem.pages ++;
					this.$set(navItem, 'loaded', true);
					navItem.loadingType =  couponList.length < 20 ? 'nomore' : 'more';
					
				}).catch((e)=>{
					console.log(e);
				})
			},
			// 时间戳转换成时间
			timestampToTime (cjsj) {
			    var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			    var Y = date.getFullYear() + '-'
			    var M = this.compensateZero(date.getMonth()+1) + '-'
			    var D = this.compensateZero(date.getDate()) + ' '
				return Y+M+D
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
</script >

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
	/* 优惠券列表 */
	.coupon-item{
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;
		.con{
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;
			padding: 0 30upx;
			&:after{
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			}
		}
		.left{
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 100upx;
		}
		.title{
			font-size: 32upx;
			color: $font-color-dark;
			margin-bottom: 10upx;
		}
		.time{
			font-size: 24upx;
			color: $font-color-light;
		}
		.right{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: $font-color-base;
			height: 100upx;
		}
		.price{
			font-size: 44upx;
			color: $base-color;
			&:before{
				content: '￥';
				font-size: 34upx;
			}
		}
		.tips{
			font-size: 24upx;
			color: $font-color-light;
			line-height: 60upx;
			padding-left: 30upx;
		}
		.circle{
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;
			&.r{
				left: auto;
				right: -6upx;
			}
		}
	}

</style>
