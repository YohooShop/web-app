<template>
	    <view class="groupon-item-box" v-if="grouponData">
	        <view class="title mx-1px-bottom" v-if="grouponData.title && grouponData.title.length">
	             <span>{{grouponData.title}} </span>
	            <span v-if="grouponData.showMore"  @click="moreClick">
	                更多
	                <span class="iconfont icon-form_icon_more_fuzhi">
	                </span>
	            </span>
	        </view>
	        <view v-for="(item,index) in grouponData.goodsList" :key="index" >
	            <view class="item">
	                <view class="left">
	                    <image :src="item.pic" mode="aspectFill">
	                    <view class="num">{{item.people}}人团</view>
	                </view>
	                <view class="right">
	                    <view class="name">{{item.name}}</view>
	                    <view class="price-box">
	                        <view class="meal-price">
	                            <view class="price">
	                                 ￥{{item.price}} <span class="old-price">￥{{item.originalPrice}}</span>
	                            </view>
	                            <view class="btn" @click="clickItem(item)">
	                                 <span>去拼团 <i class="iconfont icon-Chevronrightdouble1-24px"></i></span>
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
			 grouponData:{
			    type:Object,
			    value:'',
			}
		},
		methods:{
			clickItem(item) {
				let id = item.id;
				uni.navigateTo({
					url: `/pages/product/pinkproduct?id=${id}`
				})
			},
			moreClick(){
				uni.navigateTo({
					url: this.grouponData.moreLink
				})
			}
		}
	}
</script>


<style scoped lang="scss">
	@import "@/components/landpages/landpages.scss";
	.groupon-item-box {
	    padding: 10px 15px;
	    background: #ffffff;
	    margin-bottom: 10px;
	    .title{
	      height: 35px;
	      line-height: 35px;
	      display: flex;
	      justify-content: space-between;
	      color: #000;
	     
	  
	      span:nth-child(1) {
	        font-size: 22px;
	        font-weight: bold;
	        display: inline-block;
	        //padding-left: 6px;
	        //border-left: 4px solid #E7031C;
	  
	      }
	  
	      span:nth-child(2) {
	        font-size: 12px;
	        display: flex;
	        align-items: center;
	        span{
	          &.iconfont{
	            font-size: 15px;
	            font-weight: 600;
	            margin-left: 5px;
	  
	          }
	        }
	      }
	    }
	    .item {
	      display: flex;
	      /*align-items: center;*/
	      padding: 10px 0;
	      margin-top: 20px;
	      background: #ffffff;
	      // overflow: hidden;
	      .left {
	        position: relative;
	        width: 100px;
	        // height: 100px;
	        .num {
	          font-size: 12px;
	          position: absolute;
	          width: 100%;
	          bottom: 0;
	          background: #FC2F44;
	          opacity: .8;
	          text-align: center;
	          color: #ffffff;
	        }
	        image{
	          display: block;
				 width: 100%;
				 height: 120px;
	        }
	        .image-box {
	          display: flex;
	          align-items: center;
	          margin-top: 10px;
	          box-sizing: border-box;
	          justify-content: space-between;
	          image {
	            width: 47%;
	          }
	        }
	      }
	      .right {
	        display: flex;
	        flex-direction: column;
	        justify-content: space-between;
	        font-size: 14px;
	        margin-left: 12px;
	        flex: 1;
	  
	        .price-box {
	          .old-price {
	            font-size: 12px;
	            color: #9B9B9B;
	            text-decoration: line-through;
	          }
	          .marketing-time-box{
	            width: 100%;
	            height: 100%;
	            font-size: 14px;
	  
	            //兼容首页样式
	            &.index{
	              font-size: 12px;
	            }
	  
	            .seckill-item {
	              text-align: right;
	              color: #FC2F44;
	              .time-out {
	                display: flex;
	                align-items: center;
	                justify-content: space-between;
	                .num-item {
	                  display: inline-block;
	                  text-align: center;
	                  width: 26px;
	                  border-radius: 3px;
	                  background: #FC2F44;
	                }
	              }
	            }
	          }
	  
	          .seckill-time-box {
	            .seckill-item {
	              text-align: left;
	              .time-out {
	                color: #000 !important;
	                display: block;
	              }
	              .tiem{
	                color: #000;
	                margin: 5px 0;
	              }
	              i{
	                display: none;
	              }
	              .my-class{
	                margin: 5px 0;
	                color: #EA4448;
	              }
	            }
	          }
	          .meal-price {
	            display: flex;
	            align-items: flex-end;
	            .price {
	              flex: 1;
	              color: #FF2741;
	              span {
	                color: #4A4A4A;
	  
	              }
	            }
	            .btn {
	              color: #ffffff;
	              background: #FC2F44;
	              padding: 5px 10px;
	              border-radius: 4px;
	              i {
	                font-size: 12px;
	              }
	              &.no-start {
	                background: #26a96d;
	              }
	            }
	          }
	        }
	      }
	    }
	  }
</style>
