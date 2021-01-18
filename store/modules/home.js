import { homeData, reProductList,homeNewData, homeConfigData, landPagesContent } from '@/api/home'

const home = {
	state: {
		
	},
	mutations: {
	
	},
	actions: {
		 HomeData({ commit }){
		 	return new Promise((resolve, reject) => {
		 		homeData().then(response => {
					const data = response.data
		 			resolve(data)
		 		}).catch(error => {
		 			console.log(error)
		 			reject(error)
		 		})
		 	})
		 },
		 HomeNewData({commit}){
			 return new Promise((resolve, reject) => {
			 	homeNewData().then(response => {
			 		const data = response.data
			 		resolve(data)
			 	}).catch(error => {
			 		console.log(error)
			 		reject(error)
			 	})
			 })
		 },
		 HomeConfigData({commit}){
			 return new Promise((resolve, reject) => {
			 	homeConfigData().then(response => {
			 		const data = response.data
			 		resolve(data)
			 	}).catch(error => {
			 		console.log(error)
			 		reject(error)
			 	})
			 })
		 },
		 HomeLandPagesContent({commit}){
			 return new Promise((resolve, reject) => {
			 	landPagesContent().then(response => {
			 		const data = response.data
			 		resolve(data)
			 	}).catch(error => {
			 		console.log(error)
			 		reject(error)
			 	})
			 })
		 },
		 ReProductList({ commit }, params){
		 	return new Promise((resolve, reject) => {
		 		reProductList(params).then(response => {
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
export default home