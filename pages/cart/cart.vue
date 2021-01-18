<template>
	<view class="container">
		<!-- 空白页 -->
		<view v-if="!hasLogin || empty===true" class="empty">
			<image src="http://media.yohooshop.com/mall/static/app/emptyCart.jpg" mode="aspectFit"></image>
			<view v-if="hasLogin" class="empty-tips">
				空空如也
				<navigator class="navigator" v-if="hasLogin" url="../index/index" open-type="switchTab">随便逛逛></navigator>
			</view>
			<view v-else class="empty-tips">
				空空如也
				<view class="navigator" @click="navToLogin">去登陆></view>
			</view>
		</view>
		<view v-else>
			<!-- 列表 -->
			
			<view class="cart-list">
				<block v-for="(item, index) in cartList" :key="item.id" >
					<view
						class="cart-item" 
						:class="{'b-b': index!==cartList.length-1}"
						
					>
						<view class="image-wrapper">
							<image :src="item.productPic" 
								mode="aspectFill" 
							    class="loaded" 
								@click="itemClick(item)"
							></image>
							<view 
								class="yticon icon-xuanzhong2 checkbox"
								:class="{checked: item.checked}"
								@click="check('item', index)"
								v-if="item.publishStatus == 1"
							></view>
						</view>
						<view class="item-right">
							<text class="clamp title">{{item.productName}}</text>
							<text class="attr">{{item.productAttr}}</text>
							<text class="price">¥{{item.price}}</text>
							<text class="promotionMessage">{{item.promotionMessage}}</text>
							<uni-number-box 
								class="step"
								:min="1" 
								:max="item.realStock"
								:value="item.quantity>item.realStock?item.realStock:item.quantity"
								:isMax="item.quantity>=item.realStock?true:false"
								:isMin="item.quantity===1"
								:index="index"
								@eventChange="numberChange"
							></uni-number-box>
						</view>
						<text class="del-btn yticon icon-fork" @click="deleteCartItem(index)"></text>
					</view>
				</block>
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section">
				<view class="checkbox">
					<image 
						:src="allChecked?'/static/selected.png':'/static/select.png'" 
						mode="aspectFit"
						@click="check('all')"
					></image>
					<view class="clear-btn" :class="{show: allChecked}" @click="clearCart">
						清空
					</view>
				</view>
				<view class="total-box">
					<text class="price">¥{{total}}</text>
					<text class="coupon" v-if="coupon > 0">
						已优惠
						<text>{{ coupon }}</text>
						元
					</text>
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">去下单</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	
	export default {
		components: {
		
		},
		data() {
			return {
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				cartList: [],
				coupon:0.00,
				checkList:[],
			};
		},
		onLoad(){
			if(hasLogin){
				
			}
			this.loadData();
			uni.$on('updateShopCart', this.updateLoadData);
		},
		watch:{
			//显示空白页
			cartList(e){
				let empty = e.length === 0 ? true: false;
				if(this.empty !== empty){
					this.empty = empty;
				}
			},
			shoppingCartNumber(val){
				console.log('购物车刷新')
				this.loadData();
			},
			hasLogin(val) {
				if(val){
					this.loadData();
				}else{
					this.cartList = [];
				}
			}
		},
		computed:{
			...mapState(['hasLogin','shoppingCartNumber'])
		},
	
		methods: {
			comunicationOff() {
			    uni.$off('updateShopCart', this.updateLoadData())
			},
			updateLoadData(e){
				this.loadData();
			},
			//请求数据
			loadData(){
				this.$store.dispatch('GetShoppingCartListPromotion').then((result) => {
					console.log(result)
					result.forEach(item=>{
						item.checked = false;
					})
					this.allChecked = false;
					this.total = 0.00;
					this.coupon = 0.00;
					this.cartList = result;
				}).catch((error) => {
					
				})
			},
			navToLogin(){
				this.$mHelper.backToLogin();
			},
			 //选中状态处理
			check(type, index){
				if(type === 'item'){
					this.cartList[index].checked = !this.cartList[index].checked;
				}else{
					const checked = !this.allChecked
					const list = this.cartList;
					list.forEach(item=>{
						item.checked = checked;
					})
					this.allChecked = checked;
				}
				this.calcTotal(type);
			},
			//数量
			numberChange(data){
				let cart = this.cartList[data.index]
				cart.quantity = data.number;
				this.calcTotal();
				let params = {'id':cart.id, 'quantity':cart.quantity}
				this.$store.dispatch('UpdateShoppingCartuQantity',params).then((result) => {
					console.log(result)
					this.calcTotal();
				}).catch((error) => {
					console.log(error)
				})
			},
			//删除
			deleteCartItem(index){
				uni.showLoading();
				let cart = this.cartList[index];
				let params = {'ids':cart.id};
				this.$store.dispatch('DeleteShoppingCart',params).then((result) => {
					let list = this.cartList;
					let row = list[index];
					let id = row.id;
					this.cartList.splice(index, 1);
					this.calcTotal();
					uni.hideLoading();
				}).catch((error) => {
					console.log(error)
					this.$api.msg('处理失败')
				})
			},
			//清空
			clearCart(){
				uni.showModal({
					content: '清空购物车？',
					success: (e)=>{
						if(e.confirm){
							uni.showLoading();
							this.$store.dispatch('ClearShoppingCart').then((result) => {
								this.cartList = [];
								this.shoppingCartNumber = 0;
								uni.hideLoading();
								this.cartList = [];
								this.calcTotal();
							}).catch((error) => {
								console.log(error)
								this.$api.msg('处理失败')
							})
						}
					}
				})
			},
			//计算总价
			calcTotal(){
				let coupon = 0.00;
				let list = this.cartList;
				if(list.length === 0){
					this.empty = true;
					return;
				}
				let total = 0;
				let checked = true;
				let ids = [];
				this.checkList = [];
				list.forEach(item=>{
					if(item.checked === true){
						ids.push(item.id)
						this.checkList.push(item);
					}else if(checked === true){
						checked = false;
					}
				})
				this.allChecked = checked;
				let params = {'ids':ids.join()};
				uni.showLoading();
				this.$store.dispatch('CalculateProducts',params).then((result)=>{
					console.log(result);
					this.total = result.countPrice;
					this.coupon = result.couponPrice;
					uni.hideLoading();
				}).catch((error) => {
					console.log(error)
					this.$api.msg('处理失败')
				})
			},
			//下单
			createOrder(){
				if(this.checkList.length == 0){
					return;
				}
				let list = this.cartList;
				let goodsData = [];
				let ids = []
				let removeItems = [];
				list.forEach(item=>{
					if(item.checked){
					ids.push(item.id)
					removeItems.push(item);
					}
				})
                let idsStr = ids.join()
				uni.navigateTo({
					url: `/pages/order/createOrder?data=${idsStr}`
				})
				
			
			},
			itemClick(item){
				console.log(item)
				let id = item.productId;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			}
		}
	}
</script>

<style lang='scss'>
	/* page {
		background: #f5f5f5;
	} */
	.container{
		/* padding-bottom: 134upx; */
		/* 空白页 */
		.empty{
			position:fixed;
			left: 0;
			top:0;
			width: 100%;
			height: 100vh;
			padding-bottom:100upx;
			display:flex;
			justify-content: center;
			flex-direction: column;
			align-items:center;
			background: #fff;
			image{
				width: 240upx;
				height: 160upx;
				margin-bottom:30upx;
			}
			.empty-tips{
				display:flex;
				font-size: $font-sm+2upx;
				color: $font-color-disabled;
				.navigator{
					color: $uni-color-primary;
					margin-left: 16upx;
				}
			}
		}
	}
	.f-header{
		display:flex;
		align-items:center;
		height: 100upx;
		padding: 6upx 30upx 8upx;
		background: #fff;
		image{
			flex-shrink: 0;
			width: 50upx;
			height: 50upx;
			margin-right: 20upx;
		}
		.tit{
			font-size: $font-lg;
			color: #font-color-dark;
			line-height: 1.3;
		}
	}
	/* 购物车列表项 */
	.cart-item{
		display:flex;
		position:relative;
		padding:30upx 50upx;
		.image-wrapper{
			width: 230upx;
			height: 230upx;
			flex-shrink: 0;
			position:relative;
			image{
				border-radius:8upx;
			}
		}
		.checkbox{
			position:absolute;
			left:-16upx;
			top: -16upx;
			z-index: 8;
			font-size: 44upx;
			line-height: 1;
			padding: 4upx;
			color: $font-color-disabled;
			background:#fff;
			border-radius: 50px;
		}
		.item-right{
			display:flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position:relative;
			padding-left: 30upx;
			.title,.price{
				font-size:$font-base;
				color: $font-color-dark;
				height: 40upx;
				line-height: 40upx;
			}
			.attr{
				font-size: $font-sm;
				color: $font-color-light;
				height: 50upx;
				line-height: 40upx;
			}
			.price{
				height: 50upx;
				line-height:30upx;
			}
			.promotionMessage{
				font-size: 20upx;
				line-height: 10upx;
				text-overflow: ellipsis;
				white-space: nowrap;
				padding-left: 30upx;
				color: #FF0000;
				transform: scale(0.7);
				transform-origin: -60upx 0;
			}
		}
		.del-btn{
			padding:4upx 10upx;
			font-size:34upx; 
			height: 50upx;
			color: $font-color-light;
			overflow: hidden;
		
		}
	}
	/* 底部栏 */
	.action-section{
		/* #ifdef H5 */
		margin-bottom:100upx;
		/* #endif */
		position:fixed;
		left: 30upx;
		bottom:30upx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 690upx;
		height: 100upx;
		padding: 0 30upx;
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
		border-radius: 16upx;
		.checkbox{
			height:52upx;
			position:relative;
			image{
				width: 52upx;
				height: 100%;
				position:relative;
				z-index: 5;
			}
		}
		.clear-btn{
			position:absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			font-size: $font-base;
			color: #fff;
			background: $font-color-disabled;
			border-radius:0 50px 50px 0;
			opacity: 0;
			transition: .2s;
			&.show{
				opacity: 1;
				width: 120upx;
			}
		}
		.total-box{
			flex: 1;
			display:flex;
			flex-direction: column;
			text-align:right;
			padding-right: 40upx;
			.price{
				font-size: $font-lg;
				color: $font-color-dark;
			}
			.coupon{
				font-size: $font-sm;
				color: $font-color-light;
				text{
					color: $font-color-dark;
				}
			}
		}
		.confirm-btn{
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 76upx;
			line-height: 76upx;
			font-size: $font-base + 2upx;
			background: $uni-color-primary;
			box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72)
		}
	}
	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked{
		color: $uni-color-primary;
	}
</style>
