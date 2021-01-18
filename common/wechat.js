import fetch from '@/utils/request' // 我自己的请求封装，可以引用自己的
var jweixin = require('jweixin-module');  

export default {  
        //判断是否在微信中  
    isWechat:function(){  
        var ua = window.navigator.userAgent.toLowerCase();  
        if(ua.match(/micromessenger/i) == 'micromessenger'){  
            return true;  
        }else{  
            return false;  
        }  
    },  
        //初始化sdk配置  
    initJssdk:function(callback ,url){  
		//服务端进行签名 ，可使用uni.request替换。 签名算法请看文档
		fetch.request('{后端处理jssdk签名地址}',{url:url}).then(data => {
			console.log('initJssdk',data)
			if(data){  
			    jweixin.config(data);
			    //配置完成后，再执行分享等功能
			    if(callback){  
			        callback(res.data);  
			    }  
			}
		}).catch(e => {
			console.log(e)
		})
    },  
        //在需要自定义分享的页面中调用  
    share:function(data ,url){  
        url = url ? url :window.location.href;
		// url = encodeURIComponent(url)
        if(!this.isWechat()){  
            return ;  
        }  
                //每次都需要重新初始化配置，才可以进行分享  
        this.initJssdk(function(signData){  
            jweixin.ready(function(){    
                var shareData = {  
                     title: data&&data.title ? data.title: signData.site_name,  
                     desc: data&&data.desc ? data.desc: signData.site_description,  
                     link: url,  
                     imgUrl: data&&data.img ?data.img :signData.site_logo,  
                     success: function (res) {
						//用户点击分享后的回调，这里可以进行统计，例如分享送金币之类的
						// fetch.request('/api/member/share');
                     },  
                     cancel: function (res) {  
                     }  
                 };  
                 //分享给朋友接口  
                 jweixin.onMenuShareAppMessage(shareData);  
                 //分享到朋友圈接口  
                 jweixin.onMenuShareTimeline(shareData);  
            });  
        } ,url);  
    },
}