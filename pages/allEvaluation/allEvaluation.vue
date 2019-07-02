<template>
    <view>
		  <view class="uni-padding-wrap">
				<!-- 评论区 start -->
				<view class="uni-comment" v-if="comments.length > 0" v-for="(item, index) in comments" :key="index">
					<view class="uni-comment-list">
						<view class="uni-comment-face">
						 <image :src="item.umsIcot? item.umsIcot : '../../static/img/category/list/nanzhuang.jpg'"></image>
						</view>
						<view class="uni-comment-body">
							<view class="uni-comment-top">
								<text>{{item.userName}}</text>
							</view>
							<!-- <view class="uni-comment-date">
								<text>08/10 08:12</text>
							</view> -->
							<view class="uni-comment-content">{{item.commit}}</view>
						</view>
					</view>
					
				</view>
			<view v-if="comments.length == 0" style="text-align: center;margin:60upx auto">
				<img src="../../static/zwpj.png" alt="">
				<view style="font-size:30upx">该商品暂无评价~~</view>
				
			</view>
		</view>
    </view>
</template>

<script>
   	export default {
   	data() {
   		return {
   			complaints:[
   			],
			productId:"",
			comments:[]
   		}
   	},
   		onLoad:function(option){
			let _this = this;
			console.log(option.id)
			_this.productId = option.id;
			_this.$ajax.get({
				url:`/newOrder/selectCommitByGoodsId`,
				param:{
					productId:_this.productId,
					pageNum:1,
					pageSize:10
				},
			}).then(res=>{
				_this.comments=res.data.data
				console.log(_this.comments)
			});
   	},
   	methods: {
   		
   	}
   }
</script>

<style lang="scss">
    /* comment */
  /* comment */
 page {
     background-color: #f8f8f8;
 }
 
 .uni-padding-wrap {
     padding: 30upx;
 }
 
 view {
     font-size: 28upx;
 }
 
 .uni-comment {
     padding: 5rpx 0;
     display: flex;
     flex-grow: 1;
     flex-direction: column;
 }
 
 .uni-comment-list {
     flex-wrap: nowrap;
     padding: 10rpx 0;
     margin: 10rpx 0;
     width: 100%;
     display: flex;
 }
 
 .uni-comment-face {
     width: 100upx;
     height: 100upx;
     border-radius: 100%;
      margin-top: 20upx;
     flex-shrink: 0;
     overflow: hidden;
 }
 
 .uni-comment-face image {
    width:50upx;
	height:50upx;
	border-radius:100%;

 }
 
 .uni-comment-body {
     width: 100%;
 }
 
 .uni-comment-top {
     line-height: 1.5em;
     justify-content: space-between;
 }
 
 .uni-comment-top text {
	 display: block;
     color: #0A98D5;
     font-size: 24upx;
 }
 
  .uni-comment-top text:last-child {
 	 display: block;
     color: #cccccc;
     font-size: 18upx;
 }
 
 .uni-comment-date {
     line-height: 38upx;
     flex-direction: row;
     justify-content: space-between;
     display: flex !important;
     flex-grow: 1;
 }
 
 .uni-comment-date view {
     color: #666666;
     font-size: 24upx;
     line-height: 38upx;
 }
 
 .uni-comment-content {
     line-height: 1.6em;
     font-size: 28upx;
     padding: 8rpx 0;
 }
 
 .uni-comment-replay-btn {
     background: #FFF;
     font-size: 24upx;
     line-height: 28upx;
     padding: 5rpx 20upx;
     border-radius: 30upx;
     color: #333 !important;
     margin: 0 10upx;
 }
</style>
