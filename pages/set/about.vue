<template>
	<view class="container">
		<view class="list-cell b-b m-t" @click="navTo('/pages/set/privacyPolicy')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">隐私政策</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				version:1.0,
			};
		},
		methods:{
			navTo(url){
				uni.navigateTo({
					url
				})  
				// this.$api.msg(`跳转到${url}`);
			},
		},
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:60upx;
		position:relative;
		background: #fff;
		justify-content: center;
		&.log-out-btn{
			margin-top: 40upx;
			.cell-tit{
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30upx;
		}
		&.m-t{
			margin-top: 16upx; 
		}
		.cell-more{
			align-self: baseline;
			font-size:$font-lg;
			color:$font-color-light;
			margin-left:10upx;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right:10upx;
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
	}
</style>

