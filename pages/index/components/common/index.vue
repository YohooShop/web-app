<template>
	<view>
		<view v-for="(item,index) in microData.pages" :key="index">
			<!--搜索按钮-->
			<view v-if="item.name === 'micro_page_componet_search'">
				<view class="banner">
					<view class="search">
						<view class="search_box">
							<input  type="text" value="" disabled  @click="searchInputClicked()"/>
							<icon type="search" size="20"></icon>
						</view>
					</view>
				</view>
			</view>
			 <!--轮播图组件-->
			 <view v-if="item.name === 'micro_page_componet_slide'  && item.value && item.value.length">
				<indexBanner :banner-data="item.value[0].children" ></indexBanner>
			 </view>
			 <!--秒杀组件-->
			 <view v-if="item.name === 'micro_page_componet_seckill'  && item.value && item.value.length">
			 	<indexSeckill :home-flash-promotion="item.value[0].children[0]"></indexSeckill>
			 </view>
			 <!--商品分组-->
		   <view v-if="item.name === 'micro_page_componet_goods_group'  && item.value && item.value.length">
		   	  <indexGrouping :grouping-data="item.value"></indexGrouping>
		   </view>
		  <!-- 专题组件 -->
		   <view v-if="item.name === 'micro_page_componet_subject'  && item.value && item.value.length">
			   <indexSubject :subject-data="item.value"></indexSubject>
		   </view>
		    <!-- 分类商品 -->
			<view v-if="item.name === 'micro_page_componet_category' && item.value && item.value.length">
				<indexCategory :category-data='item.value'></indexCategory>
			</view>
		</view>
		<view v-if="likeGoods.goodsList.length">
			<indexCategory :category-data='likeGoods'></indexCategory>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import indexGrouping from '@/components/index-grouping/index-grouping.vue'
	import indexBanner from '@/components/index-banner/index-banner.vue'
	import indexSubject from '@/components/index-subject/index-subject.vue'
	import indexSeckill from "@/components/index-seckill/index-seckill.vue"
	import indexCategory from "@/components/index-category/index-category.vue"
	export default {
		components:{
			indexBanner,
			indexGrouping,
			indexSubject,
			indexSeckill,
			indexCategory
		},
		data(){
			return {
				microData:[],
				likeGoods:{
					meta:{
						name:'猜你喜欢'
					},
					goodsList:[],
				},
				pageNum:1,
				loadingType: 'more', //加载更多状态
			}
		},
		mounted()  {
			console.log('执行onload')
			this.loadData();
		},
		methods:{
			loadData(type='add', loading) {
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}
				this.loadHomeData(type, loading);
				this.loadReProductList(type, loading);
			},
			loadHomeData(type='add') {
				this.$store.dispatch('HomeNewData').then((result)=>{
					this.microData = result;
					console.log(result);
				}).catch((e)=>{
					
				})
			},
			loadReProductList(type='add', loading){
				//没有更多直接返回
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}
				//推荐商品
				this.pageNum = 1;
				let params = {
					'pageSize' : 20,
					'pageNum' : this.pageNum
				}
				this.$store.dispatch('ReProductList',params).then((result)=>{
					console.log(result)
					if(type === 'refresh'){
						this.likeGoods.goodsList = [];
					}
					this.likeGoods.goodsList = this.likeGoods.goodsList.concat(result)
					this.loadingType = result.length < 20 ? 'nomore' : 'more';
					this.pageNum++;
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
			searchInputClicked(){
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.banner {
	   .search {
	     display: flex;
	     align-items: center;
	     width: 100%;
	     height: 44px;
	     background: #FFFFFF;
	     padding: 7px 10px;
	     .search_box {
		   position: relative;
	       width: 100%;
	       height: 30px;
	       background: #efeff4;
	       border-radius: 5px;
	       padding: 0 10px;
		   
	       icon {
	         position: absolute;
	         top: 5px;
	         left: 8px;
	         z-index: 5;
	       }
	     }
	   }
	 }
</style>