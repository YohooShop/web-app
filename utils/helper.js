
import mConstDataConfig from '@/config/constData.config';
import mRouter from '@/utils/router';
//常用方法集合
export default {
	/**
	 * toast提示
	 */
	toast(title, duration = 3000, mask = false, icon = 'none') {
		if (Boolean(title) === false) {
			return;
		}
		uni.showToast({
			title,
			duration,
			mask,
			icon
		});
	},
	
	/**
	 * 返回登录页面
	 */
	async backToLogin() {
		// 存当前页面的地址
		const currentPage = getCurrentPages()[getCurrentPages().length - 1];
		const params = {};
		// #ifdef H5
		params.route = `/${currentPage.$vm.route}`;
		params.query = currentPage.$vm.$mp && currentPage.$vm.$mp.query;
		// #endif
		// #ifdef MP
		params.route = `/${currentPage.$vm.__route__}`;
		params.query = currentPage.$vm.$mp && currentPage.$vm.$mp.query;
		// #endif
		// #ifdef APP-PLUS
		params.route = `/${currentPage.route}`;
		params.query = currentPage.options;
		// #endif
		uni.setStorageSync('backToPage', JSON.stringify(params));
		// uni.removeTabBarBadge({ index: mConstDataConfig.cartIndex });
		// uni.removeTabBarBadge({ index: mConstDataConfig.notifyIndex });
		// await mStore.commit('logout');
		mRouter.push({ route: '/pages/public/login' });
	},
	/**
	 * 返回上一页携带参数
	 */
	prePage(index) {
		let pages = getCurrentPages();
		let prePage = pages[pages.length - (index || 2)];
		// #ifdef H5
		return prePage;
		// #endif
		return prePage.$vm;
	},
	/*
	 * obj 转 路由地址带参数
	 * 例子：{a:1,b:2} => /pages/index/index?a=1&b=2
	 */
	objParseUrlAndParam(path, obj) {
		let url = path || '/';
		let paramsStr = '';
		if (obj instanceof Array) return url;
		if (!(obj instanceof Object)) return url;
		paramsStr = this.objParseParam(obj);
		paramsStr && (url += '?');
		url += paramsStr;
		return url;
	},
	/*
	 * obj 转 params字符串参数
	 * 例子：{a:1,b:2} => a=1&b=2
	 */
	objParseParam(obj) {
		let paramsStr = '';
		if (obj instanceof Array) return paramsStr;
		if (!(obj instanceof Object)) return paramsStr;
		for (let key in obj) {
			paramsStr += `${key}=${obj[key]}&`;
		}
		return paramsStr.substring(0, paramsStr.length - 1);
	},
}