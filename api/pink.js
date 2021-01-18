import request from '@/utils/request'


 export function pinkPath(params){
	 return request.globalRequest('/goods/pink/path', 'GET',params)
 }
 
 export function doPink(params, path) {
 	 return request.globalRequest('/goods/'+ path + '/pink/', 'POST',params)
 }
 
 
 export function pinkResult(params){
 	 return request.globalRequest('/goods/pinkResult', 'POST',params)
 }
 
 export function pinkInfo(id){
	  return request.globalRequest('/goods/pink/info/'+id, 'GET')
 }
 
export function pinkProductList(params){
	 return request.globalRequest('/home/pinkProductList', 'GET')
}

export function minePinkList(params,type){
	 return request.globalRequest('/pink/mine/'+type, 'GET', params)
}