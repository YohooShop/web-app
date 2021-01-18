<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="addressData.name" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.phoneNumber" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">地址</text>
			<text @click="chooseLocation" class="input">
				{{addressData.addressName}}
			</text>
			<!-- <text class="yticon icon-shouhuodizhi"></text> -->
		</view>
		<view class="row b-b"> 
			<text class="tit">详细地址</text>
			<input class="input" type="text" v-model="addressData.detailAddress" placeholder="详细地址" placeholder-class="placeholder" />
		</view>
		
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.default" color="#fa436a" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
		
		<w-picker
			mode="region"
			:hideArea="false"
			@confirm="onConfirm" 
			ref="region"
			:timeout="true"
		></w-picker>
		
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	
	export default {
		components:{
		        wPicker
		},
		data() {
			return {
				addressData: {
					name: '',
					phoneNumber: '',
					addressName: '选择地址',
					address: '',
					detailAddress: '',
					default: false,
					defaultStatus : 0,
					province:'',
					city:'',
					region:'',
				},
				manageType:'',
				addressId: 0,
			}
		},
		onLoad(option){
			let title = '新增收货地址';
			if(option.type==='edit'){
				title = '编辑收货地址'
				this.addressId = option.id;
				this.getAddress(option.id);
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			switchChange(e){
				this.addressData.default = e.detail.value;;
			},
			
			getAddress(id) {
				this.$store.dispatch('Address',id).then((result) => {
					console.log(result)
					this.addressData.name = result.name;
					this.addressData.addressName = result.address;
					this.addressData.address =  result.address;
					this.addressData.detailAddress = result.detailAddress;
					this.addressData.defaultStatus = result.defaultStatus;
					this.addressData.phoneNumber = result.phoneNumber;
					this.addressData.defaultStatus = result.defaultStatus;
					if(this.addressData.defaultStatus == 0){
						this.addressData.default = false;
					}else{
						this.addressData.default = true;
					}
				}).catch((error) => {
					console.log(error);
				})
			},
			
			//地图选择地址
			chooseLocation(){
				this.$refs.region.show()
				
				
				// uni.chooseLocation({
				// 	success: (data)=> {
				// 		console.log(data)
				// 		this.addressData.addressName = data.address;
				// 		this.addressData.address =  data.address;
				// 		this.addressData.detailAddress = data.name;
				// 	}
				// })
			},
			onConfirm(val){
				 console.log(val);
				 let checkArr = val.checkArr;
				 this.addressData.province = checkArr[0];
				 this.addressData.city = checkArr[1];
				 this.addressData.region= checkArr[2];
				 this.addressData.addressName = this.addressData.province + ' ' + this.addressData.city + ' ' + this.addressData.region;
				 this.addressData.address =  this.addressData.addressName;
			},
			
			//提交
			confirm(){
				let data = this.addressData;
				if(!data.name){
					this.$api.msg('请填写收货人姓名');
					return;
				}
				if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.phoneNumber)){
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				if(!data.address){
					this.$api.msg('请在选择地址');
					return;
				}
				if(!data.detailAddress){
					this.$api.msg('请填写详细地址信息');
					return;
				}
				if(data.default){
					data.defaultStatus = 1;
				}else{
					data.defaultStatus = 0;
				}
				if(this.manageType==='edit'){
					let addressId = this.addressId
					let params = {'addressId':addressId,'data':data}
					this.$store.dispatch('UpdateAddress', params).then((result) => {
						this.$api.prePage().refreshList();
						uni.navigateBack();
					}).catch((error) => {
						 console.log(error);
					})
				}else{
					this.$store.dispatch('AddAddress',data).then((result) => {
					   this.$api.prePage().refreshList();
					   uni.navigateBack();
					}).catch((error) => {
						 console.log(error);
					})
				}
				
				
				
				//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
				// this.$api.prePage().refreshList(data, this.manageType);
				// this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
				// setTimeout(()=>{
				// 	uni.navigateBack()
				// }, 800)
			},
		}
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;
		
		.tit{
			flex-shrink: 0;
			width: 140upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
