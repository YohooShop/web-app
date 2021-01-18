<template>
	<view class="container">
		<mall-logistics :expressInfo="expressInfo"></mall-logistics>
	</view>
</template>

<script>

	export default {
		components: {},
		data() {
			return {
			  orderId:0,
			  expressInfo:null
			} 
		},
		onLoad(options){
			this.orderId = options.orderId;
		},
		created() {
			this.loadLogisticstData()
		},
		methods:{
			loadLogisticstData(){
				uni.showLoading({
					title: '请稍后'
				})
				let params = {'id':this.orderId}
				this.$store.dispatch('LogisticstInfo',params).then((result)=>{
					//刷新订单列表页面
					uni.hideLoading();
					this.expressInfo =  result
			
				}).catch((e)=>{
					uni.hideLoading();
					console.log(e);
				})
			},
			
		},
		
	}
</script>

<style>
	
</style>
