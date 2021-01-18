import {orderRefundList} from '@/api/refund'

const refund = {
	 mutations: {
		
	 },
	 actions:{
	 	OrderRefundList({commit},params){
	 		return new Promise((resolve, reject) => {
	 			orderRefundList(params).then(response => {
	 				const data = response.data
	 				resolve(data)
	 			}).catch(error => {
	 				console.log(error)
	 				reject(error)
	 			})
	 		})
	 	},
	}
}

export default refund