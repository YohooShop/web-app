<template>
	<view class="component-video component-view">
		   <!-- 封面图片 -->
		    <view class="video-poster" :style='posterStyle' v-if="!isPlay" @click="play">
		      <view class="icon-play"></view>
		    </view>
		
		    <!-- 视频元素 -->
		    <video :id="'video'+id"  :src="videoLink" @ended="playEnd" controls ></video>
	</view>
</template>

<script>
	import {checkMiniProgram, rem2px, viewWidth} from '@/utility/landpage'
	 export	default  {
		props:{
			//封面图地址
			imageUrl:String,
			//视屏地址
			videoLink:String,
			
			 //组件唯一的ID
			    id:{
			      type:String,
			      required:true
			    },
		},
		  computed:{
		    //根据设置参数计算样式
		    style(){
		      let style='';
		     style+=`margin-top:${this.marginTop/rem2px}rem;margin-bottom:${this.marginBottom/rem2px}rem;margin-left:auto;margin-right:auto;`
		    		  
		     style+=`width:100%;`
		      return style
		    },
		    //根据设置参数计算封面图片
		    posterStyle(){
		      let style='';
		      if(this.imageUrl){
		        style+=`background-image:url(${this.imageUrl})`
		      }      
		      return style
		    }
		  },
		data() {
		    return {    
		       isPlay: false,  
			   video:null,
		    }
		},
		created() {
			console.log('----------------')
			this.video = uni.createVideoContext(this.id)
			console.log(this.video )
		},
		
		
		methods:{
			 //开始播放
			    play(e){
			      if(this.videoLink){  
					let video = this.video 
					console.log(video)
			        if(video){
			          video.play()     
			          this.isPlay = true
			        }  
			      }else{
			        if(window.landpage_env!='editor'){
			          this.$message.error('未添加视频链接！')
			        } 
			      }          
			    },
			    //监听播放结束
			    playEnd(e){
			      this.isPlay = false
			    }	 
		}
	 }
	
</script>

<style scoped lang="scss">
		@import "@/components/landpages/landpages.scss";

 .component-view{
            position: relative;
            min-height:0.36rem;
            //层级子元素
            &.component-child{
                z-index: 10;
            }
        }
.component-video{
  position: relative;
  

  video{
    width:100%;
    display: block;
    object-fit:fill;
  }  

  .video-poster {
    width:100%;
    height:100%;
    position: absolute;
    z-index:10;
    top:0;
    left:0;
    background-color: rgba($color: #000000, $alpha:0.5);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    display: flex;
    justify-content: center;
    align-items: center;
  
    .icon-play{
      width:0.46rem;
      height:0.46rem;
      background-size: contain;
      background-image: url(http://media.yohooshop.com/mall/static/app/icon_play.png);
      margin-top:-0.26rem;
    }
  }
  

  &.component-child{    
    video{
      height:100%;
    }    
  }
}
</style>
