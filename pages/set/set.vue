<template>
	<view class="container">
		<view class="list-cell b-b m-t" @click="navTo('/pages/userinfo/userinfo')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">个人资料</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/address/address')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">收货地址</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
<!-- 		<view class="list-cell" @click="navTo('实名认证')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">实名认证</text>
			<text class="cell-more yticon icon-you"></text>
		</view> -->
		
	<!-- 	<view class="list-cell m-t">
			<text class="cell-tit">消息推送</text>
			<switch checked color="#fa436a" @change="switchChange" />
		</view> -->
	<!-- 	<view class="list-cell m-t b-b" @click="navTo('清除缓存')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">清除缓存</text>
			<text class="cell-more yticon icon-you"></text>
		</view> -->
		<view class="list-cell b-b" @click="navTo('/pages/set/about',false)" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">关于yoooho</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		
		<!-- #ifdef H5 -->
			<view class="list-cell" @click="setBind" v-if="hasLogin">
				<text class="cell-tit">微信授权</text>
				<text class="cell-tip">{{userInfo.isbindWx ? '已授权':'未授权'}}</text>
				<text class="cell-more yticon icon-you"></text>
			</view>
		<!-- #endif -->
		
		<!-- #ifdef MP-WEIXIN -->
	<!-- 	<view class="list-cell b-b" @click="openMsg()" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">开启订阅消息</text>
			<text class="cell-more yticon icon-you"></text>
		</view> -->
		
		<!-- #endif -->
		
		<!-- #ifdef APP-PLUS -->
		<!-- <view class="list-cell">
			<text class="cell-tit">检查更新</text>
			<text class="cell-tip">当前版本 {{plus.runtime.version}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view> -->
		<!-- #endif -->

		<view class="list-cell log-out-btn" @click="toLogout" v-if="hasLogin">
			<text class="cell-tit">退出登录</text>
		</view>
		
		<uni-popup ref="popupDialog" type="dialog" @change="change">
			<uni-popup-dialog :type="msgType" title="提示" :content="userInfo.isbindWx | 
			dialogFilter" :before-close="true" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
		
	</view>
</template>

<script>
	import {cancelBindWX} from '@/api/wechat'
	import {
		mapState,
	    mapMutations  
	} from 'vuex';
	export default {
		
		data() {
			return {
				version:1.0,
				dialogMsg:'111'
			};
		},
		computed:{
			...mapState(['hasLogin','userInfo'])	
		},
		filters:{
			dialogFilter(value){
				
				if(value){
					return '您是要解除微信绑定吗？'
				}else{
					return '您是要微信绑定吗？'
				}
			}
		},
		methods:{
			...mapMutations(['logout']),

			navTo(url ,needLogin=true){
				if(!this.hasLogin && needLogin){
					this.$mHelper.backToLogin();
					return;
				}
				uni.navigateTo({
					url
				})  
			},
			//退出登录
			toLogout(){
				uni.showModal({
				    content: '确定要退出登录么',
				    success: (e)=>{
				    	if(e.confirm){
							this.doLogout();
				    	}
				    }
				});
			},
			doLogout(){
				this.$store.dispatch('LogOut').then((result) => {
				   this.logout();
				   uni.navigateBack();
				}).catch((error) => {
					 console.log(error);
					 this.logout();
					 uni.navigateBack();
				})
			},
			//switch
			switchChange(e){
				let statusTip = e.detail.value ? '打开': '关闭';
				this.$api.msg(`${statusTip}消息推送`);
			},
			
			setBind(){
			    this.$refs.popupDialog.open()
			},
			dialogConfirm(done) {
				console.log('点击确认');
				// 需要执行 done 才能关闭对话框
				done()
				if(this.userInfo.isbindWx) {
					this.noBindWx()
				}else{
					this.bindWx()
				}
			},
			/**
			 * 对话框取消按钮
			 */
			dialogClose(done) {
				// 需要执行 done 才能关闭对话框
				done()
			},
			// 点击授权方法
			bindWx() {
				let  redirect_url = encodeURI(`http://m.yohooshop.com/pages/public/loading`);
				let href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxabc33ea337b835e8&redirect_uri='+ redirect_url + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
				window.location.href = href
	
			},
			noBindWx() {
				cancelBindWX().then(res=>{
					uni.showToast({
						title: '解除绑定微信账号成功',
						icon: 'none',
						complete() {
							uni.switchTab({
								url:"/pages/index/index"
							})
						}
					})
				}).catch(e=>{
					
				})
			},
			// 开启订阅消息
			openMsg() {
			    var that = this
			    // 获取用户的当前设置，判断是否点击了“总是保持以上，不在询问”
			    wx.getSetting({
			        withSubscriptions:true,  //是否获取用户订阅消息的订阅状态，默认false不返回
			       success(res) {
					      console.log(res)
			          if(res.authSetting['scope.subscribeMessage']) { //用户点击了“总是保持以上，不再询问”
			             uni.openSetting({ // 打开设置页
			               success(res) {
			                 console.log(res.authSetting)
			               }
			             });
			          }else { // 用户没有点击“总是保持以上，不再询问”则每次都会调起订阅消息
			             var templateid =['0SrSm-WBkVKaZiD9DUVdnGUWfrJCQbSJ6OfC96A-l4s']
			             uni.requestSubscribeMessage({
			               tmplIds: templateid,
			               success (res) {
			                  console.log(res)
			               },
			               fail:(res) => {
			                  console.log(res)
			               }
			             }) 
			          }
			       }
			    })
			}
			
		}
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:60upx;
		position:relative;
		background: #fff;
		justify-content: center;
		&.log-out-btn{
			margin-top: 40upx;
			.cell-tit{
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30upx;
		}
		&.m-t{
			margin-top: 16upx; 
		}
		.cell-more{
			align-self: baseline;
			font-size:$font-lg;
			color:$font-color-light;
			margin-left:10upx;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right:10upx;
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
	}
</style>
