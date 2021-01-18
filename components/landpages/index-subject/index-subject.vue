<template>
	 <view class="g-main" v-if="subjectData">
	        <view class="m-lead" style="margin-bottom: 5px">
	            <view class="ul-box">
	                <view class="li-box"><span>{{subjectData.title}}</span></view>
	            </view>
	        </view>
	        <view class="m-content">
	            <view v-for="(item,index) in subjectData.subjectList" :key="index"
				 class="m-content-item"
				 @click="itemClick(item)">
	                <view class="image-wrapper">
	                    <image :src="item.pic" mode="aspectFill"/>
	                </view>
	                <view class="title clamp">{{item.title}}</view>
	                <view class="desc">{{item.description}}</view>
	            </view>
	        </view>
	    </view>
</template>

<script>
	export default {
		props:{        
		    subjectData:{
		        type:Object,
		        value:'',
		    }        
		},
		methods:{
			itemClick(item) {
				uni.navigateTo({
					url: `/pages/subject/subjectDetail?id=${item.id}`
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "@/components/landpages/landpages.scss";
	.g-main {
	    position: relative;
	    .m-lead {
	      font-size: 13px;
	      background: #ffffff;
		  line-height:45px;
	      // padding:10px 15px;
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
	  .m-content{
	      display:flex;
	      flex-wrap:wrap;
	      padding: 10px 15px;
		 
	      .m-content-item{
	          width: 100%;
	          height: 30%;
	          flex-wrap:wrap;
	          padding-bottom: 30upx;
	          background-color: white;
	          margin-bottom: 15px;
	          border-radius: 3px;
	      }
	      .image-wrapper{
	          width: 100%;
	          height: 330upx;
	          border-radius: 3px;
	          overflow: hidden;
	          image{
	              width: 100%;
	              height: 100%;
	              opacity: 1;
	          }
	      }
	      .title{
	        // padding: 10px 0px 0px 0px;
	          margin-top: 10px;
	          font-size: 16px;
	          color: #303133;
	          line-height: 80upx;
	          padding: 0 8px;
	      }
	      .desc{
	        // padding: 10px 0px 0px 0px;
	          // margin-top: 5px;
	          // margin-bottom: 10px;
	          font-size: 13px;
	          color: #909399;
	          flex: 1;
	          display: flex;
	          flex-direction: column;
	          padding: 0 8px;
	      }
	  }
	}
</style>
