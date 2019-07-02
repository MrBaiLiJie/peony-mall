<template>
	<view>
		<view class="titl">欢迎来到牡丹商城</view>
		<view class="login">
			<input type="text" placeholder="请输入账号" value="" maxlength="11" v-model="phoneNumber" 
					placeholder-style="color: #ccc"/>
			<input type="password" placeholder="请输入密码" value="" v-model="password" password=true placeholder-style="color: #ccc;"/>
		</view>
		<view class="userpass">
			<view class="" @tap="toPage('register')">新用户注册</view>
			<view class="pass" @tap="toPage('resetpasswd')">忘记密码？</view>
		</view>
		<button type="primary" @click="doLogin">登录</button>
	</view>
</template>

<script>
	import md5 from "@/common/SDK/md5.min.js";
	export default {
		data() {
			return {
				phoneNumber: '',
				password:'',
				loginType:4,
				getCodeText:"点击获取验证码",
				isShowOauth:false,
				showProvider:{
					weixin:false,
					qq:false,
					sinaweibo:false,
					xiaomi:false
				},
				dingwei:[],
				data:{}
			}
		},
		onShow() {
			 
		},
		onBackPress(event) {  
			uni.switchTab({
				url:"../tabBar/home"
			})
			return true;
		}, 
		onLoad() {
			//APP显示第三方登录
			// #ifdef APP-PLUS
				//this.isShowOauth=true;
			// #endif
			//this.getProvider();
		}, 
		methods: {
			radioChange (e) {
				this.loginType = e.detail.value
				// console.log(this.loginType)
			},
			// oauthLogin(provider){
			// 	uni.showLoading();
			// 	//第三方登录
			// 	uni.login({
			// 		provider: provider,
			// 		success: (loginRes)=>{
			// 			console.log("success: "+JSON.stringify(loginRes));
			// 			//案例直接获取用户信息，一般不是在APP端直接获取用户信息，比如微信，获取一个code，传递给后端，后端再去请求微信服务器获取用户信息
			// 			uni.getUserInfo({
			// 				provider: provider,
			// 				success: (infoRes)=>{
			// 					console.log('用户信息：' + JSON.stringify(infoRes.userInfo));
			// 					uni.setStorage({
			// 						key: 'UserInfo',
			// 						data: {
			// 							username:infoRes.userInfo.nickName,
			// 							face:infoRes.userInfo.avatarUrl,
			// 							signature:'个性签名',
			// 							integral:0,
			// 							balance:0,
			// 							envelope:0
			// 						},
			// 						success: function () {
			// 							uni.hideLoading()
			// 							uni.showToast({title: '登录成功',icon:"success"});
			// 							setTimeout(function(){
			// 								uni.navigateBack();
			// 							},300)
			// 						}
			// 					});
			// 				}
			// 			});
			// 		},
			// 		fail:(e)=>{
			// 			console.log("fail: "+JSON.stringify(e));
			// 		}
			// 	});
			// },
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
			// getProvider(){
			// 	//获取第三方登录服务
			// 	uni.getProvider({
			// 		service: 'oauth',
			// 		success: (res)=>{
			// 			let len = res.provider.length;
			// 			for(let i=0;i<len;i++){
			// 				//有服务才显示按钮图标
			// 				this.showProvider[res.provider[i]] = true;
			// 			}
			// 			if(res.provider.length==0){
			// 				this.isShowOauth=false;
			// 			}
			// 		} 
			// 	});
			// },
			toPage(page){
				uni.hideKeyboard()
				uni.navigateTo({
					url: page
				});
			},
			getCode(){
				uni.hideKeyboard()
				if(this.getCodeisWaiting){
					return ;
				}
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber))){ 
					uni.showToast({title: '请填写正确手机号码',icon:"none"});
					return false; 
				} 
				let _this = this;
				_this.$ajax.get({
					url:"/sso/getAuthCode",
					param:{
						telephone:_this.phoneNumber
					}
				}).then(res=>{
					// console.log(res)
					return;
				})
				this.getCodeText = "发送中..."
				this.getCodeisWaiting = true;
				this.getCodeBtnColor = "rgba(255,255,255,0.5)"
			},
			doLogin(){
				uni.showLoading({
					title: '提交中...'
				})
				//验证手机号码
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber))){ 
					uni.showToast({title: '请填写正确手机号码',icon:"none"});
					return false;
				};
				// console.log(this.loginType)
				let _this = this;
				this.$ajax.post({
					url:`/sso/Login`,
					data:{
						password:this.password,
						telephone:this.phoneNumber,
						type:1,
						loginType:this.loginType
					}
				}).then((res)=>{
					uni.showToast({
						title:res.data.message,
						icon:'none'
					})
					res.data.data.isLogin = true;
					uni.setStorage({
						key:"userInfo",
						data:res.data.data,
						success:function(){
							_this.$ajax.get({
								url:"/member/address/getDefaultAddress",
								param:{
									memId:res.data.data.id
								}
							}).then(ress=>{
								if(ress.data.data){
									uni.setStorage({
										key:'positioningId',
										data:ress.data.data.id,
										success: () => {
											uni.hideLoading();
										}
									});
								}
								uni.switchTab({
									url:'../tabBar/home'
								});
							})
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "../../static/css/style.scss";
	@font-face {font-family:"HMfont-login";src:url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAVwAAsAAAAACiwAAAUhAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDMgqHTIY+ATYCJAMUCwwABCAFhG0HRhvICBEVpCGR/UgwbhrPeq6LhESdqBKaSN/kw79n/bk3aCYZKO1yZCbTFZBZqLv71CzRPvkPQPDEzrPbAAEEdy/nHLBRL1RJVpMf+cAnKX4Do/NzekpNyAm5/zlmunw+sPy2tUt22QBHAx5Q5EUGHvAdnfOh3DK8OuQd0OlAAIiIQw5IS1uPAgEstFUEAFmxdPFcCDE92AIcgaDigV1ZkBvBQaCH6csAbnB/nnyDIiIAFBwDbePAotYFaAjIY0OMFtTMsBEQdGcFwOwFMAByALAAWQfaV4Dx4zlgIEpRFg2A/DsBFDQgB2oDc8eGgkGQeEFKUZejCznt9o/HQ5OHYmxDggUCskkBBgjUUoAAgbkUoMDYkPDCyDliuQhABkgJQK6yyhT38BIY8CBxYSRMEkkMSSATwkJdISFRxmEK1/vOnrTzXjViHzwz8aKlGEYs2iibpmp+5ratsgWGNWLbfrapGoZCpmU/tfdypWk3P2UpyrXbL9yT7r9NuzXF7fWdOOu/rp+KJfM9J10u24o94tV0yTZj7Q1k2sNGbKz3FE7fJrlO6jZTvS8u0ZhJun8isa0RspKxyKuEe2NZXZZOEuakK+yhNyZTXZI887RY8YQzlSXpoBHeCI5wo155sye1OndEW2qmqrgfekbypF8gtj1yfSpZR24fvUPxWVJPRLG2DHcxzf7n0tWR1+x5R0CV6j3Gds3IOfkK9MdFr5Un3mk4rSddo6/Jd1vEsCbatsu6R7YZUv2mevIuRf9nThs/zvYVz49u+Zw5nLqge+KujIq2hXHLc265lFGtRqxMdB4ZW7GDGxWkhRXLMpfNnaPMmLeT8S2mw3TIt3Ynv5P1TWOGGMW3c6cDCdUbnElHp9An2M7UvfFrl9Se3Mpl2OsC/OPrLn+Z/t+8OYMbyc7EULKrYRH0H8RvBcrsPjrZH/r9uO9DFSlsbnuo+4UQU/18N/9U41O/hEONfOLyA79rcYXtbq65rDorfijy9epSZFw8fEWNBN4peoL0Ll7SS4QBfh0/4Jnj+Jabk3XpkHSMdxxyuKysOZ4BfiuXySHl2UXydcnnx30kioxf/vShfUSnz/oZraNzc1Nu0tJttfyZxEhcTaOb/Ofrls75Pu/7/A/zPvxwpc/TJ34YSpffeeM2qlH/jVhDV9gcvNONnb7ZJePd7ubF++dFqYkkt2sh8dkoHjBpXMs3De/mt/y3dmCZ8424T5Y6B9aQf4r8dxu+imujrYtcywuiBztmF7Bt/yXK7wSmVlUEpshvJ/7HthUAHPDGBa7l2AIACD6yMPolEHyG+Y62A8EXmZ8Xf8adtzCtX+sirIn7vGB2RM1vgnSbRt7WD193ec251eT45BSoLPg221gAwV8Wxoo0A8eK3SZfLOSwDxLwhIWfYccX6Y7Gh90o5crFAIEAOQQKByYDAwEpSBabAxwktBLgCepBlK3eWxLDWSILAZDljYCI9AEq3GPAiPRFstgfcJz+wItsCaKRYg4pSas5NDtkASXwFzSCRmWYwsErPaK+9cxFRS7+is43IUijJJmqcUTXxRb+rrMQFChHA1TobNj3BJOjFkWITAhTHscKeqFI0DA7aOYgJkAS4F5AQyAjZQ8PDqnvP0LaTY9xBT0l9ivkeM34IBVJKiBr+Vip51SqvTstE4ioAhRTTAagIqyo1+METPC8FhKCiGkQneRiYpCqKo+GVw7nWPBn9NWuwEUJQ1jCER7cseG02dIwGppNhOPnjIu1djYDAAAA') format('woff2');}
	.icon {
		font-family:"HMfont-login" !important;
		
		font-style:normal;
		color:#ffffff;
		&.weixin {
			&:before{content:"\e615";}
		}
		&.qq {
			&:before{content:"\e752";}
		}
		&.sinaweibo {
			&:before{content:"\e63d";}
		}
		&.xiaomi {
			&:before{content:"\e661";}
		}
	}
	.username{
		position: relative;
		.get-code{
			position: absolute;
			height: 90upx;
			display: flex;
			align-items: center;
			justify-content: center;
			right: 0;
			padding: 0 40upx;
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
	}
	.form {
		.res {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100upx;
			color: rgba($color: #ffffff, $alpha: 0.8);
			.fl {
				padding-right: 10upx;
				margin-right: 10upx;
				// border-right: 2upx solid #000;
				float: left;
			}
			.fr {
				float: left;
			}
		}
	}
	.oauth{
		position: absolute;
		bottom: 50upx;
		width: 100%;
		.text{
			width: 100%;
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: rgba($color: #ffffff, $alpha: 0.8);
			font-size: 28upx;
		}
		.list{
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 20upx 0;
			.icon{
				font-size:80upx;
				margin: 0 30upx;
			}
		}
	}
	page {
		box-sizing: border-box;
		padding: 30upx;
		background-color: #FFFFFF;
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
	.login {
		margin-top: 90upx;
	}
	.login input {
		border-bottom: 2upx solid #e6e6e6;
		height: 130upx;
		// color: #ccc;
	}
	.userpass {
		margin-top: 74upx;
		display: flex;
		justify-content: space-between;
	}
	.pass {
		color: #ccc;
	}
</style>
