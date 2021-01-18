
let assetsPath  = ""
if(process.env.NODE_ENV === 'development'){
    //开发环境

	assetsPath= 'http://media.yohooshop.com/mall/static/app' // 静态资源路径

}else{
    // 生产环境
	assetsPath = 'http://media.yohooshop.com/mall/static/app' // 静态资源路径
}

export default assetsPath
