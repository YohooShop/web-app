import { goodsDetail, addGoodsCollection , deleteGoodsCollection, listGoodsCollection,
newProductList, hotProductList, killGoodsDetail, pinkGoodsDetail} from '@/api/goods'
const goods = {
	state: {},
	mutations: {},
	actions: {
		GoodsDetail({commit},id){
			return new Promise((resolve, reject) => {
					goodsDetail(id).then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		KillGoodsDetail({commit},id){
			return new Promise((resolve, reject) => {
					killGoodsDetail(id).then(response => {
						const data = response.data
						resolve(data)
					}).catch(error => {
						console.log(error)
						reject(error)
					})
			})
		},
		PinkGoodsDetail({commit},id){
			return new Promise((resolve, reject) => {
					pinkGoodsDetail(id).then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		AddGoodsCollection({commit},parmas){
			return new Promise((resolve, reject) => {
					addGoodsCollection(parmas).then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		
		DeleteGoodsCollection({commit},parmas){
			return new Promise((resolve, reject) => {
					deleteGoodsCollection(parmas).then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		
		ListGoodsCollection({commit}){
			return new Promise((resolve, reject) => {
					listGoodsCollection().then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		HotProductList({commit},parmas){
			return new Promise((resolve, reject) => {
					hotProductList(parmas).then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		NewProductList({commit},parmas){
			return new Promise((resolve, reject) => {
					newProductList(parmas).then(response => {
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
export default goods

