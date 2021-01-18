import { addShoppingCart, getShoppingCartList, updateShoppingCartuQantity,
deleteShoppingCart, clearShoppingCart, getShoppingCartListPromotion, calculateProducts} from '@/api/shoppingcart'

const shoppingcart = {
	state: {},
	mutations: {},
	actions: {
		 //添加商品到购物车
		 AddShoppingCart({commit}, data){
			 return new Promise((resolve, reject) => {
				 console.log(data.type)
			 	addShoppingCart(data.data, data.type).then(response => {
			 		const data = response.data
			 		resolve(data)
			 	}).catch(error => {
			 		console.log(error)
			 		reject(error)
			 	})
			 })
		 },
		 DeleteShoppingCart({commit}, params){
			 return new Promise((resolve, reject) => {
			 	deleteShoppingCart(params).then(response => {
			 		const data = response.data
			 		resolve(data)
			 	}).catch(error => {
			 		console.log(error)
			 		reject(error)
			 	})
			 })
		 },
		 GetShoppingCartList({commit}){
			 return new Promise((resolve, reject) => {
			 	getShoppingCartList().then(response => {
			 		const data = response.data
			 		resolve(data)
			 	}).catch(error => {
			 		console.log(error)
			 		reject(error)
			 	})
			 })
		 },
		 
		UpdateShoppingCartuQantity({commit}, params) {
			 return new Promise((resolve, reject) => {
			 	updateShoppingCartuQantity(params).then(response => {
			 		const data = response.data
			 		resolve(data)
			 	}).catch(error => {
			 		console.log(error)
			 		reject(error)
			 	})
			 })
		 },
		 
		 ClearShoppingCart({commit}){
			 return new Promise((resolve, reject) => {
			 	clearShoppingCart().then(response => {
			 		const data = response.data
			 		resolve(data)
			 	}).catch(error => {
			 		console.log(error)
			 		reject(error)
			 	})
			 })
		 },
		 GetShoppingCartListPromotion({commit}){
			 return new Promise((resolve, reject) => {
			 	getShoppingCartListPromotion().then(response => {
			 		const data = response.data
			 		resolve(data)
			 	}).catch(error => {
			 		console.log(error)
			 		reject(error)
			 	})
			 })
		 },
		 CalculateProducts({commit}, params){
			 return new Promise((resolve, reject) => {
			 	calculateProducts(params).then(response => {
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

export default shoppingcart