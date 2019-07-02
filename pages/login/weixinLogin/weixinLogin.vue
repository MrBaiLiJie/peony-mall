<template>
	<view class="weixin-login">
		<button 
			type="primary" 
			style="background: var(--common-color);"
			open-type="getUserInfo" 
			@getuserinfo="getUserInfo" 
			withCredentials="true">微信授权登录</button>
		<view class="login-explain">
			请点击按钮授权微信登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			getUserInfo(data){
				if(data.detail.errMsg == "getUserInfo:ok"){
					console.log(data.detail.userInfo)
					var loginData = {};
					loginData = data.detail.userInfo;
					loginData.loginStatus = true;
					uni.setStorage({
						key:"login",
						data:loginData,
						success:function(res){
							uni.navigateBack({
								delta:1
							})
						}
					})
				}
			}
		}
	}
</script>

<style>
.weixin-login{
	height: 700upx;
	width: 650upx;
	padding: 50upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.login-explain{
	color: #CCCCCC;
	font-size: 28upx;
	margin-top: 100upx;
}
</style>
