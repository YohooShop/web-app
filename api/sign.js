import request from '@/utils/request'

 export function signList(params){
	return request.globalRequest('/member/sign',"GET",params);
 }
 
 export function sign(){
 	return request.globalRequest('/member/sign',"POST");
 }
 