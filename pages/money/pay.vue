<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{payAmount}}</text>
		</view>
		<view class="pay-type-list">
			<!-- #ifndef H5 -->
			
			<!-- #endif -->
			
			<view class="type-item b-b" @click="changePayType(1)">
				
				<text class="icon yticon icon-weixinzhifu" v-if="wxpayshow"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<text v-if="alipayshow">推荐使用微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 1' />
					</radio>
				</label>
			</view>
		
				<view class="type-item b-b" @click="changePayType(2)" v-if="alipayshow">
					<text class="icon yticon icon-alipay"></text>
					<view class="con">
						<text class="tit">支付宝支付</text>
					</view>
					<label class="radio">
						<radio value="" color="#fa436a" :checked='payType == 2' />
						</radio>
					</label>
				</view>
				
				
			
			
			<!-- <view class="type-item" @click="changePayType(3)">
				<text class="icon yticon icon-erjiye-yucunkuan"></text>
				<view class="con">
					<text class="tit">预存款支付</text>
					<text>可用余额 ¥198.5</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 3' />
					</radio>
				</label>
			</view> -->
		</view>
		<text class="mix-btn" @click="confirm">确认支付</text>
		<text class="mix-btn" v-if="shoppingType == 2" @click="faceConfirm">当面付</text>
	</view>
	
</template>

<script>
	import {payOrderJS, payOrderH5, payOrderSP} from '@/api/wechat'
	export default {
		data() {
			return {
				orderId:0,
				payType: 1,
				payAmount:0.00,
				orderInfo: {},
				wxpayshow: true,
				alipayshow: true,
				loadSucess:false,
				shoppingType:1,
				wxpayType: ''
			};
		},
	
		onLoad(options) {
			// #ifdef  APP-PLUS
			    this.wxpayshow = false
				this.alipayshow = true
				this.wxpayType = 'app'
			// #endif
				
			// #ifdef  H5
				this.wxpayshow = true
				
				var ua = window.navigator.userAgent.toLowerCase();
				if (ua.match(/micromessenger/i) == 'micromessenger') {
					this.alipayshow = false
					this.wxpayType = 'js'
				   
				} else {
					this.alipayshow = true
					this.wxpayType = 'h5'
				}
				
				
			// #endif
			
			// #ifdef  MP
				this.wxpayshow = true
				this.alipayshow = false
				this.wxpayType = 'sp'
			// #endif
			
			this.orderId = options.orderId;
			this.payOrderDetail();
		},

		methods: {
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
			payOrderDetail(){
				uni.showLoading()
				let params = {'id':this.orderId}
				this.$store.dispatch('PayOrderDetail',params).then((result)=>{
					this.payAmount = result.payAmount
					this.shoppingType = result.shoppingType
					this.loadSucess = true
					uni.hideLoading();  
				}).catch((e)=>{
					uni.hideLoading();  
					uni.showToast({
						icon: 'loading',
					    title: '加载失败',
					    duration: 2000
					});
					this.loadSucess = false
				})
			},
			faceConfirm(){
				console.log('当面付')
				let params = {"orderId":this.orderId};
				this.$store.dispatch('GenerateFaceOrder',params).then((result)=>{
					console.log(result)
					uni.redirectTo({
						url: `/pages/public/faceOrderSuccess/faceOrderSuccess?orderId=${this.orderId}`
					})
				}).catch((e)=>{
					console.log(e)
				})
			},
			//确认支付
			confirm: async function() {
				let params = {"orderId":this.orderId};
				let modulename = '';
				let type = 1;
				if(this.payType == 1){
					//微信支付
					// #ifdef  H5
					 if(this.wxpayType === 'js') {
						 this.payOrderJS(params)
					 }
					 if(this.wxpayType === 'h5') {
						  this.payWXOrderH5(params)
					 }
					// #endif
					 
					// #ifdef  MP-WEIXIN
					var _this = this
					uni.login({
						provider:'weixin',
						success: function(loginRes) {
							let code = loginRes.code;
							console.log(loginRes)
							params['code'] = code
							_this.payWXOrderSP(params)
						}
					})
						
					// #endif  
						
				}else{
					//支付宝支付
				// #ifdef  APP-PLUS
					modulename = 'AlipayPayOrder'
				// #endif
				
				// #ifdef  H5
					modulename = 'AlipayPayH5Order'
				// #endif
					this.$store.dispatch(modulename,params).then((result)=>{
						console.log(result)
						this.aliPay(result)
					}).catch((e)=>{
						
					})
				}
				
			},
			// #ifdef  MP-WEIXIN
			payWXOrderSP(params){
				var _this = this
				payOrderSP(params).then((result)=>{
					
					if(result.code === 200) {
						
						let res = result.data;
						console.log(res)
							// 调起支付
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: res.timeStamp,
								nonceStr: res.nonceStr,
								package: res.packageValue,
								signType: res.signType,
								paySign: res.paySign,
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
									uni.redirectTo({
										url: `/pages/money/paySuccess?orderId=${_this.orderId}`
									})
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
								}
							});

					}
					
				}).catch((e)=>{
					console.log(e)
				})
			},
			// #endif
			
			// #ifdef  H5
			payWXOrderH5(params){
				var _this = this
				payOrderH5(params).then((result)=>{
					console.log(result.data)
					let  redirect_url = encodeURI(`http://m.yohooshop.com/pages/money/paySuccess?orderId=${_this.orderId}`);
					window.location.href = result.data.mwebUrl + '&redirect_url=' + redirect_url
				}).catch((e)=>{
					console.log(e)
				})
			},
			payOrderJS(params){
				var _this = this
				 payOrderJS(params).then((result)=>{
					 console.log(result.data)
					_this.wxPayJs(result.data)
				 }).catch((e)=>{
					console.log(e)
				})
			},
			wxPayJs(data){
				// 调用微信支付方法开始支付
				var _this = this
				this.$wechat.pay(data,function(res){
					if (res.err_msg == 'get_brand_wcpay_request:ok') {
						// 支付成功
						uni.redirectTo({
							url: `/pages/money/paySuccess?orderId=${_this.orderId}`
						})
					}
				})
			},
			// #endif
			aliPay(orderInfo) { 
				// #ifdef  APP-PLUS
				uni.requestPayment({
				    provider: 'alipay',
				    orderInfo:orderInfo,
				    success: function(res) {
				        console.log('success:' + JSON.stringify(res));
						uni.redirectTo({
							url: `/pages/money/paySuccess?orderId=${this.orderId}`
						})
					
				    },
				    fail: function(err) {
				        console.log('fail:' + JSON.stringify(err));
				    }
				});
				// #endif
			  
			  // #ifdef  H5
			    console.log('h5')
				const div = document.createElement('div')
				  div.innerHTML = orderInfo
				  document.body.appendChild(div)
				  document.forms[0].submit()
			  // #endif
			},
			
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price{
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;
			&:before{
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;
		
		.type-item{
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position:relative;
		}
		
		.icon{
			width: 100upx;
			font-size: 52upx;
		}
		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}
		.icon-weixinzhifu {
			color: #36cb59;
		}
		.icon-alipay {
			color: #01aaef;
		}
		.tit{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}
		.con{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}
	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}

</style>
