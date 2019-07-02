<template>
	<view class="content">
		<my-issue key="1" :headPicValue="userInfo.icon" @submit="tijiao" />
	</view>
</template>

<script>
  import myIssue from '@/components/myIssue.vue'
	export default {
		components:{myIssue},
		data() {
			return {
				title: 'Hello',
				orderId:0,
				goodsId:0,
				userInfo:{}
			}
		},
		onLoad(options) {
			this.userInfo = this.$stronge.getStronge("userInfo")
			this.orderId = options.orderId;
			this.goodsId = options.goodsId;
		},
		methods: {
			tijiao(e){
				this.$ajax.postJSON({
					url:"/newOrder/insertCommit",
					data:{
						commit:e.textareaValue,
						goodsId:this.goodsId,
						ordersId:this.orderId,
						star:e.score,
						umsIcot:this.userInfo.icon,
						userId:this.userInfo.id,
						userName:this.userInfo.username
					}
				}).then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title:"评论成功"
						})
						setTimeout(function(){
							uni.navigateBack({
								delta:1
							})	
						},500)
					}else{
						uni.showToast({
							title:"评论失败",
							icon:"none"
						})
					}
				})
			}
		}
	}
</script>

<style>
	.content{
		height: 100%;
	}
</style>
