<template>
	<view class="vip">
		<view class="viptop" v-for="(item, index) in vip" :key="index">
			<view class="tx">
				<image :src="item.img" mode=""></image>
				<text>{{ item.name }}</text>
			</view>
			<view class="zhong">
				<text class="lv">{{ item.lv }}</text>
				<text class="ex">每月3号更新,当前成长值为:{{ item.ex }}</text>
			</view>
			<view class="bottom">
				<view>我的积分{{ item.integral }}</view>
				<view>超级会员</view>
			</view>
		</view>
		<view class="vipbottom">
			<view class="vip1">
				<text class="txt1">会员专享特权</text>
				<text class="txt2">查看全部></text>
			</view>
			<view class="vip2">
				<view class="privilege" v-for="(item, index) in privilege" :key="index">
					<image :src="item.img" mode=""></image>
					<view style="color: #828282;">{{ item.txt }}</view>
				</view>
			</view>
			<view class="upgrade">
				<view class="">
					<view class="v1">升级至{{ lv }}会员</view>
					<text>即可享受邀请返利等更多特权</text>
				</view>
				<button type="primary" @tap="vipeq">去升级</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			lv: 'V1',
			vip: [{ img: '../../static/img/user.png', name: 'aal222', lv: '普通会员', ex: '0', integral: '0' }],
			privilege: [
				{ img: '../../static/loop.png', txt: '30天退换' },
				{ img: '../../static/baoguo.png', txt: '上门取件' },
				{ img: '../../static/Rebate.png', txt: '邀请返利' },
				{ img: '../../static/gift.png', txt: '升级礼包' }
			]
		};
	},
	onLoad: function(option) {
		//option为object类型，会序列化上个页面传递的参数
		console.log(option.img); //打印出上个页面传递的参数。
	},
	methods: {
		vipeq() {
			uni.navigateTo({
				url:'vipequity'
			});
		},
	}
};
</script>

<style>
.viptop {
	width: 100%;
	padding-bottom: 20upx;
	text-align: center;
	background: linear-gradient(to bottom right, #d4ba8a, #bda065);
	/* border-radius: 0 0 35% 35%; */
}
.viptop image {
	width: 80upx;
	height: 80upx;
}
.viptop text {
	color: #ffffff;
}
.tx {
	padding: 20upx 0 0 20upx;
	display: flex;
	align-items: center;
}
.zhong {
	margin-top: 40upx;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
}
.lv {
	margin: 10upx 30upx;
	font-size: 80upx;
	text-shadow: 0upx 2upx 4upx #666;
}
.ex {
	font-size: 32upx;
	text-shadow: 0upx 2upx 4upx #666;
}
.bottom {
	display: flex;
}
.bottom view {
	padding: 30rpx 120rpx;
	color: #ffffff;
	margin: 20upx auto;
	margin-bottom: 0;
	border-radius: 8upx;
	margin-top: 80upx;
	background: rgba(255, 255, 255, 0.3);
}
.vip1 {
	margin: 30upx auto;
	width: 92%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
.vip1 .txt1 {
	color: #000000;
	font-weight: 600;
}
.vip1 .txt2 {
	color: #cccccc;
	font-size: 26upx;
}
.vip2 {
	display: flex;
	justify-content: space-around;
	margin-left: 30upx;
	margin-right: 30upx;
}
.privilege {
	text-align: center;
}
.vip2 image {
	width: 70upx;
	height: 70upx;
}
.upgrade{
	margin: 60upx auto;
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 90%;
	height: 160upx;
	background-color: #F6F5F1;
	border-radius: 10upx;
}
.upgrade .v1{
	font-size: 34upx;
	font-weight: 600;
	color: #CBAC6F;
}
.upgrade text{
	font-size: 26upx;
}
.upgrade button{
	width: 240upx;
	height: 80upx;
	margin: 0;
	line-height: 80upx;
	color: #FFFFFF;
	font-weight: 100;
	font-size: 28upx;
	background-color: #CBAC6F;
}
.upgrade button[type=primary]{
	background-color: #CBAC6F;
}
</style>
