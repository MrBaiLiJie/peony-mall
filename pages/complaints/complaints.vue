
<template>
	<view>
		
		<view class="graceform" style="margin-top:20px;" v-for="itemone in complaints" :key="index">
				<view class="graceitems">
					<view class="grace-label">时间</view>
					<view>{{ itemone.createdAt }}</view>
				</view>
				<view class="graceitems">
					<view class="grace-label">标题</view>
					<view>{{ itemone.title }}</view>
				</view>
				<view class="graceitems">
					<view class="grace-label">内容</view>
					<view>{{ itemone.content }}</view>
				</view>
		</view>
		   <button>我要反馈</button> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				complaints:[
				],
			}
		},
			onLoad:function(){
				let _this=this;
				uni.getStorage({
					key:'addressId',
					success: (res) => {
						console.log(res.data)
						_this.addressId=res.data.id,
							uni.request({
							method:"get",
							url:`http://192.144.170.210:8085/FeedBack/selectFeedBackByUserId/${_this.addressId}`,
							success: (res) => {
								this.complaints=res.data.data;
								console.log(this.complaints)
							},
							fail: (err) => {
								console.log(err)
							}
						});
				}
				})
		
		},
		methods: {
			
		}
	}
</script>

<style>
	.graceform{
		
	}
   .graceitems{
	   display:-webkit-box;
		display:-webkit-flex;
		display:-ms-flexbox;
		display:flex;
		border-bottom:1px solid #F5F6F8;
		width:90%;
		-webkit-box-align:center;
		-webkit-align-items:center;
		-ms-flex-align:center;
		align-items:center;
		-webkit-flex-wrap:nowrap;
		-ms-flex-wrap:nowrap;
		flex-wrap:nowrap;
		-webkit-box-pack:justify;
		-webkit-justify-content:space-between;
		-ms-flex-pack:justify;
		justify-content:space-between;
		padding:15upx 12upx;
		margin:0 auto;
		height:100upx;
		background-color:#f5f5f5;
		border-radius:12upx;
         margin-top:12upx;
   }
</style>
