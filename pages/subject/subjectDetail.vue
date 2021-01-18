<template>
	<view class="container">
		<view class="subjectDetail-section">
			<view class="subjectDetail-item">
				<view class="image-wrapper">
					<image :src="subjectDetail.pic" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{subjectDetail.title}}</text>
				<text class="desc">{{subjectDetail.description}}</text>
				<text class="content">{{subjectDetail.content}}</text>
			</view>
		</view>
		
		<view class="subjectGoods-section">
			<view 
				v-for="(item, index) in goodsList" :key="index"
				class="goods-item"
				@click="navToDetailPage(item)"
			>
				<view class="image-wrapper">
					<image :src="item.pic" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{item.name}}</text>
				<text class="price">￥{{item.price}}</text>
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
				id:0,
				subjectDetail:{},
				goodsList:[],
				pages:1,
				loadingType: 'more', //加载更多状态
			}
		},
		onLoad(options) {
			console.log(options.id);
			this.id = options.id;
			this.loadData();
		},
		onReachBottom(){
			this.getSubjectGoods();
		},
		methods: {
			loadData(){
				this.getSubjectDetail();
				this.getSubjectGoods();
			},
			
			getSubjectDetail(){
				let params = {'subjectId':this.id}
				this.$store.dispatch('SubjectDetail',params).then((result)=>{
					uni.setNavigationBarTitle({
						title:result.title
					})
					this.subjectDetail = result
					console.log(result);
				}).catch((e)=>{
					console.log(e);
				})
			},
			
			getSubjectGoods(type='add', loading){
				
				//没有更多直接返回
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}
				
				
				let params = {'subjectId':this.id, 'pageNum':this.pages, 'pageSize':20}
				this.$store.dispatch('SubjectGoods', params).then((result)=>{
					this.goodsList = this.goodsList.concat(result);
					this.loadingType = result.length < 20 ? 'nomore' : 'more';
					this.pages++
				}).catch((e)=>{
					console.log(e);
				})
			},
			
			navToDetailPage(item){
				let id = item.id;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			}
		},
	}
</script>

<style lang="scss">
	page {
		// background: #f5f5f5;
	}
	.subjectDetail-section{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: #fff;
		.subjectDetail-item{
			width: 100%;
			height: 30%;
			flex-wrap:wrap;
			padding-bottom: 40upx;
			
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
		.desc{
			font-size: $font-sm;
			color: $font-color-light;
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		.content{
			font-size: $font-sm;
			color: $font-color-light;
			flex: 1;
			display: flex;
			flex-direction: column;
		}
	}
	
	
	.subjectGoods-section{
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
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
		}
	}
	
	
</style>
