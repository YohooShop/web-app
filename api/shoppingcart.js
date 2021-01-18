import request from '@/utils/request'

/**
 * 购物车接口
 * **/
 
 //添加商品到购物车
 export function addShoppingCart(params,type){
 	// return request({
 	//   url: '/cart/add',
 	//   method: 'post',
 	//   data: data,
	 //  params: params
 	// })
	
	return request.globalRequest('/cart/add/'+type,"POST",params );
 }
 
 //POST /cart/clear 清空购物车
 
 export function clearShoppingCart(){
 	// return request({
 	//   url: '/cart/clear',
 	//   method: 'post',
 	// })
	
	return request.globalRequest('/cart/clear',"POST");
 }
 
 //POST /cart/delete 删除购物车中的某个商品
 export function deleteShoppingCart(params){
 	// return request({
 	//   url: '/cart/delete',
 	//   method: 'post',
 	//   params: params,
 	// })
	return request.globalRequest('/cart/delete',"POST",params);
 }
 
 //GET /cart/getProduct/{productId}获取购物车中某个商品的规格,用于重选规格
 
 export function getProductShoppingCart(productId){
 	// return request({
 	//   url: '/cart/getProduct/' + productId,
 	//   method: 'get',
 	// })
	return request.globalRequest('/cart/getProduct/'+ productId,"GET");
 }
 
 //GET /cart/list获取某个会员的购物车列表
 export function getShoppingCartList(){
 	// return request({
 	//   url: '/cart/list',
 	//   method: 'get',
 	// })
	return request.globalRequest('/cart/list',"GET");
 }
 
 //GET /cart/list/promotion获取某个会员的购物车列表,包括促销信息
 
 
 export function getShoppingCartListPromotion(){
 	// return request({
 	//   url: '/cart/list/promotion',
 	//   method: 'get',
 	// })
	return request.globalRequest('/cart/list/promotion',"GET");
 }
 
 
 //POST /cart/update/attr修改购物车中商品的规格
 export function updateShoppingCartAttr(data){
 	// return request({
 	//   url: '/cart/update/attr',
 	//   method: 'post',
	 //  data: data,
 	// })
	return request.globalRequest('/cart/update/attr',"POST",data);
 }
 
 //GET /cart/update/quantity修改购物车中某个商品的数量
 
 export function updateShoppingCartuQantity(params){
 	// return request({
 	//   url: '/cart/update/quantity',
 	//   method: 'get',
 	//   params: params,
 	// })
	return request.globalRequest('/cart/update/quantity',"GET",params);
 }
 
 //POST /cart/calculateProducts  计算购物车选中商品的价格
 
 export function calculateProducts(params){
 	// return request({
 	//   url: '/cart/calculateProducts',
 	//   method: 'post',
 	//   params: params,
 	// })
	return request.globalRequest('/cart/calculateProducts',"POST",params);
 }
 