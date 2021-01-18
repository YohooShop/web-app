let url_config = ""
let assetsPath  = ""
if(process.env.NODE_ENV === 'development'){
    //开发环境
	// url_config = 'https://api.yohooshop.com'
      // url_config = 'http://192.168.1.44:8085'
	// url_config = 'https://api.yohooshop.com',
	assetsPath= '/static' // 静态资源路径
	url_config = 'http://localhost:8085'
	 // url_config = 'http://cf405c61c642.ngrok.io/app'
}else{
    // 生产环境
    url_config = 'https://api.yohooshop.com',
	assetsPath = '/static' // 静态资源路径
}

export default url_config
