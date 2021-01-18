 import {pinkPath, doPink, pinkResult, pinkInfo, pinkProductList, minePinkList} from '@/api/pink'
 
 const pink = {
 	state: {},
 	mutations: {},
 	actions: {
		MinePinkList({commit},data) {
			return new Promise((resolve, reject) => {
				minePinkList(data.params, data.type).then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		PinkPath({commit},params) {
			return new Promise((resolve, reject) => {
				pinkPath(params).then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		DoPink({commit},data) {
			return new Promise((resolve, reject) => {
				doPink(data.params,data.path).then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		PinkResult({commit},params) {
			return new Promise((resolve, reject) => {
				pinkResult(params).then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		PinkInfo({commit},pinkId) {
			return new Promise((resolve, reject) => {
				pinkInfo(pinkId).then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		PinkProductList({commit},params)  {
			return new Promise((resolve, reject) => {
				pinkProductList(params).then(response => {
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
export default pink