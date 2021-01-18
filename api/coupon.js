import request from '@/utils/request'

/**
 * 优惠券接口
 * **/
 
 //领取指定优惠券
 export function addCoupon(id){
 	// return request({
 	//   url: '/member/coupon/add/'+id,
 	//   method: 'post',
 	// })
	return request.globalRequest('/member/coupon/add/'+id,"POST");
 }
 
 //获取用户优惠券列表
  export function couponList(){
	 //  return request({
	 //    url: '/member/coupon/list',
	 //    method: 'get',
		// params:params
	 //  })
	  
	  return request.globalRequest('/member/coupon/couponList',"GET");
  }
  
  //获取登录会员购物车的相关优惠券
  export function couponListCart(type) {
	  // return request({
	  //   url: '/member/coupon/list/cart/'+type,
	  //   method: 'get',
	  // })	  
	    return request.globalRequest('/member/coupon/list/cart/'+type,"GET");
	  
  }
  
  //获取用户优惠券列表
   export function couponUserlist(params) {
	   return request.globalRequest('/member/coupon/userlist',"GET",params);
   }
  