<template>
	  <view class="marketing-time-box">
	        <view class="seckill-item" v-if="active" key="1">
	            <view v-if="endtype == 0">
	                <view class="time-text">
	                    {{message}}
	                </view>
	            </view>
	            <view class="time-out" v-if="endtype == 1" key="2">
	                <view class="text">距离{{typename}}结束还剩余</view>
	                <view class="item">
	                    <span class="num-item">
	                         {{endTime.hour}}
	                    </span>时
	                    <span class="num-item">
	                         {{endTime.minute}}
	                    </span>分
	                    <span class="num-item">
	                         {{endTime.second}}
	                    </span>秒
	                </view>
	            </view>
	        </view>
	        <view class="seckill-item" v-else key="3" >
	            <view v-if="type == 0" key="4">
	                <view class="time-text">
	                     {{message}}
	                </view>
	            </view>
	            <view class="time-out" v-if="type==1" key="5">
	                <view class="text">距离{{typename}}开始还剩余</view>
	                <view class="item">
	                    <span class="num-item">
	                         {{startsTime.hour}}
	                    </span>时
	                    <span class="num-item">
	                      
	                         {{startsTime.minute}}
	                    </span>分
	                    <span class="num-item">
	                         {{startsTime.second}}
	                    </span>秒
	                </view>
	            </view>
	        </view>
	    </view>
</template>

<script>
export default {
	name:'Seckill',
	props:{
	        end: {
				type: String,
				value: null,
			},
			starts: {
				type: String,
				value : null
			},
			index: {
				type: Number,
				value : 0
			},
			findex: {
				type: Number,
				value : 0
			},
			server: {
				type: String,
				value : null
			},
			mold: {
				type: String,
				value : 'goods'
			},
	        typename: {
				type: String,
				value: '秒杀'
			}
	    },
	    data() {
	        return {
	            message: '',
	            active: false,
	            type: 0,
	            endtype:0,
	            endTime: {
	                interval: '',
	                day: 0,
	                hour: 0,
	                minute: 0,
	                second:0,
	                count: 0,
	            },
	            startsTime: {
	                interval: '',
	                day: 0,
	                hour: 0,
	                minute: 0,
	                second:0,
	                count: 0,
	            },
	            config: ''
	        }
	    },
	    methods:{
	        //    		活动开始的倒计时
			countTime() {
	            	var d = 86400000,
	                    h = 3600000,
	                    n = 60000,
	                    end = this.end,
	                    server = this.server,
	                    arr = String(end).split(/\D/),
	                    newArr = String(server).split(/\D/);
	                    newArr = newArr.map(Number);
	                    arr = arr.map(Number);
	
	                var serverTime = new Date(newArr[0], newArr[1] - 1, newArr[2], newArr[3], newArr[4], newArr[5]).getTime();
	                var endTime = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]).getTime();
	    //		        组件才秒杀列表页使用时，没有重新请求列表，服务器时间应该加上未开始倒计时的时间
	                if (this.mold == 'list') {
	                    this.serverTime = serverTime + this.startsTime.count
	                }
	               
	    //		        计算开始时间跟结束时间的差值
	                var timeDiff = endTime - serverTime;
	    //		        在本地计算倒计时
	                var allTime = this.endTime.count + 1000
	                this.endTime.count = allTime;
	                var interval = timeDiff - this.endTime.count;
	                if (interval < d) {
	                    this.endtype = 1;
	                    if (interval < 0) {
	    //		        	活动结束
	                       // this.triggerEvent('end', {findex: this.findex, index: this.index});
	                        clearInterval(this.endTime.interval);
	                        this.message = '秒杀已结束'
	                        this.$set(this,'type',0)
	                        this.endtype = 0;
	                         console.log(this.type)
	                        console.log('秒杀已结束')
	    // 				this.$emit('end',this.index)
	                    } else {
	                        var day = Math.floor(interval / d);
	                        Math.floor(interval -= day * d);
	                        var hour = Math.floor(interval / h);
	                        Math.floor(interval -= hour * h);
	                        var minute = Math.floor(interval / n);
	                        var second =Math.floor(interval% n/1000);
	                        this.endTime.day = day,
	                        this.endTime.hour = hour,
	                        this.endTime.minute = minute,
	                        this.endTime.second = second;
	                        
	                    }
	                } else {
	                   var startArr = String(this.starts).split(/\D/)
	                   var month = arr[1] < 10 ? '0' + arr[1] : arr[1],
	                    day = arr[2] < 10 ? '0' + arr[2] : arr[2],
	                    time = arr[3] < 10 ? '0' + arr[3] : arr[3],
	                    minute = arr[4] < 10 ? '0' + arr[4] : arr[4];
	                    this.message = `${month} 月 ${day} 日，${time} : ${minute} 结束`
	                }
	        },
	
	        //            活动未开始的倒计时
			countStartsTime() {
	            var d = 86400000,
	            	h = 3600000,
					n = 60000,
					sta = this.starts,
					server = this.server,
					arr = String(sta).split(/\D/),
					newArr = String(server).split(/\D/);
				newArr = newArr.map(Number);
				arr = arr.map(Number);
	
				var serverTime = new Date(newArr[0], newArr[1] - 1, newArr[2], newArr[3], newArr[4], newArr[5]).getTime();
				var staTime = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]).getTime();
				var timeDiff = staTime - serverTime;
	            var allTime = this.startsTime.count + 1000
	            this.startsTime.count = allTime;
				var interval = timeDiff - this.startsTime.count;
	
	
	//		        var interval = staTime - nowTime;
	
	//		        时间差小于一天
				if (interval < d) {
	                this.type = 1;
					if (interval < 0) {
	//			        	代表活动已经开始了，需要执行活动开始倒计时
	                   console.log("已经开始了");
						var interval = setInterval(() => {
							this.countTime();
	                    },1000);
	                    this.active = true;
	                    this.endTime.interval = interval
						//this.triggerEvent('starts', {findex: this.findex, index: this.index})
	// 					this.$emit('starts',this.index);
	//                        清除掉倒计时,以免重复分发事件
						clearInterval(this.startsTime.interval);
					} else {
						var day = Math.floor(interval / d);
						Math.floor(interval -= day * d);
						var hour = Math.floor(interval / h);
						Math.floor(interval -= hour * h);
						var minute = Math.floor(interval / n);
	                    var second =Math.floor(interval% n/1000);
	                    this.startsTime.day = day,
	                    this.startsTime.hour = hour,
	                    this.startsTime.minute = minute,
	                    this.startsTime.second = second;
	                    console.log("还没有开始了");
					}
				} else {
	                
					var month = arr[1] < 10 ? '0' + arr[1] : arr[1],
						day = arr[2] < 10 ? '0' + arr[2] : arr[2],
	                    time = arr[3] < 10 ? '0' + arr[3] : arr[3],
	                    minute = arr[4] < 10 ? '0' + arr[4] : arr[4];
	                    this.message = `${month} 月 ${day} 日，${time} : ${minute} 开始`
				}
	        },
	    },
	    created(){
	        var interval = setInterval(() => {
				this.countStartsTime();
	        }, 1000);
	        this.startsTime.interval = interval;
	    }
}
	
</script>

<style scoped lang="scss">
	.marketing-time-box{
	    width: 100%;
	    height: 100%;
	    font-size: 14px;
	  
	    //兼容首页样式
	    &.index{
	      font-size: 12px;
	    }
	    /*.seckill-item{
	      text-align: right;
	      .no-starts{
	        display: none;
	      }
	      .text{
	        display: inline-block;
	        margin: 2px 5px;
	      }
	      .tiem{
	        display: inline-block;
	      }
	      .num-item{
	        display: inline-block;
	        background: #FFFFFF;
	        color: #fe4545;
	       text-align: center;
	        width: 26px;
	        border-radius: 3px;
	      }
	      .zero{
	        display: inline-block;
	      }
	  
	      .time-out{
	        display: flex;
	        align-items: center;
	        justify-content: space-between;
	        flex: 1;
	  
	        .tiem{
	          color: #ffffff;
	          span{
	            color: @countColor;
	          }
	        }
	      }
	      i{
	        display: none;
	      }
	    }
	    .seckill {
	      &.seckill-item{
	        .tiem{
	          color: @countColor;
	          span{
	            background: @mainColor;
	            color: @countColor;
	          }
	        }
	      }
	      .text{
	        color: @countColor;
	      }
	    }*/
	  
	  
	    .seckill-item {
	      text-align: right;
	      color: #ffffff;
	      .time-out {
	        display: flex;
	        align-items: center;
	        justify-content: space-between;
	        .num-item {
	          display: inline-block;
	          text-align: center;
	          width: 26px;
	          border-radius: 3px;
	          background: #FC2F44;
	        }
	      }
	    }
	  }
</style>
