<template>
	<view class="view-box">
		<view  v-for="(item,index) in coupons"  :key="index" class="tab-list .x-c">
				<mall-coupon  :couponData="item.coupon" :state="item.status"></mall-coupon>
		</view >
	</view>
	
	
</template>

<script>
	export default {
		data() {
			return {
				coupons:[]
			};
		},
		onLoad() {
			this.getCoupons()
		},
		methods:{
			getCoupons(){
			   this.$store.dispatch("CouponList").then((result)=>{
				   this.coupons = result;
				   console.log(result);
			   }).catch((e)=>{
				   
			   })
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f5f5f5;
	}
	.view-box{
	   display: -webkit-flex;
	   display: flex;
	   -webkit-flex-wrap: wrap;
	   flex-wrap: wrap;
	   -webkit-align-content: center;
	   align-content: flex-start;
	
		.tab-list {
			      width: 100%;
				padding: 10upx 10upx;
				// /deep/.coupon-wrap {
				// 	width: 710rpx;
				// }
			}
	}
</style>