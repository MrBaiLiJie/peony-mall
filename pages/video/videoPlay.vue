<template>
	<view class="content">
		<view class="video-wrapper">
			<video class="video" src="https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4"
			 controls objectFit="fill" :autoplay="true"></video>
		</view>
		<scroll-view class="scroll" scroll-y>
			<view class="scroll-content">
				<view class="introduce-section">
					<text class="title">{{detailData.title}}</text>
					<view class="introduce">
						<text class="introduce">简介简介简介简介简介简介，简介简介简介简介简介简介简介，简介简介简介简介简介简介。</text>
						<text class="yticon icon-xia show-icon"></text>
					</view>
					<view class="actions">
						<view class="action-item">
							<image src="../../static/img/icon/dianzan.png"></image>
							<text>75</text>
						</view>
						<view class="action-item">
							<image src="../../static/img/icon/chaping.png"></image>
							<text>6</text>
						</view>
						<view class="action-item">
							<image src="../../static/img/icon/share.png"></image>
							<text>分享</text>
						</view>
						<view class="action-item">
							<image src="../../static/img/icon/shoucang.png"></image>
							<text>收藏</text>
						</view>
					</view>
				</view>

				<view class="container" v-show="loading === false">

					<!-- 评论 -->
					<view class="s-header">
						<text class="tit">网友评论</text>
					</view>
					<view class="evalution">
						<view v-for="(item, index) in evaList" :key="index" class="eva-item">
							<image :src="item.src" mode="aspectFill"></image>
							<view class="eva-right">
								<text>{{item.nickname}}</text>
								<text>{{item.time}}</text>
								<view class="zan-box">
									<text>{{item.zan}}</text>
									<image src="../../static/img/icon/dianzan.png"></image>
								</view>
								<text class="content">{{item.content}}</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 加载图标 -->
				<mixLoading class="mix-loading" v-if="loading"></mixLoading>
			</view>
		</scroll-view>

		<view class="bottom">
			<view class="input-box">
				<text class="yticon icon-huifu"></text>
				<input class="input" type="text" placeholder="点评一下把.." placeholder-style="color:#adb1b9;" />
			</view>
			<text class="confirm-btn">提交</text>
		</view>
	</view>
</template>

<script>
	import json from '@/json';
	import mixLoading from '@/components/mix-loading/mix-loading';
	export default {
		components: {
			mixLoading
		},
		data() {
			return {
				loading: true,
				detailData: {
					title: "ewew"
				},
				newsList: [],
				evaList: [],
			}
		},
		onLoad(options) {
			this.loadNewsList();
			this.loadEvaList();
		},
		methods: {
			//获取推荐列表
			async loadNewsList() {
				let list = await json.newsList;
				setTimeout(() => {
					list.sort((a, b) => {
						return Math.random() > .5 ? -1 : 1; //静态数据打乱顺序
					})
					list.forEach(item => {
						if (item.images.length > 0) {
							this.newsList.push(item);
						}
					})
					this.loading = false;
				}, 1000)
			},
			//获取评论列表
			async loadEvaList() {
				this.evaList = await json.evaList;
			},
			redirectToDetail() {
				uni.redirectTo({
					url: 'details'
				})
			}
		}
	}
</script>

<style>
	@charset "UTF-8";

	page {
		height: 100%;
	}

	.content {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: #fff;
	}

	.video-wrapper {
		height: 440upx;
	}

	.video-wrapper .video {
		width: 100%;
		height: 100%;
	}

	.scroll {
		flex: 1;
		position: relative;
		background-color: #f8f8f8;
		height: 0;
	}

	.scroll-content {
		display: flex;
		flex-direction: column;
	}

	/* 简介 */
	.introduce-section {
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		line-height: 1.5;
	}

	.introduce-section .title {
		font-size: 36upx;
		color: #303133;
		margin-bottom: 16upx;
	}

	.introduce-section .introduce {
		display: flex;
		font-size: 26upx;
		color: #909399;
	}

	.introduce-section .introduce .show-icon {
		font-size: 34upx;
		padding-left: 10upx;
	}

	/* 点赞等操作 */
	.actions {
		display: flex;
		align-items: center;
		line-height: 1.3;
		padding-right: 44upx;
		padding-top: 16upx;
	}

	.actions .action-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-right: 60upx;
		font-size: 24upx;
		color: #999;
	}

	.action-item image {
		width: 50upx;
		height: 50upx;
	}

	.actions .yticon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60upx;
		height: 60upx;
		font-size: 52upx;
	}

	.actions .yticon.reverse {
		position: relative;
		top: 6upx;
		transform: scaleY(-1);
	}

	.actions .yticon.active {
		color: #ec706b;
	}

	.actions .icon-fenxiang2 {
		font-weight: bold;
		font-size: 36upx;
	}

	.actions .icon-shoucang {
		font-size: 44upx;
	}

	.mix-loading {
		transform: translateY(140upx);
	}

	.s-header {
		padding: 20upx 30upx;
		font-size: 30upx;
		color: #303133;
		background: #fff;
		margin-top: 16upx;
	}

	.s-header:before {
		content: "";
		width: 0;
		height: 40upx;
		margin-right: 24upx;
		border-left: 6upx solid #ec706b;
	}

	/* 推荐列表 */
	.rec-section {
		background-color: #fff;
	}

	.rec-section .rec-item {
		display: flex;
		padding: 20upx 30upx;
		position: relative;
	}

	.rec-section .rec-item:after {
		content: "";
		position: absolute;
		left: 30upx;
		right: 0;
		bottom: 0;
		height: 0;
		border-bottom: 1px solid #eee;
		transform: scaleY(50%);
	}

	.rec-section .left {
		flex: 1;
		padding-right: 10upx;
		overflow: hidden;
		position: relative;
	}

	.rec-section .left .title {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		font-size: 32upx;
		color: #303133;
		line-height: 44upx;
	}

	.rec-section .left .bot {
		position: absolute;
		left: 0;
		bottom: 4upx;
		font-size: 26upx;
		color: #909399;
	}

	.rec-section .left .time {
		margin-left: 20upx;
	}

	.rec-section .right {
		width: 220upx;
		height: 140upx;
		flex-shrink: 0;
		position: relative;
	}

	.rec-section .right .img {
		width: 100%;
		height: 100%;
	}

	.rec-section .right .video-tip {
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.rec-section .right .video-tip image {
		width: 60upx;
		height: 60upx;
	}

	/* 评论 */
	.evalution {
		display: flex;
		flex-direction: column;
		background: #fff;
		padding: 20upx 0;
	}

	.eva-item {
		display: flex;
		padding: 20upx 30upx;
		position: relative;
	}

	.eva-item image {
		width: 60upx;
		height: 60upx;
		border-radius: 50px;
		flex-shrink: 0;
		margin-right: 24upx;
	}

	.eva-item:after {
		content: "";
		position: absolute;
		left: 30upx;
		bottom: 0;
		right: 0;
		height: 0;
		border-bottom: 1px solid #eee;
		transform: translateY(50%);
	}

	.eva-item:last-child:after {
		border: 0;
	}

	.eva-right {
		display: flex;
		flex-direction: column;
		flex: 1;
		font-size: 26upx;
		color: #909399;
		position: relative;
	}

	.eva-right .zan-box {
		display: flex;
		align-items: base-line;
		position: absolute;
		top: 10upx;
		right: 10upx;
	}

	.zan-box image {
		width: 35upx;
		height: 35px;
	}

	.eva-right .zan-box .yticon {
		margin-left: 8upx;
	}

	.eva-right .content {
		font-size: 28upx;
		color: #333;
		padding-top: 20upx;
	}

	/* 底部 */
	.bottom {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		height: 90upx;
		padding: 0 30upx;
		box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.04);
		position: relative;
		z-index: 1;
	}

	.bottom .input-box {
		display: flex;
		align-items: center;
		flex: 1;
		height: 60upx;
		background: #f2f3f3;
		border-radius: 100px;
		padding-left: 30upx;
	}

	.bottom .input-box .icon-huifu {
		font-size: 28upx;
		color: #909399;
	}

	.bottom .input-box .input {
		padding: 0 20upx;
		font-size: 28upx;
		color: #303133;
	}

	.bottom .confirm-btn {
		font-size: 30upx;
		padding-left: 20upx;
		color: #0d9fff;
	}
</style>
