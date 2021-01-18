<template>
	<view class="content b-t">
		<view class="list b-b" v-for="(item, index) in storeList" :key="index">
			<view class="wrapper">
				<text class="name">店铺名:{{item.name}}</text>
				<text class="name">联系电话{{item.phone}}</text>
				<text class="address">店铺地址:{{item.address}}</text>
				<text class="address">详细地址:{{item.detailAddress}}</text>
				<view class="u-box">
					
			</view>
			<view class="bottom">
				<view class="btn" @click="chooseStore(item)"  v-if="source == 1">选择该店铺</view>	
				<view class="btn" @click="gotoDetail(item)">详情</view>
			    <view class="btn" @click="gotoLocation(item)">查看位置</view>	
				
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {listall} from '@/api/store'
	export default {
		data() {
			return {
				source: 0,
				storeList: [],
				pageNumber:0,
				pageSize:10
			}
		},
		onLoad(option){
			if(option.source){
				this.source = option.source;
			}
			this.loadData();
		},
		methods:{
			loadData(){
				listall().then(res=>{
					this.storeList = res.data;
				}).catch(e=>{
					
				})
			},
			gotoLocation(item){
				uni.openLocation({
					latitude: Number(item.latitude),
					longitude: Number(item.longitude),
					fail(e) {
					}
				})
			},
			gotoDetail(item){
				uni.navigateTo({
					url : `/pages/store/storeDetail?id=${item.id}`
				})
			},
			chooseStore(item){
				this.$api.prePage().store = item;
				uni.navigateBack({
				
				})
			}
		}
	}
</script>

<style lang='scss'>
	page{
		padding-bottom: 120upx;
	}
	.content{
		position: relative;
	}
	.list{
		display: flex;
		align-items: center;
		padding: 20upx 30upx;;
		background: #fff;
		position: relative;
	}
	.wrapper{
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.bottom{
		margin-top: 20upx;
		display:flex;
		flex-direction:row-reverse;
		.btn{
			margin-left: 20upx;
			color: $base-color;
		}
	}
	
	.address{
		font-size: 30upx;
		color: $font-color-dark;
		margin-top: 16upx;
	}
	
	.name{
		font-size: 28upx;
		color: $font-color-light;
		margin-top: 16upx;
		margin-right: 30upx;
	}
	.icon-bianji{
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: $font-color-light;
		padding-left: 30upx;
	}
	
</style>
