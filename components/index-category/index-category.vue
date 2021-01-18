<template>
	<view>
		<view class="index-categrory">
		  <view class="best">
			  <view class="title">
			  	{{categoryData.meta.name}}
			  </view>
			  <view class="SalesGoods-box">
			  	<view v-for="(item,index) in categoryData.goodsList" :key="index" 
				class="SalesGoods-item"
				@tap="_jumpToDetail(item)">
			  		<view class="item">
			  			<image mode="aspectFill" class="slider-image" :src="item.pic" />
			  			<view class="goods-name">{{item.name}}</view>
			  			<view class="money-box">
							<view class="money-now">￥{{item.price}}</view>
			  			</view>
			  		</view>
			  	</view>
			  </view>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			categoryData:{
				type:Object,
				value:''
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			_jumpToDetail(item){
				console.log('------')
				let id = item.id;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
		}
	}
</script>

<style  lang="scss" scoped>
	
	//最佳销售单品
	.index-categrory{
	  .best {
	    overflow: hidden;
	
	    .title {
	      font-size: 14px;
	      text-align: center;
	      margin: 15px 0;
	    }
	
	    .SalesGoods-box {
	
	      .SalesGoods-item {
	      
	        display: inline-block;
	        width: 33.33%;
	        padding: 0 3px;
	        box-sizing: border-box;
	        vertical-align: middle;
	        margin-bottom: 12px;
	        .item {
	          background: #FFFFFF;
	        }
			.slider-image {
			    width: 100%;
				height: 230upx;
			  }
			  .goods-name {
			    white-space: nowrap;
			    overflow: hidden;
			    text-overflow: ellipsis;
			    padding-left: 5px;
				font-size: 13px;
				color: $font-color-dark;
				line-height: 18px;
			  }
				
			  .money-box {
			    display: flex;
			    align-items: center;
			    padding-left: 7px;
			    .money-now {
			      color: red;
				  font-size: 13px;
				  line-height: 25px;
			    }
			    .money-old {
			      color: #c7c7c7;
			      font-size: 13px;
			      text-decoration: line-through;
			    }
			  }
			}
			.button-box {
			  width: 100%;
			  height: 44px;
			  text-align: center;
			  line-height: 44px;
			  background: #FFFFFF;
			  margin-bottom: 10px;
			}
	      }
	
	      
	  }
	
	}
	
</style>
