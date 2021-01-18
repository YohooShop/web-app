import { createHistory, historyList } from '@/api/history'
const history = {
	state: {},
	mutations: {},
	actions: {
	//添加商品到购物车
		CreateHistory({commit}, data){	
			return new Promise((resolve, reject) => {
					createHistory(data).then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},	
		HistoryList({commit}){
			return new Promise((resolve, reject) => {
					historyList().then(response => {
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

export default history