<template>
	<view class="g-main" v-if="homeFlashPromotion.productList && homeFlashPromotion.productList.length">
		<view class="s-header">
			<image class="s-img" src="/static/temp/secskill-img.jpg" mode="widthFix" ></image>
			<text class="tip">{{getHours(homeFlashPromotion.startTime)}}-{{getHours(homeFlashPromotion.endTime)}}点场 </text>
			<!-- 不显示天数 -->
			<uni-countdown :show-day="false" :hour='0' :minute='0' :second=flashDownTime.s  color="#FFFFFF" background-color="#00B26A" border-color="#00B26A"></uni-countdown>
		</view>
		
		<scroll-view class="floor-list" scroll-x>
			<view class="scoll-wrapper">
				<view 
					v-for="(item, index) in homeFlashPromotion.productList" :key="index"
					class="floor-item"
					@click="navToKillDetailPage(item)"
				>
					<image :src="item.pic" mode="aspectFill"></image>
					<text class="title clamp">{{item.name}}</text>
					<text class="price">￥{{item.price}}</text>
				</view>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		props:{
			homeFlashPromotion:{
				type:Object,
				value:''
			}
		},
		created() {
			if(this.homeFlashPromotion.productList.length>0){
				
				let endTime = this.homeFlashPromotion.endTime;
			
				let endDate = new Date(endTime);
				
				let nowDate = new Date();
				let n_h = nowDate.getHours();
				let n_m = nowDate.getMinutes();
				let n_s = nowDate.getSeconds();
				let startTime =  n_h + ':' +  n_m + ':' +  n_s
			    endTime = endDate.getHours() + ':' +  endDate.getMinutes() + ':' + endDate.getSeconds()
			    let chaTime =  this.timeDifference(startTime,endTime);
				this.flashDownTime.s =  chaTime ;
				// if(type != 'refresh'){
				// 		
				// }
			}else{
				this.flashDownTime.h = 0;
				this.flashDownTime.m = 0;
				this.flashDownTime.s = 0;
			}
		},
		data(){
			return {
				flashDownTime:{
					h : 0,
					m : 0,
					h : 0,
				}
			}
		},
		methods:{
			getHours (cjsj) {
			    var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			    return this.compensateZero(date.getHours())
			},
			/**
			     * 如果值小于 10，那么在前面补一个零
			     * @param val
			     * @returns {*}
			     */
			compensateZero: function (val) {
			    if (typeof val == 'number') {
			        return val < 10 ? '0' + val : val;
			    } else {
			        return val;
			       }
			},
			timeDifference(startTime,endTime){
			    var start1=startTime.split(":");
			    var startAll=parseInt(start1[0]*60 * 60) + parseInt(start1[1] *60) +parseInt(start1[2]);
			    var end1=endTime.split(":");
			    var endAll=parseInt((end1[0])*60*60)+parseInt(end1[1]*60)+parseInt(end1[2]);
			    console.log(startAll)
			    console.log(endAll)
			    console.log("时间差==="+(endAll-startAll));
			    return endAll-startAll;
			},
			navToKillDetailPage(item) {
				let id = item.id;
				uni.navigateTo({
					url: `/pages/product/killproduct?id=${id}`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.g-main {
		  position: relative;
		  padding: 4upx 30upx 24upx;
		  .s-header{
		  	display:flex;
		  	align-items:center;
		  	height: 92upx;
		  	line-height: 1;
			
		  	.s-img{
		  		width: 140upx;
		  		height: 30upx;
		  	}
		  	.tip{
		  		font-size: $font-base;
		  		color: $font-color-light;
		  		margin: 0 20upx 0 40upx;
		  	}
		  	.timer{
		  		display:inline-block;
		  		width: 40upx;
		  		height: 36upx;
		  		text-align:center;
		  		line-height: 36upx;
		  		margin-right: 14upx;
		  		font-size: $font-sm+2upx;
		  		color: #fff;
		  		border-radius: 2px;
		  		background: rgba(0,0,0,.8);
		  	}
		  	.icon-you{
		  		font-size: $font-lg;
		  		color: $font-color-light;
		  		flex: 1;
		  		text-align: right;
		  	}
		  }
		  .floor-list{
		  	white-space: nowrap;
		  }
		  .scoll-wrapper{
		  	display:flex;
		  	align-items: flex-start;
		  }
		  .floor-item{
			background: #ffffff;
		  	 width: 33.33%;
		  	margin-right: 20upx;
		  	font-size: $font-sm;
		  	color: $font-color-dark;
		  	line-height: 18px;
		  	image{
		  		width: 100%;
		  		height: 150upx;
		  		border-radius: 6upx;
		  	}
		  	.price{
		  		color: $uni-color-primary;
				font-size: $font-sm;
		  	}
		  }
    }
</style>
