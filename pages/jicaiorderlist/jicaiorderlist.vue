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
				<view class="onorder" v-if="list.length==0 && loading">
					<image src="../../static/img/close.png"></image>
					<view class="text">
						没有相关订单
					</view>
				</view>
				<view class="row" v-for="(row,index) in list" :key="index" v-if="row.sku">
					<view class="type" v-if="row.state==0">未响应</view>
					<view class="type" v-if="row.state==1">已响应</view>
					<view class="type" v-if="row.state==2">已下单</view>
					<view class="type" v-if="row.state==3">已完成</view>
					<view class="order-info">
						<view class="left">
							<image :src="row.sku.pic||row.pmsProduct.pic"></image>
							<!-- row.sku.pic||row.pmsProduct.pic -->
						</view>
						<view class="right">
							<view class="name">
								{{row.pmsProduct.name}}
							</view>
							<view class="spec">规格:{{row.sku.value||'默认'}}</view>
							<view class="price-number">
								￥<view class="price">{{row.sku.price||row.pmsProduct.price}}</view>
								<!-- row.sku.price||row.pmsProduct.price -->
								x<view class="number">{{row.productNum}}</view>
							</view>
						</view>
					</view>
					<view class="detail">
						<view class="number">共{{row.productNum}}件商品</view><view class="sum">合计￥<view class="price">{{row.productNum*row.sku.price}}</view></view>
					</view>
					<view class="btns">
						<block v-if="row.state == 0">
							<view class="default" @tap="cancleXun(row)">取消询价</view>
						</block>
						<!-- <block v-if="row.type=='back'"><view class="default">提醒发货</view></block> -->
						<block v-if="row.state == 1">
							<view class="pay" @click="gopayVoucher(row.id)">上传凭证</view>
						</block>
						<block v-if="row.state == 2">
							<view class="default">查看物流</view>
							<view class="default">确认收货</view>
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
				headerPosition:"fixed",
				headerTop:"0px",
				typeText:{
					unpaid:'等待付款',
					back:'等待商家发货',
					unreceived:'商家已发货',
					received:'等待用户评价',
					completed:'交易已完成',
					refunds:'商品退货处理中'
				},
				orderType: ['全部','未响应','已响应','已下单','已完成'],
				//订单列表 演示数据
				orderList:[
					[],
					[],
					[],
					[],
					[],
					[]
				],
				list:[],
				tabbarIndex:0,
				userInfo:{},
				otherPage:[
					1,1,1,1,1
				],
				otherPageSize:[
					
				],
				loading:false
			};
		},
		onLoad(option) {
			console.log(option) 
			let tbIndex = parseInt(option.tbIndex);
			this.list = this.orderList[tbIndex];
			this.tabbarIndex = tbIndex;
			this.userInfo = this.$stronge.getStronge("userInfo");
			//this.getData();
			this.showType(tbIndex)
		},
		onPageScroll(e){
			return;
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop>=0?"fixed":"absolute";
		},
				//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			console.log("eee")
			this.otherPage[this.tabbarIndex]++;
			this.showType(this.tabbarIndex);
		},
		methods: {
			gopayVoucher(id){
				uni.navigateTo({
					url:`../payVoucher/payVoucher?id=`+id+"&isOrder=0"
				})
			},
			showType(tbIndex){
				this.tabbarIndex = tbIndex;
				this.list = this.orderList[tbIndex];
				if(tbIndex == 0){
					this.getData();
				}else if(tbIndex == 1){
					this.getWeiXiangYing();
				}else if(tbIndex == 2){
					this.getYiXiangYing();
				}else if(tbIndex == 3){
					this.getYiXiaDan();
				}else if(tbIndex == 4){
					this.getYiWanCheng();
				}
			},
			getData(){
				this.loading = true;
				if(this.otherPage[0] > this.otherPageSize[0]){
					return;
				}
				if(this.orderList[0].length > 0 && this.otherPage[0] == 1 ){ 
					this.list = this.orderList[0];
					return;
				}
				uni.showLoading({
					title:"加载中..."
				})
				//获取集采单列表
				this.$ajax.postJSON({
					url:`/Inquiry/select?pageSize=10&pageNum=${this.otherPage[0]}`,
					data:{
						userId:this.userInfo.id
					}
				}).then(res=>{
					this.tabbarIndex = 0;
					uni.hideLoading();
					if(res.data.data){
						this.$set(this.orderList,0,this.orderList[0].concat(res.data.data));
						this.otherPageSize[0] = res.data.pages;
						this.list = this.orderList[0];
						this.loading = false;
					}else{
						this.list = [];
					}
				})
			},
			getWeiXiangYing(){
				this.loading = true;
				if(this.otherPage[1] > this.otherPageSize[1]){
					return;
				}
				if(this.orderList[1].length > 0 && this.otherPage[1] == 1 ){ 
					this.list = this.orderList[1];
					return;
				}
				uni.showLoading({
					title:"加载中..."
				})
				this.$ajax.postJSON({
					url:`/Inquiry/select?pageSize=10&pageNum=${this.otherPage[1]}`,
					data:{
						userId:this.userInfo.id,
						state:"0"
					}
				}).then(res=>{
					this.tabbarIndex = 1;
					uni.hideLoading();
					if(res.data.data){
						this.$set(this.orderList,1,this.orderList[1].concat(res.data.data))
						this.otherPageSize[1] = res.data.pages
						this.list = this.orderList[1];
						this.loading = false;
					}else{
						this.list = [];
					}
				})
			},
			getYiXiangYing(){
				this.loading = true;
				if(this.otherPage[2] > this.otherPageSize[2]){
					return;
				}
				if(this.orderList[2].length > 0 && this.otherPage[2] == 1 ){ 
					this.list = this.orderList[2];
					return;
				}
				uni.showLoading({
					title:"加载中..."
				})
				this.$ajax.postJSON({
					url:`/Inquiry/select?pageSize=10&pageNum=${this.otherPage[2]}`,
					data:{
						userId:this.userInfo.id,
						state:"1"
					}
				}).then(res=>{
					this.tabbarIndex = 2;
					uni.hideLoading();
					if(res.data.data){
						this.$set(this.orderList,2,this.orderList[2].concat(res.data.data))
						this.otherPageSize[2] = res.data.pages
						this.list = this.orderList[2];
						this.loading = false;
					}else{
						this.list = [];
					}
				})
			},
			getYiXiaDan(){
				this.loading = true;
				if(this.otherPage[3] > this.otherPageSize[3]){
					return;
				}
				if(this.orderList[3].length > 0 && this.otherPage[3] == 1 ){ 
					this.list = this.orderList[3];
					return;
				}
				uni.showLoading({
					title:"加载中..."
				})
				this.$ajax.postJSON({
					url:`/Inquiry/select?pageSize=10&pageNum=${this.otherPage[3]}`,
					data:{
						userId:this.userInfo.id,
						state:"2"
					}
				}).then(res=>{
					this.tabbarIndex = 3;
					uni.hideLoading();
					if(res.data.data){
						this.$set(this.orderList,3,this.orderList[3].concat(res.data.data))
						this.otherPageSize[3] = res.data.pages
						this.list = this.orderList[3];
						this.loading = false;
					}else{
						this.list = [];
					}
				})
			},
			getYiWanCheng(){
				this.loading = true;
				if(this.otherPage[4] > this.otherPageSize[4]){
					return;
				}
				if(this.orderList[4].length > 0 && this.otherPage[4] == 1 ){ 
					this.list = this.orderList[4];
					return;
				}
				uni.showLoading({
					title:"加载中..."
				})
				this.$ajax.postJSON({
					url:`/Inquiry/select?pageSize=10&pageNum=${this.otherPage[4]}`,
					data:{
						userId:this.userInfo.id,
						state:"3"
					}
				}).then(res=>{
					this.tabbarIndex = 4;
					uni.hideLoading();
					if(res.data.data){
						this.$set(this.orderList,4,this.orderList[4].concat(res.data.data))
						this.otherPageSize[4] = res.data.pages
						this.list = this.orderList[4];
						this.loading = false;
					}else{
						this.list = [];
					}
				})
			},
			cancleXun(data){
				this.$ajax.post({
					url:`/Inquiry/deleteById?id=${data.id}`,
				}).then(res=>{
					if(res.data.code == 200){
						uni.showToast({
							title:"取消成功",
							icon:"success"
						})
						this.orderList[0] = [];
						this.otherPage[0] = 1;
						this.orderList[1] = [];
						this.otherPage[1] = 1;
						this.showType(this.tabbarIndex)
					}else{
						uni.showToast({
							title:"取消失败",
							icon:"none"
						})
					}
				})
			}
			
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f3f3f3;
}
.topTabBar{
	width: 100%;
	position: fixed;
	top: 0;
	z-index: 10;
	background-color: #f8f8f8;
	height: 80upx;
	display: flex;
	justify-content: space-around;
	.grid{
		width: 20%;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #444;
		font-size: 28upx;
		.text{
			height: 76upx;
			display: flex;
			align-items: center;
			&.on{
				color: var(--common-color);
				border-bottom: solid 4upx var(--common-color);
			}
		}
	}
}
.order-list{
	margin-top: 80upx;
	padding-top: 20upx;
	width: 100%;
	.list{
		width: 94%;
		margin: 0 auto;
		.onorder{
			width: 100%;
			height: 50vw;
			display: flex;
			justify-content: center;
			align-content: center;
			flex-wrap: wrap;
			image{
				width: 20vw;
				height: 20vw;
				border-radius: 100%;
			}
			.text{
				width: 100%;
				height: 60upx;
				font-size: 28upx;
				color: #444;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.row{
			width: calc(100% - 40upx);
			padding: 10upx 20upx;
			border-radius: 10upx;
			background-color: #fff;
			margin-bottom: 20upx;
			.type{
				font-size: 26upx;
				color: #ec652f;
				height: 50upx;
				display: flex;
				align-items: center;
			}
			.order-info{
				width: 100%;
				display: flex;
				.left{
					flex-shrink: 0;
					width: 25vw;
					height: 25vw;
					image{
						width: 25vw;
						height: 25vw;
						border-radius: 10upx;
					}
				}
				.right{
					width: 100%;
					margin-left: 10upx;
					position: relative;
					.name{
						width: 100%;
						font-size: 28upx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					.spec{
						color: #a7a7a7;
						font-size: 22upx;

					}
					.price-number{
						position: absolute;
						bottom: 0;
						width: 100%;
						display: flex;
						justify-content: flex-end;
						font-size: 22upx;
						color: #333;
						display: flex;
						align-items: flex-end;
						.price{
							font-size: 24upx;
							margin-right: 5upx;
						}
						
					}
				}
			}
			.detail{
				display: flex;
				justify-content: flex-end;
				align-items: flex-end;
				height: 60upx;
				font-size: 26upx;
				.sum{
					padding: 0 8upx;
					display: flex;
					align-items: flex-end;
					.price{
						font-size: 30upx;
					}
				}
				
			}
			.btns{
				height: 80upx;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				view{
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
				.default{
					border: solid 1upx #ccc;
					color: #666;
				}
				.pay{
					border: solid 1upx var(--common-color);
					color: var(--common-color);
				}
			}
		}
	}
}
</style>
