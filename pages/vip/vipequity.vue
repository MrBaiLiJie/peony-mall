<template>
	<view>
		<view class="rapidgrowth">
			<view class="title">— 快速提升成长值 —</view>
			<view class="txt">
				<view class="yuan"></view>
				首次完善个人信息，绑定手机号，设置支付密码可以立即获得10成长值，每人仅限1次；
			</view>
			<view class="txt">
				<view class="yuan"></view>
				消费购物确认收货后，按订单实付金额1:1发放成长值；
			</view>
			<view class="txt">
				<view class="yuan"></view>
				评价，邀请好友下单都可快速增加成长值。无次数限制；请注意：退货会扣减相应成长值，恶意刷成长值行为会被加入黑名单
			</view>
		</view>
		<view class="secretbook">
			<view class="title">— 成长秘籍 —</view>
			<view class="ex" v-for="(item, index) in ex" :key="index" :class="{'action':index == ex.length-1}">
				<view class="ex1">
					<image :src="item.img" mode=""></image>
					<view>
						<view style="color: #7B7B7B;">{{ item.txt }}</view>
						<text>{{ item.txt2 }}</text>
					</view>
				</view>
				<view class="button">{{ item.txt3 }}</view>
			</view>
		</view>
		<view class="db">
			— 更多秘籍尽情期待 —
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			ex: [
				{ img: '../../static/img/user/security.png', txt: '设置支付密码', txt2: 'V1及以上会员专享，仅限1次', txt3: '去设置' },
				{ img: '../../static/img/user/security.png', txt: '设置支付密码', txt2: 'V1及以上会员专享，仅限1次', txt3: '去设置' },
				{ img: '../../static/img/user/security.png', txt: '设置支付密码', txt2: 'V1及以上会员专享，仅限1次', txt3: '去设置' },
				{ img: '../../static/img/user/security.png', txt: '设置支付密码', txt2: 'V1及以上会员专享，仅限1次', txt3: '去设置' },
				{ img: '../../static/img/user/security.png', txt: '设置支付密码', txt2: 'V1及以上会员专享，仅限1次', txt3: '去设置' },
				{ img: '../../static/img/user/security.png', txt: '设置支付密码', txt2: 'V1及以上会员专享，仅限1次', txt3: '去设置' }
			]
		};
	},
	components: {},
	methods: {}
};
</script>

<style>
body {
	background-color: #efefef;
}
.rapidgrowth {
	margin-top: 20upx;
	background-color: #fefefe;
	padding-bottom: 30upx;
}
.title {
	color: #5c5c5c;
	padding: 40upx 0;
	text-align: center;
}
.rapidgrowth .yuan {
	display: inline-block;
	margin: 0 10upx 4upx 10upx;
	width: 10upx;
	height: 10upx;
	border-radius: 50%;
	background-color: #c09e5c;
}
.rapidgrowth .txt {
	margin: 20upx 30upx;
	font-size: 26upx;
	color: #a8a8a8;
}
.secretbook {
	margin-top: 20upx;
	background-color: #fefefe;
}
.ex {
	margin-left: 40upx;
	padding-right: 20upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2upx solid #cccccc;
}
.ex1 {
	display: flex;
	align-items: center;
	padding: 30upx 0upx;
}
.ex1 image {
	margin: 0 20upx;
	width: 60upx;
	height: 60upx;
}
.ex1 text {
	color: #acacac;
	font-size: 26upx;
}
.action{
	border: none;
}
.button {
	color: #d0c6b5;
	text-align: center;
	border: 1upx solid #d0c6b5;
	border-radius: 6upx;
	line-height: 60upx;
	width: 180upx;
	height: 60upx;
}
.db{
	padding: 20upx 0;
	text-align: center;
	color: #A7A7A7;
}
</style>
