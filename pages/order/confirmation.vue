<template>
	<view>
		<naviGation></naviGation>
		<!-- 收货地址 -->
		<view class="addr" @tap="goAddressList()">
			<view class="icon">
				<image src="../../static/img/icon/dizhi.png" mode=""></image>
			</view>
			<view class="right" v-if="dingweiData.name">
				<view class="tel-name">
					<view class="name">
						{{ dingweiData.name }}
					</view>
					<view class="tel">
						{{ dingweiData.phoneNumber }}
					</view>
				</view>
				<view class="addres">
					{{ dingweiData.province }} {{ dingweiData.city }} {{ dingweiData.region }} {{ dingweiData.detailAddress }}
				</view>
			</view>
			<view class="right" v-if="!dingweiData.name">
				请选择地址
			</view>
		</view>
		<!-- 购买商品列表 -->
		<view class="buy-list">
			<view class="row">
				<view class="goods-info" v-for="(row,index) in buylist" :key="index">
					<view class="img">
						<image :src="row.pmsProduct.pic"></image>
					</view>
					<view class="info">
						<view class="title">{{row.pmsProduct.name}}</view>
						<view class="spec">规格:{{row.sku.value}}</view>
						<view class="price-number">
							<view class="price">￥{{row.sku.price}}</view>
							<view class="number">
								X{{ row.quantity }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 提示-备注 -->
		<view class="order">
			<!-- <view class="row">
				<view class="left">
					积分 :
				</view>
				<view class="right">
					已扣除{{int}}积分抵扣{{deduction}}元
				</view>
			</view> -->
			<view class="row">
				<view class="left">
					备注 :
				</view>
				<view class="right">
					<input placeholder="选填,备注内容" v-model="note" />
				</view>
			</view>

		</view>
		<!-- 优惠券 -->
		<view class="order" @tap="chooseYouHui()">
			<view class="row">
				<view class="left">
					优惠券
				</view>
				<view class="right" v-if="!chooseYouHuiData.id">
					共<text style="color: red;">{{ couList.length }}</text>张优惠券可用
				</view>
				<view class="right" v-if="chooseYouHuiData.id">
					已选择<text style="color: red;">1</text>张优惠券
				</view>
			</view>
		</view>
		<!-- 明细 -->
		<view class="detail">
			<view class="row">
				<view class="nominal">
					商品金额
				</view>
				<view class="content">
					￥{{goodsPrice}}
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					运费
				</view>
				<view class="content">
					￥{{freight}}
				</view>
			</view>
			<!-- <view class="row">
				<view class="nominal">
					积分抵扣
				</view>
				<view class="content">
					￥-{{deduction}}
				</view>
			</view> -->
			<view class="row">
				<view class="nominal">
					优惠券
				</view>
				<view class="content">
					-{{coupons}}
				</view>
			</view>
			<view class="row" @tap="showFapiaoList()">
				<view class="nominal">
					发票
				</view>
				<view class="content">
					{{ chooseFaPiao.objectId ? chooseFaPiao.account : "选择发票>" }}
				</view>
			</view>
		</view>
		<view class="blck">

		</view>
		<view class="footer">
			<view class="settlement">
				<view class="sum">合计:<view class="money">￥{{sumPrice}}</view>
				</view>
				<view class="btn" @tap="toPay">提交订单</view>
			</view>
		</view>
		<view class="popup service" :class="serviceClass" @tap="hideService">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer">
				<view class="content">
					<view class="row" v-for="(item,index) in faPiaoList" :key="index" @tap.stop="choosesFaPiao(item)">
						<view class="title">{{ item.account }}</view>
						<view class="description">
							地址：{{ item.unitAddress }} 开户行：{{ item.bankInformation }}
						</view>
					</view>
				</view>
				<view class="btn">
					<view class="button" @tap="clearFaPiao()">完成</view>
				</view>
			</view>
		</view>
		<view class="popup service" :class="youHuiJuan" @tap="hideYouHuiJuan">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer">
				<view class="content">
					<view class="row1" v-for="(item,index) in couList" :key="index" @tap.stop="chooseYouHuis(item)">
						<view class="row-l">
							<view class="price">
								<view class="img"><image src="../../static/price1.png" mode=""></image></view>
								<view class="num">{{item.smsCoupon.amount}}</view>
							</view>
							<!-- <view class="full">满{{item.smsCoupon.minPoint}}可用</view> -->
						</view>
						<view class="row-m">
							<view class="text">{{item.smsCoupon.name}}</view>
							<!-- <text>{{item.smsCoupon.startTime}}-{{item.smsCoupon.endTime}}</text> -->
						</view>
					</view>
				</view>
				<view class="btn">
					<view class="button" @tap="hideYouHuiJuan()">完成</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				buylist: [], //订单列表
				goodsPrice: 0.0, //商品合计价格
				sumPrice: 0.0, //用户付款价格
				freight: 0.00, //运费
				note: '', //备注
				int: 1200, //抵扣积分
				deduction: 0, //抵扣价格
				coupons: 0,
				dingwei: [],
				id: 0,
				optionId: 0,
				dingweiData: {
					name: "",
					phoneNumber: "",
					province: "",
					city: "",
					region: "",
					detailAddress: ""
				},
				buyProductList: [],
				userInfo: {},
				serviceClass: "",
				faPiaoList: "",
				chooseFaPiao: "选择发票>",
				youHuiJuan:false,
				ids:[],
				couList:[],
				chooseYouHuiData:{}
			};
		},
		onLoad(option) {
			//首页缓存
			let _this = this;
			uni.getStorage({
				key: 'buylist',
				success: (ret) => {
					console.log(ret)
					_this.buylist = ret.data;
					
					let len = _this.buylist.length;
					for (let i = 0; i < len; i++) {
						_this.ids.push(_this.buylist[i].pmsProduct.id);
					}
					_this.sumPrices()
					_this.getYouHui()
				}
			});
			this.userInfo = this.$stronge.getStronge("userInfo")
		},
		onBackPress() {
			//页面后退时候，清除订单信息
			this.clearOrder();
		},
		onShow() {
			let _this = this;
			uni.getStorage({
				key: 'positioningId',
				success: (res) => {
					console.log(res.data)
					_this.dingweisId = res.data;
					_this.$ajax.get({
						url: "/member/address/" + _this.dingweisId,
						param: {
							memId: this.userInfo.id
						}
					}).then(res => {
						if (res.data.data) {
							_this.dingweiData = res.data.data;
						}
					})
				}
			});

			this.userInfo = this.$stronge.getStronge("userInfo");
		},
		methods: {
			//获取优惠券
			getYouHui(){
				this.$ajax.get({
					url:"/newOrder/selectCouByUser",
					param:{
						goodsIds:this.ids.join(','),
						memId:this.userInfo.id
					}
				}).then(res=>{
					if(res.data.data){
						this.couList = res.data.data;
					} 
				})
			},
			//服务弹窗
			showService() {
				this.serviceClass = 'show';
			},
			//关闭服务弹窗
			hideService() {
				this.serviceClass = 'hide';
				setTimeout(() => {
					this.serviceClass = 'none';
				}, 250);
			},
			clearOrder() {
				uni.removeStorage({
					key: 'buylist',
					success: function(res) {
						this.buylist = [];
						// console.log('remove buylist success');
					}
				});
			},
			//跳转订单中心页面
			toPay() {
				uni.showLoading({
					title: "提交订单中..."
				})
				if (this.dingweiData == null) {
					uni.showToast({
						title: "请填写收货地址"
					})
				}
				//商品列表
				let goodsid = [];
				let len = this.buylist.length;
				let _this = this;
				for (let i = 0; i < len; i++) {
					let data = {};
					data.prodectId = this.buylist[i].productId;
					data.skuId = this.buylist[i].sku.id;
					data.prodectNum = this.buylist[i].quantity;
					data.payAmount = this.buylist[i].sku.price;
					data.goodsName = this.buylist[i].pmsProduct.name;
					data.cartitemId = this.buylist[i].id ? this.buylist[i].id : "";
					goodsid.push(data)
				}
				this.$ajax.postJSON({
					url: "/newOrder/insertOrder",
					data: {
						addressId: this.dingweiData.id,
						inquiryId: this.chooseFaPiao.objectId ? this.chooseFaPiao.objectId : "",
						memberId: this.userInfo.id,
						ordertype: 0,
						pmsNewOrderProducts: goodsid,
						yhId:this.chooseYouHuiData ? this.chooseYouHuiData.id : ""
					}
				}).then(res => {
					uni.hideLoading();
					if (res.data.data) {
						uni.showToast({
							title: "订单提交成功"
						})
						if (!_this.userInfo.ifCoupon) {
							uni.redirectTo({
								url: "../user/order_list/ordercenter?price=" + _this.sumPrice+"&id="+res.data.data
							})
						} else {
							uni.redirectTo({
								url: "../user/order_list/order_list?tbIndex=" + 1
							})
						}
					} else {
						uni.showToast({
							title: "订单提交失败",
							icon: "none"
						})
					}
				})
			},
			//选择地址
			goAddressList() {
				uni.redirectTo({
					url: "chooseAddress"
				})
			},
			//选择优惠券
			chooseYouHui(){
				if(this.couList.length > 0){
					this.youHuiJuan = "show"
				}
			},
			//发票列表
			showFapiaoList() {
				let _this = this;
				_this.$ajax.get({
					url: "/invoice/selectByMemId",
					param: {
						memId: _this.userInfo.id
					}
				}).then(res => {
					_this.faPiaoList = res.data.data;
					_this.showService();
				})
			},
			choosesFaPiao(data) {
				this.chooseFaPiao = data;
				this.hideService()
			},
			clearFaPiao() {
				this.chooseFaPiao = "";
				this.hideService();
			},
			//关闭优惠券弹窗
			hideYouHuiJuan(){
				this.youHuiJuan = 'hide';
				setTimeout(() => {
					this.youHuiJuan = 'none';
				}, 250);
			},
			//选择优惠券
			chooseYouHuis(item){
				this.chooseYouHuiData = item;
				this.coupons = item.smsCoupon.amount;
				this.hideYouHuiJuan();
				this.sumPrices();
			},
			sumPrices(){
				this.goodsPrice = 0;
				//合计
				let len = this.buylist.length;
				for (let i = 0; i < len; i++) {
					this.goodsPrice = this.goodsPrice + (this.buylist[i].quantity * this.buylist[i].sku.price);
					this.ids.push(this.buylist[i].id);
				}
				this.deduction = this.int / 100;
				this.sumPrice = this.goodsPrice-this.coupons;
				if(this.sumPrice <= 0){
					this.sumPrice = 0.01;
				}
				this.sumPrice = this.sumPrice.toFixed(2);
				this.goodsPrice = this.goodsPrice.toFixed(2);
				this.deduction = this.deduction.toFixed(2);
			}
		}
	}
</script>

<style lang="scss">
	.addr {
		width: 86%;
		padding: 20upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;
		display: flex;

		.icon {
			width: 80upx;
			height: 80upx;
			display: flex;
			align-items: center;

			image {
				width: 60upx;
				height: 60upx;
			}
		}

		.tel-name {
			width: 100%;
			display: flex;
			font-size: 32upx;

			.tel {
				margin-left: 40upx;
			}
		}

		.addres {
			width: 100%;
			font-size: 26upx;
			color: #999;
		}
	}

	.buy-list {
		width: 86%;
		padding: 10upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;

		.row {
			margin: 30upx 0;

			.goods-info {
				width: 100%;
				display: flex;

				.img {
					width: 22vw;
					height: 22vw;
					border-radius: 10upx;
					overflow: hidden;
					flex-shrink: 0;
					margin-right: 10upx;

					image {
						width: 22vw;
						height: 22vw;
					}
				}

				.info {
					width: 100%;
					height: 22vw;
					overflow: hidden;
					display: flex;
					flex-wrap: wrap;
					position: relative;

					.title {
						width: 100%;
						font-size: 28upx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						// text-align: justify;
						overflow: hidden;
					}

					.spec {
						font-size: 22upx;
						background-color: #f3f3f3;
						color: #a7a7a7;
						height: 40upx;
						display: flex;
						align-items: center;
						padding: 0 10upx;
						border-radius: 20upx;
						margin-bottom: 20vw;
					}

					.price-number {
						position: absolute;
						width: 100%;
						bottom: 0upx;
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
						font-size: 28upx;
						height: 40upx;

						.price {
							color: var(--common-color);
							font-size: 35upx;
						}

						.number {
							display: flex;
							justify-content: center;
							align-items: center;

						}
					}
				}
			}
		}
	}

	.order {
		width: 86%;
		padding: 10upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;

		.row {
			margin: 20upx 0;
			height: 40upx;
			display: flex;

			.left {
				font-size: 28upx;
			}

			.right {
				margin-left: 40upx;
				font-size: 24upx;
				color: #ccc;
				display: flex;
				flex-direction: row;
				justify-content: center;
				input {
					font-size: 24upx;
					color: #ccc;
					margin-top: -6upx;
				}
			}
		}
	}

	.blck {
		width: 100%;
		height: 100upx;
	}

	.footer {
		width: 92%;
		padding: 0 4%;
		background-color: #fbfbfb;
		height: 100upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 28upx;
		position: fixed;
		bottom: 0upx;
		z-index: 5;

		.settlement {
			width: 80%;
			display: flex;
			justify-content: flex-end;
			align-items: center;

			.sum {
				width: 50%;
				font-size: 28upx;
				margin-right: 38upx;
				display: flex;
				justify-content: flex-end;

				.money {
					font-size: 35upx;
					font-weight: 600;
					color: #d71518;
				}
			}

			.btn {
				padding: 0 30upx;
				height: 60upx;
				background-color: var(--common-color);
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30upx;
				border-radius: 40upx;
			}
		}
	}

	.detail {
		width: 86%;
		padding: 10upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;

		.row {
			height: 60upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.nominal {
				font-size: 28upx;
			}

			.content {
				font-size: 26upx;
				// color: var(--common-color);
			}
		}
	}

	.popup {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 20;
		display: none;

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 21;
			background-color: rgba(0, 0, 0, 0.6);
		}

		.layer {
			position: fixed;
			z-index: 22;
			bottom: -70%;
			width: 92%;
			padding: 0 4%;
			height: 70%;
			border-radius: 20upx 20upx 0 0;
			background-color: #fff;
			display: flex;
			flex-wrap: wrap;
			align-content: space-between;

			.content {
				width: 100%;
				padding: 20upx 0;
			}

			.btn {
				width: 100%;
				height: 100upx;

				.button {
					width: 100%;
					height: 80upx;
					border-radius: 40upx;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #d71518;
					font-size: 28upx;
				}
			}
		}

		@keyframes showPopup {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		@keyframes hidePopup {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		@keyframes showLayer {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(-100%);
			}
		}

		@keyframes hideLayer {
			0% {
				transform: translateY(-100%);
			}

			100% {
				transform: translateY(0);
			}
		}

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.25s linear both;
			}

			.layer {
				animation: showLayer 0.25s linear both;
			}
		}

		&.hide {
			display: block;

			.mask {
				animation: hidePopup 0.25s linear both;
			}

			.layer {
				animation: hideLayer 0.25s linear both;
			}
		}

		&.none {
			display: none;
		}

		&.service {
			.row {
				margin: 30upx 0;

				.title {
					font-size: 30upx;
					margin: 10upx 0;
				}

				.description {
					font-size: 28upx;
					color: #999;
				}
			}
		}

		&.spec {
			.title {
				font-size: 30upx;
				margin: 30upx 0;
			}

			.sp {
				display: flex;

				view {
					font-size: 28upx;
					padding: 5upx 20upx;
					border-radius: 8upx;
					margin: 0 30upx 20upx 0;
					background-color: #f6f6f6;

					&.on {
						padding: 3upx 18upx;
						border: solid 1upx #f47925;
					}
				}
			}

			.length {
				margin-top: 30upx;
				border-top: solid 1upx #aaa;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 20upx;

				.text {
					font-size: 30upx;
				}

				.number {
					display: flex;
					justify-content: center;
					align-items: center;

					.input {
						width: 80upx;
						height: 60upx;
						margin: 0 10upx;
						background-color: #f3f3f3;
						display: flex;
						justify-content: center;
						align-items: center;
						text-align: center;

						input {
							width: 80upx;
							height: 60upx;
							display: flex;
							justify-content: center;
							align-items: center;
							text-align: center;
							font-size: 26upx;
						}
					}

					.sub,
					.add {
						width: 60upx;
						height: 60upx;
						background-color: #f3f3f3;
						border-radius: 5upx;

						.icon {
							font-size: 30upx;
							width: 60upx;
							height: 60upx;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}
				}
			}
		}
	}
.youhuiquan-right{
	display: flex;
	
}
.row1{
			 display: flex;
	         width: 92%;
			 height: 180upx;
	         // height: calc(22vw + 40upx); 
	         margin: 20upx auto;    
	         border-radius: 15upx;
	         box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
	         // display: flex;
	         // align-items: center;
	         position: relative;
	         
	         z-index: 4;
	         border: 0;
			
			.row-l {
				width: 25%;
				box-sizing: border-box;
				.price {
					position: relative;
					overflow: hidden;
					.img {
						float: left;
						margin: 60upx 2upx 20upx 30upx;
						width: 30upx;
						height: 30upx;
						image {
							width: 100%;
							height: 100%;
						}
						
					}
					
					.num {
						margin-top: 30upx;
						float: left;
						font-size: 55upx;
						color: #d71518;
					}
					.gray {
						// color: #d71518;
					} 
					
				}
				.full {
					margin-left: 30upx;
					margin-top: 5upx;	
					color: #d71518;
					width:100%;
					font-size:25rpx;

				}
				.gray {
					color: #bfbfbf;
				} 
			}
			.row-m {
				width: 50%;
				.text {
					margin: 40upx 0 30upx 0;
					font-size: 32upx;
				}
				.gray {
					color: #bfbfbf;
				} 
				.time {
					color: #bfbfbf;
				}
			}
			.row-r {
				width: 25%;
				
				.btn {
					width:75%;
					padding: 0 10upx;
					background-color: #d71518;
					// height: 60upx;
					font-size: 24upx;
					margin-top: 60upx;
					color: #FFFFFF;
					margin-right: 20upx;
				}
				.used {
					width: 140upx;
					height: 140upx;
					float: right;
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		
</style>
