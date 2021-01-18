import { searchSimple } from '@/api/search'
const search = {
	state: {},
	mutations: {},
	actions: {
		SearchSimple({commit},params){
			return new Promise((resolve, reject) => {
					searchSimple(params).then(response => {
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
export default search