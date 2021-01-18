<template>
	<view class="banner" :style="{ 'background-color': `rgb(${bgcolor})` }" :class="{ active: `rgb(${bgcolor})` }">
	        <view class="search">
	            <view class="search_box">
	                <input type="text" value="" disabled :placeholder="searchPlace" @click="searchInputClicked()">
	                <icon type="search" size="20"></icon>
	            </view>
	        </view>
	 </view>
</template>

<script>
export default {
	name:"indexSearch",
	 props :{
	        searchPlace:{
	            type:String,
	            value:''
	        },
			bgcolor: {
				type: String,
				default: '#FFFFFF'
			}
	},
	methods:{
		searchInputClicked(){
			uni.navigateTo({
				url: '/pages/search/search'
			})
		}
	}
}
</script>

<style lang="scss">
	@import "@/components/landpages/landpages.scss";
	.banner {
	    .search {
	      display: flex;
	      align-items: center;
	      height: 44px;
	      // background: #FFFFFF;
	      padding: 7px 10px;
	      .search_box {
	        position: relative;
	        width: 100%;
	        height: 30px;
	        background: #efeff4;
	        border-radius: 5px;
	        padding: 0 10px;
	       
	        input{
	          position: absolute;
	          width: 100%;
	          // height: 20px;
	          border-width: 0rem;
	          font-size: 13px;
	          line-height: 13px;
	          padding: 7px 25px ;
	        }
	         
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
