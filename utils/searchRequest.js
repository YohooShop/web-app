import store from '../store'
import urlConfig from '@/config/searchConfig'
const request = {}
request.globalRequest = (url, method, data) => {
	return uni.request({
	     url: urlConfig + url,
	     method,
	     data: data,
	 }).then(res => {
	     if (res[1].data.code == 200) {
	         return res[1].data	
	     } else {
	         throw res[1].data
	     }
	 }).catch(parmas => {
		 uni.showToast({
		 	title: parmas.message,
		 	icon: 'none'
		 })
		 return Promise.reject()
	 })
}
export default request