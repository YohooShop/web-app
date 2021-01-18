import store from '../store'
import {
	getToken
} from '@/utils/auth'
import { refreshToken } from '@/api/login';
import mHelper from '@/utils/helper';
import urlConfig from '@/config/config'
const request = {}
const headers = {}
let isRefreshing = false;
request.globalRequest = (url, method, data) => {
	/*     权限判断 因为有的接口请求头可能需要添加的参数不一样，所以这里做了区分
	    1 == 不通过access_token校验的接口
	    2 == 文件下载接口列表
	    3 == 验证码登录 */
	headers['Authorization'] = getToken()
	headers['content-type'] = 'application/x-www-form-urlencoded' 
	
	
	  return uni.request({
	        url: urlConfig + url,
	        method,
	        data: data,
	        header: headers
	    }).then(res => {
			console.log(res);
		    if (res.length == 1){
				return Promise.reject()
			}else{
				if (res[1].data.code == 200) {
				    return res[1].data	
				} else {
				    throw res[1]
				}
			}
	       
	    }).catch(err => {
			console.log(err)
			console.log(err.statusCode)
			switch (err.statusCode) {
				case 400:
					mHelper.toast('错误的请求');
					return Promise.reject(err.message);
				break;
				case 401:
				
					isRefreshing = false;
					if (url === refreshToken) {
						uni.clearStorageSync()
						store.dispatch('FedLogOut').then(() => {
							uni.showModal({
								content: '会话已过期，是否跳转登录页面？',
								success: confirmRes => {
									if (confirmRes.confirm) {
										mHelper.backToLogin();
										throw err.message;
									}
								}
							});
						})
					}else{
						
						uni.clearStorageSync()
						store.dispatch('FedLogOut').then(() => {
							mHelper.backToLogin();
						})	
					}				
				break;
				case 405:
					mHelper.toast('当前操作不被允许');
					return Promise.reject(err.message);
				case 404:
					mHelper.toast(err.message);
					return Promise.reject(err.message);
				case 429:
					mHelper.toast('请求过多，先休息一下吧');
					return Promise.reject(err.message);
				case 500:
					mHelper.toast('服务器打瞌睡了');
				    return Promise.reject(err.message);
				default:
					mHelper.toast(err.message);
					return Promise.reject(err.message);
				}
	　　})
}

	

export default request
