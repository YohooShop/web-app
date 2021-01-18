let url_config = ""
let assetsPath  = ""
if(process.env.NODE_ENV === 'development'){
    //开发环境
	
	assetsPath= '/static' // 静态资源路径
	url_config = 'http://localhost:8085'
}else{
    // 生产环境
    url_config = 'http://localhost:8085',
	assetsPath = '/static' // 静态资源路径
}

export default url_config
