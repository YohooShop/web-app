<template>
	<view class="content">
		<map style="width: 100%; height: 100%;" :latitude="latitude" :longitude="longitude" :markers="covers"  @tap="openMap()"></map>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				latitude: 31.7335,
				longitude: 118.1024,
				 covers: [
				      {
				        latitude: 31.7335,//纬度，范围为-90~90，负数表示南纬
				        longitude: 118.1024,//经度，范围为-180~180，负数表示西经
				      }
				]
			}
		},
		onLoad(option) {
			this.latitude = option.lat;
			this.longitude = option.lon;
			this.covers = [
				{
				  latitude: this.latitude, //纬度，范围为-90~90，负数表示南纬
				  longitude: this.longitude,//经度，范围为-180~180，负数表示西经
				}
			]
		},
		methods:{
			  openMap() {//点击地图
			      uni.openLocation({
			      latitude: Number(this.latitude),
			      longitude: Number(this.longitude),
				  fail(e) {
				  	console.log(e)
				  }
			    })
			  }
		}
				
	}
</script>

<style>
	.content{
		height:100vh;
		width:100%;
	}
</style>
