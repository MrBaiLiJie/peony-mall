<template>
	<view class="body-view">
		<view class="login">
			<input type="number" maxlength="11" disabled="true" placeholder="请输入手机号" v-model="phone"/>
			<input type="password" placeholder="请输入密码(8-12位字母数字组合）" v-model="password"/>
			<view class="yzm">
				<input type="number" style="border: 0;" placeholder="请输入验证码" v-model="codeText"/>
				<span style="color: #d71518;" v-show="sendAuthCode" class="auth_text auth_text_blue" @click.stop="getCode()">{{getCodeText}}</span>
				<span style="color: #d71518; " v-show="!sendAuthCode" class="auth_text">
					<span class="auth_text_blue">{{ auth_time }}</span>
					秒后重新发送验证码
				</span>
			</view>
		</view>
		  <view class="btn" @tap="getUpdate">提交修改</view>	
	</view>
</template>

<script>
	import md5 from "@/common/SDK/md5.min.js";
	export default {
		data() {
			return {
				tabbar: true,
				windowHeight: '',
				phoneNumber:"",
				phone:"",
				// code:'',
				password:"",
				getCodeText:'获取验证码',
				getCodeBtnColor:"#ffffff",
				getCodeisWaiting:false,
				codeText:"",
				isShow:false,
				invoiceTitle:'',
				companyName:'',
				telePhone:'',
				bankOpeningBankLicenseImg: '',
				corporateIdentityCardImgZ:'',
				generalTaxpayerQualificationCertificateImg:'',
				businessLicenseImg:'',
				sendAuthCode: true /*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */,
				auth_time: 0 /*倒计时 计数器*/
			}
		},
		onLoad() {
			let _this=this;
			uni.getStorage({
				key: 'userInfo',
				success: function (res) {
					console.log(res.data.phone);
					_this.phone = res.data.phone;	
				}
			});
		},
		methods: {
			getCode(){
				let _this= this
				if(this.getCodeisWaiting){
					return ;
				}
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))){ 
					uni.showToast({title: '请填写正确手机号码',icon:"none"});
					return false; 
				} 
				this.getCodeText = "发送中..."
				this.getCodeisWaiting = true;
				this.getCodeBtnColor = "rgba(255,255,255,0.5)"
				this.$ajax.get({
					url:`/sso/getAuthCode?telephone=${this.phone}`
				}).then(res=>{
					uni.showToast({title: '验证码已发送',icon:"none"});
					_this.setTimer();
					// _this.codeText=res.data.data;
				});
				// uni.request({
				// 	method:'get',
				// 	url:`http://192.144.170.210:8085/sso/getAuthCode?telephone=${this.phone}`,
				// 	success: function(res) {
				// 		uni.showToast({title: '验证码已发送',icon:"none"});
				// 		_this.setTimer();
				// 		_this.codeText=res.data.data;
				// 	},
				// 	fail:function(err){
				// 	}
				// });	
			},
			setTimer(){
				let holdTime = 60;
				this.getCodeText = "重新获取(60)"
				this.Timer = setInterval(()=>{
					if(holdTime<=0){
						this.getCodeisWaiting = false;
						this.getCodeBtnColor = "#ffffff";
						this.getCodeText = "获取验证码"
						clearInterval(this.Timer);
						return ;
					}
					this.getCodeText = "重新获取("+holdTime+")"
					holdTime--;
					
				},1000)
			},
			getUpdate() {
				this.$ajax.postJSON({
					url:`/sso/updatePassword?authCode=${this.codeText}&telephone=${this.phone}&password=${this.password}`,
					data:{
						// telephone:this.phoneNumber,
						// password:this.password,
						// authCode:this.codeText
					}
				}).then((res)=>{
					// console.log(res)
					uni.removeStorage({
						key: 'userInfo',
						success: function (res) {
							console.log('success');
							uni.redirectTo({
								url:"../../login/login"
							})
						}
					});
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		box-sizing: border-box;
		padding: 30upx;
	}
	 
	.body-view {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
		width: 100%;
	}
    	.login input {
    	border-bottom: 2upx solid #e6e6e6;
    	height: 130upx;
    	// color: #999999;
    }
    .userpass {
    	margin-top: 74upx;
    	margin-bottom: 184upx;
    	display: flex;
    	justify-content: space-between;
    }
    .pass {
    	color: #999;
    }
    .yzm{
    	display: flex;
    	justify-content: space-between;
    	align-items: center;
    	border-bottom: 2upx solid #e6e6e6;
    }
	.res {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100upx;
		color: rgba($color: #ffffff, $alpha: 0.8);
	}
	.btn{
		color:#fff;
		width:100%;
		height:90upx;
		display:-webkit-box;
		display:-webkit-flex;
		display:-ms-flexbox;
		display:flex;
		-webkit-box-pack:center;
		-webkit-justify-content:center;
		-ms-flex-pack:center;
		justify-content:center;
		-webkit-box-align:center;
		-webkit-align-items:center;
		-ms-flex-align:center;
		align-items:center;
		border-radius:45upx;
		background-color:#d71518;
		font-size:30upx;
	    margin-top:30upx;
	}
	.get-code{
		height: 90upx;
		width: 280upx;
		display: flex;
		align-items: center;
		justify-content: center;
		right: 0;
		margin: 0 20upx;
		// background-color: #d7d7d7;
		// padding: 0 40upx;
		// border-left: solid 1upx #fff;
		z-index: 3;
		&:after {
			content: " ";
			width: 1upx;
			height: 50upx;
			background-color: #fff;
			position: absolute;
			z-index: 3;
			margin-right: 100%;
			left: 0;
			top: 20upx;
		}
	}
	.fpgrace-items input{
	    width:100%;
	    height:40rpx;
		line-height:40rpx;
		background:none;
		-webkit-flex-shrink:1;
		-ms-flex-negative:1;
		flex-shrink:1;
		border:0;
		text-align:right;
		padding:20rpx 0;
		margin-left:40rpx;
		color:#333333;
		font-size:28rpx;
	
	 }
	 .fpgrace-items{
		 display:-webkit-box;
		display:-webkit-flex;
		display:-ms-flexbox;
		display:flex;
		border-bottom:1px solid #F5F6F8;
		width:100%;
		-webkit-box-align:center;
		-webkit-align-items:center;
		-ms-flex-align:center;
		align-items:center;
		-webkit-flex-wrap:nowrap;
		-ms-flex-wrap:nowrap;
		flex-wrap:nowrap;
		-webkit-box-pack:justify;
		-webkit-justify-content:space-between;
		-ms-flex-pack:justify;
		justify-content:space-between;
		padding:10rpx 0;
		border-bottom: 2upx solid #d7d7d7;
	
	 }
	 .fpgrace-label{
		 // width:130rpx;
		height:80rpx;
		line-height:80rpx;
		-webkit-flex-shrink:0;
		-ms-flex-negative:0;
		flex-shrink:0;
		overflow:hidden;
		color:#5E5E5E;
	
	 }
	 .fpgrace-form{
		display:block;
		width:95%;
		height:auto;
		overflow:hidden;
	    margin:0 auto;
		// border-top:2upx solid #d7d7d7;
		// border-bottom:2upx solid #ea7da7;
	 }
</style>
