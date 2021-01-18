<template>
	<!-- <view>
	   <button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">使用微信登录</button>
	</view> -->
	
	 <view>
	    
	        <view v-if="isCanUse">
	            <view>
	                <view class='header'>
	                    <image src='http://media.yohooshop.com/mall/static/app/wx_login.png'></image>
	                </view>
	                <view class='content'>
	                    <view>申请获取以下权限</view>
	                    <text>获得你的公开信息(昵称，头像、地区等)</text>
	                </view>
	               <!-- <button type="bottom" open-type="getPhoneNumber" lang="zh_CN" @getphonenumber="getPhoneNumber">手机号一键登录</button> -->
	              <!--  <button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="getUserInfo">
	                    授权登录
	               </button> -->
				   <button class='bottom' type='primary' @click="login()" withCredentials="true" lang="zh_CN">
				        授权登录
				   </button>
	            </view>
	        </view>
	      
		</view>	
		
</template>

<script>
	
var _self, pageOptions, session_key, openid;

export default {
	data() {
	    return { 
			 isCanUse: uni.getStorageSync('isCanUse')||true//默认为true
	    };
	},
	

    methods:{
		  // #ifdef MP-WEIXIN
		 onGetPhoneNumber(e) {  
		                console.log("onGetPhoneNumber", e);  
		                console.log(e.detail.errMsg);  
		                console.log(e.detail.iv);  
		                console.log(e.detail.encryptedData);  
		                uni.showModal({  
		                    title: "onGetPhoneNumber",  
		                    content: e.detail.errMsg  
		                })  
		  },  
		 // #endif		
					
        // #ifdef MP-WEIXIN
        getUserInfo : (info) => {
            info = info.mp.detail.userInfo;
			console.log(info)
            //userInfo {"nickName":"深海","gender":1,...avatarUrl":"https://7tdPvkPaJlkaLFFbLAffGVApluZdanLkDVplNlAhq1EJA/132"}
            // 与服务器交互将数据提交到服务端数据库
            uni.request({
                url: _self.apiServer+'member&m=login',
                method: 'POST',
                header: {'content-type' : "application/x-www-form-urlencoded"},
                data: {
                    openid : openid,
                    name   : info.nickName,
                    face   : info.avatarUrl,
                },
                success: res => {
                    console.log(res);
                    res = res.data;
                    // 登录成功 记录会员信息到本地
                    if(res.status == 'ok'){
                        uni.showToast({title:"登录成功"});
                        uni.setStorageSync('SUID' , res.data.u_id + '');
                        uni.setStorageSync('SRAND', res.data.u_random + '');
						uni.setStorageSync('SNAME', res.data.u_name + '');
                        uni.setStorageSync('SFACE', res.data.u_face + '');
                        // 跳转
                        if(pageOptions.backtype == 1){
                            uni.redirectTo({url:pageOptions.backpage});
                        }else{
                            uni.switchTab({url:pageOptions.backpage});
                        }
                    }else{
                        uni.showToast({title:res.data});
                    }
                },
                fail: (e) => {
                    console.log(JSON.stringify(e));
                }
            });
            
        },
        // #endif
		
		login(){
			 // #ifdef MP-WEIXIN
			// 调用 微信 login 获取 code
			uni.login({
			    success: (res) => {
					 let params = {'code':res.code}
					_self.$store.dispatch('WeChatLogin',params).then((result) => {
						console.log(result)
						session_key = result.data.session_key;
						openid      = result.data.openid;
					}).catch((error) => {
						 console.log(error);
					})
			    }
			});
			// #endif
			//app 端微信登录
			// 手册位置 https://uniapp.dcloud.io/api/plugins/login?id=getuserinfo
			// #ifdef APP-PLUS
			uni.login({
			    success: (res) => {
			        // res 对象格式
			        //{"code":"***",
			        //"authResult":{
			            //"openid":"***",
			            //"scope":"snsapi_userinfo",
			            //"refresh_token":"**",
			            //"code":"****",
			            //"unionid":"***",
			            //"access_token":"***",
			            //"expires_in":7200
			        //},
			        //"errMsg":"login:ok"}
			        uni.getUserInfo({
			            success: (info) => {
			                // info 对象格式
			                // {"errMsg":"getUserInfo:ok",
			                // "rawData":"...
			                // "userInfo":{
			                    //"openId":"***",
			                    //"nickName":"***",
			                    //"gender":1,
			                    // "city":"Xi'an",
			                    // "province":"Shaanxi",
			                    // "country":"China",
			                    // "avatarUrl":"头像",
			                    // "unionId":"oU5Yyt_agt547zWyA0v0eLfFPqxo"
			                //},"signature":""}
			                // 与服务器交互将数据提交到服务端数据库
			                uni.request({
			                    url: _self.apiServer+'member&m=login',
			                    method: 'POST',
			                    header: {'content-type' : "application/x-www-form-urlencoded"},
			                    data: {
			                        openid : info.userInfo.openId,
			                        name   : info.userInfo.nickName,
			                        face   : info.userInfo.avatarUrl,
			                    },
			                    success: res => {
			                        console.log(JSON.stringify(res));
			                        res = res.data;
			                        // 登录成功 记录会员信息到本地
			                        if(res.status == 'ok'){
			                            uni.showToast({title:"登录成功"});
			                            uni.setStorageSync('SUID' , res.data.u_id + '');
			                            uni.setStorageSync('SRAND', res.data.u_random + '');
							                        uni.setStorageSync('SNAME', res.data.u_name + '');
			                            uni.setStorageSync('SFACE', res.data.u_face + '');
			                            // 跳转
			                            if(options.backtype == 1){
			                                uni.redirectTo({url:options.backpage});
			                            }else{
			                                uni.switchTab({url:options.backpage});
			                            }
			                        }else{
			                            uni.showToast({title:res.data});
			                        }
			                    },
			                    fail: (e) => {
			                        console.log(JSON.stringify(e));
			                    }
			                });
			            },
			            fail: () => {
			                uni.showToast({title:"微信登录授权失败"});
			            }
			        })
			    },
			    fail: () => {
			        uni.showToast({title:"微信登录授权失败"});
			        uni.hideLoading();
			    }
			})
			// #endif
		}
    },
	
	
    onLoad:function(options){
        _self = this;
        pageOptions = options;
       
      
    }


}

</script>

<style>
	 .header {
	        margin: 90rpx 0 90rpx 50rpx;
	        border-bottom: 1px solid #ccc;
	        text-align: center;
	        width: 650rpx;
	        height: 300rpx;
	        line-height: 450rpx;
	    }
	
	    .header image {
	        width: 200rpx;
	        height: 200rpx;
	    }
	
	    .content {
	        margin-left: 50rpx;
	        margin-bottom: 90rpx;
	    }
	
	    .content text {
	        display: block;
	        color: #9d9d9d;
	        margin-top: 40rpx;
	    }
	
	    .bottom {
	        border-radius: 80rpx;
	        margin: 70rpx 50rpx;
	        font-size: 35rpx;
	    }
</style>
