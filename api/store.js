import request from '@/utils/request'

 export function listall(){
	return request.globalRequest('/store/listall',"GET");
 }
 
 export function detail(id){
 	return request.globalRequest('/store/detail/'+id,"GET");
 }
 