<template>
	<view class="seckill-box" v-if="seckillData">
	        <view class="title" v-if="seckillData.title && seckillData.title.length">
	            <span>{{seckillData.title}}</span>
	            <span  v-if="seckillData.showMore" @click="moreClick">
	                更多
	                <span class="iconfont icon-form_icon_more_fuzhi">
	                 
	                </span>
	            </span>
	        </view>
	        <view v-for="(item,index) in seckillData.goodsList" :key="index">
	            <view class="seckill-info">
	                <view class="left">
	                    <image :src="item.pic" mode="aspectFill">
	                </view>
	                <view class="right">
	                    <view class="goods-name">
	                        {{item.name}}
	                    </view>
	                    <view class="price-box">
	                        <view>￥0.1</view>
	                        <view class="old">￥100</view>
	                    </view>
	                    <view class="seckill-time">
	                        <seckill :end ="'2019-07-30 16:00:00'" :starts="'2019-07-29 16:00:00'"
	                            :server="'2019-07-30 17:59:50'" :mold="'goods'">
	                            </seckill>
	                            <view class="buy" @click="clickItem(item)">
	                                去抢购
	                            </view>
	                    </view>
	                </view>
	            </view>
	        </view>
	    </view>
</template>

<script>
	import seckill from '../seckill/seckill.vue'
	export default {
		name:"IndexSeckill",
		props:{
			 seckillData:{
			    type:Object,
			    value:'',
			}
		},
		components:{
			seckill
		},
		methods:{
			clickItem(item) {
				let id = item.id;
				uni.navigateTo({
					url: `/pages/product/killproduct?id=${id}`
				})
			},
			moreClick(){
				uni.navigateTo({
					url: this.seckillData.moreLink
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "@/components/landpages/landpages.scss";
	.seckill-box{
	    background: #FFFFFF;
	    padding:10px 15px;
	    margin-bottom: 10px;
	    .title{
	      height: 35px;
	      line-height: 35px;
	      display: flex;
	      justify-content: space-between;
	      color: #000;
	      align-items: center;
	  
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
	    .seckill-info{
	      display: flex;
	      // align-items: center;
	      margin-top: 20px;
	      .left{
	        width: 100px;
	        height: 100px;
	        image{
			  display: block;
	          width: 100%;
	          height: 100%;
	        }
	      }
	      .right{
	        display: flex;
	        flex-direction: column;
	        justify-content: space-between;
	        font-size: 14px;
	        margin-left: 12px;
	        flex: 1;
	        .goods-name{
	          overflow: hidden;
	          // text-overflow: ellipsis;
	          // white-space: nowrap;
	          word-wrap: break-all;
	          font-size: 14px;
	          padding-top: 0px;
	        }
	        .price-box {
	          color: #e50303;
	          font-size: 14px;
	          
	          .old{
	            margin-top: 1px;
	            font-size: 12px;
	            color: #9c9c9c;
	            text-decoration: line-through;
	          }
	  
	          &.free-money{
	            font-size: 14px;
	            color: #9C9C9C;
	            display: flex;
	            align-items: center;
	            justify-content: space-between;
	  
	            .money{
	              display: flex;
	              align-items: center;
	              .new {
	                font-size: 18px;
	                color: #ff2741;
	              }
	              .old{
	                font-size: 10px;
	                margin-left: 5px;
	                text-decoration: line-through;
	  
	              }
	            }
	          }
	        }
	        .seckill-time{
	          display: flex;
	          align-items: flex-end;
	          justify-content: space-between;
	          .marketing-time-box {
	            .seckill-item {
	              text-align: left !important;
	              color: #000 !important;
	              .time-out {
	                flex-direction: column;
	                color: #000 !important;
	                align-items: flex-start !important;
	                .tiem {
	                  margin: 5px 0;
	                  .num-item {
	                    color: #ffffff !important;
	                  }
	                }
	              }
	            }
	  
	          }
	          .free{
	            white-space: nowrap;
	            overflow: hidden;
	            text-overflow: ellipsis;
	            flex: 1;
	          }
	  
	          .buy{
	            width: 70px;
	            height: 25px;
	            border-radius: 50px;
	            color: #fff;
	            background: #FC2F44;
	            font-size: 12px;
	            line-height: 25px;
	            text-align: center;
	          }
	        }
	      }
	    }
	  
	  }
</style>
