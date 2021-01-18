<template>
	<view v-if="bannerData && bannerData.length" class="index-banner">
		<canvas canvas-id="colorThief" class="hide-canvas"></canvas>
		<swiper class="banner" :style="{height: imgHeight + 'px'}"
		 circular @change="swiperChange" :autoplay="true">
			<swiper-item  class="carousel-item" 
			 v-for="(item,index) in bannerData" :key="index">
				<image :src="item.imageUrl" mode="aspectFill" @click="itemClick(item)" lazy-load/>
			</swiper-item>
		</swiper>
		<view class="banner-swiper-dots">
			<text :class="swiperCurrent === index ? 'banner-dot-active' : 'banner-dot'" v-for="(dot, index) in bannerData.length" :key="index"></text>
		</view>
	</view>
</template>

<script>
	import colorThief from 'miniapp-color-thief';
	export default {
		name:"indexBanner",
		props:{
			bannerData:{
				type:Array,
				value:[]
			}
		},
		data(){
			return {
				swiperCurrent: 0, //轮播下标
				webviewId: 0,
				imgHeight:''
			}
		},
		created: function() {
			
			this.doColorThief();
		},
		methods:{
			 doColorThief() {
				let that = this;
				let item = this.bannerData[this.swiperCurrent];
				let bgcolor = item.color;
				that.$set(item, 'bgcolor', bgcolor);
				that.$emit('getbgcolor', bgcolor);
			},
			
			swiperChange(e) {
				this.swiperCurrent = e.detail.current;
				this.doColorThief();
				// let bgcolor = this.bannerData[this.swiperCurrent].bgcolor;
				// this.$emit('getbgcolor', bgcolor);
			},
			
			
			itemClick(item) {
				if(item.linkType == 'page') {
					console.log(item.link)
					uni.navigateTo({
						url:item.link
					})
				}
				if(item.linkType == 'h5') {
					// #ifdef H5
					      window.open( item.link,'_blank') 
					// #endif
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/components/landpages/landpages.scss";
	.index-banner{
		position: relative;
	  //margin-bottom: 10px;
	  .hide-canvas {
	  	position: fixed !important;
	  	top: -99999upx;
	  	left: -99999upx;
	  	z-index: -99999;
	  }
	  
	  .banner {
		width: 100%;
		height: 400upx;
		.carousel-item {
			width: 100%;
			height: 100%;
		
			overflow: hidden;
		}
	    image {
	      width: 100%;
	      object-fit: cover;
	    }
	  }
	  .banner-swiper-dots {
	  	display: flex;
	  	position: absolute;
	  	left: 50%;
	  	transform: translateX(-50%);
	  	bottom: 20rpx;
	  	z-index: 66;
	  
	  	.banner-dot {
	  		width: 14rpx;
	  		height: 14rpx;
	  		background: rgba(255, 255, 255, 1);
	  		border-radius: 50%;
	  		margin-right: 10rpx;
	  	}
	  
	  	.banner-dot-active {
	  		width: 14rpx;
	  		height: 14rpx;
	  		background: #a8700d;
	  		border-radius: 50%;
	  		margin-right: 10rpx;
	  	}
	  }
	}
</style>
