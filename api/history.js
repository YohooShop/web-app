import request from '@/utils/request'

/**
 * 会员商品浏览记录管理 
 * */
 
 //创建浏览记录 /member/readHistory/create
 
 export function createHistory(data){
 	// return request({
 	//   url: '/member/readHistory/create',
 	//   method: 'post',
 	//   data: data,
 	// })
	
	return request.globalRequest('/member/readHistory/create',"POST",data);
 }
 
 export function historyList(){
	 // return request({
	 //   url: '/member/readHistory/list',
	 //   method: 'get',
	 // })
	 return request.globalRequest('/member/readHistory/list',"GET");
 }
 