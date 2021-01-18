<template> 
	<view class="">
		<view class="goods-list">
			<view
				v-for="(item, index) in goodsList" :key="index"
				class="goods-item"
				@click="navToDetailPage(item.id)"
			>
				<view class="image-wrapper">
					<image :src="item.pic" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{item.name}}</text>
				<view class="price-box">
					<text class="price">{{item.price}}</text>
					<text>已售 {{item.sale}}</text>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>

	export default{
		components: {
	
		},
		data() {
			return {
				pagesNum:1,
				size:20,
				loadingType: 'more', //加载更多状态
				goodsList: [],
			}
		},
		onLoad() {
			this.loadData()
		},
		//加载更多
		onReachBottom(){
			this.loadData();
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			this.loadData('refresh');
		},
		methods:{
			loadData(type='add', loading){
				//没有更多直接返回
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}
				let params = {
					pageSize:this.size,
					pageNum:this.pagesNum
				}
				this.$store.dispatch('NewProductList',params).then((result)=>{
					console.log(result)
					let goodsList = result;
					if(type === 'refresh'){
						this.goodsList = [];
						this.pagesNum = 1;
					}else{
						this.pagesNum ++
					}
					this.goodsList = this.goodsList.concat(goodsList);
					this.loadingType  = goodsList.length < this.size ? 'nomore' : 'more';
					if(type === 'refresh'){
						if(loading == 1){
							uni.hideLoading()
						}else{
							uni.stopPullDownRefresh();
						}
					}
				}).catch((e)=>{
					if(type === 'refresh'){
						if(loading == 1){
							uni.hideLoading()
						}else{
							uni.stopPullDownRefresh();
						}
					}
				})
			},
			//详情
			navToDetailPage(id){
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
	}
	.content{
		padding-top: 96upx;
	}
	/* 商品列表 */
	.goods-list{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: #fff;
		.goods-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}
		.price-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10upx;
			font-size: 24upx;
			color: $font-color-light;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
			&:before{
				content: '￥';
				font-size: 26upx;
			}
		}
	}
</style>
