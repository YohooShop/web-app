<template>
	
	<view >
		<view class="container"  v-if="goodsInfo  && !loading">
			<view class="header-section">
				<text>{{headerMessage}}</text>
			</view>
			<!-- 商品详情 -->
			<view class="goods-section" v-if="goodsInfo">
				<view class="left">
					<image :src="goodsInfo.pic" mode="aspectFill"></image>
				</view>
				
				<view class="goods-info">
					<view class="top">
						<text>{{goodsInfo.name}}</text>
					</view>
					<view class="bottom">
						<view class="left">
							<text class="tuan">{{pinkInfo.people}}人团</text>
							<text class="price">{{goodsInfo.price}}/{{goodsInfo.unitName}}</text>
						</view>
						<view class="right">
							<view class="detail">团购详情</view>
						</view>
					</view>
				</view>
				
			</view>
			<!-- 开团详情 -->
			<view class="pinkInfo-section">
					<!-- 头像 -->
						<view class="icon-box">
							<view v-for="(item,index) in buyers" :key="index" class="image-box">
								<view class="image-box">
									<image :src="item.buyerIcon ? item.buyerIcon:'https://media.yohooshop.com/mall/static/app/missing-face.png'" mode="aspectFill" @error="imageError"></image>
								</view>
							</view>
						</view>
			</view>
			<view class="state-section">
				<text style="color: #FF570A;" v-if="pinkInfo.status == 2">拼团成功</text>
				<text style="color: $font-color-base;" v-if="pinkInfo.status == 3">拼团失败</text>
				<text v-if="pinkInfo.status == 1">还差{{people}}人，赶紧召唤小伙伴来拼团吧~</text>
			</view>
			<view class="time-setion">
				<text>剩余时间</text>
				<uni-countdown 
				:show-day="false" :hour='0' :minute='0' 
				:second=flashDownTime.s  
				color="#FFFFFF" 
				background-color="#00B26A"
				border-color="#00B26A">	
				</uni-countdown>
			</view>
			<!-- 用户列表 -->
			<view class="user-section">
				<view class="top"></view>
				<view class="user-box">
					<view v-for="(item,index) in buyers" :key="index" class="user-row">
						<view class="user-info">
							<view class="left">
								<image :src="item.buyerIcon ? item.buyerIcon:'https://media.yohooshop.com/mall/static/app/missing-face.png'" mode="aspectFill"></image>
								<text>{{item.buyerName}}</text>
							</view>
							<view class="right">
								<view class="r-text">{{item.pinkTime*1000|formatDate}}开团</view>
							</view>
						</view>
						<view class="line" v-if="buyers.length-1 != index"></view>
					</view>
				</view>
			</view>
			<!-- 开团介绍 -->
			<view class="introduce-section">
				<text>支付开团并邀请好友，在活动时间内邀请好友人数达到参团人数满员拼团成功，卖家发货。
				在若活动时间内没有到规定的参团人数，则拼团失败，系统将自动将付款退还。</text>
			</view>
			<!-- 底部按钮 -->
			<view class="bottom-setion">
				<view class="btn" v-if="pinkInfo.status == 1" @click="buy(1)">
					<text>我要参团</text>
				</view>
				<view class="btn" @click="buy(0)">
					<text>我要开团</text>
				</view>
				<view class="btn" @click="inviteClick">
					<text>邀请好友来参团</text>
				</view>
				
			</view>
			<!-- 分享 -->
			<share 
				ref="share" 
				:contentHeight="580"
				:shareList="shareList"
				v-on:shareToFriend="shareToFriend"
			></share>
			
		</view>
		
		<!--页面加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading>
	</view>
	
</template>

<script>
	import html_url from '@/config/htmlSeverConfig.js'
	import share from '@/components/share';
	import {
	    mapState,
		mapMutations
	} from 'vuex';  
	export default {
		components: {
			share
		},
		async onLoad(options) {
			this.pinkId = options.pinkId
			this.loadData();
			this.shareList = await this.$api.json('shareList');
			// #ifdef APP-PLUS
			   this.shareList = await this.$api.json('shareListApp');
			// #endif
		},
		computed:{
			...mapState(['hasLogin'])	
		},
		data(){
			return{
				shareList: [],
				pinkId:'',
				goodsInfo:null,
				buyers:null,
				pinkInfo:null,
				headerMessage:'',
				people:0,
				loading: true,
				flashDownTime:{
					h : 0,
					m : 0,
					h : 0,
				}
			}
		},
		mounted() {
			
		},
		// #ifdef  MP-WEIXIN
		  onShareAppMessage(ops) {
	
		    return {
		         title: this.goodsInfo.name,
		         path: '/pages/product/pinkDetail?pinkId='+this.pinkId,
		         imageUrl: this.goodsInfo.pic,
				 desc: '赶紧召唤小伙伴来拼团吧~',
		         success: (res) => {
		           console.log("转发成功", res);
		         },
		         fail: (res) => {
		           console.log("转发失败", res);
		         },
			}
			
		  },
		// #endif
		filters:{
			 formatDate: function (value) {
			      let date = new Date(value);
			      let y = date.getFullYear();
			      let MM = date.getMonth() + 1;
			      MM = MM < 10 ? ('0' + MM) : MM;
			      let d = date.getDate();
			      d = d < 10 ? ('0' + d) : d;
			      let h = date.getHours();
			      h = h < 10 ? ('0' + h) : h;
			      let m = date.getMinutes();
			      m = m < 10 ? ('0' + m) : m;
			      let s = date.getSeconds();
			      s = s < 10 ? ('0' + s) : s;
			      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
			    }
		},
		methods:{
			loadData(){
				this.$store.dispatch('PinkInfo',this.pinkId).then((result)=>{
					console.log(result)
					this.goodsInfo = result.goodsInfo
					this.buyers = result.buyers
					this.pinkInfo = result.pinkInfo
					
					let nowDate = new Date();
				
					this.flashDownTime.s =  this.pinkInfo.stopTime/1000 - nowDate.getTime()/1000 ;
					if(this.pinkInfo.status == 1){
						this.headerMessage = '拼团进行中'
					}
					if(this.pinkInfo.status == 2){
						this.headerMessage = '拼团成功'
					}
					if(this.pinkInfo.status == 3){
						this.headerMessage = '拼团失败'
					}
					this.people = this.pinkInfo.people  - this.buyers.length;
					this.loading = false;
				}).then((e)=>{
					this.loading = false;
				})
			},
			 imageError(item) {
				   console.log(加载图片失败了)
			       item.buyerIcon = 'http://media.yohooshop.com/mall/static/app/def-userIcon.png'
			},
			
			inviteClick(){
				// #ifndef H5
				       this.$refs.share.toggleMask();	
				//  #endif 
				
				// #ifdef H5
				     if (this.$wechat && this.$wechat.isWechat()) {
				         this.$wechat.share({
				             desc: "精选优质、有价值的好文章，转发给身边的人",  
				             img: "http://img.sscai.club/click.jpeg" 
				         });  
				     }
				//  #endif
					
			},
			buy(pinkType){
				if(this.hasLogin){
					//请求秒杀路径
					console.log("请求团购路径")
					let params = {goodsId:this.goodsInfo.id}
					this.$store.dispatch('PinkPath',params).then((result)=>{
						this.pinkPath = result.path
						this.doPink(pinkType);
					}).catch((e)=>{
						console.log(e)
					})
					
				}else{
					this.$mHelper.backToLogin();
				}
			},
			doPink(pinkType){
				let params = {
						goodsId:this.goodsInfo.id,
						pinkType:pinkType,
						pinkId:this.pinkInfo.id
					}
				let data = {params:params,path:this.pinkPath}
				this.$store.dispatch('DoPink',data).then((result)=>{
					console.log(result)
					this.queryPinkReult();
				}).catch((e)=>{
					console.log(e)
				})
			},
			
			//秒杀结果查询
			queryPinkReult(){
				let params = {goodsId:this.goodsInfo.id}
				this.$store.dispatch('PinkResult',params).then((result)=>{
					console.log(result)
					if(result == 0){
						let _this = this;
						setTimeout(function(){
						   _this.queryPinkReult();
						},1000)
						console.log("拼团中")
					}else if(result == -1){
						console.log("拼团完")
					}else{
						console.log("拼团到")
						uni.navigateTo({
							url: `/pages/order/createOrder?orderType=2&orderId=${result}`
						})
					}
				}).catch((e)=>{
					console.log(e)
				})
			},
			
			shareToFriend(data){
				let href = html_url+'/pages/product/pinkDetail?pinkId='+this.pinkId
				if(data == 0){
						//好友
						uni.share({
						    provider: "weixin",
						    scene: "WXSceneSession",
						    type: 0,
							title:this.goodsInfo.name,
						    summary: this.goodsInfo.description,
							imageUrl: this.goodsInfo.pic + '?x-oss-process=image/resize,m_lfit,h_60,w_60',
							href:href,
						    success: function (res) {
								if (this.hasLogin) {
									this.addShareCoupon();
								}
						        console.log("success:" + JSON.stringify(res));
						    },
						    fail: function (err) {
						        console.log("fail:" + JSON.stringify(err));
						    }
						});	
				}
				if (data == 1) {
					//朋友圈
					uni.share({
					    provider: "weixin",
					    scene: "WXSenceTimeline",
					    type: 0,
						title:this.goodsInfo.name,
						summary: this.goodsInfo.description,
						imageUrl: this.goodsInfo.pic + '?x-oss-process=image/resize,m_lfit,h_60,w_60',
						href:href,
					    success: function (res) {
					        console.log("success:" + JSON.stringify(res));
							if (this.hasLogin) {
								this.addShareCoupon();
							}
							
					    },
					    fail: function (err) {
					        console.log("fail:" + JSON.stringify(err));
					    }
						
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #f5f5f5;
	}
	.header-section{
		height: 150upx;
		text-align: center;
		line-height: 150upx;
		background-color: #FFEFD5;
		color:  #FF570A;
		font-weight:900; 
	}
	.goods-section{
		display:flex;
		background-color: #FFFFFF;
		padding: 10upx 10upx;
		align-items:flex-end;
		box-shadow: 0px 7upx 7upx -7upx #5E5E5E; 
		image{
			width: 240upx;
			height: 160upx;
			background-color: $image-bg-color;
		}
		.goods-info{
			padding:10upx 10upx;
			.top{
				height: 110upx;
				word-break: break-word; 
				text{
					@include text-ellipsis-two();
					font-size: $font-lg;
					color: $font-color-base;
				}
			}
			.bottom{
				 display:flex;
				 justify-content:space-between;
				 align-items:center;
				.left{
					.tuan{
						font-size: $font-base - 2upx;
						color: $font-color-base;
					}
					.price{
						padding-left: 10upx;
						color: $uni-color-primary;
						font-size: $font-lg +2upx;
					}
				}
				.right{
					border-style:solid;
					border-width:1upx;
					border-radius: 5upx;
					color: #FF570A;
					.detail{
						padding:5upx 10upx;
						font-size: $font-base - 2upx;
						color: #FF570A;
						
					}
				}
			}
		}
	}
	.pinkInfo-section{
		padding: 10upx 10upx;
		.icon-box{
			padding: 20upx 0;
			
			flex-wrap: wrap;
			.image-box{
				 padding: 10upx 10upx;
				 // background: #ffffff;
				 overflow: hidden;
				image{
				 border-radius: 100upx;
				 background-color:   #ffffff;
				 width: 100upx;
				 height: 100upx;
				 left: 0;
				 top: 0;
				 object-fit: cover;
				 object-position: center center;
				}
			}
			 
		}
	}
	.state-section{
		padding: 10upx 10upx;
		text-align: center;
		font-size: $font-lg+2upx;
	}
	.user-section{
		padding: 10upx 0;
		.top{
			 margin: 0 auto;
			 width: 0;
			 height: 0;
			 border-left: 20upx solid transparent;
			 border-right: 20upx solid transparent;
			border-bottom: 30upx solid #FF570A;
		}
		.user-box{
			background-color: #FF570A;
			.user-row{
				padding: 0upx 10upx;
				.user-info{
					padding: 20upx 10upx;
					align-items:center;
					display:-webkit-box;
					display:-webkit-flex;
					display:-ms-flexbox;
					display:flex;
					-webkit-box-pack:justify;
					-webkit-justify-content:space-between;
					-ms-flex-pack:justify;
					justify-content:space-between;
					.left{
						 display:flex;
						 align-items:center;
						image{
							width: 100upx;
							height: 100upx;
							border-radius: 100upx;
						}
						text{
							font-size: $font-base;
							padding-left: 10upx;
							color: #FFFFFF;
						}
					}
					.right{
						.r-text{
							font-size: $font-base;
							padding:5upx 10upx;
							color: #FFFFFF;
						}
					}
				}
				.line{		
				    background:$border-color-light;  
					height: 1upx;
				}
			}
		}
	}
	.time-setion{
		padding: 10upx 200upx;
		display: flex;
		 justify-content:space-between;
		text-align: center;
		align-items:center;
		text{
			color: $font-color-base;
			font-size: $font-lg +2upx;
		}
	}
	.introduce-section{
		padding: 10upx 20upx;
		text{
			color: $font-color-base;
			font-size: $font-sm
		}
	}
	.bottom-setion{
		padding:100upx 10upx 100upx 10upx;
		.btn{
			padding: 10upx 0upx;
			background-color: #FF570A;
			margin-left: 60upx;
			margin-right: 60upx;
			margin-top: 30upx;
			margin-bottom: 30upx;
			height: 100upx;
			border-radius: 50upx;
		
            text-align: center;
			text{
				 margin: 0 auto;
				 color: #FFFFFF;
				 line-height:85upx;
			
			     font-size: $font-lg;
			}
		}
	}
</style>
