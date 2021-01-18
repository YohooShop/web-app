<template>
	<view v-if="bannerData && bannerData.length" class="index-banner">
		<swiper class="banner" :style="{height: imgHeight + 'px'}"
		 :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item  class="carousel-item" 
			 v-for="(item,index) in bannerData" :key="index">
				<image :src="item.pic" mode="aspectFill" />
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	export default{
		props:{
			bannerData:{
				type:Array,
				value:[]
			}
		},
		data(){
			return {
			 imgHeight:''
			}
		},
	
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.index-banner{
		position: relative;
		padding-top: 10px;
	  //margin-bottom: 10px;
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
	}
</style>
