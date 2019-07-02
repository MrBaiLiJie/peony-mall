<template>
    <view>
        <view class="uni-padding-wrap" style="padding-bottom: 120upx;">
			<view class="tis" v-if="complaints.length==0&&!loading">反馈是空的哦~</view>
            <!-- 评论区 start -->
            <view class="uni-comment" v-for="itemone in complaints" :key="index">
                <view class="uni-comment-list">
                    <view class="uni-comment-face">
                        <image :src="userInfo.icon" mode="widthFix"></image>
                    </view>
                    <view class="uni-comment-body">
                        <view class="uni-comment-top">
                            <text>{{ itemone.title }}</text>
							<text>{{ itemone.createdAt }}</text>
                        </view>
<!--                        <view class="uni-comment-date">
                            
                        </view> -->
                        <view class="uni-comment-content">{{ itemone.content }}</view>
                    </view>
                </view>
            </view>
        </view>
			<view class="btns">
			<!-- <button class="btnleft" @tap="reset()" type="primary">重置</button> -->
			<button class="btnright" type="primary" @tap="goFeedback()">我要反馈</button>
		</view>
    </view>
</template>

<script>
   	export default {
   	data() {
   		return {
   			complaints:[
   			],
			time:[],
			loading:false,
			userInfo:{}
   		}
   	},
   		onLoad:function(){
			this.loading = true;
			let _this = this;
			this.userInfo = this.$stronge.getStronge('userInfo')
			_this.$ajax.get({
				url:`/FeedBack/selectFeedBackByUserId`,
				param:{
					memId:_this.userInfo.id
				}
			}).then(res=>{
				let data=res.data.data;
				data.map((item)=>{
					item.createdAt = item.createdAt.split('T')[0]
				})
				this.complaints =data
				console.log(this.complaints)
			});
   	},
   	methods: {
   		showLoading(){
   			uni.showLoading({
   				title:"加载中..."
   			})
   		},
		goFeedback(){
			uni.navigateTo({
				url:'../uni-feedback/uni-feedback'
			})
		}
   	}
   }
</script>

<style>
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
    .tis {
    	width: 100%;
    	height: 60upx;
    	display: flex;
    	justify-content: center;
    	align-items: center;
    	font-size: 32upx;
    	margin-top:100upx;
    }
    .uni-comment-face {
        width: 70upx;
        height: 70upx;
        /* border-radius: 100%; */
        margin-right: 20upx;
        flex-shrink: 0;
        overflow: hidden;
    }

    .uni-comment-face image {
        width: 100%;
        /* border-radius: 100%; */
    }

    .uni-comment-body {
        width: 100%;
    }

    .uni-comment-top {
        line-height: 1.5em;
		display: flex;
		flex-direction: row;
        justify-content: space-between;
    }

    .uni-comment-top text {
        color: #CCCCCC;
        font-size: 24upx;
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
	.btns {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.btns > button {
		width: 100%;
		height: 100upx;
		text-align: center;
		line-height: 100upx;
		font-size: 32upx;
	}
	.btns .btnleft {
		color: #d71518 !important;
		border: 2upx solid #d71518 !important;
		background-color: #f9f9f9 !important;
		border-radius: 0;
	}
	.btns .btnright {
		color: #ffffff !important;
		background-color: #d71518 !important;
		border-radius: 0;
	}
</style>
