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
				<!-- <input type="password" placeholder="请再次输入密码" value="" /> -->
				<input type="text" placeholder="请输入企业名称" v-model="companyName"/>
				<input placeholder="请输入法人身份证号码" v-model="identificationNumberOfTheTaxpayer"/>
				<input placeholder="请输入发票抬头" v-model="invoiceTitle" value="" />
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
</template>

<script>
import mpvuePicker from '../../graceUI/threeComponents/mpvuePicker.vue';
import mpvueCityPicker from '../../graceUI/threeComponents/mpvueCityPicker.vue';
export default {
	components: {
		mpvuePicker,
		mpvueCityPicker
	},
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
		doReg(){
			uni.hideKeyboard()
			//部分验证规则
			if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber))){
				uni.showToast({title: '请填写正确手机号码',icon:"none"});
				return false; 
			}
			if(!(/\d{17}[\d|x]|\d{15}/).test(this.identificationNumberOfTheTaxpayer) || (this.identificationNumberOfTheTaxpayer.length !== 15 && this.identificationNumberOfTheTaxpayer.length !== 18)){
				uni.showToast({title: '请填写正确的身份证号码',icon:"none"});
				return false;
			}
			if(!this.companyName){
				uni.showToast({title: '请填写公司名称',icon:"none"});
				return false; 
			}
			if(!this.identificationNumberOfTheTaxpayer){
				uni.showToast({title: '请填写身份证',icon:"none"});
				return false; 
			}
			if(!this.invoiceTitle){
				uni.showToast({title: '请填写发票抬头',icon:"none"});
				return false; 
			}
			if(!this.bankOpeningBankLicenseImg){
				uni.showToast({title: '请上传开户行证明',icon:"none"});
				return false; 
			}
			if(!this.businessLicenseImg){
				uni.showToast({title: '请上传营业执照',icon:"none"});
				return false; 
			}
			if(!this.corporateIdentityCardImgZ){
				uni.showToast({title: '请上传身份证照片',icon:"none"});
				return false; 
			}
			if(!this.generalTaxpayerQualificationCertificateImg){
				uni.showToast({title: '请上传纳税人证书',icon:"none"});
				return false; 
			}
			// if(this.companyName==0){
			// 	return false;
			// }
			this.$ajax.postJSON({
				url:`/sso/registerCompany?code=${this.codeText}&telePhone=${this.phoneNumber}`,
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
			this.getCodeBtnColor = "rgba(255,255,255,0.5)",
		
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
		showTabbar() {
			this.tabbar = true;
		},
		hideTabbar() {
			this.tabbar = false;
		},
		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value);
			this.index = e.target.value;
		},
		cityPicker1: function() {
			this.$refs.mpvueCityPicker1.show();
		},
		onConfirm1(e) {
			var cityText1 = e.label;
			var cityValue1 = e.value;
			var cityCode1 = e.cityCode;
			console.log(cityText1, cityValue1, cityCode1);
			this.cityText1 = cityText1;
			this.cityPickerValueDefault1 = cityValue1;
			this.city1 = e;
		},
		cityPicker2: function() {
			this.$refs.mpvueCityPicker2.show();
		},
		onConfirm2(e) {
			var cityText2 = e.label;
			var cityValue2 = e.value;
			var cityCode2 = e.cityCode;
			console.log(cityText2, cityValue2, cityCode2);
			this.cityText2 = cityText2;
			this.cityPickerValueDefault2 = cityValue2;
			this.city2 = e;
		},
		//表单提交
		formSubmit: function() {
			//表单验证
			if (this.city1 == null || this.city2 == null) {
				uni.showToast({ title: '请选择城市', icon: 'none' });
				return;
			}
			//获取城市信息 保存完整的城市信息 {lable - 文字 , value - 数组index记录, cityCode : 城市编号}
			//请根据实际需求选择要使用的数据
			console.log(JSON.stringify(this.city1));
			console.log(JSON.stringify(this.city2));
			uni.showToast({ title: '请观看控制台', icon: 'none' });
		}
	}
};
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
	.res {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 55upx;
		color: rgba($color: #ffffff, $alpha: 0.8);
	}
	.btn{
		color:#fff;
		width:90%;
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
	    margin:30upx auto;
	}
page {
	box-sizing: border-box;
	background-color: #f9f9f9;
}
.titl {
	font-size: 50upx;
}
.login {
	padding: 30upx;
	padding-bottom: 0;
	background-color: #ffffff;
}
.items {
	height: 110upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2upx solid #e6e6e6;
}
.items input {
	text-align: right;
}
.login input {
	/* border-bottom: 2upx solid #e6e6e6; */
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
.yzm {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2upx solid #e6e6e6;
}
	.uploadImg {		
		display: flex;
		flex-wrap: wrap;
		margin-top:30upx;
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
					margin:0 auto;
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
button {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 110upx;
	line-height: 110upx;
	border-radius: 0;
	background-color: #ff4188 !important;
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
@media screen and (max-height: 200upx) {
	button {
		display: none;
	}
}
</style>
