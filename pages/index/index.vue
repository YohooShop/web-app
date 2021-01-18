<template>
	<view class="container">
		<view v-if="loadConfig && !loading">
			<view v-if="isUseLandPages">
				<landpages ref="landpages"></landpages>
			</view>
			<view v-else>
				<commons  ref="commons"></commons>
			</view>
		</view>
		<!--页面加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading>
	</view>
	
</template>

<script>
import commons from './components/common/index.vue'
import landpages from './components/landpages/index.vue'
export default {
	components:{
	    commons,
		landpages
	},
	data(){
		return{
			isUseLandPages:false,
			loadConfig:false,
			loading: true,
		}
	},
	onLoad() {
		this.loadConfigData();
	},
	//下拉刷新
	onPullDownRefresh(){
		console.log('刷新')
		if(this.isUseLandPages) {
			this.$refs.landpages.loadData('refresh');
		}else{
			this.$refs.commons.loadData('refresh');
		}
	},
	onReachBottom(){
		console.log('执行加载更多')
		if(this.isUseLandPages) {
			
		}else{
			this.$refs.commons.loadReProductList();
		}
	},
	methods:{
		loadConfigData() {
			// this.$store.dispatch('Sign',params).then((result)=>{
			// 	console.log(result);
			// 	this.loadConfig = true;
			// 	this.isUseLandPages = result.useLandPages;
			// }).catch((e)=>{
			// 	console.log(e)
			// })
			
			// let params = {'date':'2020-07'};
			// this.$store.dispatch('SignList',params).then((result)=>{
			// 	console.log(result);
			// 	this.loadConfig = true;
			// 	this.isUseLandPages = result.useLandPages;
			// }).catch((e)=>{
			// 	console.log(e)
			// })
			
			this.$store.dispatch('HomeConfigData').then((result)=>{
				console.log(result);
				this.loading = false;
				this.loadConfig = true;
				this.isUseLandPages = result.useLandPages;
			}).catch((e)=>{
				this.loading = false;
				console.log(e)
			})
		},
	}
}
</script>

<style lang="scss">
	page {
		background: #f5f5f5;
	}
	
</style>
