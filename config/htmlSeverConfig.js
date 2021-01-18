let htmlurl_config = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
	htmlurl_config = 'http://localhost:8085'
}else{
    // 生产环境
    htmlurl_config = 'http://localhost:8085'
}

export default htmlurl_config