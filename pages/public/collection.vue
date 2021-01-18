<template>
	<view class="container">
		<view class="goods-section">
			<view 
				v-for="(item, index) in goodsList" :key="index"
				class="goods-item"
				@click="navToDetailPage(item)"
			>
				<view class="image-wrapper">
					<image :src="item.productPic" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{item.productName}}</text>
				<text class="price">￥{{item.productPrice}}</text>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
	    components: {
	    
	    },
		data() {
			return {
				goodsList:[]
			}
		},
		onLoad() {
			this.getData();
		},
		methods:{
			getData(){
				this.$store.dispatch('ListGoodsCollection').then((result)=>{
					console.log(result)
					this.goodsList = result;
				}).catch((e)=>{
					console.log(e)
				})
			},
			navToDetailPage(item){
				let id = item.productId;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	// page {
	// 	background: #f5f5f5;
	// }
	
	/* 猜你喜欢 */
	.goods-section{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: #fff;
		.goods-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
		}
	}
	
</style>
