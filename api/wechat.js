import request from '@/utils/request'

export function bindWX(param){
	// return request({
	//   url: '/member/address/add',
	//   method: 'post',
	//   data: data,
	// })
	return request.globalRequest('/bindWX',"POST",param);
}

export function cancelBindWX(){
	// return request({
	//   url: '/member/address/add',
	//   method: 'post',
	//   data: data,
	// })
	return request.globalRequest('/cancelBindWX',"POST",);
}

export function payOrderJS(params){
	 return request.globalRequest('/wechatpay/payOrderJS',"POST",params );
}

export function payOrder(params){
	 return request.globalRequest('/wechatpay/payOrder',"POST",params );
}

export function payOrderSP(params){
	 return request.globalRequest('/wechatpay/payOrderSP',"POST",params );
}

export function payOrderH5(params){
	 return request.globalRequest('/wechatpay/payOrderH5',"POST",params );
}

