<template>
	<view class="">
		<view class="grace-img-card">
			<view class="item" 
				v-for="(name,index) in Nvideo" 
				:key="index" 
				@tap="goPlay(name)">
				<view class="img">
					<image :src="name.img" mode="widthFix"></image>
					<view class="grace-tags grace-absolute-rt .grace-gray">回顾</view>
				</view>
				<view class="text">
					{{name.name}}
				</view>
				<view class="videoimg">
					<image src="../../static/img/video.png" mode=""></image>
					<view class="text2">
						{{name.txt}}
					</view>
				</view>
			</view>
		</view>
		<view style="height:20px;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Nvideo: [{
					index: 0,
					img: 'https://graceui.oss-cn-beijing.aliyuncs.com/scollimgs/4.png',
					name: '阿富汗国家宝藏阿富汗国家宝藏阿富汗国家宝藏阿富汗国家宝藏',
					txt: '1123'
				}, {
					index: 0,
					img: 'https://graceui.oss-cn-beijing.aliyuncs.com/scollimgs/4.png',
					name: '阿富汗国家宝藏阿富汗国家宝藏阿富汗国家宝藏阿富汗国家宝藏',
					txt: '1123'
				}, {
					index: 0,
					img: 'https://graceui.oss-cn-beijing.aliyuncs.com/scollimgs/4.png',
					name: '阿富汗国家宝藏阿富汗国家宝藏阿富汗国家宝藏阿富汗国家宝藏',
					txt: '1123'
				}, {
					index: 0,
					img: 'https://graceui.oss-cn-beijing.aliyuncs.com/scollimgs/4.png',
					name: '阿富汗国家宝藏阿富汗国家宝藏阿富汗国家宝藏阿富汗国家宝藏',
					txt: '1123'
				} ]
			}
		},
		methods: {
			goPlay(item){
				uni.navigateTo({
					url:"videoPlay?video="+item.name
				})
			}
		}
	}
</script>

<style>
.item {
	box-shadow: 1upx 0upx 1upx #CECECE;
}
.text {
	font-size: 32upx;
	margin-left: 10upx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.text2{
	font-size: 34upx;
	color: #8D8D8C;
	font-weight: 300;
}
.videoimg {
	margin-left: 10upx;
	display: flex;
	align-items: center;
}
.videoimg image {
	margin-right: 10upx;
	opacity: .6;
	width: 42upx;
	height: 42upx;
}
.grace-tags{
	font-size: 24upx;
}
view{
	line-height:1.5em;
}
</style>
