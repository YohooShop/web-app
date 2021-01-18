<template>
	<view v-if="store">
		<view class="cu-list">
			<view class="map" >
				<map style="width: 100%; height: 100%;" :latitude="store.latitude" :longitude="store.longitude" :markers="covers"  @tap="openMap()"></map>
			</view>
		</view>
		
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">店铺名称</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{store.name}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">联系电话</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{store.phone}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">店铺地址</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{store.address}}</text>
				</view>
			</view>
			<view class="cu-item">
				
				<view class="content padding-tb-sm">
					<view>
						<text class="text-grey">详细地址</text>
					</view>
					<view class="text-gray text-sm">
						<text class="text-grey text-sm">{{store.detailAddress}}</text>
					</view>
				</view>
				
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">营业时间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{store.dayTime}}</text>
				</view>
			</view>
			
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view>
						<text class="text-grey">店铺简介</text> 
					</view>
					<view class="text-gray text-sm">
						<text class=" margin-right-xs">{{store.introduction}}</text> 
					</view>
				</view>
			</view>
			
			
		</view>
		
	</view>
	
</template>

<script>
	import {detail} from '@/api/store'
	export default {
		data() {
			return {
				store:null,
				id:0,
				covers:[],
			}
		},
		onLoad(option) {
			this.id = option.id
			this.loadData();
		},
		methods:{
			loadData(){
				detail(this.id).then(res=>{
					this.store = res.data
					this.covers = [{
					    latitude: this.store.latitude,//纬度，范围为-90~90，负数表示南纬
					    longitude: this.store.longitude,//经度，范围为-180~180，负数表示西经
					}]
				}).catch(e=>{
					
				})
			},
			openMap() {//点击地图
			    uni.openLocation({
					latitude: Number(this.store.latitude),
					longitude: Number(this.store.longitude),
					fail(e) {
						console.log(e)
					}
			  })
			}
		}
	}
</script>

<style>
	.map{
		height:50vh;
		width:100%;
	}
</style>
