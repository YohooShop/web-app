<template>
	<view>
		<view class="sub-item" 
		v-for="(item, index) in subjectList" 
		:key="index">
			<text class="time">
				{{dateFilter(item.createTime)}}
			</text>
			<view class="content" @click="subjectClick(item)">
				<text class="title">{{item.title}}</text>
				<view class="img-wrapper">
					<image class="pic" :src="item.pic" mode="aspectFill"></image>
				</view>
				<text class="introduce">
					{{item.description}}
				</text>
				<view class="bot b-t">
					<text>查看详情</text>
					<text class="more-icon yticon icon-you"></text>
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
				subjectList:[],
				pages:1,
				size:10,
				loadingType: 'more', //加载更多状态
			}
		},
		onLoad(options) {
			this.loadData()
		},
		onReachBottom(){
			this.loadData()
		},
		methods: {
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
					pageNum:this.pages, 
					pageSize:this.size
				}
				this.$store.dispatch('SubjectAllList',params).then((result)=>{
					this.subjectList = this.subjectList.concat(result);
					this.loadingType = result.length < this.size ? 'nomore' : 'more';
					this.pages++
				}).catch((e)=>{
					console.log(e);
				})
			},
			subjectClick(item){
				uni.navigateTo({
					url: `/pages/subject/subjectDetail?id=${item.id}`
				})
			},
			dateFilter(val) {
			      let oldTime = parseInt(val / 1000)
			      let nowTime = parseInt(new Date().getTime() / 1000) // 获取当前时间戳
			      let nowDate = new Date(nowTime * 1000) // 当前日期对象
			      let oldDate = new Date(oldTime * 1000) // 参数日期对象
			
			      let Y = oldDate.getFullYear()
			      let m = oldDate.getMonth() + 1
			      let d = oldDate.getDate()
			      let H = oldDate.getHours()
			      let i = oldDate.getMinutes()
			      //  let s = oldDate.getSeconds()
			      function zeroize(num) {
			        return (String(num).length === 1 ? '0' : '') + num;
			      }
			      let timeDiff = nowTime - oldTime // 相差秒数
			      if (timeDiff < 60) {
			        return '刚刚'
			      } else if (timeDiff < 3600) { // 一小时前之内
			        return Math.floor(timeDiff / 60) + '分钟前';
			      } else if (nowDate.getFullYear() === Y && nowDate.getMonth() + 1 === m && nowDate.getDate() === d) {
			        return '今天' + zeroize(H) + ':' + zeroize(i);
			      } else {
			        let newDate = new Date((nowTime - 86400) * 1000); // 当前时间减一天（昨天）
			        if (newDate.getFullYear() === Y && newDate.getMonth() + 1 === m && newDate.getDate() === d) {
			          return '昨天' + zeroize(H) + ':' + zeroize(i);
			        } else if (nowDate.getFullYear() === Y) {
			          return zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
			        } else {
			          return Y + '年' + zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
			        }
			      }
			    }
		}
	}
	
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
		padding-bottom: 30upx;
	}
	.sub-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.time {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80upx;
		padding-top: 10upx;
		font-size: 26upx;
		color: #7d7d7d;
	}
	.content {
		width: 710upx;
		padding: 0 24upx;
		background-color: #fff;
		border-radius: 4upx;
	}
	.title {
		display: flex;
		align-items: center;
		height: 90upx;
		font-size: 32upx;
		color: #303133;
	}
	.img-wrapper {
		width: 100%;
		height: 260upx;
		position: relative;
	}
	.pic {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 6upx;
	}
	.cover {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		font-size: 36upx;
		color: #fff;
	}
	.introduce {
		display: inline-block;
		padding: 16upx 0;
		font-size: 28upx;
		color: #606266;
		line-height: 38upx;
	}
	.bot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 80upx;
		font-size: 24upx;
		color: #707070;
		position: relative;
	}
	.more-icon {
		font-size: 32upx;
	}
</style>
