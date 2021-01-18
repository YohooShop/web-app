<template>
<view class="content">
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

	export default {
		components: {
		
		},
		data() {
			return {
				goodsList:[],
				keyword:'',
				pageNum: 0,
				loadingType: 'more', //加载更多状态
				headerTop:"0px",
			}
		},
		onLoad(options) {
			// #ifdef H5
			this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
			// #endif
			console.log(options.q)
			this.keyword = options.q;
			this.loadData();
		},
		
		//下拉刷新
		onPullDownRefresh(){
			console.log('刷新')
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom(){
			this.loadData();
		},
		methods:{
			//请求搜索数据
			async loadData(type='add', loading){
				
				//没有更多直接返回
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}
				
				let params = {'keyword': this.keyword ,
							  'pageNum': this.pageNum,
							  'pageSize': 20}
				this.$store.dispatch('SearchSimple',params).then((result)=>{
					console.log(result)
					if(type === 'refresh'){
						this.goodsList = [];
					}
					this.goodsList = this.goodsList.concat(result.list)
					this.loadingType  = result.totalPage == this.pageNum + 1 ? 'nomore' : 'more';
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
					console.log(e);
				})
			},
			//详情
			navToDetailPage(id){
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
		}
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
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
