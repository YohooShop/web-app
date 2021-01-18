<template>
	<view class="page">
		<!-- 圆通快递 -->
		<view class="express" v-if="">
			<view class="top ali-c">
				<view class="picture">
					<image class="img" mode="aspectFill" :src="expressInfo.logo"></image>
				</view>
				<view class="text">
					<view class="text1">{{expressInfo.postName}}</view>
					<view class="text2">官方电话 {{expressInfo.expPhone}}</view>
				</view>
			</view>
			<view class="right">
				<view class="text">{{expressInfo.postName}} {{expressInfo.postNo}}</view>
			</view>
		</view>

		<!-- 收货地址 -->
		<view class="content bgf">
			<view>
				<view class="flex list">
					<view class="time"></view>
					<view class="info flex1">
						<view class="title address">[收货地址]{{expressInfo.addr}}</view>
					</view>
				</view>
				<view class="flex list" :class="{one: index == 0 && expressInfo.expressInfo.State == 3}"
				 v-for="(item, index) in expressInfo.expressInfo.Traces"
				 :key="index">
					<view class="time">
						<view class="day">{{item.AcceptTime}}</view>
						<!-- <view>{{item.timeArr[1]}}</view> -->
					</view>
					<view class="info flex1">
						<view class="title">{{index == 0 && expressInfo.expressInfo.State == 3 ? '已签收' : '配送中'}}</view>
						<view class="text">{{item.AcceptStation}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			expressInfo: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {}
		},

		onLoad() {

		},

		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100vh;
		/* #ifdef H5 */
		height: calc(100vh - 44px);
		/* #endif */
		font-size: 24rpx;
		background-color: #F6F7F8;
		overflow-y: auto;
	}

	/*flex 转换成flex容器*/
	.flex {
		display: flex;
		flex-direction: row;
	}

	/*flex1 自动填充*/
	.flex1 {
		flex: 1;
	}

	/*ali-c 竖直居中*/
	.ali-c {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.bgf {
		background-color: #fff;
	}

	.express {
		//圆通快递
		background-color: #ffffff;
		border-radius: 20rpx;
		margin: 30rpx 20rpx 30rpx 20rpx;

		.top {
			padding: 28rpx 29rpx 25rpx 29rpx;

			.img {
				display: block;
				width: 88rpx;
				height: 88rpx;
				border-radius: 50%;
			}

			.text {
				margin-left: 20rpx;

				.text1 {
					margin-bottom: 6rpx;
					font-size: 28rpx;
					color: #000000;
				}

				.text2 {
					font-size: 20rpx;
					color: #000000;
				}
			}
		}

		.right {
			background-color: rgba(8, 175, 254, 0.02);
			border-radius: 0rpx 0rpx 20rpx 20rpx;
			padding: 15rpx 30rpx 20rpx 30rpx;

			.text {
				color: #666666;
				font-size: 22rpx;
			}
		}
	}

	//收货地址
	.content {
		margin: 20rpx;
		padding: 56rpx 46rpx 56rpx 5rpx;
		border-radius: 20rpx;

		.list {
			&:first-child {
				.info::before {
					bottom: -20rpx;
					margin-top: 40rpx;
					border-left: 1px dashed #e5e5e5;
				}

				.title {
					margin-bottom: 56rpx;

					&::before {
						width: 46rpx;
						height: 46rpx;
						left: -23rpx;
						background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAABHNCSVQICAgIfAhkiAAABKNJREFUaIHNmkFoHFUYx3/fJOkmEM2CtEUMpijNpWC2EqgQxF2woBZ0V6g9iRv0EqSovfZgPPQmJqEHD6Y0HjwJTnIJQorZCEIEtbuBHppQSAKCtiDZNml2WbKfhzebzXZnNzM7k6R/WJaZN/Pm9779v/e+eW+FENT5k76BlOOKxASiClGBGIBCVmBDYUPQLGplCu/LQtBnSgDYjxzYpEDUz71OI6adRnzfyvN9gxtgHQVOtfJAF62iMuq3AZ7BO22NKzpWscABKAPyVSElGS8XewKP2DtjgnwejMubFB0vptq+2O+65uC2RiPoTYFkaGQepDBdRIZJyUajaxqCd9gaswz0QVmjqRSyZWS4lJKsW7k7uIn0/FFBV6SQLSIJt8hbbjdEjjDSeyUQi6A33crqwCP2zvhhe7qZBJIRe2fc5XxVnbbGQecPD8uPJLF3qKyJuKJjhw/kVfrl3qNd8E5b00+Dr5so3mlrunKwJ+K1LfKja2eE7aQwO1Q7SE0NCutvC+m+Vmt+UlVGC0y0CS/32NXZKByPwN/boVV56pitSdiNeDkeWtWO0n3Q3w1LeZi7H169FuUquCLv+bl5dshY49qZxhnDB72m7FaI0FBlbT9ma1JQX/m0F73q1HjlNFw53Twl+mYFrt5RT/UKRDttjbdblGMB3idcNTUo9HTA+mO4t1VfnjgO+RL85UzkK5veoKsqx9tBQvf3WyfN970teOe3eqjtpJAvuZd5kSIx11wliGaHTLQBXuhqfJ3bL+FVAtF2hZ6wjNLVZobAfMl8Tkbqr6l06K2d1p+j0GOFOVtu78DdR3Bj1US0p4O6yaf/GfO9/Kj15wiEb5Vz88rVO8ovD4x/Lzxf+3v2d0Ox7H0UaSRLIReoBuDZjvpzXy8bu7z+XPVcZVK6GyDaAAo5S6Dhe50XzQ4JH77oXvbzv8YuP75moj7yUjiTksBGIKt8+rIZkwsNOlr6DyVfgvMn4HpMeKXHjO1BbaIGXD2tY1R0/kR1VgSYXDWdsZFurELEgk+cFO671WDQAIJmLbB8gc/dh7XH8KAIFxeVy9nmICubJupgPJ8LZMyKrIxVSElGIe/ntnPzysd/6r5Z3/WYMD5gJqTlzarfpwZbnzkU8oWUZCwAQaf9VtAMOt0HuTdl1x6TqzBwS5l0LHWpF/650FoDKqxO5/Rnl0bqaoPfE8K3Z4X+blj8r9ZOl7PKxUVlKW+if6kXNt712wDDagEUUjIFrAUF33ZGl6U8jNxWEr/W22nuvrHayG3TgIcl+GHdc4ddc1ir+ax5fXNffHl6JMN14AARu5wVGDgaqH21UEhZuyl4zQR0WEvJrUlG9x7VgJuhUScOF2h/KTrx5IK/a3eO2OVpAV8v0AclhZliyqpby3TNVYpIOoysMagUckUk7VbmnmSlZKN8xPAOdLzRrkTD7LCUkmwRiSvMHByeuxRmmkGD982rcUE+Cw+tsRSdKKba9h3dPOXjpiJJHLB1FkASXqChlQ1aM8OOAmGtwa6BjFZmRK9qfUvc1jTsbon3+LlXIW+yPCvjF7iiUJZUzBZM3Z8QBhzIXM2fEAxs4Gz0f2CGtpD5CRgtAAAAAElFTkSuQmCC') no-repeat center;
						background-size: 46rpx 46rpx;
					}
				}
			}

			&:last-child {
				.info::before {
					height: 32rpx;
				}
			}

			&.one {
				.info::before {
					margin-top: 20rpx;
				}

				.title {
					color: #1a1a1a;

					&::before {
						width: 46rpx;
						height: 46rpx;
						left: -23rpx;
						background: url('data:image/png;base64,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') no-repeat center;
						background-size: 46rpx 46rpx;
					}
				}

				.text {
					color: #666;
				}

				.time {
					color: #333;

					.day {
						font-size: 24rpx;
					}
				}
			}
		}

		.time {
			width: 200rpx;
			padding-right: 30rpx;
			font-size: 20rpx;
			text-align: right;
			color: #999;

			.day {
				margin-bottom: 4rpx;
			}
		}

		.info {
			position: relative;
			padding-top: 12rpx;
			color: #999;

			&::before {
				content: "";
				position: absolute;
				left: 0;
				top: 0;
				bottom: 0;
				z-index: 1;
				width: 0;
				border-left: 1px solid #e5e5e5;
			}

			.title {
				position: relative;
				margin-bottom: 10rpx;
				padding-left: 32rpx;
				font-size: 28rpx;

				&::before {
					content: "";
					position: absolute;
					left: -3px;
					top: 0;
					bottom: 0;
					z-index: 1;
					width: 7px;
					height: 7px;
					margin: auto 0;
					border-radius: 50%;
					background-color: #cecece;
				}

				&.address {
					font-size: 24rpx;
					color: #333;
				}
			}

			.text {
				padding: 0 0 44rpx 32rpx;
			}
		}
	}
</style>
