<template>
	<view class="page_box">
		<view class="head_box">
			<view class="order-nav x-f">
				<view class="nav-item y-f" v-for="nav in groupState" :key="nav.id" @tap="onNav(nav.id)">
					<view class="item-title">{{ nav.title }}</view>
					<text class="nav-line" :class="{ 'line-active': stateId === nav.id }"></text>
				</view>
			</view>
		</view>
		<view class="content_box">
			<scroll-view scroll-y="true" @scrolltolower="loadMore" refresher-background="#f5f5f5" class="scroll-box">
				<block v-for="groupon in myGrouponList" :key="groupon.id">
					<view class="group-card">
						<image v-if="stateId !== 'ing'" class="group-state" :src="grouponStatus[groupon.status]" mode=""></image>
						<view class="goods-content">
							<activity-card
								:cardId="groupon.cid"
								:title="groupon.goods.name"
								:subtitle="groupon.goods.description"
								:img="groupon.goods.pic"
								:price="groupon.goods.price"
								:originalPrice="groupon.goods.originalPrice"
							>
								<block slot="sell">
									<view class="x-f">
										<view class="sell-box">
											<text class="cuIcon-hotfill"></text>
											<text class="sell-num">已拼{{ groupon.goods.sale }}件</text>
										</view>
										<text class="group-num">{{  groupon.people }}人团</text>
									</view>
								</block>
							</activity-card>
						</view>
						<view class="btn-box x-f">
							<navigator class="cu-btn invite-btn" :url="'/pages/product/pinkDetail?pinkId='+ groupon.id"> 
							   拼团详情
							 </navigator>
							<!-- <button class="cu-btn invite-btn" @tap="jump(', { id: groupon.groupon_id })">拼团详情</button> -->
						</view>
					</view>
				</block>
				
			</scroll-view>
		</view>
	
	
	</view>
</template>

<script>
import activityCard from './components/activity-card.vue';
export default {
	components: {
		activityCard
	},
	data() {
		return {
			isLoading: true,
			isTriggered: false, //下拉刷新状态，是否被触发。
			loadStatus: '', //loading,over
			lastPage: 0,
			currentPage: 1,
			emptyData: {
				img: '/static/imgs/empty/empty_groupon.png',
				tip: '暂无此类拼团商品，更多拼团好货等着你噢~',
				path: '/pages/index/index',
				pathText: '去首页逛逛'
			},
			showShare: false,
			stateId: 'all',
			grouponStatus: {
				finish: 'http://shopro.7wpp.com/imgs/group_state_succeed.png',
				'finish-fictitious': 'http://shopro.7wpp.com/imgs/group_state_succeed.png',
				invalid: 'http://shopro.7wpp.com/imgs/group_state_failed.png'
			},
			myGrouponList: [], //我的拼团列表。
			shareGoodsInfo: {}, //分享海报信息。
			groupState: [
				{
					id: 'all', //0
					title: '全部'
				},
				{
					id: 'ing', //1
					title: '进行中'
				},
				{
					id: 'finish', //2
					title: '成功'
				},
				{
					id: 'invalid', //3
					title: '失败'
				}
			]
		};
	},
	computed: {},
	onLoad() {
		this.getMyGroupon();
	},
	onPullDownRefresh() {
		this.myGrouponList = [];
		this.getMyGroupon();
	},
	methods: {
		onNav(id) {
			this.stateId = id;
			this.myGrouponList = [];
			this.getMyGroupon();
		},
		jump(path, parmas) {
			this.$Router.push({
				path: path,
				query: parmas
			});
		},
		onInvite(data) {
			this.showShare = true;
			this.shareGoodsInfo = data;
		},
		// 加载更多
		loadMore() {
			if (this.currentPage < this.lastPage) {
				this.currentPage += 1;
				this.getMyGroupon();
			}
		},
		// 我的拼团
		getMyGroupon() {
			let that = this;
			that.isLoading = true;
			that.loadStatus = 'loading';
			
			
			let params = {page: that.currentPage};
				
			let type
			if(this.stateId === 'all') {
				type = 0;
			}
			if(this.stateId === 'ing') {
				type = 1;
			}
			if(this.stateId === 'finish') {
				type = 2;
			}
			if(this.stateId === 'invalid') {
				type = 3;
			}
				
			let data = {type:type, params:params}
			
			this.$store.dispatch('MinePinkList',data).then((result)=>{
				that.isLoading = false;
				uni.stopPullDownRefresh();
				that.myGrouponList = [...that.myGrouponList, ...result.list];
				// that.lastPage = res.data.last_page;
			}).then((e)=>{
				
			})
			// that.$api('goods.myGroupon', {
			// 	type: that.stateId,
			// 	page: that.currentPage
			// }).then(res => {
			// 	if (res.code === 1) {
			// 		that.isLoading = false;
			// 		uni.stopPullDownRefresh();
			// 		that.myGrouponList = [...that.myGrouponList, ...res.data.data];
			// 		that.lastPage = res.data.last_page;
			// 		if (that.currentPage < res.data.last_page) {
			// 			that.loadStatus = '';
			// 		} else {
			// 			that.loadStatus = 'over';
			// 		}
			// 	}
			// });
		}
	}
};
</script>

<style lang="scss">
.order-nav {
	background: #fff;
	height: 80rpx;

	.nav-item {
		flex: 1;

		.item-title {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			line-height: 76rpx;
		}

		.nav-line {
			width: 120rpx;
			height: 4rpx;
			background: #fff;
		}

		.line-active {
			background: $uni-color-primary
		}
	}
}

// 拼团卡片
.group-card {
	background: #fff;
	margin-top: 20rpx;
	position: relative;
	overflow: hidden;
	.group-state {
		position: absolute;
		z-index: 2;
		top: -20rpx;
		right: -20rpx;
		width: 126rpx;
		height: 126rpx;
	}

	.goods-content {
		padding: 0 20rpx;
		position: relative;
		z-index: 3;
		/deep/.activity-goods-box {
			background: none;
		}
		.group-num {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			margin-left: 30rpx;
		}
		.sell-box {
			line-height: 32rpx;
			background: rgba(255, 224, 226, 0.3);
			border-radius: 16rpx;
			padding: 0 10rpx;

			.cuIcon-hotfill {
				color: #e1212b;
				font-size: 26rpx;
				margin-right: 10rpx;
			}

			.sell-num {
				font-size: 20rpx;
				color: #f7979c;
			}
		}

		.price-box {
			.price {
				font-size: 28rpx;
				color: #e1212b;
				margin-right: 15rpx;
			}

			.original-price {
				font-size: 24rpx;
				color: #999;
				text-decoration: line-through;
			}
		}
	}

	.btn-box {
		height: 95rpx;
		border-top: 1px solid rgba(223, 223, 223, 0.5);
		justify-content: flex-end;

		.btn {
			width: 210rpx;
			height: 65rpx;
			border: 1rpx solid rgba(223, 223, 223, 1);
			border-radius: 33rpx;
			font-size: 26rpx;
			color: #999;
			padding: 0;
			margin-right: 20rpx;
			background: #fff;
		}

		.invite-btn {
			width: 210rpx;
			height: 65rpx;
			border: 1rpx solid #a8700d;
			border-radius: 33rpx;
			font-size: 26rpx;
			color: #a8700d;
			padding: 0;
			margin-right: 20rpx;
			background: #fff;
		}
	}
}
</style>
