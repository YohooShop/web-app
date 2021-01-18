let search_url_config = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
	//search_url_config = 'http://192.168.0.108:8085'
	search_url_config = 'http://39.100.220.199:8081'
}else{
    // 生产环境
	search_url_config = 'https://api.search.yohooshop.com'
}
export default search_url_config