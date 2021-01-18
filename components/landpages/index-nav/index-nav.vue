<template>
    <view class="quick-nav">
        <view class="nav-content">
            <view class="nav-item" v-for="(item,index) in navData" :key="index" >
                <view class="top-info">
                    <image :src="item.imageUrl" @click="clickItem(item)" />
                </view>
                <view  class="bottom-info">{{item.name}}</view>
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
			 navData:{
			    type:Array,
			    value:'',
			}
		 },
		 computed:{
		 	...mapState(['hasLogin'])	
		 },
		 methods:{
			 clickItem(item){
				 
				 if(item.needLogin && !this.hasLogin) {
					 this.$mHelper.backToLogin();
				 }else{
					 if(item.linkType == 'page') {
					 	console.log(item.link)
					 	uni.navigateTo({
					 		url:item.link
					 	})
					 }
					 if(item.linkType == 'h5') {
					 	// #ifdef H5
					 	      window.open( item.link,'_blank') 
					 	// #endif
					 }
				 }
				 
			 }
		 }
	}
</script>

<style scoped lang="scss">
	@import "@/components/landpages/landpages.scss";
	.quick-nav{
	    background-color: #FFFFFF;
	    margin-bottom: 10px; 
	    .nav-content{
	      display: flex;
	      align-items: center;
	      flex-wrap:wrap;
	      padding: 10px 0 0 0;
	      .nav-item{
	        padding:0px 0px 10px 0px;
	        width: 25%;
	        text-align: center;
	        .top-info{
	          image{
	            width: 30px;
	            height: 30px;
	            border-radius: 50%;
	          }
	        }
	        .bottom-info{
	          padding-top: 5px;
	          color: #000000;
	          font-size: 12px;
	          line-height: 18px;
	          overflow: hidden;
	          white-space: nowrap;
	          text-overflow: ellipsis;
	        }
	      }
	    }
	  }
</style>
