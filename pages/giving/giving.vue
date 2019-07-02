<template>
	<view class="grace-margin">
		<form @submit="formSubmit" class="grace-form" style="margin-top:20px;">
			<view class="grace-items">
				<view class="grace-label tel">接收人手机号：</view>
				<input type="text" class="input" name="presentPhoneNum" maxlength="11" v-model="presentPhoneNum"></input>
			</view>
			<view class="grace-items">
				<view class="grace-label">赠送数量：</view>
				<input type="text" class="input" name="integral" v-model="integral"></input>
			</view>
			<view style="padding:22upx 0;">
				<button  type="primary" style="width:100%;background-color: #d71518;" @tap="getGive">赠送</button>
			</view>
			<!-- <view style="padding:22upx 0;">
				<button type="primary" style="width:100%;background-color: #d71518;">取消</button>
			</view> -->
		</form>
		<mpvue-city-picker 
			:themeColor="themeColor" ref="mpvueCityPicker1" 
			:pickerValueDefault="cityPickerValueDefault1" 
			@onConfirm="onConfirm1">
		</mpvue-city-picker>
	</view>
</template>
<script>
	export default {
		data() { 
			return {
				
			}
		},
		onLoad() {
			let _this = this;
			console.log('123')
			uni.getStorage({
				key: 'userInfo',
				success: (res)=>{
					if(res.data&&res.data.id){
						_this.user = res.data;
						console.log(_this.user)
						this.user.username = res.data.username ? res.data.username : res.data.companyName;
						let dealUsername = this.user.username;
						let pat = /^(\d{3})\d*(\d{4})$/
						this.dealendUsername = dealUsername ? dealUsername : this.user.phone.replace(pat,'$1****$2');
						this.user.icon = res.data.icon;
						this.icon = this.user.icon;
						this.user.integration = res.data.integration;
						this.integration = this.user.integration;
						this.user.isUser = res.data.ifCoupon;
						this.$userInfo.id = res.data.id;
					}
				},
			});
		},
		methods: {
			getGive() {
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.presentPhoneNum))){
					uni.showToast({title: '请填写正确手机号码',icon:"none"});
					return false; 
				}
				if(!this.presentPhoneNum){
					uni.showToast({title: '请填写接收人电话',icon:"none"});
					return false; 
				}
				if(!this.integral){
					uni.showToast({title: '请填写赠送数量',icon:"none"});
					return false; 
				}
				uni.showModal({
					title: '提示',
					content: '确定赠送吗?',
					success: (res) => {
						if (res.confirm) {
							let _this = this;
							this.$ajax.post({
								url: `/IntegralSale/IntegralPresent`,
							    data:{
									memId:this.$userInfo.id,
									presentPhoneNum:this.presentPhoneNum,
									integral:this.integral
								}
							}).then(ress => {
								if (ress.data.code == 200) {
									uni.showToast({
										title: "赠送成功",
										icon: "success"
									})
									setTimeout(function(){
										uni.navigateTo({
											url:'../topup/topup'
										})
									},5000)
								}else{
									uni.showToast({
										title: "积分不足",
										icon: "none"
									})
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
				// this.$ajax.post({
				// 	url:`/IntegralSale/IntegralPresent?memId=${this.$userInfo.id}&presentPhoneNum=${this.presentPhoneNum}&integral=${this.integral}`,
				// }).then((res)=>{
				// 	uni.showToast({
				// 		title:'赠送成功',
				// 		icon:'none'
				// 	})
				// 	console.log(res)
				// })
			}
		}
	}
</script>
<style>
	.grace-form .grace-items .tel {
		width: 220upx;
	}
</style>