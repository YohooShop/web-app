
const TokenKey = 'loginToken'
export function getToken() {
	let token ;
	try {
		 token = uni.getStorageSync(TokenKey);
		if (token) {
    
		}else{
			token = ''
		}
	} catch (e) {
    // error
	}
  return token
}

export function setToken(token) {
	try {
	    uni.setStorageSync(TokenKey, token);
	} catch (e) {
	    // error
	}
}

export function removeToken() {
  return uni.removeStorageSync(TokenKey);
}