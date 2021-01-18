<template>
  <view class="">
  	<text>正在授权中，请稍后</text>
  </view>
</template>

<script>
	import {bindWX} from '@/api/wechat'
	export default{
		data(){
			return {
				code:null
			}
		},
		onLoad(option) {
			this.code = option.code
			console.log(option);
			if(this.code){
				//去绑定
				this.goBindWx()
			}
		},
		methods:{
			goBindWx(){
				let parmas = {'code':this.code}
				bindWX(parmas ).then(res=>{
					uni.showToast({
						title: '绑定微信账号成功',
						icon: 'none',
						complete() {
							uni.switchTab({
								url:"/pages/index/index"
							})
						}
					})
					console.log(res)
					
				}).catch(error => {
						  console.log(error)
				})
			}
		}
	}
</script>

<style>
</style>
