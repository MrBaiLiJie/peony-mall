<template>
	<view class="">
		<view class="head">
			<view class="img" @click="goSetting()">
				<image src="../../static/set.png" mode=""></image>
			</view>
			<view class="Ahead">
				<view class="headImage" style="width:150upx;height:150upx;border-radius: 100%;margin-left:27upx;margin-bottom:10upx;">
					<image @tap="onPhoto()" :src="icon ? icon : '../../static/img/category/list/nanzhuang.jpg'" mode=""></image>
				</view>

				<!-- ../../static/img/icon/touxiang.png -->
				<view class="headtxt">
					<view class="" style="margin-left:10upx">
						{{dealendUsername}}
					</view>
					<!-- <view class="">
						{{item.phone}}
					</view> -->
					<view v-show="user.isUser" style="margin-left:10upx">
						{{integration}}积分
					</view>
				</view>
			</view>
		</view>
		<view class="order">
			<view class="order-top">
				<text class="my-order">我的订单</text>
				<text class="all-order" @tap="goOrderList(0)">更多></text>
			</view>
			<!-- 订单类型 -->
			<view class="list">
				<view class="box" v-for="(row,index) in orderList" :key="index" @tap="goOrderList(index+1)">
					<view class="img">
						<image :src="row.img"></image>
					</view>
					<view class="text">{{row.text}}</view>
				</view>
			</view>
		</view>

		<!-- 我的集采单 -->
		<view class="ordertwo" v-show="user.isUser">

			<view class="order-top">
				<text class="my-order">我的询价单</text>
				<text class="all-order" @tap="gojicaiOrderList(0)">更多></text>
			</view>
			<!-- 订单类型 -->
			<view class="list">
				<view class="box" v-for="(row,index) in jicaiorderList" :key="index" @tap="gojicaiOrderList(index+1)">
					<view class="img">
						<image :src="row.img"></image>
					</view>
					<view class="text">{{row.text}}</view>
				</view>
			</view>
		</view>
		<!-- 我的钱包 -->
		<view class="qianbaoordertwo">
			<view class="order-top">
				<text class="my-order">我的钱包</text>
			</view>
			<!-- 类型 -->
			<view class="qianbaolist">
				<view class="box" v-for="(row,index) in qianbaoList" :key="index" @tap="goQianbao(row)">
					<view class="img">
						<image :src="row.img"></image>
					</view>
					<view class="text">{{row.txt}}</view>
				</view>
			</view>
		</view>
		<!-- 我的服务 -->

		<view class="Other" v-for="(item,index) in Other" :key='index'>
			<view class="order-top">
				<text class="my-orders">
					{{item.title}}
				</text>
			</view>
			<view class="list">
				<view class="Aother" v-for="(item2,index2) in item.Aother" :key='index2' @tap="toolTap(item2)" v-show="user.isUser || index2 != 4">
					<image :src="item2.img" mode=""></image>
					<view style="font-size: 28upx;width:112upx">{{item2.txt}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfor: [{

					name: '王欣',
					phone: '17833333333',
					time: '69'

				}],
				user: {},
				dealendUsername: "",
				integration: "",
				headPortrait: '',
				icon: '',
				//我的订单
				// 订单类型

				orderList: [

					{
						text: '待付款',
						img: "../../static/img/icon/daifukuan.png",
					},
					{
						text: '待收货',
						img: "../../static/img/icon/daifahuo.png",
					},
					{
						text: '已完成',
						img: "../../static/img/icon/daishouhuo.png",
					},
					{
						text: '退换货',
						img: "../../static/img/icon/daipingjia.png",
					},
				],
				//集采单
				// 订单类型
				jicaiorderList: [{
						text: '未响应',
						img: "../../static/img/icon/weixiangying.png",
					},
					{
						text: '已响应',
						img: "../../static/img/icon/yixiangying.png",
					},
					{
						text: '已下单',
						img: "../../static/img/icon/xiadan.png",
					},
				],
				//钱包
				qianbaoList: [{
						txt: '我的积分',
						img: '../../static/img/icon/my_icon_03.png',
						url: '../topup/topup'
					},
					{
						txt: '优惠券',
						img: '../../static/img/icon/youhuiquan.png',
						url: "../coupon/coupon"
					},
				],
				Other: [{
					title: '我的服务',
					Aother: [

						{
							txt: '我的收藏',
							img: '../../static/img/icon/shoucangbei.png',
							url: '../collection/collection'
						},
						{
							txt: '发票中心',
							img: '../../static/img/icon/fapiao.png',
							url: '../invoicedad/invoicedad'
						},
						{
							txt: '地址管理',
							img: '../../static/img/icon/dizhi.png',
							url: '../addressManagement/addressManagement'
						},
						{
							txt: '意见反馈',
							img: '../../static/img/icon/yijian.png',
							url: '../uni-comment/uni-comment'
						},
						{
							txt: '集采商品',
							img: '../../static/img/icon/my_icon_16.png',
							url: "../jicai/jicai"
						}
					]
				}, ]
			}
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			if (e.scrollTop >= 0) {
				this.headerPosition = "fixed";
			} else {
				this.headerPosition = "absolute";
			}
		},
		onReady() {
			// 此处，演示,每次页面初次渲染都把登录状态重置
			// uni.setStorage({
			// 	key: 'UserInfo',
			// 	data: false,
			// 	success: function () {
			// 	},
			// 	fail:function(e){
			// 	}
			// });
		},
		onShow() {
			let _this = this;
			// console.log('123')
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					if (res.data && res.data.id) {
						_this.user = res.data;
						console.log(_this.user)
						this.user.username = res.data.username ? res.data.username : res.data.companyName;
						let dealUsername = this.user.username;
						let pat = /^(\d{3})\d*(\d{4})$/
						this.dealendUsername = dealUsername ? dealUsername : this.user.phone.replace(pat, '$1****$2');
						this.user.icon = res.data.icon;
						this.icon = this.user.icon;
						this.user.integration = res.data.integration;
						this.integration = this.user.integration;
						this.user.isUser = res.data.ifCoupon;
						_this.$ajax.postJSON({
							url:`/IntegralSale/getIntegralByUserId?memId=${_this.user.id}`
						}).then(ress=>{
							_this.integration = ress.data.data
							// console.log(_this.integration)
						})
					} else {
						uni.navigateTo({
							url: "../login/login"
						})
					}
				},
				fail: function(err) {
					uni.navigateTo({
						url: "../login/login"
					})
				}
			});
		},
		onNavigationBarButtonTap: function(e) {
			uni.navigateTo({
				url: '../set/set'
			})
		},
		methods: {
			//头像修改
			onPhoto() {
				let _this = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], 
					sourceType: ['album'], //从相册选择
					success: function(res) {
						_this.$ajax.upImg({
							url: "/upload/fileUploadInTencent",
							imgUrl: res.tempFilePaths[0]
						}).then(res => {
							let data = JSON.parse(res.data);
							_this.icon = data.data.url;
							_this.user.icon = data.data.url;
							let member = {
								icon: _this.user.icon,
								id: _this.user.id
							}
							let obj = { 
								..._this.user
							}
							_this.$ajax.postJSON({
								url: `/MemberMessage/updateMember`,
								data: member,
							}).then(res => {
								uni.setStorageSync('userInfo', obj)
							})
						})
					}
				})
			},
			goQianbao(row) {
				uni.navigateTo({
					url: row.url
				})
			},
			goSetting() {
				uni.navigateTo({
					url: '../user/setting/setting'
				})

			},
			isLogin() {
				//实际应用中,用户登录状态应该用token等方法去维持登录状态.
				const value = uni.getStorageSync('UserInfo');
				if (value) {
					return true;
				}
				return false
			},
			toolTap(item) {
				if (item.url) {
					uni.navigateTo({
						url: item.url
					})
				}
			},
			goOrderList(index) {
				uni.navigateTo({
					url: "../user/order_list/order_list?tbIndex=" + index
				})
			},
			gojicaiOrderList(index) {
				uni.navigateTo({
					url: "../jicaiorderlist/jicaiorderlist?tbIndex=" + index
				})
			},
			toGoods() {
				uni.navigateTo({
					url: '../jicai/jicai'
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f9f9f9;
		padding-bottom: 100upx;
	}

	/* 我的订单 */
	.order-top {
		height: 60upx;
		width: 100%;
		display: block;
	}

	.my-order {
		line-height: 60upx;
		font-size: 32upx;
		text-align: left;
	}

	.my-orders {
		line-height: 60upx;
		font-size: 32upx;
	}

	.all-order {
		line-height: 60upx;
		font-size: 30upx;
		color: #AEAEAE;
		text-align: right;
		float: right;
	}

	.order {
		// width: 84%;
		// margin: 30upx 4% 30upx 4%;
		padding: 30upx 4% 20upx 4%;
		background-color: #fff;
		box-shadow: 0upx 0upx 25upx rgba(0, 0, 0, 0.1);
		margin-top: 21upx;

		// border-radius: 15upx;
		.list {
			display: flex;
			padding-bottom: 10upx;
			flex-direction: row;
			justify-content: space-between;
			margin-top: 15upx;

			// margin-left:28upx;
			.box {
				.img {
					width: 100%;
					display: flex;
					justify-content: center;

					image {
						width: 6vw;
						height: 6vw;
						overflow: hidden;
					}
				}

				.text {
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 28upx;
					color: #3d3d3d;
				}
			}
		}

		.balance-info {
			display: flex;
			padding: 10upx 0;

			.left {
				width: 75%;
				display: flex;

				.box {
					width: 50%;
					font-size: 28upx;

					.num {
						width: 100%;
						height: 50upx;
						display: flex;
						justify-content: center;
						align-items: flex-end;
						color: #f9a453;
					}

					.text {
						width: 100%;
						display: flex;
						justify-content: center;
						color: #3d3d3d;
						font-size: 28upx;
					}
				}
			}

			.right {
				border-left: solid 1upx #17e6a1;
				width: 25%;

				.box {

					.img {
						width: 100%;
						height: 50upx;
						display: flex;
						justify-content: center;
						align-items: flex-end;

						.icon {
							font-size: 45upx;
							color: #e78901;
						}
					}

					.text {
						width: 100%;
						display: flex;
						justify-content: center;
						font-size: 28upx;
						color: #3d3d3d;
					}
				}
			}
		}
	}

	.ordertwo {
		// width: 84%;
		// margin: 30upx 4% 30upx 4%;
		padding: 30upx 4% 20upx 4%;
		background-color: #fff;
		box-shadow: 0upx 0upx 25upx rgba(0, 0, 0, 0.1);
		margin-top: 21upx;
		float: left;
		width: 92%;

		// border-radius: 15upx;
		.list {
			float: left;

			.box {
				width: 99upx;

				.img {
					width: 100%;

					image {
						width: 6vw;
						height: 6vw;
						overflow: hidden;
					}
				}

				.text {
					width: 100%;
					font-size: 28upx;
					color: #3d3d3d;
				}
			}
		}

		.balance-info {
			display: flex;
			padding: 10upx 0;

			.left {
				width: 75%;
				display: flex;

				.box {
					width: 50%;
					font-size: 28upx;

					.num {
						width: 100%;
						height: 50upx;
						display: flex;
						justify-content: center;
						align-items: flex-end;
						color: #f9a453;
					}

					.text {
						width: 100%;
						display: flex;
						justify-content: center;
						color: #3d3d3d;
						font-size: 28upx;
					}
				}
			}

			.right {
				border-left: solid 1upx #17e6a1;
				width: 25%;

				.box {

					.img {
						width: 100%;
						height: 50upx;
						display: flex;
						justify-content: center;
						align-items: flex-end;

						.icon {
							font-size: 45upx;
							color: #e78901;
						}
					}

					.text {
						width: 100%;
						display: flex;
						justify-content: center;
						font-size: 28upx;
						color: #3d3d3d;
					}
				}
			}
		}
	}

	.qianbaoordertwo {
		// width: 84%;
		// margin: 30upx 4% 30upx 4%;
		padding: 30upx 4% 20upx 4%;
		background-color: #fff;
		box-shadow: 0upx 0upx 25upx rgba(0, 0, 0, 0.1);
		margin-top: 21upx;
		float: left;
		width: 92%;

		// border-radius: 15upx;
		.qianbaolist {
			float: left;

			.box {
				width: 120upx;

				.img {
					width: 100%;

					image {
						width: 6vw;
						height: 6vw;
						overflow: hidden;
					}
				}

				.text {
					width: 100%;
					font-size: 28upx;
					color: #3d3d3d;
				}
			}
		}

		.balance-info {
			display: flex;
			padding: 10upx 0;

			.left {
				width: 75%;
				display: flex;

				.box {
					width: 50%;
					font-size: 28upx;

					.num {
						width: 100%;
						height: 50upx;
						display: flex;
						justify-content: center;
						align-items: flex-end;
						color: #f9a453;
					}

					.text {
						width: 100%;
						display: flex;
						justify-content: center;
						color: #3d3d3d;
						font-size: 28upx;
					}
				}
			}

			.right {
				border-left: solid 1upx #17e6a1;
				width: 25%;

				.box {

					.img {
						width: 100%;
						height: 50upx;
						display: flex;
						justify-content: center;
						align-items: flex-end;

						.icon {
							font-size: 45upx;
							color: #e78901;
						}
					}

					.text {
						width: 100%;
						display: flex;
						justify-content: center;
						font-size: 28upx;
						color: #3d3d3d;
					}
				}
			}
		}
	}

	.qianbaolist .box:nth-child(1) {
		float: left;
		text-align: center;
		margin-top: 15upx;
	}

	.qianbaolist .box:nth-child(2) {
		float: left;
		margin-left: 66upx;
		text-align: center;
		margin-top: 15upx;
	}

	.ordertwo .box:nth-child(1) {
		float: left;
		text-align: center;
		margin-top: 15upx;
	}

	.ordertwo .box:nth-child(2) {
		float: left;
		text-align: center;
		margin-top: 15upx;
		margin-left: 98upx;
	}

	.ordertwo .box:nth-child(3) {
		float: left;
		text-align: center;
		margin-top: 15upx;
		margin-left: 102upx;
	}

	.Other .Aother:nth-child(1) {
		float: left;
		text-align: center;
		margin-top: 15upx;

	}

	.Other .Aother:nth-child(2) {
		float: left;
		text-align: center;
		margin-top: 15upx;
		margin-left: 70upx;
	}

	.Other .Aother:nth-child(3) {
		float: left;
		text-align: center;
		margin-top: 15upx;
		margin-left: 70upx;
	}

	.Other .Aother:nth-child(4) {
		float: left;
		text-align: center;
		margin-top: 15upx;
		margin-left: 70upx;
	}

	.Other .Aother:nth-child(5) {
		float: left;
		text-align: center;
		margin-top: 22upx;

	}

	// .ordertwo .list:after{
	// 	content: '';
	//        width:17%;
	// }
	.head {
		// padding-top: 30upx;
		width: 100%;
		height: 270upx;
		background-color: #d71518;

		.img {
			width: 6vw;
			height: 6vw;
			float: right;
			margin-right: 31upx;

			image {
				width: 6vw;
				height: 6vw;
			}
		}
	}

	.Ahead {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.headImage image {
		width: 150upx;
		height: 150upx;
		border-radius: 100% // padding: 29upx;
	}

	.headtxt {
		font-size: 30upx;
		color: #FFFFFF;
	}

	.headtxt>view {
		color: #FFFFFF;
	}

	.Other {
		// width: 84%;
		// margin: 30upx 4% 30upx 4%;
		padding: 30upx 4% 20upx 4%;
		background-color: #fff;
		box-shadow: 0upx 0upx 25upx rgba(0, 0, 0, 0.1);
		margin-top: 21upx;
		float: left;
		width: 92%;

		// border-radius: 15upx;
		.list {
			float: left;

			.Aother {
				width: 120rpx;

				.img {
					width: 100%;

					image {
						width: 6vw;
						height: 6vw;
						overflow: hidden;
					}
				}

				.text {
					width: 100%;
					font-size: 28upx;
					color: #3d3d3d;
				}
			}
		}

		.balance-info {
			display: flex;
			padding: 10upx 0;

			.left {
				width: 75%;
				display: flex;

				.box {
					width: 50%;
					font-size: 28upx;

					.num {
						width: 100%;
						height: 50upx;
						display: flex;
						justify-content: center;
						align-items: flex-end;
						color: #f9a453;
					}

					.text {
						width: 100%;
						display: flex;
						justify-content: center;
						color: #3d3d3d;
						font-size: 28upx;
					}
				}
			}

			.right {
				border-left: solid 1upx #17e6a1;
				width: 25%;

				.box {

					.img {
						width: 100%;
						height: 50upx;
						display: flex;
						justify-content: center;
						align-items: flex-end;

						.icon {
							font-size: 45upx;
							color: #e78901;
						}
					}

					.text {
						width: 100%;
						display: flex;
						justify-content: center;
						font-size: 28upx;
						color: #3d3d3d;
					}
				}
			}
		}
	}

	// .Other{
	// 	padding: 30upx 4% 0rpx 4%;
	// 	background-color:#fff;
	// 	-webkit-box-shadow:0upx 0upx 25upx rgba(0, 0, 0, 0.1);
	// 	box-shadow:0upx 0upx 25upx rgba(0, 0, 0, 0.1);
	// 	margin-top:21upx;
	// }
	// .Other .list:after{
	// 	content: '';
	// 	width:20%;
	// }
	// .Aother{
	// 	display: flex;
	// 	width: 120upx;
	// 	margin: 30upx 12upx 30upx 12upx;
	// 	flex-wrap: wrap;
	// 	align-items: center;
	// 	justify-content: center;
	// 	text-align: center;
	// }
	.Other image {
		width: 6vw;
		height: 6vw;
	}

	.set {
		position: absolute;
		top: 0;
		right: 0;
	}

	.set image {
		width: 40upx;
		height: 40upx;
	}
</style>
