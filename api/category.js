import request from '@/utils/request'

/**
 * 类别接口 
 * */
 
  export function productCate(){
	  // return request({
	  //   url: '/home/productCate',
	  //   method: 'get',
	  // })
	  return request.globalRequest('/home/productCate' ,"GET");
  }
  
  export function productCateList(params){
	 //  return request({
	 //    url: '/home/productList',
	 //    method: 'get',
		// params:params
	 //  })
	  return request.globalRequest('/home/productList' ,"GET",params);
  }
 