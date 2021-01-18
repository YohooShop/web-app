import { addAddress, updateAddress, delAddress ,refreshToken, getAllAddresses, getAddress} from '@/api/address'

const address = {
	state: {},
	mutations: {},
	actions: {
		  //添加收货地址
		AddAddress({commit}, data){
			return new Promise((resolve, reject) => {
				addAddress(data).then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		  
		  //删除收货地址
		DelAddress({commit}, id){
		  	return new Promise((resolve, reject) => {
		  		delAddress(params).then(response => {
					const data = response.data
		  			resolve(data)
				}).catch(error => {
		  			console.log(error)
					reject(error)
				})
			})
		},
		
		//更新收货地址
		UpdateAddress({commit},  data){
		  	return new Promise((resolve, reject) => {
		  		updateAddress(data.addressId,data.data).then(response => {
					const data = response.data
		  			resolve(data)
				}).catch(error => {
		  			console.log(error)
					reject(error)
				})
			})
		},
		//获取全部收货地址
		AllAddresses({commit}){
		  	return new Promise((resolve, reject) => {
		  		getAllAddresses().then(response => {
					const data = response.data
		  			resolve(data)
				}).catch(error => {
		  			console.log(error)
					reject(error)
				})
			})
		},
		
		//获取单个收货地址
		Address({commit}, id){
		  	return new Promise((resolve, reject) => {
		  		getAddress(id).then(response => {
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

export default address