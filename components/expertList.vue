<template>
	<view class="grace-margin">
		<view class="grace-news-list" style="margin-top:10px;">
			<view class="item" 
				v-for="(item,index) in expertList" 
				:key="index" 
				@tap="expertClick(item)">
				<view class="img-title">
					<image :src="item.img"></image>
				</view>
				<view class="body">
					<view class="title" style="font-weight: bold;">{{ item.name }}</view>
					<view class="desc">{{ item.desc }}</view>
					<view class="be-good-at">{{ item.beGoodAt }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				expertList:[
					{
						img:"./../../static/img/zhuanjia.png",
						name:"专家",
						desc:"专家专家专家专家专家专家专家专家专家专家专家专家专家专家专家专家专家",
						beGoodAt:"专家专家专家专家专家专家专家"
					},
					{
						img:"./../../static/img/zhuanjia.png",
						name:"专家",
						desc:"专家专家专家专家专家专家专家专家专家专家专家专家专家专家专家专家专家",
						beGoodAt:"专家专家专家专家专家专家专家"
					},
					{
						img:"./../../static/img/zhuanjia.png",
						name:"专家",
						desc:"专家专家专家专家专家专家专家专家专家专家专家专家专家专家专家专家专家",
						beGoodAt:"专家专家专家专家专家专家专家"
					},
					{
						img:"./../../static/img/zhuanjia.png",
						name:"专家",
						desc:"专家专家专家专家专家专家专家专家专家专家专家专家专家专家专家专家专家",
						beGoodAt:"专家专家专家专家专家专家专家"
					},
					{
						img:"./../../static/img/zhuanjia.png",
						name:"专家",
						desc:"专家专家专家专家专家专家专家专家专家专家专家专家专家专家专家专家专家",
						beGoodAt:"专家专家专家专家专家专家专家"
					},
					{
						img:"./../../static/img/zhuanjia.png",
						name:"专家",
						desc:"专家专家专家专家专家专家专家专家专家专家专家专家专家专家专家专家专家",
						beGoodAt:"专家专家专家专家专家专家专家"
					}
				]
			};
		},
		methods:{
			expertClick(item){
				this.$emit("expert-click",item)
			}
		}
	}
</script>

<style>
.img-title{
	width: 150upx;
	height: 150upx;
	margin-right: 15upx;
}
.img-title image{
	width: 150upx;
	height: 150upx;
}
.be-good-at{
	color: var(--common-color);
	font-size: 28upx;
}
.item{
	padding-bottom:10upx;
	border-bottom: #EFEFEF 1px solid;
}
</style>
