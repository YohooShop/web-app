<template>
	<view class="g-main">
		<view class="m-lead" style="margin-bottom: 5px" v-if="subjectData.length == 1" >
			 <view class="ul-box">
				 <view v-for="(item,index) in subjectData" :key="index" class="li-box" @tap="_changeItem">
				 	<span>{{item.name}}</span>
				 </view>
		     </view>
		</view>
		<view v-if="subjectData" class="m-content">
			<view v-for="(item,index) in subject.children" :key="index" 
			class="m-content-item"
			@click="subjectClick(item)">
				<view class="image-wrapper">
					<image :src="item.pic" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{item.title}}</text>
				<text class="desc">{{item.description}}</text>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	export default{
		props:{
			subjectData:{
				type:Array,
				value:''
			}
		},
		data(){
			return {
			   subject:[]
			}
		},
		created() {
			this.subject = this.subjectData[0]
		},
		methods:{
			//话题
			subjectClick(item){
				uni.navigateTo({
					url: `/pages/subject/subjectDetail?id=${item.id}`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.g-main {
	  position: relative;
	  .m-lead {
	    font-size: 13px;
	    background: #ffffff;
	    padding:10px 15px;
		.ul-box {
			
		  display: flex;
		  display: -webkit-flex;
		  flex-direction: row;
		  justify-content: center;
		  height: 100%;
		  .li-box {
		    position: relative;
		    flex: 1;
		    width: 1px;
		    height: 100%;
			text-align: center;
		    span {
		      display: inline-block;
		      font-size: 14px;
		    }
		    .hover {
		      border-bottom: 2px solid #333;
		      box-sizing: border-box;
		    }
			
		    span.active {
		      font-size: 17px;
		      font-weight: bold;
		      -webkit-box-sizing: border-box;
		      -moz-box-sizing: border-box;
		      box-sizing: border-box;
		      border-bottom: 2px solid #000000;
		    }
		   }
		}
	}
	.m-content{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		.m-content-item{
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
	}
	
}
</style>
