import request from '@/utils/request'

//获取验证码
export function getAuthCode(params) {
	return request.globalRequest('/sso/getAuthCode',"GET",params)
}

//登录
export function loginCode(params) {
  // return request({
  //   url: '/sso/smsCodeLogin',
  //   method: 'post',
  //   params: {
  //     "telephone":telephone,
  //     "authCode":authCode
  //   }
  // })
  
  console.log(params)
  return request.globalRequest('/sso/smsCodeLogin' ,"POST",params);
}
  //获取用户信息
export function getInfo() {
    // return request({
    //   url: '/sso/info',
    //   method: 'get',
    // })
	return request.globalRequest('/sso/info' ,"GET",null);
}
//刷新token
export function refreshToken() {
	// return request({
	// 	url:'/sso/token/refresh',
	// 	method:'get'
	// })
	return request.globalRequest('/sso/token/refresh' ,"GET",null);
}
//退出登录
export function logout() {
	// return request({
	// 	url:'/sso/logout',
	// 	method:'post'
	// })
	return request.globalRequest('/sso/logout' ,"POST",null);
}

export function  weChatLogin(params) {
	return request.globalRequest('/sso/weChatLogin' ,"POST",params);
}

export function userInfoUpdate(params){
	return request.globalRequest('/sso/info/update' ,"POST",params);
}

