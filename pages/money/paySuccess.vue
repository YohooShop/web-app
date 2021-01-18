<template>
	<view class="content" v-if="loading == false">
		
		<text class="success-icon yticon icon-shanchu4" v-if="orderInfo.order.status == 0"></text>
		
		<text class="success-icon yticon icon-xuanzhong2" v-else></text>
		
		<block v-if="orderInfo.order.status == 0">
			<text class="tit">支付失败</text>
			<view class="btn-group">
				<navigator url="/pages/index/index" open-type="switchTab" class="mix-btn hollow">返回首页</navigator>
			</view>
		</block>
		
		<block v-else>
			<text class="tit">支付成功</text>
			<view class="btn-group">
				<text v-if="orderInfo && orderInfo.order.orderType == 2" @click="goToPinkDetail" class="mix-btn hollow">查看拼团详情</text>
				<navigator url="/pages/index/index" open-type="switchTab" class="mix-btn hollow">返回首页</navigator>
			</view>
			<view class="btn-group">
				
			</view>
		</block>
		
		
		
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';
	
	export default {
		data() {
			return {
			 orderInfo: null,
			 orderId : null,
			 orderSn : null,
			 loading : true,
			 paySucess: false
			}
		},
		computed: {
			
		},
		
		onLoad(options) {
			// #ifdef  H5
			// #endif
			if(options.orderId) {
				this.orderId = options.orderId;
				this.loadOrderInfoById();
			}else if(options.out_trade_no){
				this.orderSn = options.out_trade_no;
				this.loadOrderInfoBySn();
			}else{
				this.loading = false;
			}
			console.log('页面加载')
			// this.setReloadOrderPages(true);
		},
	
		methods: {
			...mapMutations(["setReloadOrderPages"]),
			loadOrderInfoById(){
				let params = {'id':this.orderId}
				uni.showLoading({
					title:'查询中，请稍后'
				})
				this.$store.dispatch('OrderDetail',params).then((result)=>{
					console.log(result)
					uni.hideLoading();
					this.loading = false;
					this.orderInfo = result;
					
				
					
				}).catch((e)=>{
					uni.showToast({
						icon: 'none',
					    title: '查询失败，请稍后再订单中查询'
					})
				})
			},
			
			loadOrderInfoBySn(){
				let params = {'orderSn':this.orderSn}
				uni.showLoading({
					title:'查询中，请稍后'
				})
				this.$store.dispatch('OrderDetailBySn',params).then((result)=>{
					uni.hideLoading();
					this.loading = false;
					this.orderInfo = result;
					console.log(result)
				}).catch((e)=>{
				   uni.showToast({
				   	icon: 'none',
					title: '查询失败，请稍后再订单中查询'
				   })
				})
			},
			
			goToPinkDetail(){
				uni.redirectTo({
					url: `/pages/product/pinkDetail?pinkId=${this.orderInfo.order.pinkId}`
				})
			}
		},
		
	}
</script>

<style lang='scss'>
	.content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.success-icon{
		font-size: 160upx;
		color: #fa436a;
		margin-top: 100upx;
	}
	.tit{
		font-size: 38upx;
		color: #303133;
	}
	.btn-group{
		padding-top: 100upx;
	}
	.mix-btn {
		margin-top: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 600upx;
		height: 80upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		&.hollow{
			background: #fff;
			color: #303133;
			border: 1px solid #ccc;
		}
	}
</style>
