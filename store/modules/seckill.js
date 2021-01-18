import {killSence, killList, killPath, kill, killResult} from '@/api/seckill'
const seckill = {
	state: {},
	mutations: {},
	actions: {
			KillSence({commit}){
				return new Promise((resolve, reject) => {
					killSence().then(response => {
						const data = response.data
						resolve(data)
					}).catch(error => {
						console.log(error)
						reject(error)
					})
				})
			},
			KillList({commit},id){
				return new Promise((resolve, reject) => {
					killList(id).then(response => {
						const data = response.data
						resolve(data)
					}).catch(error => {
						console.log(error)
						reject(error)
					})
				})
			},
			KillPath({commit},params) {
				return new Promise((resolve, reject) => {
					killPath(params).then(response => {
						const data = response.data
						resolve(data)
					}).catch(error => {
						console.log(error)
						reject(error)
					})
				})
			},
			Kill({commit},data) {
				return new Promise((resolve, reject) => {
					console.log(this.path)
					kill(data.params,data.path).then(response => {
						const data = response.data
						resolve(data)
					}).catch(error => {
						console.log(error)
						reject(error)
					})
				})
			},
			KillResult({commit},params) {
				return new Promise((resolve, reject) => {
					console.log(this.path)
					killResult(params).then(response => {
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
	
export default seckill