<template>
	<view>
		<view class="login">
		   <input type="number" maxlength="11" placeholder="请输入手机号" v-model="phoneNumber"/>
			<view class="yzm">
				<input type="number" style="border: 0;" placeholder="请输入验证码" v-model="codeText"/>
				<span style="color: #d71518;" v-show="sendAuthCode" class="auth_text auth_text_blue" @click.stop="getCode()">{{getCodeText}}</span>
				<span style="color: #d71518; " v-show="!sendAuthCode" class="auth_text">
					<span class="auth_text_blue">{{ auth_time }}</span>
					秒后重新发送验证码
				</span>
			</view>
			<input type="password" placeholder="请输入密码" v-model="password"/>
		</view>
		<view class="btn" @tap="doReset">重置密码</view>
     <!--   <view class="logo">
			<view class="img">
				<image mode="widthFix" src="../../static/HM-login/img/log.png"></image>
			</view>
		</view>
		<view class="form">
			<view class="username">
				<view class="get-code" :style="{'color':getCodeBtnColor}" @click.stop="getCode()">{{getCodeText}}</view>
				<input placeholder="请输入手机号" v-model="phoneNumber" placeholder-style="color: rgba(255,255,255,0.8);"/>
			</view>
			<view class="code">
				<input placeholder="请输入验证码" v-model="code" placeholder-style="color: rgba(255,255,255,0.8);"/>
			</view>
			<view class="password">
				<input placeholder="请输入密码" v-model="passwd" password=true placeholder-style="color: rgba(255,255,255,0.8);"/>
			</view>
			<view class="btn" @tap="doReset">重置密码</view>

		</view> -->
		
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
				// code:'',
				password:"",
				getCodeText:'获取验证码',
				getCodeBtnColor:"#ccc",
				getCodeisWaiting:false,
				codeText:"",
				isShow:false,
				telePhone:'',
				sendAuthCode: true /*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */,
				auth_time: 0 /*倒计时 计数器*/
			}
		},
		onLoad() {

		},
		methods: {
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
				this.getCodeBtnColor = "rgba(255,255,255,0.5)"
				uni.request({
					method:'get',
					url:`http://192.144.170.210:8085/sso/getAuthCode?telephone=${this.phoneNumber}`,
					success: function(res) {
						uni.showToast({title: '验证码已发送',icon:"none"});
						_this.setTimer();
						_this.codeText=res.data.data;
						console.log(_this.codeText)
					},
					fail:function(err){
						// console.log(err)
					}
				});
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
			// getCode(){
			// 	if(this.getCodeisWaiting){
			// 		return ;
			// 	}
			// 	if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber))){ 
			// 		uni.showToast({title: '请填写正确手机号码',icon:"none"});
			// 		return false; 
			// 	} 
			// 	this.getCodeText = "发送中..."
			// 	this.getCodeisWaiting = true;
			// 	this.getCodeBtnColor = "rgba(255,255,255,0.5)"
			// 	setTimeout(()=>{
			// 		uni.showToast({title: '验证码已发送',icon:"none"});
			// 		this.code=1234;
			// 		this.setTimer();
			// 	},1000)
			// 	
			// 	
			// },
			// setTimer(){
			// 	let holdTime = 60;
			// 	this.getCodeText = "重新获取(60)"
			// 	this.Timer = setInterval(()=>{
			// 		if(holdTime<=0){
			// 			this.getCodeisWaiting = false;
			// 			this.getCodeBtnColor = "#ffffff";
			// 			this.getCodeText = "获取验证码"
			// 			clearInterval(this.Timer);
			// 			return ;
			// 		}
			// 		this.getCodeText = "重新获取("+holdTime+")"
			// 		holdTime--;
			// 		
			// 	},1000)
			// },
			doReset(){
				uni.hideKeyboard()
				//验证手机号
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber))){ 
					uni.showToast({title: '请填写正确手机号码',icon:"none"});
					return false; 
				}
				let _this=this;
				_this.$ajax.post({
					url:`/sso/updatePassword`,
					// header:{
					// 	'content-type':'application/x-www-form-urlencoded'
					// },
					data:{
						telephone:this.phoneNumber,
						password:this.password,
						authCode:this.codeText
					}	
				}).then(res=>{
					uni.showToast({title: '密码已重置',icon:"success"});
					setTimeout(function(){
						uni.redirectTo({
							url: 'login'
						})
					},500)
					
				});
				

				//示例验证码，实际使用中应为请求服务器比对验证码是否正确。
				// if(this.code!=1234){ 
				// 	uni.showToast({title: '验证码不正确',icon:"none"});
				// 	return false; 
				// }
				// uni.showLoading({
				// 	title: '提交中...'
				// })
				//模板示例修改本地储存的用户信息，实际使用中请替换为上传服务器修改。
				// setTimeout(()=>{
				// 	uni.getStorage({
				// 		key: 'UserList',
				// 		success: (res)=>{
				// 			uni.hideLoading()
				// 			for(let i in res.data){
				// 				let row = res.data[i];
				// 				if(row.username==this.phoneNumber){
				// 					res.data[i].passwd = md5(this.passwd);
				// 					uni.setStorage({
				// 						key: 'UserList',
				// 						data: res.data,
				// 						success: function () {
				// 							uni.showToast({title: '密码已重置',icon:"success"});
				// 							setTimeout(()=>{
				// 								uni.navigateBack();
				// 							},1000)
				// 						}
				// 					});
				// 					return ;
				// 				}
				// 			}
				// 			uni.showToast({title: '手机号码未注册',icon:"none"});
				// 			
				// 		},
				// 		fail:function(e){
				// 			uni.hideLoading()
				// 			uni.showToast({title: '手机号码未注册',icon:"none"});
				// 		}
				// 	});
				// },1000)
				
				
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
		&.weibo {
			&:before{content:"\e63d";}
		}
		&.xiaomi {
			&:before{content:"\e661";}
		}
	}
	.form {
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
	page {
		box-sizing: border-box;
		padding: 30upx;
	}
</style>
