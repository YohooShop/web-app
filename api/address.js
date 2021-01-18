import request from '@/utils/request'

/**
 * 收货地址管理
 * */

//新增
export function addAddress(data){
	// return request({
	//   url: '/member/address/add',
	//   method: 'post',
	//   data: data,
	// })
	return request.globalRequest('/member/address/add',"POST",data);
}
//修改

export function updateAddress(id,data){
	
	// return request({
	// 	url:'/member/address/update/' +id,
	// 	method: 'post',
	// 	data: data
	// })
	
	return request.globalRequest('/member/address/update/' +id ,"POST",data);
}

//删除
export function  delAddress(id){
	// return request({
	//   url: '/member/address/delete/' + id,
	//   method: 'post'
	// })
	return request.globalRequest('/member/address/delete/' +id ,"POST",null);
}

//获取全部
export function  getAllAddresses(){
	// return request({
	//   url: '/member/address/list' ,
	//   method: 'get'
	// })
	return request.globalRequest('/member/address/list' ,"GET",null);
}
//获取单个
export function  getAddress(id){
	// return request({
	//   url: '/member/address/' +id,
	//   method: 'get'
	// })
	return request.globalRequest('/member/address/' +id ,"GET",null);
}