<template>
	<view class="content">
		<view class="list" v-for="(item,index) in integral" :key="index">
			<view class="name">{{item.name}}</view>
			<view class="num">￥{{item.integralNum}}</view>
			<button class="btn" @tap="gouMaiJiFen(item)">购买</button>
		</view>	
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				integral:[],
				userInfo:{}
			}
		},
		onLoad() {
			uni.showLoading({
				mask:true
			})
			this.$ajax.get({
				url:'/IntegralSale/listAll',
				param:{
					pageSize:10,
					pageNum:1
				}
			}).then((res)=>{
				console.log(res.data.data.page)
				this.integral = res.data.data.page
				uni.hideLoading()
			})
			this.userInfo = this.$stronge.getStronge("userInfo");
		},
		methods: {
			gouMaiJiFen(data){
				uni.showLoading({
					mask:true
				})
				this.$ajax.postJSON({
					url:"/pay/updatejifenPay",
					data:{
						jifenID:data.id,
						jifenNum:1,
						memId:this.userInfo.id
					}
				}).then(res=>{
					uni.hideLoading()
					if(res.data.code == 200){
						uni.showToast({
							title:"购买成功"
						})
					}else{
						uni.showToast({
							title:"购买失败",
							icon:"none"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 0 20upx;
		.list {
			display: flex;
			height: 100upx;
			line-height: 100upx;	
			.name {
				width: 60%;
				font-size: 32upx;
			}
			.num {
				width: 20%;
				font-size: 32upx;
			}
			.btn {
				width:120upx;
				height: 60upx;
				margin-left: 20upx;
				margin-top: 15upx;
				padding: 0;
				font-size: 26upx;
				color: #fff;
				background-color: #d71518;
				line-height:60upx;
			}
		}
	}
</style>
