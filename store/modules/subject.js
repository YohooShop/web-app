import {subjectDetail, subjectList, subjectGoods, subjectAllList} from '@/api/subject'

const subject = {
		state: {
			
		},
		mutations: {
		
		},
		actions: {
			SubjectAllList({ commit }, params){
						 return new Promise((resolve, reject) => {
						 	 subjectAllList(params).then(response => {
						 				const data = response.data
						 		resolve(data)
						 	}).catch(error => {
						 		console.log(error)
						 		reject(error)
						 	})
						 })
			},
			SubjectList({ commit }, params){
						 return new Promise((resolve, reject) => {
						 	 subjectList(params).then(response => {
						 				const data = response.data
						 		resolve(data)
						 	}).catch(error => {
						 		console.log(error)
						 		reject(error)
						 	})
						 })
			},
			SubjectDetail({ commit }, params){
						 return new Promise((resolve, reject) => {
						 	subjectDetail(params).then(response => {
						 				const data = response.data
						 		resolve(data)
						 	}).catch(error => {
						 		console.log(error)
						 		reject(error)
						 	})
						 })
			},
			SubjectGoods({ commit }, params){
						 return new Promise((resolve, reject) => {
						 	subjectGoods(params).then(response => {
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

export default subject