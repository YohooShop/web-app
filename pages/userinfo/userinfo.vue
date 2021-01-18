<template>
	<view>
		<view class="user-section">
			<image class="bg" src="/static/user-bg.jpg"></image>
			<text class="bg-upload-btn yticon icon-paizhao"></text>
			<view class="portrait-box">
				<image class="portrait" :src="userInfo.icon || '/static/missing-face.png'"></image>
				<text class="pt-upload-btn yticon icon-paizhao"></text>
			</view>
		</view>
		
		<view class="list-cell b-b m-t" @click="gotoEdit(1)">
			<text class="cell-tit">用户名</text>
			<text class="cell-tip">{{userInfo.nickname}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		
		<view class="list-cell b-b" @click="gotoEdit(2)">
			<text class="cell-tit">性别</text>
			<text class="cell-tip">{{userGender(userInfo.gender) || '未设置'}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		
		<view class="list-cell b-b" @click="gotoEdit(3)">
			<text class="cell-tit">生日</text>
			<text class="cell-tip">{{userBrithday(userInfo.birthday)|| '未设置' }}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="gotoEdit(4)">
			<text class="cell-tit">职业</text>
			<text class="cell-tip">{{userInfo.job || '未设置' }}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell" @click="gotoEdit(5)">
			<text class="cell-tit">城市</text>
			<text class="cell-tip">{{userInfo.city || '未设置' }}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
	</view>
</template>

<script>
	import {  
	    mapState,  
	    mapMutations  
	} from 'vuex';  
	export default {
		data() {
			return {
				
			};
		},
		computed:{
			...mapState(['userInfo']),
		},
		methods:{
			gotoEdit(type){
				uni.navigateTo({
					url:`./editUserInfo?type=${type}`
				})
			},
			userGender(val){
				if(val){
					if (val == 0) {
						return '未知'; 
					}
					if (val == 1) {
						return '男';
					}	
					if (val == 2) {
						return '女';
					}
				}else{
					return '未设置';
				}
			},
			userBrithday(val){
				if(val){
				   return this.timestampToTime(val)
				}else{
					return '未设置'
				}
			},
			// 时间戳转换成时间
			timestampToTime (cjsj) {
			    var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			    var Y = date.getFullYear() + '-'
			    var M = this.compensateZero(date.getMonth()+1) + '-'
			    var D = this.compensateZero(date.getDate()) + ' '
			   
			    return Y+M+D
			},
			 /**
			     * 如果值小于 10，那么在前面补一个零
			     * @param val
			     * @returns {*}
			     */
			compensateZero: function (val) {
			    if (typeof val == 'number') {
			        return val < 10 ? '0' + val : val;
			    } else {
			        return val;
			       }
			},
			
		},
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
	}
	.user-section{
		display:flex;
		align-items:center;
		justify-content: center;
		height: 460upx;
		padding: 40upx 30upx 0;
		position:relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
		.portrait-box{
			width: 200upx;
			height: 200upx;
			border:6upx solid #fff;
			border-radius: 50%;
			position:relative;
			z-index: 2;
		}
		.portrait{
			position: relative;
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
		.yticon{
			position:absolute;
			line-height: 1;
			z-index: 5;
			font-size: 48upx;
			color: #fff;
			padding: 4upx 6upx;
			border-radius: 6upx;
			background: rgba(0,0,0,.4);
		}
		.pt-upload-btn{
			right: 0;
			bottom: 10upx;
		}
		.bg-upload-btn{
			right: 20upx;
			bottom: 16upx;
		}
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:60upx;
		position:relative;
		background: #fff;
		justify-content: center;
		&.m-t{
			margin-top: 16upx; 
		}
		&.b-b:after{
			left: 30upx;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right:10upx;
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
		.cell-more{
			align-self: baseline;
			font-size:$font-lg;
			color:$font-color-light;
			margin-left:10upx;
		}
	}

</style>
