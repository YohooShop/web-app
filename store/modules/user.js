import { loginCode, logout, getInfo ,refreshToken,  weChatLogin, userInfoUpdate, getAuthCode} from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
	   token: getToken(),
  },
  mutations: {
    SET_TOKEN: (state, token) => {
		state.token = token
    }
   },
   actions: {
	    GetAuthCode({ commit }, params) {
		   return new Promise((resolve, reject) => {
			   getAuthCode(params).then(response => {
				   const data = response.data
				   resolve(data)
			   }).catch(error => {
				 console.log(error)
	             reject(error)
	           })
		   })
	    },
	    // 登录
	    Login({ commit }, params) {
	         return new Promise((resolve, reject) => {
	             loginCode(params).then(response => {
	             const data = response.data
	             const tokenStr = data.tokenHead+data.token
	             setToken(tokenStr)
	             commit('SET_TOKEN', tokenStr)
	             resolve(data)
	           }).catch(error => {
				 console.log(error)
	             reject(error)
	           })
	         })
	    },
		   
		WeChatLogin({ commit }, params){
			 return new Promise((resolve, reject) => {
			 	 weChatLogin(params).then(response => {
			 		const data = response.data
			 		const tokenStr = data.tokenHead+data.token
			 		setToken(tokenStr)
			 		commit('SET_TOKEN', tokenStr)
			 		resolve(data)
			 	}).catch(error => {
			 		 console.log(error)
			 		 reject(error)
			 	})
			 })
		 },
		   
		 //用户数据
		 UserInfo({ commit }){
			return new Promise((resolve, reject) => {
				getInfo().then(response => {
					const data = response.data
					resolve(data)
				}).catch(error => {
					 console.log(error)
					 reject(error)
				})
			})
		 },
		 UserInfoUpdate({ commit },params){
			 return new Promise((resolve, reject) => {
			 	userInfoUpdate(params).then(response => {
			 		const data = response.data
			 		resolve(data)
			 	}).catch(error => {
			 		 console.log(error)
			 		 reject(error)
			 	})
			 })
		 },
		 RefreshToken({ commit }){
			 return new Promise((resolve, reject) => {
				 refreshToken().then(response => {
					 const data = response.data
					 const tokenStr = data.tokenHead+data.token
					 setToken(tokenStr)
					 commit('SET_TOKEN', tokenStr)
					 resolve(data)
				 }).catch(error => {
					 console.log(error)
					 reject(error)
				 })
			 })
		},
		    // 登出
		LogOut({ commit, state }) {
		    return new Promise((resolve, reject) => {
		        logout(state.token).then(() => {
				  const data = response.data
		          commit('SET_TOKEN', '')
		          removeToken()
		          resolve(data)
		    }).catch(error => {
				commit('SET_TOKEN', '')
				removeToken()
		        reject(error)
		        })
		    })
		},
		   // 前端 登出
		FedLogOut({ commit }) {
		    return new Promise(resolve => {
		        commit('SET_TOKEN', '')
		        removeToken()
		        resolve()
		    })
		}
    }
}


export default user
