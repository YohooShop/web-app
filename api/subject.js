import request from '@/utils/request'
/**
 * 专题接口
 * **/
 
 export function subjectAllList(params){
	return request.globalRequest('/home/subjectAllList',"GET",params );
 }
 
 //GET /home/subject/detai
export function subjectDetail(params){
	// return request({
	// 	url:'/home/subject/detail',
	// 	method: 'get',
	// 	params: params
	// })
	
	return request.globalRequest('/home/subject/detail',"GET",params );
}

//GET /home/subject/goods
export function subjectGoods(params){
	// return request({
	// 	url:'/home/subject/goods',
	// 	method: 'get',
	// 	params: params
	// })
	return request.globalRequest('/home/subject/goods',"GET",params );
}
//GET /home/subjectList

export function subjectList(params){
	// return request({
	// 	url:'/home/subjectList',
	// 	method: 'get',
	// 	params: params
	// })
	return request.globalRequest('/home/subjectList',"GET",params );
}