<template>
	<view>
		<view class="total">
			<view class="row">				
				<view class="num">{{integration}}</view>
				<view class="text">当前总积分</view>
			</view>
		</view>
		<view style="padding:22upx 0;display: flex;">
			<button  type="primary" style="width:40%;background-color: #d71518;color: #fff;" @tap="goGive">赠送</button>
			<view style="padding:22upx 0;"></view>
			<button  type="primary" style="width:40%;background-color: #d71518;color: #fff;" @tap="goBuyIntegral">购买</button>
		</view>
		<!-- <view class="list" v-for="(item,index) in list" :key="index">
			<view class="left">
				<view class="name">{{item.name}}</view>
				<view class="time">{{item.time}}</view>
			</view>
			<view class="buyNum">+{{item.buyNum}}</view>
		</view> -->
	</view>
</template>
<script>
	export default {
		data() {
			return {
				userInfo:{},
				integration:0,
				list:[
					{
						name:'活动名称',
						time:'2019-09-23',
						buyNum:20
					},
					{
						name:'活动名称2',
						time:'2019-05-23',
						buyNum:20
					},
					{
						name:'活动名称3',
						time:'2019-03-23',
						buyNum:20
					},
					{
						name:'活动名称4',
						time:'2012-04-23',
						buyNum:20
					}
				]
			}
		},
		onShow() {
			let _this=this;
			uni.getStorage({
				key: 'userInfo',
				success: function (res) {
					// console.log(res.data)
					_this.userInfo = res.data
					_this.$ajax.postJSON({
						url:`/IntegralSale/getIntegralByUserId?memId=${_this.userInfo.id}`
					}).then(ress=>{
						_this.integration = ress.data.data
						// console.log(_this.integration)
					})
				}
			});
			_this.$ajax.get({
				url:`/IntegralSale/listAll`,
				param:{
					pageNum:1,
					pageSize:10
				}
			}).then(res=>{
				console.log(res.data)
			})
			
			
		},
		methods: {
			goGive() {
				uni.navigateTo({
				    url: `../giving/giving`
				});
			},
			goBuyIntegral() {
				uni.navigateTo({
				    url: `../giving/buyIntegral`
				});
			}
		}
	}
</script>
<style lang="scss">
	.total {
	    width: 100%;
		overflow: auto;
		background-color: #d71518;
	    .row{
	        width: 100%;
	        height: calc(22vw + 40upx); 
	        margin: 20upx auto;   
	        border-radius: 15upx;
	        // box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
	        // display: flex;
	        // align-items: center;
	        position: relative;
	        z-index: 4;
	        border: 0;
			text-align: center;
			.num {
				margin-top: 55upx;
				font-size: 80upx;
				font-weight: 400;
				color: #fff;
				margin-bottom: 15upx;
			}
			.text {
				font-size: 30upx;
				color: #fff;
			}
		}
	}
	.list {
		padding: 20upx 30upx;
		border-bottom: 1upx solid #e6e6e6;
		display: flex;
		.left {
			width: 80%;
			.name {
				font-size: 30upx;
			}
		}
		
		.buyNum {
			width: 20%;
			padding-top: 20upx;
			font-size: 30upx;
			text-align: right;
			
		}
	}
</style>