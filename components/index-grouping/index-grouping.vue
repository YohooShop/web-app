<template>
	<view class="g-main">
		<view class="m-lead" style="margin-bottom: 5px" v-if="groupingData.length == 1" >
			 <view class="ul-box">
				 <view v-for="(item,index) in groupingData" :key="index" class="li-box" @tap="_changeItem">
				 	<span>{{item.name}}</span>
				 </view>
		     </view>
		</view>
		<view class="grouping-tap-box" v-else>
			<view :class ="[tap-item, tapIndex==index ? 'active' : '']" @tap="_changeItem" 
			v-for="(item,index) in groupingData" :key="index">
				<span>{{item.name}}</span>
			</view>
		</view>
		<view :class="['m_content', groupingData.length != 1 ? 'g-bg' : '']">
			<view class="m-main" v-if="goods_arr.type && goods_arr.type == 'micro_page_componet_goods_group'">
				<view v-for="(item,index) in goods_arr.children" :key="index" 
				class="goods_box"
				@tap="_jumpToDetail(item)">
					    <view class="goods_image">
					        <image :src="item.pic"></image>
					    </view>
					    <view class="title">{{item.name}}</view>
					    <view class="price">￥ {{item.price}}</view>
				</view>
			</view>
			<view class="m-main" v-else>
				<view v-for="(item,index) in goods_arr.children" :key="index" 
				class="img-box" 
				@tap="_jumpImg">
					  <image mode="aspectFill" src="item.image" />
					  <view class="description" wx:if="item.name">{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>
	
<script>
	export default {
		name:"indexGrouping",
		props: {
			 groupingData:{
			    type:Array,
			    value:''
			 },
			 meta:{
			    type:Object,
			    value:""
			}
		},
		created() {
			this.goods_arr = this.groupingData[0]
		},
		data() {
			return {
				 currentDesc:'news',
				 goods_arr:[],
				 tapIndex:0
			}
		},
		methods:{
			 _changeItem(e){
				 
			 },
			 _jumpToDetail(item){
				 console.log('------')
				 let id = item.id;
				 uni.navigateTo({
				 	url: `/pages/product/product?id=${id}`
				 })
			 },
			 _jumpImg(e) {
				 
			 }
		}
	}
</script>

<style lang="scss" scoped>
	.g-main {
	  position: relative;
	
	  .m-lead {
	    font-size: 13px;
	    background: #ffffff;
	    padding:10px 15px;
	
	    .ul-box {
	
	      display: flex;
	      display: -webkit-flex;
	      flex-direction: row;
	      justify-content: center;
	      height: 100%;
	      .li-box {
	        position: relative;
	        flex: 1;
	        width: 1px;
	        height: 100%;
			text-align: center;
	        span {
	          display: inline-block;
	          font-size: 14px;
		
	        }
	
	        .hover {
	          border-bottom: 2px solid #333;
	          box-sizing: border-box;
	        }
	
	        span.active {
	          font-size: 17px;
	          font-weight: bold;
	          -webkit-box-sizing: border-box;
	          -moz-box-sizing: border-box;
	          box-sizing: border-box;
	          border-bottom: 2px solid #000000;
	        }
	      }
	
	    }
	  }
	
	  .grouping-tap-box {
	    height: 45px;
	    line-height: 45px;
	    display: flex;
	    align-items: center;
	    background: #FFFFFF;
	    margin-bottom: 10px;
	    color: #999999;
	    .tap-item {
	      flex: 1;
	      text-align: center;
	
	
	      &.active {
	        span {
	          position: relative;
	          color: #ff2741;
	          &:after {
	            content: '';
	            position: absolute;
	            bottom: -12px;
	            left: -10px;
	            right: -10px;
	            height: 2px;
	            background: #ff2741;
	          }
	        }
	      }
	    }
	  }
	
	  .m_content {
	    padding: 10px 15px;
	    padding-top: 10;
	
	    &.g-bg {
	      background: #F3F3F3;
	    }
	    .m-main {
	      display: flex;
	      justify-content: space-between;
	      flex-wrap: wrap;
	      align-content: space-between;
	
	      image {
	        width: 100%;
	        box-sizing: border-box;
	        display: block;
	      }
	      .img-box {
	        position: relative;
	        width: 100%;
	        height: 100%;
	        margin-bottom: 10px;
	        .description {
	          position: absolute;
	          width: 100%;
	          left: 0;
	          bottom: 0;
	          height: 30px;
	          line-height: 30px;
	          text-indent: 5px;
	          color: #fff;
	          background: rgba(0, 0, 0, .5);
	          overflow: hidden;
	          text-overflow: ellipsis;
	          display: -webkit-box;
	          -webkit-box-orient: vertical;
	          white-space: nowrap;
	          font-size: 14px;
	        }
	        &:last-child {
	          margin-bottom: 0;
	        }
	      }
	      .goods_box {
	        width: 49%;
	        background: #ffffff;
	        margin-bottom: 6px;
	        box-shadow:0px 1px 4px 0px rgba(210,210,210,0.5);
	        overflow: hidden;
	        .goods_image {
	          position: relative;
	          padding-top: 100%;
	          width: 100%;
	
	          image {
	            position: absolute;
	            left: 0;
	            top: 0;
	            height: 100%;
	            width: 100%;
	            object-fit: cover;
	            object-position: center center;
	          }
	        }
	
	        .title {
	          font-size: 13px;
	          color: #4a4a4a;
	          padding:0 10px;
	          height: 36px;
	          line-height: 18px;
	          margin-top: 5px;
	          display: -webkit-box;
	          -webkit-box-orient: vertical;
	          -webkit-line-clamp:2;
	          overflow: hidden;
	        }
	
	        .price {
	          color: #ea4448;
	          font-size: 14px;
	          padding: 6px 10px;
	        }
	      }
	    }
	  }
	}
</style>
