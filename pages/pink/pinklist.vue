<template>
	<view class="container">
		<view v-if="grouponData.goodsList.length >0 ">
		   <indexGroupon :groupon-data="grouponData"></indexGroupon>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
import indexGroupon from '@/components/landpages/index-groupon/index-groupon.vue'
export default {
	components:{
		indexGroupon
	},
	data(){
		return{
			pagesNum:1,
			size:20,
			loadingType: 'more', //加载更多状态
			grouponData:{
				showMore:false,
				goodsList:[],
			}
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
			this.$store.dispatch('PinkProductList',params).then((result)=>{
				console.log(result)
				let goodsList = result;
				if(type === 'refresh'){
					this.grouponData.goodsList = [];
					this.pagesNum = 1;
				}else{
					this.pagesNum ++
				}
				this.grouponData.goodsList = this.grouponData.goodsList.concat(goodsList);
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
	}
}
</script>

<style scoped lang="scss">
	@import "@/components/landpages/landpages.scss";
</style>
