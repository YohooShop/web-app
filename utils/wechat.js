import request from '@/utils/request';
var jweixin = require('jweixin-module/lib/index.js');
export default {
    //判断是否在微信中  
    isWechat: function() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/micromessenger/i) == 'micromessenger') {
            // console.log('是微信客户端')
            return true;
        } else {
            // console.log('不是微信客户端')
            return false;
        }
    },
	//初始化sdk配置  
	initJssdkShare: function(callback, url) {
		 console.log("init Url : "+url)	
		 // url = decodeURIComponent(url)
		 let params = {url:url}
		 request.globalRequest('/wechat/share/getSignPackage',"POST",params).then(res=>{
			 console.log(res)
			 let result = res.data;
			 jweixin.config({
			    debug: true,
			    appId: result.appId,
			    timestamp: result.timestamp,
			    nonceStr: result.nonceStr,
			    signature: result.signature,
			    jsApiList: [
			        'checkJsApi',
			        'onMenuShareTimeline',
			        'onMenuShareAppMessage'
			    ]
			});
			//配置完成后，再执行分享等功能  

			if (callback) {
			    callback(result);
			}						 
		 }).catch(e=>{
			 
		 })
		
	},
	 //在需要自定义分享的页面中调用  
	share: function(data, url) {
	        url = url ? url : window.location.href;
	        console.log("url:"+url)
	        if (!this.isWechat()) {
	            return;
	        }
			

	        //每次都需要重新初始化配置，才可以进行分享  
	        this.initJssdkShare(function(signData) {
			console.log("--------")
		
	            jweixin.ready(function() {
						
	                var shareData = {
	                    title: data && data.title ? data.title : signData.site_name,
	                    desc: data && data.desc ? data.desc : signData.site_description,
	                    link: url,
	                    imgUrl: data && data.img ? data.img : signData.site_logo,
	                    success: function(res) {
	                        // 分享后的一些操作,比如分享统计等等
	                    },
	                    cancel: function(res) {}
	                };
	                //分享给朋友接口  
	                jweixin.onMenuShareAppMessage(shareData);
	                //分享到朋友圈接口  
	                jweixin.onMenuShareTimeline(shareData);
	            });
	        }, url);
	    },
		
		
		
	//支付
	
	pay:function(data,cb){
		   function onBridgeReady() {
		       WeixinJSBridge.invoke('getBrandWCPayRequest',{
					appId:data['appId'],  
					timeStamp: data['timeStamp'],  
					nonceStr: data['nonceStr'],
					package: data['packageValue'],
				   	signType: data['signType'],
				   	paySign: data['paySign'],
			   },
		       function(res) {
				   cb(res)
		       })
		   }
		   if  (typeof WeixinJSBridge == "undefined") {
		       if ( document.addEventListener ) {
		           document.addEventListener('WeixinJSBridgeReady',  onBridgeReady,  false)
		       } else  if  (document.attachEvent) {
		           document.attachEvent('WeixinJSBridgeReady',  onBridgeReady);
		           document.attachEvent('onWeixinJSBridgeReady',  onBridgeReady)
		       }
		   } else {
		       onBridgeReady()
		   }
	},
		
	
	
}