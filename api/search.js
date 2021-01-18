import request from '@/utils/searchRequest'

//GET /esProduct/search/simple
export function searchSimple(params){
	// return request({
	//   url: '/esProduct/search/simple',
	//   method: 'get',
	//   params: params,
	// })
	return request.globalRequest('/esProduct/search/simple',"GET", params);
}
