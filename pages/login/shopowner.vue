<template>
	<view>
		<view class="login">
			<input placeholder="请输入用户名" maxlength="15" v-model="username"/>
			<input type="number" placeholder="请输入手机号" maxlength="11" v-model="phoneNumber"/>
			<view class="yzm">
				<input type="number" style="border: 0;" placeholder="请输入验证码" v-model="codeText"/>
				<span style="color: #d71518;" v-show="sendAuthCode" class="auth_text auth_text_blue" @click.stop="getCode()">{{getCodeText}}</span>
				<span style="color: #d71518; " v-show="!sendAuthCode" class="auth_text">
					<span class="auth_text_blue">{{ auth_time }}</span>
					秒后重新发送验证码
				</span>
			</view>
			<input type="password" placeholder="请输入密码" v-model="password"/>
			<!-- <input type="password" placeholder="请再次输入密码" value="" /> -->
		</view>
		<view class="btn" @tap="doReg">立即注册</view>
		<view class="res">
			<view @tap="toLogin">已有账号立即登录</view>
		</view>
	</view>
</template>
<!-- <template>
	<view>
		<view class="form">
			<view class="username">
				<view class="get-code" :style="{'color':getCodeBtnColor}" @click.stop="getCode()">{{getCodeText}}</view>
				<input placeholder="请输入手机号" v-model="phoneNumber" placeholder-style="color: #ccc;"style="border-bottom:2rpx solid #e6e6e6;"/>
			</view>
			<view class="code">
				<input placeholder="请输入验证码" v-model="codeText" placeholder-style="color: #ccc;" style="border-bottom:2rpx solid #e6e6e6"/>
			</view>
			<view class="password">
				<input placeholder="请输入密码" v-model="password" password=true placeholder-style="color: #ccc;"/>
			</view>
			<view class="btn" @tap="doReg">立即注册</view>
			<view class="res">
				<view @tap="toLogin">已有账号立即登录</view>
			</view>
		</view>
		
	</view>
</template> -->

<script>
export default {
	data() {
		return {
			tabbar: true,
			windowHeight: '',
			phoneNumber:"",
			username:"",
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
		};
	},
	onLoad() {
		uni.getSystemInfo({
			success: res => {
				this.windowHeight = res.windowHeight;
			}
		});
		uni.onWindowResize(res => {
			if (res.size.windowHeight < this.windowHeight) {
				this.tabbar = false;
			} else {
				this.tabbar = true;
			}
		});
	},
	methods: {
		showTabbar() {
			this.tabbar = true;
		},
		hideTabbar() {
			this.tabbar = false;
		},
		doReg(){
			uni.hideKeyboard()
			//部分验证规则
			if(!this.username){
				uni.showToast({title: '请填写用户名',icon:"none"});
				return false; 
			}
			if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber))){ 
				uni.showToast({title: '请填写正确手机号码',icon:"none"});
				return false; 
			}
			this.$ajax.postJSON({
				url:`/sso/register?authCode=${this.codeText}&telephone=${this.phoneNumber}&username=${this.username}&password=${this.password}`,
				data:{
					// username:this.username,
					// telephone:this.phoneNumber,
					// password:this.password
					// authCode:this.codeText
				}
				
			}).then(res=>{
				if(res.data.code==200){
					uni.showToast({title: '注册成功',icon:"success"});
					setTimeout(function(){
						uni.redirectTo({
							url:"login",
							success:function(){
								console.log("success")
							}
						})
					},1000)
				}
			});
		},
		toLogin(){ 
			uni.hideKeyboard()
			uni.redirectTo({url: 'login'});
			uni.navigateBack();
		},
		Timer(){},
		getCode(){
			let _this= this
			if(this.getCodeisWaiting){
				return ;
			}
			if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber))){ 
				uni.showToast({title: '请填写正确手机号码',icon:"none"});
				return false; 
			};
			this.getCodeText = "发送中..."
			this.getCodeisWaiting = true;
			this.getCodeBtnColor = "rgba(255,255,255,0.5)";
			this.$ajax.get({
				url:`/sso/getAuthCode?telephone=${this.phoneNumber}`
			}).then(res=>{
				uni.showToast({title: '验证码已发送',icon:"none"});
				_this.setTimer();
			});
				// method:'get',
				// url:`http://192.144.170.210:8085/sso/getAuthCode?telephone=${this.phoneNumber}`,
				// success: function(res) {
				// 	uni.showToast({title: '验证码已发送',icon:"none"});
				// 	_this.setTimer();
				// 	_this.codeText=res.data.data;
				// 	console.log(_this.codeText)
				// },
				// fail:function(err){
				// }
		
		},
		setTimer(){
			console.log(1);
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
	}
};
</script>

<style lang="scss">
	page {
		box-sizing: border-box;
		padding: 30upx;
	}
	.titl {
		font-size: 50upx;
	}
	button {
		width: 690upx;
		height: 110upx;
		line-height: 110upx;
		background-color: #d71518 !important;
		margin: 0 auto;
		margin-top: 164upx;
	}
	// .login {
	// 	margin-top: 90upx;
	// }
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
// page {
// 	box-sizing: border-box;
// 	background-color: #f9f9f9;
// }
// .titl {
// 	font-size: 50upx;
// }
// .login {
// 	padding: 30upx;
// 	padding-bottom: 0;
// 	background-color: #ffffff;
// }
// .items {
// 	height: 110upx;
// 	display: flex;
// 	justify-content: space-between;
// 	align-items: center;
// 	border-bottom: 2upx solid #e6e6e6;
// }
// .items input {
// 	text-align: right;
// }
// .login input {
// 	/* border-bottom: 2upx solid #e6e6e6; */
// 	height: 130upx;
// 	color: #999999;
// }
// .userpass {
// 	margin-top: 74upx;
// 	margin-bottom: 184upx;
// 	display: flex;
// 	justify-content: space-between;
// }
// .pass {
// 	color: #999;
// }
// .yzm {
// 	display: flex;
// 	justify-content: space-between;
// 	align-items: center;
// 	border-bottom: 2upx solid #e6e6e6;
// }
// button {
// 	position: fixed;
// 	bottom: 0;
// 	width: 100%;
// 	height: 110upx;
// 	line-height: 110upx;
// 	border-radius: 0;
// 	background-color: #d71518 !important;
// }
// .form {
// 	.username{
// 		position: relative;
// 		.get-code{
// 			position: absolute;
// 			height: 90upx;
// 			display: flex;
// 			align-items: center;
// 			justify-content: center;
// 			right: 0;
// 			padding: 0 40upx;
// 			// border-left: solid 1upx #fff;
// 			z-index: 3;
// 			&:after {
// 				content: " ";
// 				width: 1upx;
// 				height: 50upx;
// 				background-color: #fff;
// 				position: absolute;
// 				z-index: 3;
// 				margin-right: 100%;
// 				left: 0;
// 				top: 20upx;
// 			}
// 		}
// 	}
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
	font-size:40upx;
    margin-top:30upx;
}
</style>
