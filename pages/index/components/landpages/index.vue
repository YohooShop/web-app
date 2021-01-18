<template>
	<view>
		
		<!-- 导航栏 -->
		<!-- #ifndef MP-WEIXIN -->
		
		<!-- #endif -->
		
		<view class="head_box fixed" :style="{ background: `rgb(${bgcolor})`}" :class="{ active: `rgb(${bgcolor})` }">
			<mall-custom :isBack="false" :bgColor="bgcolor" v-if="microData && microData.title">
				<block slot="backText">
					<text class="nav-title shopro-selector-rect">{{ microData.title || '商城' }}</text>
				</block>
			</mall-custom>
		</view>
		
		<view  v-if="microData" class="microData content_box" :style="style">
			<scroll-view class="scroll-box" scroll-y="true" scroll-with-animation enable-back-to-top>
				<view v-for="(item,index) in microData.components" :key="index">
					<view v-if="item.type == 'IndexSearch'">
						<indexSearch :search-place="item.searchPlace" :bgcolor="bgcolor"></indexSearch>
					</view>
					<view v-if="item.type == 'IndexBanner'">
						<indexBanner :banner-data="item.bannerData"  @getbgcolor="getbgcolor"></indexBanner>
					</view>
					<view v-if="item.type == 'IndexCategory'">
						<indexCategory :category-data="item.categoryData"></indexCategory>
					</view>
					<view v-if="item.type == 'IndexSubject'">
						<indexSubject :subject-data="item.subjectData"></indexSubject>
					</view>
					<view v-if="item.type == 'IndexCoupon'">
						<indexCoupon :coupon-data="item.couponData"></indexCoupon>
					</view>
					<view v-if="item.type == 'IndexNav'">
						<indexNav :nav-data="item.navData"></indexNav>
					</view>
					<view v-if="item.type == 'IndexCube'">
						<indexCube :cube-data="item.cubeData"></indexCube>
					</view>
					<view v-if="item.type=='IndexGrouping'">
						<indexGrouping :grouping-data="item.groupingData"></indexGrouping>
					</view>
					<view v-if="item.type=='IndexGroupon'">
						<indexGroupon :groupon-data="item.grouponData"></indexGroupon>
					</view>
					<view v-if="item.type=='IndexSeckill'">
						<indexSeckill :seckill-data="item.seckillData"></indexSeckill>
					</view>
					<view v-if="item.type==='Video'">
						<indexVideo :image-url='item.imageUrl' :video-link='item.videoLink' :id='item.id'></indexVideo>
					</view>
				</view>
			</scroll-view>
			
		</view>
	</view>
</template>

<script>
	import indexSearch from '@/components/landpages/index-search/index-search.vue'
	import indexBanner from '@/components/landpages/index-banner/index-banner.vue'
	import indexCategory from '@/components/landpages/index-categroy/index-categroy.vue'
	import indexSubject from '@/components/landpages/index-subject/index-subject.vue'
	import indexCoupon from '@/components/landpages/index-coupon/index-coupon.vue'
	import indexNav from '@/components/landpages/index-nav/index-nav.vue'
	import indexCube from '@/components/landpages/index-cube/index-cube.vue'
	import indexGrouping from '@/components/landpages/index-grouping/index-grouping.vue'
	import indexGroupon from '@/components/landpages/index-groupon/index-groupon.vue'
	import indexSeckill from '@/components/landpages/index-seckill/index-seckill.vue'
	import indexVideo from '@/components/landpages/index-video/index-video.vue'
export default {
	components:{
		indexSearch,
		indexBanner,
		indexCategory,
		indexSubject,
		indexCoupon,
		indexNav,
		indexCube,
		indexGrouping,
		indexGroupon,
		indexSeckill,
		indexVideo
	},
	data(){
		return {
			bgcolor: '',
			microData:null,
			CustomBar: this.CustomBar
		}
	},
	mounted() {
		this.loadData();
	},
	computed: {
		style() {
			var CustomBar= this.CustomBar;

			var style = `margin-top:${CustomBar}px`;
	
			return style
		}
	},
	onShow() {

		// #ifndef MP-WEIXIN
		// if (this.microData && this.microData.title) {
		// 	uni.setNavigationBarTitle({
		// 		title: this.microData.title
		// 	});
		// }
		// #endif
	},
	watch:{
		// bgcolor(color){
			
		// 	// #ifdef MP-WEIXIN
		// 	console.log('1111' + color);
		// 	uni.setNavigationBarColor({
		// 		 frontColor: '#000000',
		// 		backgroundColor:color,
		// 		animation:{
		// 			duration:300,
		// 			timingFunc: 'linear'
		// 		}
		// 	})
		// 	// #endif
		// }
	},
	
	methods:{
		getbgcolor(e) {
			console.log(e);
			this.bgcolor = e;
		},
		loadData(type='', loading){
			this.$store.dispatch('HomeLandPagesContent').then((result)=>{
				console.log(result);
				this.microData = result;
				uni.setNavigationBarTitle({
					title:this.microData.name
				})
				if(this.microData.extra.backgroundColor.length){
					uni.setBackgroundColor({
						backgroundColor:this.microData.extra.backgroundColor
					})
				}
				
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
				console.log(e)
			})
		}
	}
}
</script>
<style scoped lang="scss">
	@import "@/components/landpages/landpages.scss";
	

// 标题搜索栏
.active {
	transition: all linear 0.3s;
}

.head_box {
	width: 750rpx;
	// background: #fff;
	transition: all linear 0.3s;

	// /deep/.cuIcon-back {
	// 	display: none;
	// }
height:auto;
	.nav-title {
		font-size: 38rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #fff;
	}
}

.head_box.fixed {
	position: fixed;
	width: 100%;
	top: 0;
	z-index: 1024;
	// box-shadow: 0 1upx 6upx rgba(0, 0, 0, 0.1);
}

</style>