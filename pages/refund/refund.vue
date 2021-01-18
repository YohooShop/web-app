<template>
	<view class="container">
		<view class="refund-item">
			<view class="i-top b-b">
				<text class="refundTitle">退款理由</text>
			</view>
			<textarea class="refundText" v-model='refundReason' placeholder="不能超过120个文字" />
		</view>
		<button type="warn" class="refundBtn" @click="refund" >申请退款</button>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				refundReason:'',
				orderId:0,
			}
		},
		onLoad(options) {
			this.orderId = options.orderId;
		},
		methods:{
			refund(){
				let param = {
					"orderId":this.orderId,
					"reason":this.refundReason
				}
				uni.showLoading({
					title: '请稍后'
				})
				this.$store.dispatch("Refund",param).then((result)=>{
					uni.hideLoading();
					uni.showToast({
						title:"申请退款成功"
					})
				}).catch((e)=>{
					uni.hideLoading();
					uni.showToast({
						icon:"none",
						title:"申请退款失败"
					})
					console.log(e)
				})
				console.log(this.refundReason);
			},
		}
	}
</script>

<style lang="scss">
	
	page, .container{
		background: $page-color-base;
		height: 100%;
	}
	
	.refund-item{
		display: flex;
		flex-direction: column;
		background: #fff;
		margin-top: 16upx;
    }
	.refundText{
		display: flex;
		position: relative;
		align-items: center;
		font-size: $font-base;
		padding-left: 20upx;
		padding-right: 20upx;
		padding-top: 7upx;
		padding-bottom: 7upx;
		width: 100%;
	}
	.i-top{
		display: flex;
		align-items: center;
		position: relative;
		height: 80upx;
		padding-right:30upx;
		font-size: $font-base;
		color: $font-color-dark;
		.refundTitle{
			flex: 1;
			padding-left: 20upx;
		}
	}
	.refundBtn{
		bottom: -300upx;
		width: 80%;
		font-size: $font-base;
	}
</style>
