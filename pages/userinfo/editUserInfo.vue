<template>
	<view>
		<view class="col b-b" v-if="type == 1 || type == 4">
		   <input class="desc" focus :placeholder="placeholder" v-model="value"/>
		</view>
		
		<view v-if="type == 2">
		    <checkbox-group @change="checkboxChange">
		        <label class="uni-list-cell uni-list-cell-pd b-b" v-for="item in genders" :key="item.value">
		            <view >
		                 <checkbox :value="item.value" :checked="item.checked" />
		            </view>
		            <view>{{item.name}}</view>
		                </label>
		            </checkbox-group>
		</view>
		<view class="content" v-if="type == 3">
			<view class="tab"  @tap="selectDate">
						 日期选择
			</view>
			<w-picker   mode="date" startYear="1929"
						:defaultVal="['2018','1','1']"
						:current="false"  @confirm="onConfirm" 
						:disabledAfter="true" ref="date" 
						themeColor="#f00">
			</w-picker>
			<view class="result">选择结果:{{resultInfo.result}}</view>
		</view>
		
	   <view class="content" v-if="type == 5">
		<view class="tab"  @tap="selectRegion">
					 地区选择
		</view>
		<w-picker
			mode="region"
			:hideArea="false"
			@confirm="onConfirm" 
			ref="region"
			:timeout="true"
		></w-picker>
		<view class="result">选择结果:{{resultInfo.result}}</view>
	   </view>
		
	</view>

</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import {
	    mapState,  
	    mapMutations  
	} from 'vuex';  
	export default {
		components:{
		        wPicker
		},
		computed:{
			...mapState(['userInfo']),
		},
		data() {
			return {
				type:0,
				title:'',
				placeholder:'请输入用户名',
				value:'',
				genders: [{
							value: '0',
				            name: '未知'
				        },
				        {
				            value: '1',
				            name: '男',
				        },
				        {
				            value: '2',
				            name: '女'
				        }
				    ],
				resultInfo:{
					result:''
				},
			};
			
		},
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				if(this.value.length === 0){
					return;
				}
				uni.hideKeyboard() 
				let param = {
					type:this.type,
					value:this.value
				}
				this.$store.dispatch('UserInfoUpdate',param).then((result)=>{
					let provider = {type:this.type, value:this.value}
					this.updateUserInfo(provider);
					uni.navigateBack();
				}).catch((error)=>{
					
				})
			}
		},
		onLoad(option) {
			this.type = option.type;
			if(this.type == 1){
				this.title = '修改用户名'
				this.placeholder = '请输入用户名'
			}
			if(this.type == 2){
				this.title = '修改性别'
			}
			if(this.type == 3){
				this.title = '修改生日'
			}
			if(this.type == 4){
				this.title = '修改职业'
			}
			if(this.type == 5){
				this.title = '修改城市'
			}
			uni.setNavigationBarTitle({
				title:this.title
			})
		},
		methods:{
			...mapMutations(['updateUserInfo']),
			checkboxChange(e) {
			    var items = this.genders,
			    values = e.detail.value;
				if(values.length > 1){
					this.value = values[1];
				}else{
					this.value = values[0];
				}	
			    for (var i = 0, lenI = items.length; i < lenI; ++i) {
			        const item = items[i]
			        this.$set(item,'checked',false)
					if(this.value == item.value){
					    this.$set(item,'checked',true)
						
					}
			    }
			},
						
		    onConfirm(val){
				if(this.type == 3){
					this.value = new Date(val.result).getTime().toString();
				}
				if(this.type == 5) {
					this.value = val.result
					this.userInfo.city == this.value 
				}
				console.log(val)
				// console.log(timestamp)
				this.resultInfo=val;
			},
			selectDate(){
				this.$refs.date.show()
			},
			selectRegion(){
				this.$refs.region.show()
			}
		},
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
	}
	.col{
		display: flex;
		align-items: center;
		padding: 25upx 30upx 10upx 40upx;
		/* line-height: 70upx; */
		position: relative;
		
		/* &.b-b:after {
			left: 30upx;
		} */
		.desc {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;	
		}
	}
	.uni-list-cell {
	    padding: 25upx 30upx 10upx 30upx;
		display:flex;
		position: relative;
		align-items: center;
		&.b-b:after{
			left: 30upx;
		}
	
	}
	.content {
		text-align: center;
	}
	.tab{
		padding:80upx 0;
		font-size: 32upx;
	}
	.result{
		margin-top: 100upx;
		font-size: 32upx;
	}
</style>
