import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
const THEMECOLOR = uni.getStorageSync('themeColor') || { title: '官方', name: 'rf', color: '#fa436a' };
Vue.use(Vuex)
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		shoppingCartNumber:0,
		reloadOrderPages: false,
		themeColor: THEMECOLOR
	},
	mutations: {
		setThemeColor(state, val) {
			state.themeColor = val;
			uni.setStorageSync('themeColor', val);
		},
		login(state) {  
			state.hasLogin = true;
		},
		addShoppingCartNumber(state,number){
			state.shoppingCartNumber = state.shoppingCartNumber + number;
		},
		minusShoppingCartNumber(state,number){
			state.shoppingCartNumber = state.shoppingCartNumber - number;
		},
		setShoppingCartNumber(state,number){
			state.shoppingCartNumber =  number;
		},
		setUserInfo(state, provider){
			state.userInfo = provider;
			console.log(state.userInfo)
			uni.setStorage({//缓存用户数据
			    key: 'userInfo',  
			    data: provider 
			}) 
		},
		updateUserInfo(state, provider){
			if(provider.type == 1){
				state.userInfo.nickname = provider.value;
			}
			
			if(provider.type == 2){
				state.userInfo.gender = provider.value;
			}
			if(provider.type == 3){
				state.userInfo.birthday = provider.value;
			}
			if(provider.type == 4){
				state.userInfo.job = provider.value;
			}
			if(provider.type == 5){
				state.userInfo.city = provider.value;
			}
			console.log(state.userInfo)
			uni.setStorage({//缓存用户数据
			    key: 'userInfo',  
			    data: provider 
			}) 
		},
		logout(state) {
			state.hasLogin = false;
			state.shoppingCartNumber = 0;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'
            })
		},
		setReloadOrderPages(state,reload){
			console.log(state)
			state.reloadOrderPages = reload
		}
	},
	actions: {
	
	},
	modules,
	getters
})

export default store
