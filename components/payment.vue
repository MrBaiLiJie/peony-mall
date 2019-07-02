<template>
	<view class="payment">
		<view class="payment-content">
			<view class="payment-title">
				<view style="width: 70upx;"></view>
				<view>请选择支付方式</view>
				<view class="payment-title-img" @tap="hidePayment()">
					<image src="/static/img/close.png"></image>
				</view>
			</view>
			<view class="payment-list">
				<view>金额￥{{ price }}元</view>
				<view class="pay-list" @tap="payType = 'zhifubao'">
					<view class="list-left">
						<image src="/static/img/zhifubao.png"></image>
						<text class="list-text">支付宝</text>
					</view>
					<view>
						<radio :checked="payType == 'zhifubao'" />
					</view>
				</view>
				<view class="pay-list" @tap="payType = 'weixin'">
					<view class="list-left">
						<image src="/static/img/weixin.png"></image>
						<text class="list-text">微信</text>
					</view>
					<view>
						<radio :checked="payType == 'weixin'" />
					</view>
				</view>
			</view>
			<view class="payment-confirm">
				立即支付
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			price:{
				require:true
			}
		},
		data() {
			return {
				payType:"zhifubao"
			};
		},
		methods:{
			hidePayment(){
				this.$emit("hide-payment")
			}
		}
	}
</script>

<style>
.payment{
	position: fixed;
	top: 0;
	height: 100%;
	width: 750upx;
	left: 0;
	background: rgba(0,0,0,.5);
	z-index: 999;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
}
.payment-content{
	width: 750upx;
	height: 500upx;
	background: #FFFFFF;
	opacity: 1;
}
.payment-title{
	width: 750upx;
	height: 100upx;
	border: #D2D2D2 1px solid;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.payment-confirm{
	width: 750upx;
	height: 80upx;
	color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	background: var(--common-color);
}
.payment-list{
	width: 750upx;
	height: 319upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.payment-title-img image{
	width: 50upx;
	height: 50upx;
	margin-right: 10upx;
}
.pay-list{
	display: flex;
	width: 650upx;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.list-left{
	width: 200upx;
	height: 80upx;
	display: flex;
	align-items: center;
}
.list-left image{
	width: 50upx;
	height: 50upx;
	margin-right: 20upx;
}
.list-text{
	line-height: 80upx;
}
</style>
