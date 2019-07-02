<template>
	<view>
		<!-- 顶部导航 -->
		<view class="topTabBar" :style="{position:headerPosition,top:headerTop}">
			<view class="grid" v-for="(grid,tbIndex) in orderType" :key="tbIndex" @tap="showType(tbIndex)">
				<view class="text" :class="[tbIndex==tabbarIndex?'on':'']">{{grid}}</view>
			</view>
		</view>
		<!-- 考虑非APP端长列表和复杂的DOM使用scroll-view会卡顿，所以漂浮顶部选项卡使用page本身的滑动 -->
		<view class="order-list">
			<view class="list">
				<view class="onorder" v-if="list.length == 0&&!loading">
					<image src="../../../static/img/close.png"></image>
					<view class="text">
						没有相关订单
					</view>
				</view>

				<view class="row" v-for="(row,index) in list" :key="index" v-if="row.pmsNewOrderProducts[0].sku">
					<view class="type" v-if="row.status=='0'">等待付款</view>
					<view class="type" v-if="row.status=='1'">等待发货</view>
					<view class="type" v-if="row.status=='2'">等待收货</view>
					<view class="type" v-if="row.status=='3'">等待评价</view>
					<view class="type" v-if="row.status=='4'">已关闭</view>
					<view class="order-info">
						<view class="left">
							<image :src="row.pmsNewOrderProducts[0].sku.pic"></image>
						</view>
						<view class="right">
							<view class="name">
								{{row.pmsNewOrderProducts[0].goodsName}}
							</view>
							<view class="spec">{{row.pmsNewOrderProducts[0].sku.value}}</view>
							<view class="price-number">
								￥<view class="price">{{row.pmsNewOrderProducts[0].sku.price}}</view>
								x<view class="number">{{row.pmsNewOrderProducts[0].prodectNum}}</view>
							</view>
						</view>
					</view>
					<view class="detail">
						<view class="number">共{{row.pmsNewOrderProducts[0].prodectNum}}件商品</view>
						<view class="sum">合计￥<view class="price">{{row.pmsNewOrderProducts[0].prodectNum * row.pmsNewOrderProducts[0].sku.price}}</view>
						</view>
						<!-- <view class="nominal">(含运费 ￥10)</view> -->
					</view>
					<view class="btns">
						<block v-if="row.status=='0'">
							<view class="default" @click="cancelOrder(row)">取消订单</view>
							<view v-if="userInfo.ifCoupon == 1 && !row.orderPay" @click="gopayVoucher(row)" class="pay">上传凭证</view>
							<view v-if="userInfo.ifCoupon == 1 && row.orderPay" class="pay">凭证已上传</view>
							<view v-if="userInfo.ifCoupon != 1" class="pay" @tap="goFuKuan(row)">付款</view>
						</block>
						<block v-if="row.status=='1'">
							<view class="default" @click="cancelOrder(row)">取消订单</view>
						</block>
						<block v-if="row.status=='2'">
							<!-- <view class="default">查看物流</view> -->
							<view class="pay">确认收货</view>
							<view class="pay" @click="goShouhou(row)">申请售后</view>
						</block>
						<block v-if="row.status=='3'">
							<view class="default" @click="goEvaluation(row)" v-if="row.pmsNewOrderProducts[0].ifCommit == 0">评价</view>
							<view class="pay" @click="goShouhou(row)">申请售后</view>
						</block>
						<block v-if="row.status=='4'">
							<view class="default">再次购买</view>
						</block>
						<block v-if="row.type=='refunds'">
							<view class="default">查看进度</view>
						</block>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				headerPosition: "fixed",
				headerTop: "0px",
				typeText: {
					unpaid: '等待付款',
					back: '等待商家发货',
					unreceived: '商家已发货',
					received: '等待用户评价',
					completed: '交易已完成',
					refunds: '商品退货处理中'
				},
				orderType: ['全部', '待支付','待发货', '待收货', '已完成', '退换货'],
				// 
				//订单列表 演示数据
				orderList: [
					[],
					[],
					[],
					[],
					[],
					[]
				],
				list: [],
				tabbarIndex: 0,
				userInfo: {},
				otherPage: [
					1, 1, 1, 1,1,1
				],
				otherPageSize: [

				],
				loading: false,
				user:{}
			};
		},
		onLoad(option) {
			let tbIndex = parseInt(option.tbIndex);
			this.list = this.orderList[tbIndex];
			this.tabbarIndex = tbIndex;
			this.userInfo = this.$stronge.getStronge('userInfo')
			this.hIndex(option.tbIndex)
			//测试ID
		},
		onShow() {
			this.hIndex(this.tabbarIndex,1);
		},
		onPageScroll(e) {
			return;
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			if(this.otherPage[this.tabbarIndex] < this.otherPageSize[0]){
				this.otherPage[this.tabbarIndex]++;
			}
			this.hIndex(this.tabbarIndex);
		},
		methods: {
			getData(type) {
				this.loading = true;
				let _this = this;
				if (this.otherPage[0] > this.otherPageSize[0]) {
					return;
				}
				if(this.orderList[0].length > 0 && this.otherPage[0] == 1 && !type){ 
					this.list = this.orderList[0];
					return;
				}
				_this.showLoading();
				_this.$ajax.postJSON({
					url: `/newOrder/selectByDemo?pageSize=10&pageNum=${this.otherPage[0]}`,
					data: {
						"memberId": this.userInfo.id
					}
				}).then(res=>{
					_this.tabbarIndex = 0;
					this.loading = false;
					uni.hideLoading();
					if (res.data.data) {
						if(this.otherPage[0] > 1){
							_this.$set(_this.orderList, 0, _this.orderList[0].concat(res.data.data))
						}else{
							_this.$set(_this.orderList, 0,res.data.data)
						}
						_this.otherPageSize[0] = res.data.pages
						_this.list = _this.orderList[0];
					} else {
						_this.list = [];
					}
				})
			},
			getDaiFuKuan(type){
				this.loading = true;
				let _this = this;
				if (this.otherPage[1] > this.otherPageSize[1]) {
					return;
				}
				if(this.orderList[1].length > 0&& this.otherPage[1] == 1 &&!type){
					this.list = this.orderList[1];
					return;
				}
				_this.showLoading();
				_this.$ajax.postJSON({
					url: `/newOrder/selectByDemo?pageSize=10&pageNum=${this.otherPage[1]}`,
					data: {
						"memberId": this.userInfo.id,
						status: "0"
					}
				}).then(res => {
					this.loading = false;
					this.tabbarIndex = 1;
					uni.hideLoading();
					if (res.data.data) {
						if(this.otherPage[1] > 1){
							this.$set(this.orderList, 1, this.orderList[1].concat(res.data.data))
						}else{
							this.$set(this.orderList, 1,res.data.data)
						}
						this.otherPageSize[1] = res.data.pages
						this.list = this.orderList[1];
					} else {
						this.list = [];
					}
				})
			},
			getDaiFaHuo(){
				this.loading = true;
				let _this = this;
				if (this.otherPage[2] > this.otherPageSize[2]) {
					console.log(4)
					return;
				}
				if (this.orderList[2].length > 0 && this.otherPage[2] == 1) {
					console.log(2)
					this.list = this.orderList[2];
					return;
				}
				_this.showLoading();
				_this.$ajax.postJSON({
					url: `/newOrder/selectByDemo?pageSize=10&pageNum=${this.otherPage[2]}`,
					data: {
						memberId: this.userInfo.id,
						status: "1"
					}
				}).then(res => {
					this.loading = false;
					this.tabbarIndex = 2;
					uni.hideLoading();
					if (res.data.data) {
						if(this.otherPage[2] > 1){
							console.log(5)
							this.$set(this.orderList, 2, this.orderList[2].concat(res.data.data))
						}else{
							this.$set(this.orderList, 2,res.data.data)
						}
						this.otherPageSize[2] = res.data.pages
						this.list = this.orderList[2];
					} else {
						this.list = [];
					}
				})
			},
			getDaiShouHuo() {
				this.loading = true;
				let _this = this;
				if (this.otherPage[3] > this.otherPageSize[3]) {
					return;
				}
				if (this.orderList[3].length > 0 && this.otherPage[3] == 1) {
					this.list = this.orderList[3];
					return;
				}
				_this.showLoading();
				_this.$ajax.postJSON({
					url: `/newOrder/selectByDemo?pageSize=10&pageNum=${this.otherPage[3]}`,
					data: {
						memberId: this.userInfo.id,
						status: "2"
					}
				}).then(res => {
					this.loading = false;
					this.tabbarIndex = 3;
					uni.hideLoading();
					if (res.data.data) {
						if(this.otherPage[3] > 1){
							this.$set(this.orderList, 3, this.orderList[3].concat(res.data.data))
						}else{
							this.$set(this.orderList, 3,res.data.data)
						}
						this.otherPageSize[3] = res.data.pages
						this.list = this.orderList[3];
					} else {
						this.list = [];
					}
				})
			},
			getDaiPingJia() {
				this.loading = true;
				let _this = this;
				if (this.otherPage[4] > this.otherPageSize[4]) {
					return;
				}
				if (this.orderList[4].length > 0 && this.otherPage[4] == 1) {
					this.list = this.orderList[4];
					return;
				}
				_this.showLoading();
				_this.$ajax.postJSON({
					url: `/newOrder/selectByDemo?pageSize=10&pageNum=${this.otherPage[4]}`,
					data: {
						memberId: this.userInfo.id,
						status: "3"
					}
				}).then(res => {
					this.loading = false;
					this.tabbarIndex = 4;
					uni.hideLoading();
					if (res.data.data) {
						if(this.otherPage[4] > 1){
							this.$set(this.orderList, 4, this.orderList[4].concat(res.data.data))
						}else{
							this.$set(this.orderList, 4,res.data.data)
						}
						this.otherPageSize[4] = res.data.pages
						this.list = this.orderList[4];
					} else {
						this.list = [];
					}
				})
			},
			showLoading() {
				uni.showLoading({
					title: "加载中...",
					mask:true
				})
			},
			showType(tbIndex) {
				this.tabbarIndex = tbIndex;
				this.list = this.orderList[tbIndex];
				this.hIndex(tbIndex)
			},
			hIndex(tbIndex,type){
				if(tbIndex == 0){
					//全部
					this.getData(type);
				}else if(tbIndex == 1){
					//待付款
					this.getDaiFuKuan(type);
				}
				else if(tbIndex == 2){
					//待发货
					this.getDaiFaHuo(type);
				}
				else if(tbIndex == 3){
					//待收货
					this.getDaiShouHuo(type);
				}
				else if(tbIndex == 4){
					//待评价
					this.getDaiPingJia(type);
				}else if(tbIndex == 5){
					// 退换货
					//this.getData(4)
				}
			},
			goEvaluation(row) {
				uni.navigateTo({
					url: `../../evaluation/evaluation?orderId=${row.id}&goodsId=${row.pmsNewOrderProducts[0].id}`
				})
			},
			gopayVoucher(data) {
				uni.navigateTo({
					url: `../../payVoucher/payVoucher?id=${data.id}&isOrder=1`
				})
			},
			goShouhou(row) {
				uni.navigateTo({
					url: `../../aftersales/aftersales?orderid=${row.id}&goodsid=${row.pmsNewOrderProducts[0].id}`
				})
			},
			goFuKuan(data){
				uni.redirectTo({
					url: "ordercenter?price=" + data.pmsNewOrderProducts[0].sku.price+"&id="+data.id
				})
			},
			cancelOrder(data) {
				uni.showModal({
					title: '提示',
					content: '确定取消订单吗？',
					success: (res) => {
						if (res.confirm) {
							this.$ajax.postJSON({
								url: `/newOrder/deleteOrderByID?orderId=${data.id}`
							}).then(ress => {
								if (ress.data.code == 200) {
									uni.showToast({
										title: "取消成功",
										icon: "success"
									})
									this.orderList[this.tabbarIndex] = [];
									this.otherPage[this.tabbarIndex] = 1;
									this.hIndex(this.tabbarIndex,1);
								}else{
									uni.showToast({
										title: "取消失败",
										icon: "none"
									})
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			}
		}

	}
</script>

<style lang="scss">
	page {
		background-color: #f3f3f3;
	}
	.topTabBar {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #f8f8f8;
		height: 80upx;
		display: flex;
		justify-content: space-around;
		.grid {
			width: 20%;
			height: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #444;
			font-size: 28upx;
			.text {
				height: 76upx;
				display: flex;
				align-items: center;
				&.on {
					color: var(--common-color);
					border-bottom: solid 4upx var(--common-color);
				}
			}
		}
	}
	.order-list {
		margin-top: 80upx;
		padding-top: 20upx;
		width: 100%;
		.list {
			width: 94%;
			margin: 0 auto;
			.onorder {
				width: 100%;
				height: 50vw;
				display: flex;
				justify-content: center;
				align-content: center;
				flex-wrap: wrap;
				image {
					width: 20vw;
					height: 20vw;
					border-radius: 100%;
				}
				.text {
					width: 100%;
					height: 60upx;
					font-size: 28upx;
					color: #444;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
			.row {
				width: calc(100% - 40upx);
				padding: 10upx 20upx;
				border-radius: 10upx;
				background-color: #fff;
				margin-bottom: 20upx;
				.type {
					font-size: 26upx;
					color: #ec652f;
					height: 50upx;
					display: flex;
					align-items: center;
				}
				.order-info {
					width: 100%;
					display: flex;
					.left {
						flex-shrink: 0;
						width: 25vw;
						height: 25vw;
						image {
							width: 25vw;
							height: 25vw;
							border-radius: 10upx;
						}
					}
					.right {
						width: 100%;
						margin-left: 10upx;
						position: relative;
						.name {
							width: 100%;
							font-size: 28upx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}
						.spec {
							color: #a7a7a7;
							font-size: 22upx;

						}
						.price-number {
							position: absolute;
							bottom: 0;
							width: 98%;
							display: flex;
							justify-content: flex-end;
							font-size: 22upx;
							color: #333;
							display: flex;
							align-items: flex-end;

							.price {
								font-size: 24upx;
								margin-right: 5upx;
							}
						}
					}
				}
				.detail {
					display: flex;
					justify-content: flex-end;
					align-items: flex-end;
					height: 60upx;
					font-size: 26upx;
					.sum {
						padding: 0 8upx;
						display: flex;
						align-items: flex-end;

						.price {
							font-size: 30upx;
						}
					}
				}
				.btns {
					height: 80upx;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					view {
						min-width: 120upx;
						height: 50upx;
						padding: 0 20upx;
						border-radius: 50upx;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 28upx;
						margin-left: 20upx;
					}

					.default {
						border: solid 1upx #ccc;
						color: #666;
					}

					.pay {
						border: solid 1upx var(--common-color);
						color: var(--common-color);
					}
				}
			}
		}
	}
</style>
