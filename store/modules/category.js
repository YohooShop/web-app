import { productCate, productCateList } from '@/api/category'

const category = {
	state: {},
	mutations: {},
	actions: {
		ProductCate({commit}){
			return new Promise((resolve, reject) => {
					productCate().then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		ProductCateList({commit},params){
			return new Promise((resolve, reject) => {
					productCateList(params).then(response => {
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

export default category