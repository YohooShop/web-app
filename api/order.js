import request from '@/utils/request'

//订单接口

export function generateConfirmOrder(params){
	return request.globalRequest('/order/generateConfirmOrder',"POST",params );
 }
 
 
 export function generateOrder(params){
	 return request.globalRequest('/order/generateOrder',"POST",params );
 }
 
 export function generateFaceOrder(params){
	return request.globalRequest('/order/generateFaceOrder',"POST",params );
 }
 
  export function updateOrderInfo(params){
	   return request.globalRequest('/order/updateOrderInfo',"POST",params );
  }
  export function getOrderInfo(params){
	  return request.globalRequest('/order/getOrderInfo',"GET",params );
  }
  export function generateKillOrder(params,data) {
	  return request.globalRequest('/order/generateKillOrder',"POST",params )
  }
 export function orderDetail(params){
	 return request.globalRequest('/order/orderDetail',"POST",params );
 }
 export function orderDetailBySn(params){
 	return request.globalRequest('/order/orderDetailBySn',"POST",params );
 }
 export function alipayPayOrder(params){
	 return request.globalRequest('/alipay/payOrder',"POST",params );
	 
 }
 
 export function alipayPayH5Order(params){
	 return request.globalRequest('/alipay/payH5Order',"POST",params );
 }
 
 export function orders(params){
	  return request.globalRequest('/order/orders',"POST",params );
 }
 
 export function cancelOrder(params){
	return request.globalRequest('/order/cancelOrder',"POST",params );
 }

export function delOrder(params){
	return request.globalRequest('/order/delOrder',"POST",params );
}
export function confirmReceiptOrder(params){
	return request.globalRequest('/order/confirmReceipt',"POST",params );
}
export function aliPayNotice(params){
	return request.globalRequest('/order/paySuccess',"POST",params);
}

export function refund(params){
	return request.globalRequest('/orderRefund/apply',"POST",params);
}

export function logisticstInfo(params){
	return request.globalRequest('/logistic/info',"POST",params);
}

export function payOrderDetail(params){
	return request.globalRequest('/order/payOrderInfo',"POST",params);
}


export function getFaceOrder(params){
	return request.globalRequest('/order/getFaceOrder',"POST",params);
}

