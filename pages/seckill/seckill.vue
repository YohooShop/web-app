<template>
	<view class="container">
		<view class='nav' v-if="tabTitle.length>0">
		<!-- 导航栏 agents导航栏标题 -->
			<navTab  ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
	    </view>
		
		<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->
		<swiper style="min-height: 93vh;" :current="currentTab" @change="swiperTab">
			<swiper-item v-for="(listItem,listIndex) in killData" :key="listIndex" v-model="killData[listIndex]">
				<scroll-view style="height: 100%;" scroll-y="true" @scrolltolower="lower1" scroll-with-animation :scroll-into-view="toView">
				<view :id="'top'+listIndex" style="width: 100%;height: 120upx;">边距盒子</view>
				<view class='content'>
					<view class="section" v-if="listItem.productList" v-model="listItem.productList">
						<view 
							v-for="(item, index) in listItem.productList" :key="index"
							class="item"
							@click="navToDetailPage(item)"
						>
							<view class="image-wrapper">
								<image :src="item.pic" mode="aspectFill"></image>
							</view>
							<text class="title clamp">{{item.name}}</text>
							<text class="m-price" v-if="item.originalPrice>0" >¥{{item.originalPrice}}</text>
							<text class="price">￥{{item.price}}</text>
						</view>
					</view>
				</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	import navTab from '../../components/tabber/navTab.vue';
	export default {
		components: {navTab},
		data() {
			return {
				tabTitle:[],
				currentTab: 0, //sweiper所在页
				listView:[],
				toView:'',//回到顶部id
				killSenceData:[],
				killData:[],
			}
		},
		onLoad() {
		  this.loadSenceData();	
		},
		onShow() {
			
		},
		onHide() {},
		methods: {
		   loadSenceData(){
			this.$store.dispatch("KillSence").then((result) => {
				 console.log(result);
				 let titles = []
				 let killData = [];
				 for (var i = 0; i < result.length; i++) {
				 	titles = titles.concat(result[i].name)
					let arr = [{"endTime":0,"startTime":0,"productList":[]}]
					killData = killData.concat(arr);
				 }
				 this.killData = killData
				 console.log(this.killData)
				 this.tabTitle = titles;
				 this.killSenceData = result;
				 if(this.tabTitle.length>0){
					 this.loadKillData(0);
				 }
			}).catch((error) => {
					 console.log(error);
			})
		 },
		 
		  loadKillData(index){
			 let killSence = this.killSenceData[index];
			  console.log(killSence);
			 this.$store.dispatch('KillList',killSence.id).then(result=>{
				console.log(result); 
				this.$set(this.killData, index, result)
			 }).catch(e=>{
				 console.log(e);
			 })
		 },
		 navToDetailPage(item){
			 let id = item.id;
			 uni.navigateTo({
			 	url: `/pages/product/killproduct?id=${id}`
			 })
		 },
		 toTop(){
		 	this.toView = ''
			
		 	setTimeout(()=>{
		 		this.toView = 'top' + this.currentTab
		 	},10)
		 },
		changeTab(index){
		 	this.currentTab = index;
			this.loadKillData(index)
     	 },
		 // swiper 滑动
		 swiperTab: function(e) {
			 console.log("加载数据")
		 	var index = e.detail.current //获取索引
		 	this.$refs.navTab.longClick(index);
		 },
		},
	}
</script>

<style  lang="scss">
	page {
		background: #f5f5f5;
	}
	.nav {
		position: fixed;
		left: 0;
		// top: 0;
		color: white;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		font-size: 24upx;
		background-color: #50B7EA;
		z-index: 996;
	}
	.content {
		width: 100%;
	    background: #f5f5f5;
	},
	.section{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: #f5f5f5;
		
		.item{
			background: #fff;
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
			border-radius: 10upx;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			background: #fff;
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
			font-size: $font-lg + 2upx;
			color: $uni-color-primary;
			line-height: 1;
		}
		.m-price{
			font-size: $font-lg;
			margin:0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
			line-height: 1;
		}
	}
</style>
