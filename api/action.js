import request from '@/utils/request'

export function integralLucky(params){
	return request.globalRequest('/user/action/integralLucky',"GET",params);
}

export function winningPrize(params) {
	return request.globalRequest('/user/action/winningPrize',"POST",params);
}