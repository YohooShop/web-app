import request from '@/utils/request'
/**秒杀场景*/
export function killSence(){
	return request.globalRequest('/goods/kill/sence',"GET");
}

export function killList(id){
	return request.globalRequest('/goods/kill/sence/detail/'+id, 'GET')
}

/**
 * 秒杀路径
 * */
 
 export function killPath(params){
	 return request.globalRequest('/goods/kill/path', 'GET',params)
 }
 
 //秒杀商品
 
 export function kill(params, path) {
	 return request.globalRequest('/goods/'+ path + '/kill/', 'POST',params)
 }
 
 //查询秒杀结果
 
 
 export function killResult(params){
	 return request.globalRequest('/goods/killResult', 'POST',params)
 }