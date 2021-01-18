<template>
	  <view class="picture-cube" v-if="cubeData">
	        <!--一图模式-->
	        <view class="one-mode" v-if="cubeData.mode == 1">
	            <view class="title" v-if="cubeData.cubeTitle">{{cubeData.cubeTitle}}</view>
	             <!--第一种表现形式-->
	            <view v-for="(item, index) in cubeData.cubeImages" :key="index">
	                    <image :src="item.imageUrl" mode="widthFix" @click="clickItem(item)"/>
	            </view>
	        </view>
	        <!--二图模式-->
	        <view class="two-mode" v-if="cubeData.mode==2">
	            <view class="title" v-if="cubeData.cubeTitle">{{cubeData.cubeTitle}}</view>
	            <!--第一种表现形式-->
	            <view class="first-show" v-if="cubeData.showType == '2_1'">
	                <view class="item" v-for="(item, index) in cubeData.cubeImages" :key="index">
	                     <image :src="item.imageUrl" mode="widthFix" @click="clickItem(item)"/>
	                </view>
	            </view>
	
	            <!--第二种表现形式-->
	            <view class="common-show" v-if="cubeData.showType == '2_2'">
	                <view class="item">
	                    <image :src="cubeData.cubeImages[0].imageUrl" mode="widthFix" @click="clickItem(cubeData.cubeImages[0])"/>
	                </view>
	                <view class="two-item">
	                    <image :src="cubeData.cubeImages[1].imageUrl" mode="widthFix" @click="clickItem(cubeData.cubeImages[1])"/>
	                </view>
	            </view>
	            <!--第三种表现形式-->
	            <view class="common-show" v-if="cubeData.showType == '2_3'">
	                <view class="two-item">
	                    <image :src="cubeData.cubeImages[0].imageUrl" mode="widthFix" @click="clickItem(cubeData.cubeImages[0])"/>
	                </view>
	                <view class="item">
	                    <image :src="cubeData.cubeImages[1].imageUrl" mode="widthFix" @click="clickItem(cubeData.cubeImages[1])"/>
	                </view>
	            </view>
	        </view>
	        <!--三图模式-->
	        <view class="three-mode" v-if="cubeData.mode==3">
	            <view class="title" v-if="cubeData.cubeTitle">{{cubeData.cubeTitle}}</view>
	             <!--第一种表现形式-->
	            <view class="first-show" v-if="cubeData.showType == '3_1'">
	                <view class="item" v-for="(item, index) in cubeData.cubeImages" :key="index">
	                     <image :src="item.imageUrl" mode="widthFix" @click="clickItem(item)"/>
	                </view>
	            </view>
	            <!--第二种表现形式-->
	            <view class="common-show" v-if="cubeData.showType == '3_2'">
	                <view class="item" v-for="(item, index) in cubeData.cubeImages" :key="index">
	                    <view v-if="index==0">
	                         <image :src="item.imageUrl" mode="widthFix" @click="clickItem(item)"/>
	                    </view>
	                    <view class="info" v-else>
	                        <image :src="item.imageUrl" mode="widthFix" @click="clickItem(item)"/>
	                    </view>
	                </view>
	            </view>
	            <!--第三种表现形式-->
	            <view class="common-show" v-if="cubeData.showType == '3_3'">
	                <view class="item" v-for="(item, index) in cubeData.cubeImages" :key="index">
	                    <view v-if="index==2">
	                         <image :src="item.imageUrl" mode="widthFix" @click="clickItem(item)"/>
	                    </view>
	                    <view class="info" v-else>
	                        <image :src="item.imageUrl" mode="widthFix" @click="clickItem(item)"/>
	                    </view>
	                </view>
	            </view>
	        </view>
	        <!--四图模式-->
	        <view class="four-mode" v-if="cubeData.mode==4">
	            <view class="title" v-if="cubeData.cubeTitle">{{cubeData.cubeTitle}}</view>
	            <!--第一种表现形式-->
	            <view class="first-show" v-if="cubeData.showType == '4_1'">
	                <view class="item" v-for="(item, index) in cubeData.cubeImages" :key="index">
	                     <image :src="item.imageUrl" mode="widthFix" @click="clickItem(item)"/>
	                </view>
	            </view>
	
	            <!--第二种表现形式-->
	            <view class="second-show" v-if="cubeData.showType == '4_2'">
	                <view class="item" v-for="(item, index) in cubeData.cubeImages" :key="index">
	                     <image :src="item.imageUrl" mode="widthFix" @click="clickItem(item)"/>
	                </view>
	            </view>
	        </view>
	    </view>
</template>

<script>
	export default {
		props:{
			cubeData:{
			    type:Object,
			    value:'',
			},
		},
		
		methods:{
			clickItem(item) {
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
</script>

<style scoped lang="scss">
	@import "@/components/landpages/landpages.scss";
	//图片魔方
	.picture-cube{
	  background-color: #FFFFFF;
	  margin-bottom: 10px;
	  .title{
	    color:#202020;
	    text-align: center;
	    padding: 10px 0;
	    font-size: 16px;
	  }
	  //一图模式
	  .one-mode{
	    image{
	      width: 100%;
	      object-fit: cover
	    }
	  }
	  //二图模式
	  .two-mode{
	    //  第一种表现形式
	    .first-show{
	      display: flex;
	      .item{
	        flex: 1;
	        padding: 5px;
	        image{
	          width: 100%;
	          object-fit: cover
	        }
	      }
	    }
	    .common-show{
	      display: flex;
	      .item{
	        flex: 1;
	        padding: 5px;
	        image{
	          width: 100%;
	          height: 100%;
	          object-fit: cover
	        }
	      }
	      .two-item{
	        flex: 2;
	        padding: 5px;
	        image{
	          width: 100%;
	          object-fit: cover
	        }
	      }
	    }
	  }
	  //  三图模式
	  .three-mode{
	    .first-show{
	      display: flex;
	      .item{
	        flex: 1;
	        padding: 5px;
	        image{
	          width: 100%;
	          object-fit: cover
	        }
	      }
	    }
	    .common-show{
	      display: flex;
	      .item{
	        flex: 1;
	        padding: 5px;
	        image{
	          width: 100%;
	          object-fit: cover
	        }
	        .info{
	          height: 50%;
	          padding: 5px;
	          image{
	            height: 100%;
	            object-fit: cover
	          }
	        }
	      }
	    }
	  }
	  //  四图模式
	  .four-mode{
	    .first-show{
	      display: flex;
	      flex-wrap: wrap;
	      .item{
	        width: 47%;
	        padding: 5px;
	          image{
	            width: 100%;
	            object-fit: cover
	        }
	      }
	    }
	    .second-show{
	      display: flex;
	      .item{
	        flex: 1;
	        padding: 5px;
	        image{
	          width: 100%;
	          object-fit: cover
	        }
	      }
	    }
	  }
	}
</style>
