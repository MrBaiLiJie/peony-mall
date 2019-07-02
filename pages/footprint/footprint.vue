<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
			onLoad:function(){
				uni.getStorage({
					key: "userInfo",
					success: function(res) {
						_this.userInfo = res.data;
					}
				})
				this.$ajax.get({
					url:`/member/readHistory/list`,
					param:{
						memberId:_this.userInfo.id
					}
				});
			// uni.request({
			// 	method:"get",
			// 	url:`http://192.144.170.210:8085/member/readHistory/list?memberId=10`,
			// 	success: (res) => {
			// 		console.log(res.data)
			// 	},
			// 	fail: (err) => {
			// 		console.log(err)
			// 	}
			// });
		},
		methods: {
	
		}
	}
</script>

<style>

</style>
