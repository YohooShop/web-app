<template>
	<view class="">
		<view
			class="popup" 
			:class="specClass"
			@touchmove.stop.prevent="stopPrevent"
			@click="toggleSpec"
		>
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<image :src="goods.pic" mode="widthFix"></image>
					<view class="right">
						<text class="price">¥{{price}}</text>
						<text class="stock">库存：{{stock}}{{goods.unit}}</text>
						<view class="selected">
							已选：
							<text class="selected-text">
								{{selectSpecDes}}
							</text>
						</view>
					</view>
				</view>
				<!-- 选择规格 -->
				<view class="content_box">
					<view v-for="(item,index) in specList" :key="index" class="attr-list">
						<text>{{item.name}}</text>
						<view class="item-list">
							<text 
								v-for="(childItem, childIndex) in specChildList" 
								:key="childItem.id" class="tit"
								:class="{selected: childItem.id == specSelectedId}"
								@click="selectSpec(childIndex, childItem.id)"
							>
							{{getProAttr(childItem)}}
							</text>
						</view>
					</view>
					
					<view class="buy-num-box ">
						<view class="num-title">购买数量</view>
						<uni-number-box
							@eventChange="numberChange"
							:step="1"
							:min="1"
							:max="stock"
							:value="goodsNum"
						></uni-number-box>
					</view>
				</view>
				
				<view class="btn-box x-bc" v-if="buyType === 'cart' || buyType === 'buy'"><button class="cu-btn  seckill-btn" @tap="confirm">确认</button></view>
				<view class="btn-box x-bc" v-else>
					<button class="cu-btn  cart-btn" @tap="confirmCart">加入购物车</button>
					<button class="cu-btn  buy-btn" @tap="confirmBuy">立即购买</button>
				</view>
				
				
		<!-- 		<button class="btn" @click="toggleSpec">完成</button> -->
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapActions, mapState } from 'vuex';
	export default {
		name: 'mallSku',
	
		data(){
			return{
				type: this.buyType,
				goodsNum:1,
			}
		},
		props:{
			goods: {},
			buyType: {
				type: String,
				default: 'sku'
			},
			specChildList:{
				type: Array,
			},
			specClass:{
				type: String,
				default: 'none'
			},
			price:{
				type: Number,
				default: 0
			},
			stock:{
				type: Number,
				default: 0
			},
			selectSpecDes:{
				type: String,
			},
			specList:{
				type: Array
			},
			specSelectedId:{
				type: Number,
			},
			
		},
		watch: {
			type(nweVal, oldVal) {
				return newVal;
			}
		},
		computed:{
			
		},
		methods:{
			getProAttr(item){
				if(item.sp1 && item.sp2 && item.sp3){
					return item.sp1 + ' ' + item.sp2 + ' ' + item.sp3;
				}
				if(item.sp1 && item.sp2){
					return item.sp1 + ' ' + item.sp2;
				}
				if(item.sp1){
					return item.sp1;
				}
				return '';
			},
			//规格弹窗开关
			toggleSpec() {
				this.$emit('toggleSpec');
			},
			selectSpec(index, id){
			this.$emit('selectSpec',index, id)
			},
			stopPrevent(){},
			numberChange(e) {
				// let that = this;
				console.log('变化了',e)
				this.goodsNum = e.number;
			 //    console.log(this.goodsNum)
		   },
			confirm(){
				if(this.buyType === 'buy') {
					this.confirmBuy()
				}
				if(this.buyType === 'cart') {
					this.confirmCart();
				}
			},
			confirmCart(){
				
				this.$emit('addCart',this.goodsNum);
				this.$emit('toggleSpec');
			},
			confirmBuy(){
			this.$emit('buy',this.goodsNum);
				this.$emit('toggleSpec');
			},
			
			
		},
			
	}
</script>

<style lang='scss'>
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		
		&.show {
			display: block;
			.mask{
				animation: showPopup 0.2s linear both;
			}
			.layer {
				animation: showLayer 0.2s linear both;
			}
		}
		&.hide {
			.mask{
				animation: hidePopup 0.2s linear both;
			}
			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}
		&.none {
			display: none;
		}
		.mask{
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}
		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			min-height: 40vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;
			.btn{
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: $uni-color-primary;
				font-size: $font-base + 2upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}
		}
		@keyframes showPopup {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes hidePopup {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}
			100% {
				transform: translateY(0%);
			}
		}
		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}
			100% {
				transform: translateY(120%);
			}
		}
	}
	
	
	/* 规格选择弹窗 */
	.attr-content{
		padding: 10upx 30upx;
		height: 950rpx;
		display: flex;
		flex-direction: column;
		.a-t{
			display: flex;
			image{
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -40upx;
				border-radius: 8upx;;
			}
			.right{
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
				line-height: 42upx;
				.price{
					font-size: $font-lg;
					color: $uni-color-primary;
					margin-bottom: 10upx;
				}
				.selected-text{
					margin-right: 10upx;
				}
			}
		}
		.content_box{
			 flex: 1;
			.attr-list{
				display: flex;
				flex-direction: column;
				font-size: $font-base + 2upx;
				color: $font-color-base;
				padding-top: 30upx;
				padding-left: 10upx;
			}
			.item-list{
				padding: 20upx 0 0;
				display: flex;
				flex-wrap: wrap;
				text{
					display: flex;
					align-items: center;
					justify-content: center;
					background: #eee;
					margin-right: 20upx;
					margin-bottom: 20upx;
					border-radius: 100upx;
					min-width: 60upx;
					height: 60upx;
					padding: 0 20upx;
					font-size: $font-base;
					color: $font-color-dark;
				}
				.selected{
					background: #fbebee;
					color: $uni-color-primary;
				}
			}
		}
		
		
		.buy-num-box{
			padding: 20upx 0 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.num-title{
				font-size: $font-base + 2upx;
				color: $font-color-base;
			}
		
			
			
		}
	}
	
	.btn-box {
		height: 100rpx;
	
		.cu-btn {
			width: 340rpx;
			height: 70rpx;
			border-radius: 35rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(255, 255, 255, 0.9);
			padding: 0;
			margin-left: initial;
			margin-right: initial;
			align-items: center;
		}
	
		.cart-btn {
			background: linear-gradient(90deg, rgba(103, 104, 105, 1), rgba(82, 82, 82, 1));
			box-shadow: 0px 2rpx 5rpx 0px rgba(102, 103, 104, 0.46);
		}
	
		.buy-btn {
			background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
			box-shadow: 0px 7rpx 6rpx 0px rgba(229, 138, 0, 0.22);
		}
		.seckill-btn {
			width: 710rpx;
			height: 70rpx;
			background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
			box-shadow: 0px 7rpx 6rpx 0px rgba(229, 138, 0, 0.22);
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			border-radius: 35rpx;
			padding: 0;
		}
	}
</style>
