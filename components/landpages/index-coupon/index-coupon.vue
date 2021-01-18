<template>
	  <view class="coupon-warp-box" v-if="couponData">
	        <view class="coupon-item-box" v-for="(item, index) in couponData" :key="index">
	            <view class="coupon-item">
	                <view class="left">
	                    <view v-if="item.type == 'cash'">
	                        <span class="money">
	                            ￥
	                        </span>
	                        <span class="num">{{item.value}}</span>
	                    </view>
	                    <view v-if="item.type == 'discount'">
	                        <span class="num">{{item.value}}</span>
	                        <span class="money">
	                          折
	                        </span>
	                    </view>
	                </view>
	                <view class="right">
	                    <view class="label">{{item.title}}</view>
	                        <view class="btn" @click="addCoupon(item)">
	                        点击领取
	                    </view>
	                    <view class="btn" >
	                        去使用
	                    </view>
	                </view>
	            </view>
	        </view>
	    </view>
</template>

<script>
	import {
	    mapState,
		mapMutations
	} from 'vuex';  
 export	default  {
	 props:{
		 couponData:{
		    type:Array,
		    value:'',
		}
	 },
	 computed:{
	 	...mapState(['hasLogin'])	
	 },
	 methods:{
		 addCoupon(item) {
			 if (this.hasLogin) {
			 	this.$store.dispatch('AddCoupon',item.id).then((result)=>{
			 		uni.showToast({
			 			title:'领取优惠券成功'
			 		})
			 	}).catch((error) => {
					console.log(error)
			 		uni.showToast({
			 			icon:"none",
			 			title:'领取优惠券失败'
			 		})
			 	})
			 }else{
			 	this.$mHelper.backToLogin();
			 }
		 }
	 }
 }
</script>

<style scoped lang="scss">
	@import "@/components/landpages/landpages.scss";
	.coupon-warp-box {
	    background: #FFFFFF;
	    overflow:auto;
	    white-space:nowrap;
	    width:100%;
	    padding: 10px 15px;
		margin-bottom: 10px;
		// overflow-x:hidden;
		 
		// overflow-y:hidden;
	    .coupon-item-box {
	      width: 200px;
	      height: 90px;
	      display: inline-block;
	      background: #FC2F44;
	      margin-right: 5px;
	      border-radius: 4px;
	      .coupon-item {
	        display: flex;
	        align-items: center;
	        justify-content: space-between;
	        height: 100%;
	        padding: 5px;
	        color: #FFFFFF;
	        .left {
	          .money {
	            font-size: 10px;
	          }
	          .num {
	            font-size: 30px;
	          }
	        }
	        .right {
	          font-size: 13px;
	          text-align: center;
			  padding-right: 10px;
	          .label {
	  
	          }
	          .btn{
	            padding: 2px 10px;
	            border-radius: 3px;
	            background: #FFFFFF;
	            color:#FC2F44;
	            margin-top: 5px;
	            box-shadow:0px 2px 4px 0px rgba(0,0,0,0.1);
	          }
	        }
	      }
	    }
	  }
	 
    ::-webkit-scrollbar {
		display: none;  
		width: 0 !important;  
		height: 0 !important;  
		-webkit-appearance: none;  
		background: transparent;  
	} 
	  
	// .coupon-warp-box::-webkit-scrollbar {/*滚动条整体样式*/
	// 	width: 0px;     /*高宽分别对应横竖滚动条的尺寸*/
	//     height: 0px;
	//     background-color: transparent;
	// }
	//  .coupon-warp-box::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
	//     border-radius: 0px;
	//    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
	//     background: rgba(0,0,0,0.2);
	// }
	// .coupon-warp-box::-webkit-scrollbar-track {/*滚动条里面轨道*/
	//     -webkit-box-shadow: inset 0 0 0px rgba(0,0,0,0.2);
	//     border-radius: 0;
	//     background: rgba(0,0,0,0.1);
	//  }
</style>
