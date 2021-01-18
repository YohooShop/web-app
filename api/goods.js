
import request from '@/utils/request'

export function goodsDetail(id){
	return request.globalRequest('/goods/detail/'+ id,"GET");
}
//goodscollection
export function addGoodsCollection(parmas) {
	return  request.globalRequest('/member/collection/addProduct',"POST",parmas);
}

export function deleteGoodsCollection(parmas){
	return  request.globalRequest('/member/collection/deleteProduct',"POST",parmas);
}

export function listGoodsCollection(){
	return  request.globalRequest('/member/collection/listProduct',"GET");
}

export function newProductList(parmas){
	return request.globalRequest('/home/newProductList',"GET",parmas)
}
export function hotProductList(parmas){
	return request.globalRequest('/home/hotProductList',"GET",parmas)
}

export function killGoodsDetail(id){
	return request.globalRequest('/goods/kill/detail/'+ id,"GET");
}

export function pinkGoodsDetail(id){
	return request.globalRequest('/goods/pink/detail/'+id, "GET")
}