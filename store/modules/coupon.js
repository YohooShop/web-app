import { addCoupon, couponList, couponListCart,  couponUserlist } from '@/api/coupon'

const coupon = {
	state: {},
	mutations: {},
	actions: {
		AddCoupon({commit}, id){
			return new Promise((resolve, reject) => {
				addCoupon(id).then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		
		CouponList({commit}){
			return new Promise((resolve, reject) => {
				couponList().then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		
		CouponListCart({commit}, type){
			return new Promise((resolve, reject) => {
				couponListCart(type).then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		CouponUserlist({commit}, params) {
			 return new Promise((resolve, reject) => {
			 	couponUserlist(params).then(response => {
			 		const data = response.data
			 		resolve(data)
			 	}).catch(error => {
			 		console.log(error)
			 		reject(error)
			 	})
			 })
		},
	},
}

export default coupon
	