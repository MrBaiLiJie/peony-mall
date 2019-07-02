<template>
	<view class="zcheade">
		<view class="retitl">请选择你的身份进行注册</view>
		<view @tap="shopowner" class="shopowner">
			<image src="../../static/zu72x.png" mode=""></image>
			<view class="">我是普通用户</view>
		</view>
		<view @tap="clerk" class="clerk">
			<image src="../../static/clerk.png" mode=""></image>
			<view class="">我是企业家</view>
		</view>
	</view>
</template>
<script>
	import md5 from "@/common/SDK/md5.min.js";
	export default {
		data() {
			return {
			}
		},
		onLoad() {

		},
		methods: {
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
