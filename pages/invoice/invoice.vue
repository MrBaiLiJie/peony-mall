<template>
	<view class="body-view">
		<form @submit="formSubmit" class="fpgrace-form" style="margin-top:20px;">
			<view class="fpgrace-items">
				<view class="fpgrace-label">户头</view>
				<input type="text" class="input" placeholder="请输入户头" name="account" v-model="formData.account " datatype="s"></input>
			</view>
			<view class="fpgrace-items">
				<view class="fpgrace-label">开户行</view>
				<input type="text" class="input" placeholder="请输入开户行" name="bank" v-model="formData.bankInformation"></input>
			</view>
			<view class="fpgrace-items">
				<view class="fpgrace-label">银行地址</view>
				<input type="text" class="input"  placeholder="请输入银行地址" name="bankAdress" v-model="formData.bankOfDeposit"></input>
			</view>
<!-- 			<view class="fpgrace-items">
				<view class="fpgrace-label">开票金额</view>
				<input type="text" class="input" name="money" v-model="formData.invoiceAmount"></input>
			</view> -->
			<view class="fpgrace-items">
				<view class="fpgrace-label">电话号码</view>
				<input type="text" class="input" placeholder="请输入电话号码" name="phoneNumber" v-model='formData.phoneNumber'></input>
			</view>
			<view class="fpgrace-items">
				<view class="fpgrace-label">税号</view>
				<input type="text" class="input" placeholder="请输入税号" name="ein" v-model='formData.tfn'></input>
			</view>
			<view class="fpgrace-items">
				<view class="fpgrace-label">单位地址</view>
				<input type="text" class="input" placeholder="请输入单位地址" name="unitAdress" v-model='formData.unitAddress'></input>
			</view>

			<view style="padding:22upx 0;">
				<button formType="submit" type="primary" style="width:100%;background-color: #d71518;font-size: 32upx;">提交</button>
			</view>

		</form>

	</view>

</template>
<script>
	export default {
		data() {
			return {
				formData: {
					account: '',
					bankInformation: '',
					bankOfDeposit: '',
					invoiceAmount: '0',
					defaultIs:"0",
					phoneNumber: '',
					tfn: '',
					unitAddress: '',
					userId: ''
				},
				id: 0,
				userInfo:{}
			};
		},
		methods: {
			formSubmit: function() {
				var rule = [{
						name: "account",
						checkType: "string",
						errorMsg: "请填写您的户头"
					},
					{
						name: "bank",
						checkType: "string",
						errorMsg: "请填写您的开户行"
					},
					{
						name: "bankAdress",
						checkType: "string",
						errorMsg: "请填写银行地址"
					},
					// {
					// 	name: "money",
					// 	checkType: "string",
					// 	errorMsg: "请填写开票金额"
					// },
					{
						name: "phoneNumber",
						checkType: "string",
						checkRule: "6,11",
						errorMsg: "请填写您的电话号码"
					},
					{
						name: "ein",
						checkType: "string",
						errorMsg: "请填写税号"
					},
					{
						name: "unitAdress",
						checkType: "string",
						errorMsg: "请填写单位地址"
					},
					// {name:"userId", checkType : "integer",  errorMsg:"请填写用户ID"},
				];

				if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.formData.phoneNumber))) {
					uni.showToast({
						title: '请输入正确的手机号码',
						icon: 'none'
					});
					return false
				};
				if (this.id) {
					//修改
					this.formData.objectId = this.id;
					this.$ajax.postJSON({
						url:`/invoice/updateById`,
						data:{
							...this.formData
						}
					}).then(res=>{
						uni.showToast({
							title:"修改成功",
							icon:"success"
						});
						setTimeout(function(){
							uni.redirectTo({
								url:"../invoicedad/invoicedad"
							})
						},500)
						
					});
					// uni.request({
					// 	method: 'POST',
					// 	url: 'http://192.144.170.210:8085/invoice/updateById',
					// 	data: {
					// 		...this.formData
					// 	},
					// 	success: (res) => {
					// 		uni.showToast({
					// 			title:"修改成功",
					// 			icon:"success"
					// 		})
					// 		uni.redirectTo({
					// 			url:"../invoicedad/invoicedad"
					// 		})
					// 	},
					// 	fail: function(err) {
					// 		console.log(err)
					// 	}
					// })
				} else {
					this.formData.userId = this.userInfo.id;
					//新增
					this.$ajax.postJSON({
						url:`/invoice/insert`,
						data:{
							...this.formData
						}
					}).then(res=>{
						if(res.data.code == 200){
							uni.showToast({
								title:"添加成功",
								icon:"success"
							});
							setTimeout(function(){
								uni.redirectTo({
									url:"../invoicedad/invoicedad"
								})
							},500)		
					};
					// uni.request({
					// 	method: 'POST',
					// 	url: 'http://192.144.170.210:8085/invoice/insert',
					// 	data: {
					// 		...this.formData
					// 	},
					// 	success: (res) => {
					// 		if(res.data.code == 200){
					// 			uni.showToast({
					// 				title:"添加成功",
					// 				icon:"success"
					// 			})
					// 			uni.redirectTo({
					// 				url:"../invoicedad/invoicedad"
					// 			})
					// 		}
					// 	},
					// 	fail: function(err) {
					// 		console.log(err)
					// 	}
					// })
				})
			}
		},
		},
		onLoad: function(options) {
			// console.log(options)
			if(options.id){
				this.id = options.id;
				this.$ajax.get({
					url: '/invoice/selectById',
					param: {
						id: options.id
					}
				}).then((res) => {
					// console.log(res)
					// console.log(this.formData = res.data.data)
					this.formData = res.data.data
					// console.log(this.formData.account)
				})
			}
			let _this = this;
			this.userInfo = this.$stronge.getStronge('userInfo')
		}
}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: center;
		background: rgba(249, 249, 249, 1);
	}

	.body-view {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
		width: 100%;
		align-items: flex-start;
	}

	.top-menu-view {
		display: flex;
		white-space: nowrap;
		width: 100%;
		background-color: #FFFFFF;
		height: 112upx;
		/* 在这里设置导航条高度 */
	}

	.top-menu-view .menu-one-view {
		display: inline-block;
		white-space: nowrap;
		height: 100%;
	}

	.top-menu-view .menu-one-view .menu-one {
		/* 在这里写 单个按钮样式 */
		margin-left: 25upx;
		margin-right: 25upx;
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.top-menu-view .menu-one-view .menu-one .menu-one-txt {
		height: 40upx;
		font-size: 28upx;
		font-weight: 400;
		color: rgba(154, 154, 154, 1);
		line-height: 40upx;
	}

	.top-menu-view .menu-one-view .menu-one .menu-one-bottom {
		position: absolute;
		bottom: 0;
		width: 100%;
	}

	.top-menu-view .menu-one-view .menu-one .menu-one-bottom .menu-one-bottom-color {
		width: 60%;
		height: 4upx;
	}

	.top-menu-view .menu-one-view .menu-one-act {
		/* 在这里写 单个按钮样式 */
		margin-left: 25upx;
		margin-right: 25upx;
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.top-menu-view .menu-one-view .menu-one-act .menu-one-txt {
		height: 40upx;
		font-size: 28upx;
		font-weight: 400;
		color: rgba(0, 170, 255, 1);
		line-height: 40upx;
	}

	.top-menu-view .menu-one-view .menu-one-act .menu-one-bottom {
		position: absolute;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.top-menu-view .menu-one-view .menu-one-act .menu-one-bottom .menu-one-bottom-color {
		width: 60%;
		height: 4upx;
		background: rgba(0, 170, 255, 1);
	}

	.swiper-box-list {
		flex: 1;
		width: 100%;
		height: auto;
		background-color: #FFFFFF;
	}

	.swiper-one-list {
		height: 100%;
		width: 100%;
	}

	.swiper-one-list .swiper-list-entity {
		width: 100%;
		height: 112upx;
		text-align: center;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}

	.fpgrace-items input {
		width: 100%;
		height: 40rpx;
		line-height: 40rpx;
		background: none;
		-webkit-flex-shrink: 1;
		-ms-flex-negative: 1;
		flex-shrink: 1;
		border: 0;
		text-align: right;
		padding: 20rpx 0;
		margin-left: 40rpx;
		color: #333333;
		font-size: 28rpx;

	}

	.fpgrace-items {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		border-bottom: 1px solid #F5F6F8;
		width: 100%;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-flex-wrap: nowrap;
		-ms-flex-wrap: nowrap;
		flex-wrap: nowrap;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		-ms-flex-pack: justify;
		justify-content: space-between;
		padding: 10rpx 0;
		border-bottom: 2upx solid #d7d7d7;

	}

	.fpgrace-label {
		// width:130rpx;
		height: 80rpx;
		line-height: 80rpx;
		-webkit-flex-shrink: 0;
		-ms-flex-negative: 0;
		flex-shrink: 0;
		overflow: hidden;
		color: #5E5E5E;

	}

	.fpgrace-form {
		display: block;
		width: 95%;
		height: auto;
		overflow: hidden;
		margin: 0 auto;
		border-top: 2upx solid #d7d7d7;
		// border-bottom:2upx solid #ea7da7;
	}
</style>
