<template>
	<view>
		<view class="ping"><image src="../../static/h1.png" mode="aspectFit"></image></view>
		<view class="title">最新推荐</view>
		<view class="content" v-for="(item, index) in content" :key="index">
			<image :src="item.img" mode="aspectFit"></image>
			<view style="height: 30upx;width: 100%;"></view>
			<view class="text">
				<view class="txt">{{ item.txt }}</view>
				<text class="txt2">{{ item.txt2 }}</text>
				<text class="txt3">{{ item.txt3 }}</text>
			</view>
			<view class="open">去开团</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			content: [
				{ img: '../../static/h2.png', txt: '泰式蟹片', txt2: '￥1', txt3: '单买价￥12' },
				{ img: '../../static/h2.png', txt: '泰式蟹片', txt2: '￥1', txt3: '单买价￥12' },
				{ img: '../../static/h2.png', txt: '泰式蟹片', txt2: '￥1', txt3: '单买价￥12' }
			]
		};
	},
	methods: {}
};
</script>

<style>
body {
	background-color: #efefef;
}
.ping {
	background-color: #efefef;
}
.ping image {
	width: 100%;
	height: 380upx;
}
.title {
	background-color: #FFFFFF;
	padding: 30upx 0upx;
	margin: 0 auto;
	text-align: center;
	font-size: 36upx;
}
.content {
	display: flex;
	flex-wrap: wrap;
	align-items: flex-end;
	justify-content: space-between;
	background-color: #FFFFFF;
	padding-bottom: 40upx;
	margin-bottom: 10upx;
}
.content image {
	width: 100%;
	height: 420upx;
}
.text {
	margin-left: 20upx;
}
.txt {
	font-size: 32upx;
	margin-left: 10upx;
}
.txt2 {
	font-size: 32upx;
	color: #501f00;
	font-weight: 600;
}
.txt3 {
	margin-left: 20upx;
	color: #868889;
	text-decoration: line-through;
}
.open {
	color: #ffffff;
	text-align: center;
	width: 200upx;
	height: 70upx;
	background-color: #501f00;
	line-height: 70upx;
	border-radius: 8upx;
	margin-right: 30upx;
}
</style>
