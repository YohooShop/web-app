import { generateConfirmOrder, generateOrder,getOrderInfo,updateOrderInfo,
 orderDetail, alipayPayOrder, alipayPayH5Order,
  orders, cancelOrder, delOrder, aliPayNotice, refund, confirmReceiptOrder,
  logisticstInfo, generateKillOrder, payOrderDetail, orderDetailBySn,generateFaceOrder,getFaceOrder} from '@/api/order'
const order= {
	state: {},
	mutations: {},
	actions: {
		GenerateConfirmOrder({commit}, params){
			return new Promise((resolve, reject) => {
				generateConfirmOrder(params).then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		GenerateOrder({commit}, params){
			return new Promise((resolve, reject) => {
				generateOrder(params).then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		GenerateFaceOrder({commit}, params){
			return new Promise((resolve, reject) => {
				generateFaceOrder(params).then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		GetOrderInfo({commit}, params){
			return new Promise((resolve, reject) => {
				getOrderInfo(params).then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		UpdateOrderInfo({commit}, params){
			return new Promise((resolve, reject) => {
				updateOrderInfo(params).then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		GenerateKillOrder({commit}, params){
			return new Promise((resolve, reject) => {
				generateKillOrder(params).then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		OrderDetail({commit}, params){
			return new Promise((resolve, reject) => {
				orderDetail(params).then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		OrderDetailBySn({commit}, params){
			return new Promise((resolve, reject) => {
				orderDetailBySn(params).then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		AlipayPayOrder({commit}, params){
			return new Promise((resolve, reject) => {
				alipayPayOrder(params).then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		}, 
		
		AlipayPayH5Order({commit}, params){
			return new Promise((resolve, reject) => {
				alipayPayH5Order(params).then(response => {
					console.log(data)
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		}, 
		
		Orders({commit}, params) {
			return new Promise((resolve, reject) => {
				orders(params).then(response => {
					console.log(data)
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		
		CancelOrder({commit}, params){
			return new Promise((resolve, reject) => {
				cancelOrder(params).then(response => {
					console.log(data)
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		
		DelOrder({commit}, params){
			return new Promise((resolve, reject) => {
				delOrder(params).then(response => {
					console.log(data)
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		ConfirmReceiptOrder({commit}, params){
			return new Promise((resolve, reject) => {
				confirmReceiptOrder(params).then(response => {
					console.log(data)
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		AliPayNotice({commit}, params){
			return new Promise((resolve, reject) => {
				aliPayNotice(params).then(response => {
					console.log(data)
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		Refund({commit}, params){
			return new Promise((resolve, reject) => {
				refund(params).then(response => {
					console.log(data)
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		ConfirmReceiptOrder({commit}, params){
			return new Promise((resolve, reject) => {
				confirmReceiptOrder(params).then(response => {
					console.log(data)
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		LogisticstInfo({commit}, params){
			return new Promise((resolve, reject) => {
				logisticstInfo(params).then(response => {
				
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		
		PayOrderDetail({commit}, params){
			return new Promise((resolve, reject) => {
				payOrderDetail(params).then(response => {
				
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		GetFaceOrder({commit}, params){
			return new Promise((resolve, reject) => {
				getFaceOrder(params).then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		}
		
	},
}

export default order