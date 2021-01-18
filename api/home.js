import request from '@/utils/request'

export function homeData(){
	// return request({
	// 	url:'/home/content',
	// 	 method: 'get'
	// })
	return request.globalRequest('/home/content',"GET");
}

export function homeNewData(){
	return request.globalRequest("/home/newcontent","GET")
}
//GET /home/recommendProductList 分页获取推荐商品
export function reProductList(params){
	// return request({
	// 	url:'/home/recommendProductList',
	// 	method: 'get',
	// 	params: params
	// })
	return request.globalRequest('/home/recommendProductList',"GET",params );
}

export function homeConfigData(){
	return request.globalRequest("/home/config","GET")
}

export function landPagesContent(){
	return request.globalRequest("/home/landPagesContent","GET")
}





