<template>
	<view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 商品信息
			</view>
		</view>
		<view class="cu-card article">
			<view class="cu-item " v-for="(item,index) in orderDetail.orderItems"  :key="index">
				<view class="content margin-top">
					<image :src='item.productPic' mode="aspectFit" ></image>
					<view class="desc">
						<view class="">商品名称：{{item.productName}}</view>
						<view class="">商品价格：{{item.productPrice}}</view>
						<view class="">商品货号：{{item.productSn}}</view>
						<view class="">商品属性：{{item.productAttr}}</view>
						<view class="">商品数量：{{item.productQuantity}}</view>
						<view class="">小计：￥{{item.productPrice*item.productQuantity}}</view>
					</view>
			    </view>
		    </view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 提货二维码
			</view>
		</view>
		
		<view class="cu-card article">
			<view class="content margin-top">
				<image :src='orderFace.rqUrl' mode="aspectFit" ></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderId:0,
				orderDetail:{},
				orderFace:{}
			};
		},
		onLoad(options) {
			this.orderId = options.orderId;
			this.getOrderDetail();
		},
		methods:{
			getOrderDetail(){
				let params = {'orderId':this.orderId}
				this.$store.dispatch('GetFaceOrder',params).then((result)=>{
					this.orderDetail = result.orderDetail
					this.orderFace = result.orderFace
				}).catch((e)=>{
					console.log(e)
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
