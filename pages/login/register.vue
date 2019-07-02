<template>
	<view class="zcheade">
		<view class="retitl">请选择你的身份进行注册</view>
		<view @tap="shopowner" class="shopowner">
			<image src="../../static/shopowner.png" mode=""></image>
			<view class="">我是普通用户</view>
		</view>
		<view @tap="clerk" class="clerk">
			<image src="../../static/clerk.png" mode=""></image>
			<view class="">我是企业家</view>
		</view>
	</view>
</template>
<!-- <template>
	<view>
        <view class="logo">
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
				<input placeholder="请输入验证码" v-model="codeText" placeholder-style="color: rgba(255,255,255,0.8);"/>
			</view>
			<view class="password">
				<input placeholder="请输入密码" v-model="password" password=true placeholder-style="color: rgba(255,255,255,0.8);"/>
			</view>
			<view class="bussinfo">
				<view class="text" @tap="getShow">企业注册</view>
				<image src="../../static/down.png" mode="aspectFit" @tap="getShow"></image>
			</view>
			
			<view class="bussMassge" v-show="isShow">
				<view class="busname">
					<input placeholder="企业名称" v-model="companyName" placeholder-style="color: rgba(255,255,255,0.8);"/>
				</view>
				<view class="legal">
					<input placeholder="法人身份证" v-model="identificationNumberOfTheTaxpayer" placeholder-style="color: rgba(255,255,255,0.8);"/>
				</view>
				<view class="invoice">
					<input placeholder="发票抬头" v-model="invoiceTitle" placeholder-style="color: rgba(255,255,255,0.8);"/>
				</view>
				<view class="uploadImg">
					<view class="uper">
						<view class="uper1" @tap="selectImg1" v-if="!bankOpeningBankLicenseImg">
							<view class="img"><image src="../../static/camera.png" mode="aspectFit" /></view>
							<view class="text">开户行证明</view>
						</view>
						<view class="preview">
							<image :src="bankOpeningBankLicenseImg"  @tap="selectImg1" mode="aspectFit" class="pic"></image>
						</view>
					</view> 
					<view class="uper">
						<view class="uper1" @tap="selectImg2" v-if="!corporateIdentityCardImgZ">
							<view class="img"><image src="../../static/camera.png" mode="aspectFit" /></view>
							<view class="text">身份证件照</view>
						</view>
						<view class="preview">
							<image :src="corporateIdentityCardImgZ"  @tap="selectImg2" mode="aspectFit" class="pic"></image>
						</view>
					</view>
					<view class="uper">
						<view class="uper1" @tap="selectImg3" v-if="!generalTaxpayerQualificationCertificateImg">
							<view class="img"><image src="../../static/camera.png" mode="aspectFit" /></view>
							<view class="text">通用纳税人资格证书</view>
						</view>
						<view class="preview">
							<image :src="generalTaxpayerQualificationCertificateImg"  @tap="selectImg3" mode="aspectFit" class="pic"></image>
						</view>
					</view>
					<view class="uper">
						<view class="uper1" @tap="selectImg4" v-if="!businessLicenseImg">
							<view class="img"><image src="../../static/camera.png" mode="aspectFit" /></view>
							<view class="text">营业执照</view>
						</view>
						<view class="preview">
							<image :src="businessLicenseImg"  @tap="selectImg4" mode="aspectFit" class="pic"></image>
						</view>
					</view>
				</view>		
			</view>
			
			
			
			<view class="btn" @tap="doReg">立即注册</view>
			<view class="res">
				<view @tap="toLogin">已有账号立即登录</view>
			</view>
		</view>
		
	</view>
</template> -->

<script>
	import md5 from "@/common/SDK/md5.min.js";
	export default {
		data() {
			return {
				phoneNumber:"",
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
				businessLicenseImg:''
			}
		},
		onLoad() {

		},
		methods: {
			selectImg1 : function() {
				let _this = this;
			    uni.chooseImage({
			        count:1,
			        success:(res) => {
			            _this.bankOpeningBankLicenseImg = res.tempFilePaths[0];
						uni.uploadFile({
						    url: 'http://192.144.170.210:8081/upload/fileUploadInTencent',
						    filePath: _this.bankOpeningBankLicenseImg,
						    name: 'file',
						    success: function (uploadFileRes) {
								_this.bankOpeningBankLicenseImg = JSON.parse(uploadFileRes.data).data.url;
						    }
						 });
			        }
			    })
			},
			selectImg2 : function() {
				let _this = this;
			    uni.chooseImage({
			        count:1,
			        success:(res) => {
			            _this.corporateIdentityCardImgZ = res.tempFilePaths[0];
						uni.uploadFile({
						    url: 'http://192.144.170.210:8081/upload/fileUploadInTencent',
						    filePath: _this.corporateIdentityCardImgZ,
						    name: 'file',
						    success: function (uploadFileRes) {
								_this.corporateIdentityCardImgZ = JSON.parse(uploadFileRes.data).data.url;
						    }
						 });
			        }
			    })
			},
			selectImg3 : function() {
				let _this = this;
			    uni.chooseImage({
			        count:1,
			        success:(res) => {
			            _this.generalTaxpayerQualificationCertificateImg = res.tempFilePaths[0];
						uni.uploadFile({
						    url: 'http://192.144.170.210:8081/upload/fileUploadInTencent',
						    filePath: _this.generalTaxpayerQualificationCertificateImg,
						    name: 'file',
						    success: function (uploadFileRes) {
								_this.generalTaxpayerQualificationCertificateImg = JSON.parse(uploadFileRes.data).data.url;
						    }
						 });
			        }
			    })
			},
			selectImg4 : function() {
				let _this = this;
			    uni.chooseImage({
			        count:1,
			        success:(res) => {
			            _this.businessLicenseImg = res.tempFilePaths[0];
						uni.uploadFile({
						    url: 'http://192.144.170.210:8081/upload/fileUploadInTencent',
						    filePath: _this.businessLicenseImg,
						    name: 'file',
						    success: function (uploadFileRes) {
								_this.businessLicenseImg = JSON.parse(uploadFileRes.data).data.url;
						    }
						 });
			        }
			    })
			},
			getShow() {
				this.isShow = !this.isShow
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
				this.getCodeBtnColor = "rgba(255,255,255,0.5)"
				uni.request({
					method:'get',
					url:`http://192.144.170.210:8085/sso/getAuthCode?telephone=${this.phoneNumber}`,
					success: function(res) {
						uni.showToast({title: '验证码已发送',icon:"none"});
						_this.setTimer();
						_this.codeText=res.data.data;
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
			//跳转
			shopowner() {
				uni.navigateTo({
					url: 'shopowner'
				});
			},
			clerk() {
				uni.navigateTo({
					url: 'clerk'
				});
			},
			doReg(){
				uni.hideKeyboard()
				//模板示例部分验证规则
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber))){ 
					uni.showToast({title: '请填写正确手机号码',icon:"none"});
					return false; 
				}
				if(this.isShow==true) {
					uni.request({
						method:"POST",
						url:`http://192.144.170.210:8085/sso/registerCompany?telePhone=${this.userPhone}`,
						data:{
							userPhone:this.phoneNumber,
							passWord:this.password,
							companyName:this.companyName,
							identificationNumberOfTheTaxpayer:this.identificationNumberOfTheTaxpayer,
							invoiceTitle:this.invoiceTitle,
							bankOpeningBankLicenseImg:this.bankOpeningBankLicenseImg,
							businessLicenseImg:this.businessLicenseImg,
							corporateIdentityCardImgZ:this.corporateIdentityCardImgZ,
							generalTaxpayerQualificationCertificateImg:this.generalTaxpayerQualificationCertificateImg,
						},
						success:function(res){
							console.log(res)
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
						},
						fail:function(err){
							console.log(err)
						}
						
					});
				}else {
					uni.request({
						method:"POST",
						url:`http://192.144.170.210:8085/sso/register?username=${this.phoneNumber}&password=${this.password}&telephone=${this.phoneNumber}&authCode=${this.codeText}`,
						success:function(res){
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
						},
						fail:function(err){
							console.log(err)
						}
						
					});
				}
				
				
				//示例验证码，实际使用中应为请求服务器比对验证码是否正确。
				// console.log(this.code,this.codeText)
				// if(this.code!==this.codeText){ 
				// 	uni.showToast({title: '验证码不正确',icon:"none"});
				// 	return false; 
				// }
				uni.showLoading({
					title: '提交中...'
				})
				//模板示例把用户注册信息储存在本地，实际使用中请替换为上传服务器。
				setTimeout(()=>{
					uni.getStorage({
						key: 'UserList', 
						success:(res)=>{
							//增加记录，密码md5
							res.data.push({username:this.phoneNumber,passwd:md5(this.passwd)})
							uni.setStorage({
								key: 'UserList',
								data: res.data,
								success: function () {
									uni.hideLoading()
									uni.showToast({title: '注册成功',icon:"success"});
									setTimeout(function(){
										uni.navigateBack();
									},1000)
								}
							});
						},
						fail:(e)=>{
							uni.hideLoading()
							console.log('error');
							//新建UserList
							uni.setStorage({
								key: 'UserList',
								data: [{username:this.phoneNumber,passwd:md5(this.passwd)}],
								success: function () {
									uni.hideLoading()
									uni.showToast({title: '注册成功',icon:"success"});
									setTimeout(function(){
										uni.navigateBack();
									},1000)
								},
								fail:function(e){
									console.log('set error:'+JSON.stringify(e));
								}
							});
						}
					});
				},1000)
			},
			toLogin(){ 
				uni.hideKeyboard()
				uni.redirectTo({url: 'login'});
				uni.navigateBack();
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
		.res {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100upx;
			color: rgba($color: #ffffff, $alpha: 0.8);
		}
	}
	.bussinfo {
		display: flex;
		height: 50upx;
		justify-content: flex-end;
		image {
			
			width: 35upx;
			height: 35upx;
		}
		.text {
			margin-right: 10upx;
			font-size: 30upx;
			color: #fff;
		}
		
	}
	.zcheade{
		margin-top:100upx;
	}
	.uploadImg {		
		display: flex;
		flex-wrap: wrap;
		.uper {
			position: relative;
			width: 45%;
			height: 200upx;
			margin-left: 20upx;
			margin-bottom: 20upx;
			background-color: #fff;
			border-radius: 10upx;
			.uper1 {
				z-index: 1;
				.img {
					width: 129px;
					text-align: center;
					margin-top: 30upx;
					height: 44px;
					image {
						width: 100upx;
						height: 100upx;
					}
				}
				.text {
					width: 100%;
					text-align: center;
					color: #bfbfbf;
					font-size: 30upx;
				}
			}
			
			.preview {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 200upx;
				margin-bottom: 20upx;
				border-radius: 10upx;
				image {
					width: 100%;
					height: 200upx;
				}
			}
		}
		
		
	}
	page {
		background-color: #ffffff;
	}
	.retitl {
		text-align: center;
		font-size: 36upx;
		color: #333333;
	}
	.shopowner {
		margin: 146upx 0;
		text-align: center;
	}
	.shopowner image {
		width: 250upx;
		height: 250upx;
		margin-bottom: 20upx;
	}
	.clerk {
		text-align: center;
	}
	.clerk image {
		width: 250upx;
		height: 250upx;
		margin-bottom: 20upx;
	}
	
</style>
