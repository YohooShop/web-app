<template>
	
	<view class="container" v-if="!loading && !isError">
		<!-- 头部信息 -->
		<view class="">
			<view class="header od">
				<view class="tit-box">
					<text class="tit">{{headerTitle}}</text>
					<text class="tit2">{{headerSubTitle}}</text>
				</view>
				<!-- <view class="iconimage">
				</view> -->
			</view>
			
			<!-- 收货地址 -->
			<view class="address-section" v-if="order.shoppingType === 1">
				<view class="order-content">
					<text class="yticon icon-shouhuodizhi"></text>
					<view class="cen">
						<view class="top">
							<text class="name">{{order.receiverName}}</text>
							<text class="mobile">{{order.receiverPhone}}</text>
						</view>
						<text class="address">{{order.receiverProvince }} {{order.receiverCity}} {{order.receiverRegion}} {{order.receiverDetailAddress}}</text>
					</view>
				</view>
			</view>
			
			<!-- 商品信息 -->
			    <view class="order-item">
			    	<view class="i-top b-b">
			    		<text class="time">{{timestampToTime(order.createTime)}}</text>
			    		<text class="state" :style="{color: stateTipColor}">{{stateTip}}</text>
			    	</view>
			    	
			    	<scroll-view v-if="goodsList.length > 1" class="goods-box" scroll-x>
			    		<view
			    			v-for="(goodsItem, goodsIndex) in goodsList" :key="goodsIndex"
			    			class="goods-item"
			    		>
			    			<image class="goods-img" :src="goodsItem.productPic" mode="aspectFill"></image>
			    		</view>
			    	</scroll-view>
			    	<view 
			    		v-if="goodsList.length === 1" 
			    		class="goods-box-single"
			    		v-for="(goodsItem, goodsIndex) in goodsList" :key="goodsIndex"
			    	>
			    		<image class="goods-img" :src="goodsItem.productPic" mode="aspectFill"></image>
			    		<view class="right">
			    			<text class="title clamp">{{goodsItem.productName}}</text>
			    			<text class="attr-box">{{goodsItem.productAttr}}  x {{goodsItem.productQuantity}}</text>
			    			<text class="price">{{goodsItem.productPrice}}</text>
			    		</view>
			    	</view>
			    	
			    	<view class="price-box">
			    		共
			    		<text class="num">{{productCount}}</text>
			    		件商品 实付款
			    		<text class="price">{{order.payAmount}}</text>
			    	</view>
			    	<view class="action-box b-t" v-if="order.status == 0">
			    		<button class="action-btn" @click="cancelOrder()">取消订单</button>
			    		<button class="action-btn recom" @click="payOrder()">立即支付</button>
			    	</view>
					
					<view class="action-box b-t" v-if="order.status == 1">
						<button class="action-btn recom" @click="refund()">申请退款</button>
					</view>
					<!-- <view class="action-box b-t" v-if="order.status == 3 || order.status == 4">
							<button class="action-btn" @click="buy(item)">再次购买</button>
					</view> -->
					<view class="action-box b-t" v-if="order.status == 2">
							<button class="action-btn recom" @click="showConfirmReceipt()">确认收货</button>
					</view>
			    </view>
				
			<!-- 订单信息 -->
			<view class="orderInfo-setion">
				<view class="orderInfo-item">
					<text class="tti">订单编号</text>
					<text class="tti">{{order.orderSn}}</text>
				</view>
				<view class="orderInfo-item">
					<text class="tti">下单时间</text>
					<text class="tti">{{timestampToTime(order.createTime)}}</text>
				</view>
				
			</view>
			
			<!-- 物流信息 -->
			<view v-if="order.shoppingType === 1">
				<view class="orderInfo-setion" v-if="order.deliveryCompany">
					<view class="orderInfo-item">
						<text class="tti">物流公司</text>
						<text class="tti">{{order.deliveryCompany}}</text>
					</view>
					<view class="orderInfo-item">
						<text class="tti">物流单号</text>
						<text class="tti">{{order.deliverySn}}</text>
						<!-- <button class="tti action-btn ">复制</button> -->
						<text
							class="action-btn"
							v-clipboard:copy="order.deliverySn"
							v-clipboard:success="(type) => onCopyResult('success')"
							v-clipboard:error="(type) => onCopyResult('error')">复制
						</text>
				
					</view>
					<view class="action-box b-t" >
							<button class="action-btn recom" @click="gotoLogisticst()">查看物流</button>
					</view>
				</view>
			</view>
			 <!-- 门店信息 -->
			 <view v-if="order.shoppingType === 2 && store">
				 <view class="orderInfo-setion">
				 	<view class="orderInfo-item">
				 		<text class="tti">门店名称</text>
				 		<text class="tti">{{store.name}}</text>
				 	</view>
					<view class="orderInfo-item">
						<text class="tti">营业时间</text>
						<text class="tti">{{store.dayTime}}</text>
					</view>
				 	<view class="orderInfo-item">
				 		<text class="tti">门店位置</text>
				 		<text class="tti">{{store.address}}</text>
				 	</view>
					<view class="orderInfo-item">
						<text class="tti">详细位置</text>
						<text class="tti">{{store.detailedAddress}}</text>
					</view>
				 	<view class="action-box b-t" >
				 			<button class="action-btn recom" @click="gotoStore()">查看门店详情</button>
				 	</view>
				 </view>
			 </view>
			 
		</view>
	
		 
		 <!-- 404页面 -->
		 <view v-if="isError && !loading">
		 	<rf-no-data :custom="true">
		 		<view class="no-data-title">
		 			{{ errorInfo || '暂无数据' }}
		 		</view>
		 		<view
		 			@tap="loadData()"
		 			slot="refresh"
		 			class="spec-color"
		 			>重新加载</view
		 		>
		 	</rf-no-data>
		 </view>
		 
		 <!--页面加载动画-->
		 <rfLoading isFullScreen :active="loading"></rfLoading>
		 
	</view>
</template>
<script>
	import {
	    mapState,
		mapMutations
	} from 'vuex'; 
	export default {
		components: {},
		data() {
			return {
				loading:true,
				isError:false,
				headerTitle:'',
				headerSubTitle:'',
				orderId:0,
				stateTipColor:'',
				stateTip:'',
				order:{},
				goodsList:[],
				cancelTime:new Date(),
				store:{}
			};
		},
		onLoad(options){
			this.orderId = options.orderId;
			this.getOrderDetail();
		},
		
		computed:{
			productCount(){
				if(this.goodsList.length == 0){
					return "";
				}
				let count = 0;
				for(let i=0; i< this.goodsList.length ;i++){
					let goods = this.goodsList[i];
					count += goods.productQuantity;
				}
				return count;
			}
		},
		
		methods: {
			...mapMutations(["setReloadOrderPages"]),
			getOrderDetail(){
				let params = {'id':this.orderId}
				this.$store.dispatch('OrderDetail',params).then((result)=>{
				 console.log(result);
					if(result.order.status == 0){	
						var creatDate = new Date(result.order.createTime)
						if(result.order.orderType == 0){
							creatDate.setMinutes(creatDate.getMinutes()+120);
							//2两个小时
						}
						if(result.order.orderType == 1){
							creatDate.setMinutes(creatDate.getMinutes()+60);
							//1个小时
						}
						if(result.order.orderType == 2){
							creatDate.setMinutes(creatDate.getMinutes()+60);
							//1个小时
						}
						this.cancelTime = creatDate;
						if(this.cancelTime.getTime() > new Date().getTime()){
							this.headerSubTitle =  this.DateDifference(new Date,this.cancelTime) + '后订单自动取消'
						}else{
							result.order.status = 4;
						}
					}
					if(result.order.shoppingType === 2) {
						this.store = result.store;
					}
					
					this.order = result.order;
					this.goodsList = result.orderItems;
					this.orderStateExp(result.order.status, result.order.shoppingType);
					console.log(result)
					this.loading = false;
					this.isError = false;
				}).catch((e)=>{
					this.loading = false;
					this.isError = true;
					console.log(e)
				})
			},
			
			gotoLogisticst(){
				uni.navigateTo({
					url:`/pages/logisticst/logisticst?orderId=${this.orderId}`
				})
			},
			gotoStore(){
				uni.navigateTo({
					url : `/pages/store/storeDetail?id=${this.store.id}`
				})
			},
			gotoBuy(item){
				uni.navigateTo({
					 url: `/pages/product/product?id=${id}`
				})
			},
			//支付订单
			payOrder(){
				console.log('支付')
				uni.navigateTo({
					url: `/pages/order/createOrder?orderId=${this.orderId}&orderType=${this.order.orderType}`
				})
			},
			cancelOrder(){
				uni.showLoading({
					title: '请稍后'
				})
				let params = {'orderId':this.orderId}
				this.$store.dispatch('CancelOrder',params).then((result)=>{
					this.orderStateExp(4,this.order.shoppingType)
					this.order.status = 4
					//刷新订单列表页面
					uni.hideLoading();
					this.setReloadOrderPages(true);
				}).catch((e)=>{
					uni.hideLoading();
					console.log(e);
				})
			},

			
			onCopyResult(type) {
				if (type==='success') {
					this.$msg('复制成功')
				} else {
					this.$msg('复制失败')
				}
			},
			//计算时间差
			DateDifference(faultDate,completeTime){
			      var stime =new Date(faultDate).getTime();
			      var etime = new Date(completeTime).getTime();
			      var usedTime = etime - stime;  //两个时间戳相差的毫秒数
			      var days=Math.floor(usedTime/(24*3600*1000));
			      //计算出小时数
			      var leave1=usedTime%(24*3600*1000);    //计算天数后剩余的毫秒数
			      var hours=Math.floor(leave1/(3600*1000));
			      //计算相差分钟数
			      var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
			      var minutes=Math.floor(leave2/(60*1000));
				  
			      var time = days + "天"+hours+"时"+minutes+"分";
			      // var time = days;
				  console.log(time)
			      return time;
			    },
			refund(){
				uni.navigateTo({
					url:`/pages/refund/refund?orderId=${this.orderId}`
				})
			},
			//确认收货
			showConfirmReceipt(item){
				let _this = this;
				uni.showModal({
					title:"提示",
					content:"您将确认收货",
					showCancel:true,
					confirmColor: '#fa436a',
					success(res) {
						 console.log(_this)
						if (res.confirm) {
							this.confirmReceipt();
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消')
						}
					}
				})
			},
			
			confirmReceipt(){
				uni.showLoading({
					title: '请稍后'
				})
				let params = {'id':this.orderId}
				this.$store.dispatch('ConfirmReceiptOrder',params).then((result)=>{
					this.orderStateExp(3,this.order.shoppingType);
					this.order.status = 3;
					//刷新订单列表页面
					uni.hideLoading();
					this.setReloadOrderPages(true);
				}).catch((e)=>{
					uni.hideLoading();
					console.log(e);
				})
			},
			//订单状态文字和颜色
			orderStateExp(state, shoppingType){
				console.log(shoppingType)
				let stateTip = '',
					stateTipColor = '#fa436a',
					headerTitle ='',
					headerSubTitle = ''
				switch(state){
					case 0:
						stateTip = '待付款'; 
						headerTitle = '等待买家付款'
						break;
					case 1:
						stateTip = '待发货';
						headerTitle = '等待商家发货'
						break;
					case 2:{
						if(shoppingType === 1) {
							stateTip = '已发货';
							headerTitle = '已发货'
							headerSubTitle = '商品正在旅途中'
						}
						if(shoppingType === 2) {
							stateTip = '待收货';
							headerTitle = '待收货'
							headerSubTitle = '商品在自提门店等待收货'
						}
							
					}
					
						break;
					case 3:
						stateTip = '已完成';
						headerTitle = '已完成'
						headerSubTitle = '商品已经收货'
						 break;
					case 4:
						stateTip = '订单已关闭'; 
						stateTipColor = '#909399';
						headerTitle = '订单关闭'
						headerSubTitle = '当前订单已取消'
						break;
					case 5:
						stateTip = '无效订单'; 
						stateTipColor = '#909399';
						headerTitle = '无效订单'
						headerSubTitle = '当前订单无效'
						break;
					//更多自定义
				}
				this.headerTitle = headerTitle;
				this.headerSubTitle = headerSubTitle;
				this.stateTipColor = stateTipColor
				this.stateTip = stateTip
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
			    return Y+M+D+h+m+s
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
			//计算时间差
			DateDifference(faultDate,completeTime){
			      var stime =new Date(faultDate).getTime();
			      var etime = new Date(completeTime).getTime();
			      var usedTime = etime - stime;  //两个时间戳相差的毫秒数
			      var days=Math.floor(usedTime/(24*3600*1000));
			      //计算出小时数
			      var leave1=usedTime%(24*3600*1000);    //计算天数后剩余的毫秒数
			      var hours=Math.floor(leave1/(3600*1000));
			      //计算相差分钟数
			      var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
			      var minutes=Math.floor(leave2/(60*1000));
				  
			      var time = days + "天"+hours+"时"+minutes+"分";
			      // var time = days;
				  console.log(time)
			      return time;
			    },
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
		height: 100%;
	}
	.header{
		display:flex;
		align-items:center;
		width: 100%;
		height: 150upx;
		padding: 6upx 30upx 8upx;
		background: $base-color;
		.tit-box{
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		.tit{
			color:#fff;
			font-size: $font-base;
		}
		.tit2{
			color:#fff;
			font-size: $font-sm;
		}
		.iconimage{
			font-size: $font-lg +2upx;
			color: $font-color-light;
			width: 80upx;
			height: 80upx;
			background: #4399FC;
		}
	}
	
	//收货地址
	.address-section {
		padding: 30upx 0;
		background: #fff;
		position: relative;
		.order-content {
			display: flex;
			align-items: center;
		}
		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 44upx;
		}
		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			color: $font-color-dark;
		}
		
		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}
		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: $font-color-light;
		}
		
	}
	//商品
	.i-top{
		display: flex;
		align-items: center;
		height: 80upx;
		padding-right:30upx;
		font-size: $font-base;
		color: $font-color-dark;
		position: relative;
		.time{
			flex: 1;
		}
		.state{
			color: $base-color;
		}	
	}
	.order-item{
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin-top: 16upx;
		/* 多条商品 */
		.goods-box{
			height: 160upx;
			padding: 20upx 0;
			white-space: nowrap;
			.goods-item{
				width: 120upx;
				height: 120upx;
				display: inline-block;
				margin-right: 24upx;
			}
			.goods-img{
				display: block;
				width: 100%;
				height: 100%;
			}
		}
			
		/* 单条商品 */
		.goods-box-single{
			display: flex;
			padding: 20upx 0;
			.goods-img{
				display: block;
				width: 120upx;
				height: 120upx;
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;
				.title{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}
				.attr-box{
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}
				.price{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					&:before{
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
					}
				}
			}
		}	
		.price-box{
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20upx 30upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.num{
				margin: 0 8upx;
				color: $font-color-dark;
			}
			.price{
				font-size: $font-lg;
				color: $font-color-dark;
				&:before{
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}
		.action-box{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}	
		.action-btn{
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;
			&:after{
				border-radius: 100px;
			}
			&.recom{
				background: #fff9f9;
				color: $base-color;
				&:after{
					border-color: #f7bcc8;
					}
			}
		}
	}	
.orderInfo-setion{
	padding: 20upx 0;
	display: flex;
	flex-direction: column;
	padding-left: 30upx;
	background: #fff;
	margin-top: 16upx;
	.action-box{
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 100upx;
		position: relative;
		padding-right: 30upx;
	}
	.action-btn{
		width: 160upx;
		height: 60upx;
		margin: 0;
		margin-left: 24upx;
		padding: 0;
		text-align: center;
		line-height: 60upx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		background: #fff;
		border-radius: 100px;
		&:after{
			border-radius: 100px;
		}
		&.recom{
			background: #fff9f9;
			color: $base-color;
			&:after{
				border-color: #f7bcc8;
				}
		}
	}
	.orderInfo-item{
		// display: flex;
		// align-items: center
	}
	.tti{
		font-size: $font-sm;
		color: $font-color-light;
		margin-right: 24upx;
	}
	.action-btn{
		width: 160upx;
		height: 60upx;
		margin: 0;
		margin-left: 24upx;
		padding: 0;
		text-align: center;
		line-height: 60upx;
		font-size: $font-sm ;
		color: $font-color-dark;
		background: #fff;
		border-radius: 100px;
		&:after{
			border-radius: 100px;
		}
	}
}
</style>
