import { signList, sign} from '@/api/sign'

const userSign = {
	state: {},
	mutations: {},
	actions: {
	     SignList({commit}, params){
			return new Promise((resolve, reject) => {
				 signList(params).then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},

		Sign({commit}){
		  	return new Promise((resolve, reject) => {
		  		sign().then(response => {
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

export default userSign