<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎回来！
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">手机号码</text>
					<input 
						type="number" 
						:value="mobile" 
						placeholder="请输入手机号码"
						maxlength="11"
						data-key="mobile"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<text class="tit">验证码</text>
					<view class="item">
						<input
						    class="codeInput"
							type="number" 
							value="" 
							placeholder="短信验证码"
							placeholder-class="input-empty"
							maxlength="6"
							data-key="password"
							@input="inputChange"
							@confirm="toLogin"
						/>
						 <button @click="getCode" :disabled="disabled" class="getVcode">
						       {{countdown}} <text v-show="timestatus">秒重获</text>
						 </button>
						<!-- <div class="codeBtn" @click="sendCode">发送短信验证码</div> -->
					</view>
					
				</view>
			</view>
			<button class="confirm-btn" @click="toLogin" :disabled="logining">登录</button>
		<!-- 	<view class="btn"><button type="primary" @tap="getUserInfo">一键授权</button></view> -->
			<!-- <view class="forget-section">
				忘记密码?
			</view> -->
		</view>
		
		<!-- <view class="register-section">
			还没有账号?
			<text @click="toRegist">马上注册</text>
		</view> -->
	</view>
</template>

<script>
	import {
	    mapState,
		mapMutations
	} from 'vuex';
	import {setSupport,getSupport,setCookie,getCookie} from '@/utils/support.js';
	var vm = null;
	export default{
		data(){
			return {
				mobile: '',
				password: '',
				logining: false,
				countdown:'获取验证码',
				disabled:false,
				timestatus:false,
				clear:'',
			}
		},
		created() {
			vm = this;
		},
		onShow() {
			if (this.hasLogin) {
				this.$mRouter.reLaunch({ route: '/pages/index/index' });
			}
		},
		computed: {
			...mapState( ['hasLogin']) 
		},
		methods: {
			...mapMutations(['login']),
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack(){
				this.$mRouter.back();
			},
			toRegist(){
				this.$api.msg('去注册');
			},
			sendCode(){
				
			},
			// 获取验证码
			getCode(){
			   var that = this;
			   const c_mobile = /^1[3|4|5|6|7|8][0-9]{9}$/;  //判断手机号码正则
			   if(that.mobile==''){
			      uni.showToast({
			               title: '请输入手机号码',
			                icon: 'none'
			      });
			   }else if(!c_mobile.test(that.mobile)){
			      uni.showToast({
			          title: '手机号码错误',
			          icon: 'none'
			      });
			   }else{
			    
				let params = {telephone:this.mobile}
				this.$store.dispatch('GetAuthCode', params).then(() => {
					that.disabled = true;//禁用点击
					that.countdown = 60;
					that.timestatus = true;
					that.clear = setInterval(that.countDown,1000);
				}).catch((error) => {
					    
				})
				
			   }                
			},
			toLogin(){
				this.logining = true;
				const {mobile, password} = this;
				const sendData = {
					mobile,
					password
				};
				
				let loginForm = {'telephone':mobile,'authCode':password}
				this.$store.dispatch('Login', loginForm).then(() => {
					this.login();
					const backToPage = uni.getStorageSync('backToPage');
					uni.removeStorageSync('backToPage');
					console.log(backToPage)
					if (backToPage) {
						if (
							backToPage.indexOf('/pages/user/user') !== -1 ||
							backToPage.indexOf('/pages/cart/cart') !== -1 ||
							backToPage.indexOf('/pages/index/index') !== -1 ||
							backToPage.indexOf('/pages/category/category') !== -1
						) {
							this.$mRouter.reLaunch(JSON.parse(backToPage));
						} else {
							this.$mRouter.redirectTo(JSON.parse(backToPage));
						}
					} else {
						this.$mRouter.reLaunch({ route: '/pages/user/user' });
					}
					
			    }).catch((error) => {
					    console.log(error);
			            this.logining = false;
						vm.$api.msg('登录失败');
			    })
			
			},
			countDown(){
			  var that = this;
			  if(!that.countdown){                    
			     that.disabled = false;
			     that.timestatus = false;
			     that.countdown = '获取验证码';
			     clearInterval(that.clear);
			  }else{
			     --that.countdown;
			  }
			},
			
		},
 // 倒计时
     
}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.container{
		padding-top: 115px;
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	.input-content{
		padding: 0 60upx;
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}
		.item{
			width: 100%;
			.codeInput{
				height: 60upx;
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				width: 200upx;
				float:left;
			}
			.getVcode{
				position: absolute;
				right: 10%;
				height: 50upx;
				line-height: 50upx;
				font-size: $font-base - 4;
				color: #FFFFFF;
				background: $uni-color-primary;
				border-radius: 50upx;
				border: 1upx solid #CCCCCC;
			}
			.codeBtn{
				height: 60upx;
				font-size: $font-base - 4;
				color: $font-color-dark;
				display: flex;
				float:right;
				align-items: center;
				justify-content: space-around;
				flex-direction: column;
			}
		}
	}

	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
	.forget-section{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}
	.register-section{
		position:absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
		text{
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
	
</style>