let htmlurl_config = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    // url_config = 'http://192.168.0.108:8085'
	htmlurl_config = 'https://api.yohooshop.com'
}else{
    // 生产环境
    htmlurl_config = 'http://m.yohooshop.com'
}

export default htmlurl_config