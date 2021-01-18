<template>
	<view class="" v-if="couponData">
		<!-- 未领取，已领取 -->
		<view class="coupon-wrap" v-if="state !== 3"  mode="aspectFill" >
			<view class="coupon-item x-bc">
				<view class="coupon-left y-start ">
					<view class="sum-box">
						<text class="unit">￥</text>
						<text class="miso-font sum">{{ couponData.amount }}</text>
						<text class="sub">{{ couponData.name }}</text>
					</view>
					
					<view class="notice" v-if="couponData.minPoint !=0">满{{ couponData.minPoint }}元可用</view>
					<view class="notice" v-if="couponData.minPoint  ==0">无门槛</view>
					<view class="notice">有效期：{{ timestampToTime(couponData.startTime) }} 至 {{ timestampToTime(couponData.endTime) }}</view>
				</view>
				<view class="coupon-right y-f">
					<button class="cu-btn get-btn" v-if="state === 0" @click="getCoupon">立即领取</button>
					<button class="cu-btn get-btn" v-if="state === 1">去使用</button>
					<button class="cu-btn get-btn" v-if="state === 2">查看详情</button>
					<view class="surplus-num" v-if="state === 0">仅剩{{ couponData.publishCount - couponData.receiveCount}}张</view>
				</view>
			</view>
		</view>
		<!-- 失效 -->
		<view class="close-wrap" v-if="state === 3"  mode="aspectFill" >
			<view class="coupon-item x-f">
				<view class="coupon-left y-start ">
					<view class="sum-box">
						<text class="unit">￥</text>
						<text class="miso-font sum">{{ couponData.amount }}</text>
						<text class="sub">{{ couponData.name }}</text>
					</view>
					<view class="notice">有效期：{{ timestampToTime(couponData.startTime) }} 至 {{ timestampToTime(couponData.endTime) }}</view>
				</view>
				<view class="coupon-right y-f">
					<button class="cu-btn get-btn">已失效</button>
					<view class="surplus-num"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {
	    mapState,
		mapMutations
} from 'vuex';  
export default {
	name:'shoproCoupon',
	components: {},
	data() {
		return {
		
		};
	},
	props: {
		state: {}, //0:立即领取，1：去使用，2：查看详情，3：已失效。
		couponData: {}
	},
	computed:{
		...mapState(['hasLogin'])	
	},
	methods: {
		getCoupon() {
			if (this.hasLogin) {
				this.$store.dispatch('AddCoupon',this.couponData.id).then((result)=>{
					uni.showToast({
						title:'领取优惠券成功'
					})
				}).catch((error) => {
								console.log(error)
					uni.showToast({
						icon:"none",
						title:'领取优惠券失败'
					})
				})
			}else{
				this.$mHelper.backToLogin();
			}
		},
		
		
		// 时间戳转换成时间
		timestampToTime (cjsj) {
		    var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		    var Y = date.getFullYear() + '-'
		    var M = this.compensateZero(date.getMonth()+1) + '-'
		    var D = this.compensateZero(date.getDate()) + ' '
		    var h = this.compensateZero(date.getHours()) + ':'
		    var m = this.compensateZero(date.getMinutes()) + ':'
		    var s = this.compensateZero(date.getSeconds())
		    return Y+M+D;
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
	}
};
</script>

<style lang="scss">
// 未领取，已领取
.coupon-wrap {
	background: url('https://yoooho.bkbedu.com/mall/images/coupon_bg1.png') no-repeat;
	background-size: 100% 100%;
	position: relative;
	border-radius: 10rpx;
	// background-size:cover;
	width: 100%;
	.coupon-item {
		width: 100%;
		padding: 20rpx;
		// height: 170rpx;
		border-radius: 10rpx;
		.coupon-left {
			height: 100%;
			justify-content: center;
			padding-left: 40rpx;
			.unit {
				font-size: 24rpx;
				color: #4f3a1e;
			}
			.sum {
				font-size: 55rpx;
				font-weight: bold;
				color: #4f3a1e;
				line-height: 55rpx;
				padding-right: 10rpx;
			}
			.sub {
				font-size: 26rpx;
				color: #4f3a1e;
			}
			.notice {
				font-size: 22rpx;
				color: #a8700d;
				margin-top: 6rpx;
			}
		}
		.coupon-right {
			height: 100%;
			width: 220rpx;
			justify-content: center;
			align-items: center;
			.get-btn {
				width: 142rpx;
				height: 54rpx;
				background: linear-gradient(90deg, rgba(45, 34, 17, 1), rgba(84, 62, 32, 1));
				box-shadow: 0px 2rpx 5rpx 0px rgba(206, 158, 106, 0.46);
				border-radius: 27rpx;
				padding: 0;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(239, 197, 130, 1);
			}
			.surplus-num {
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(168, 112, 13, 1);
				margin-top: 14rpx;
			}
		}
	}
}
// 失效
.close-wrap {
	position: relative;
	border-radius: 10rpx;
	background: url('https://yoooho.bkbedu.com/mall/images/coupon_bg2.png') no-repeat;
	background-size: 100% 100%;
	.coupon-item {
		width: 100%;
		height: 168rpx;
		border-radius: 10rpx;
		.coupon-left {
			height: 100%;
			width: 480rpx;
			justify-content: center;
			padding-left: 40rpx;
			.unit {
				font-size: 24rpx;
				color: #838383;
			}
			.sum {
				font-size: 55rpx;
				font-weight: bold;
				color: #838383;
				line-height: 55rpx;
				padding-right: 10rpx;
			}
			.sub {
				font-size: 26rpx;
				color: #838383;
			}
			.notice {
				font-size: 22rpx;
				color: #a6a6a6;
			}
		}
		.coupon-right {
			height: 100%;
			flex: 1;
			justify-content: center;
			.get-btn {
				width: 142rpx;
				height: 54rpx;
				border-radius: 27rpx;
				background: #fff;
				padding: 0;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #838383;
			}
			.surplus-num {
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(168, 112, 13, 1);
				margin-top: 14rpx;
			}
		}
	}
}
.cu-btn {
	position: relative;
	border: 0upx;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	padding: 0 30upx;
	font-size: 28upx;
	height: 64upx;
	line-height: 1;
	text-align: center;
	text-decoration: none;
	overflow: visible;
	margin-left: initial;
	transform: translate(0upx, 0upx);
	margin-right: initial;
}
.cu-btn::after {
	display: none;
}
.cu-btn:not([class*="bg-"]) {
	background-color: #f0f0f0;
}
.cu-btn[class*="line"] {
	background-color: transparent;
}
.cu-btn[class*="line"]::after {
	content: " ";
	display: block;
	width: 200%;
	height: 200%;
	position: absolute;
	top: 0;
	left: 0;
	border: 1upx solid currentColor;
	transform: scale(0.5);
	transform-origin: 0 0;
	box-sizing: border-box;
	border-radius: 12upx;
	z-index: 1;
	pointer-events: none;
}
.cu-btn.round[class*="line"]::after {
	border-radius: 1000upx;
}
.cu-btn[class*="lines"]::after {
	border: 6upx solid currentColor;
}
.cu-btn[class*="bg-"]::after {
	display: none;
}
</style>