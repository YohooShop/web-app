
/**
 * 域名
 * */
 // const host = 'http://192.168.0.108:8085'
  const host = 'http://192.168.1.59:8085'

/**
 * 首页
 * */
 
 const home = host+'/home/content'
 
 /**
  * 商品详细
  * */
 const goodsDetail = host+'/goods/detail/'
  
  
  /**
   * 秒杀商品详细
   * */
  const killGoodsDetail = host+'/goods/kill/detail/'
  
  
  /**
   * 短信登录
   * */
 const smsCodeLogin = host +'/sso/smsCodeLogin'
  
  
  
export default {
	home,
  	goodsDetail,
	smsCodeLogin,
	killGoodsDetail 
 }
  
  