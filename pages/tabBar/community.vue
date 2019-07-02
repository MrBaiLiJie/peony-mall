<template>
	<view>
		 <uni-list v-if="comm.length > 0">
			<uni-list-item v-for="(item,index) in comm" :key="index"
			:priceA="item.amount" 
			:priceB="item.minPoint" 
			:note="item.name" 
			:thumb="item.url ? item.url: '../../static/youhuiquan.jpg' " 
			show-badge="true" :show-arrow="false" 
			badge-text="立即领取"
			@click="receive(item.id)"></uni-list-item>
		 	  
		</uni-list>
		<view v-if="comm.length == 0">
			暂无可领取的优惠券
		</view>
	</view>
</template>

<script>
import naviGation from '@/components/naviGation.vue';
import uniList from '@/components/uni-list/uni-list.vue'
import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
export default {
	components: {
		naviGation,
		uniList,
		uniListItem
	},
	data() {
		return {
			comm:[]
		}
	},
	onLoad:function(){
		let _this = this;
		this.userInfo = this.$stronge.getStronge('userInfo')
		this.getYouHui();
	},
	methods: {
		getYouHui(){
			uni.showLoading({
				title:"加载中...",
				mask:true
			})
			this.$ajax.get({
				url:'/member/coupon/selectAll',
				param:{
					pageSize:20,
					pageNum:1,
					userId:this.userInfo.id
				}
			}).then((res)=>{
				uni.hideLoading()
				this.comm = res.data.data.data
			}).catch(err=>{
				uni.hideLoading()
			})
		},
		receive(id) {
			uni.showLoading({
				title:"加载中...",
				mask:true
			})
			this.$ajax.postJSON({
				url:`/member/coupon/add/`,
				data:{
					couponId: id,
					memId: this.userInfo.id
				}
			}).then(res=>{
				uni.hideLoading();
				this.getYouHui();
				if(res.data.code==700) {
					uni.showToast({
						title: '领取失败'
					});
					return;
				}
				uni.showToast({
					title: '领取成功'
				});
			})
		}
	}
};
</script>

<style lang="scss">
body {
	background-color: #efefef;
}
.head {
	width: 100%;
	margin-top: 60upx;
	display: flex;
	justify-content: space-around;
	align-items: flex-end;
	background-color: #4a2306;
	border-bottom: solid 1upx #eee;
	padding-bottom: 20upx;
}
.place {
	background-color: #ffffff;
	height: 40upx;
	/*  #ifdef  APP-PLUS  */
	margin-top: var(--status-bar-height);
	/*  #endif  */
}
.target {
	width: 20%;
	height: 80upx;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 24upx;
	margin-bottom: -2upx;
	color: #fff;
	&.on {
		// color: #17e6a1;
		color: #ffffff;
		border-bottom: 4upx solid #ffffff;
		font-weight: 300;
		font-size: 24upx;
	}
}
.content {
	margin-top: 20upx;
	padding: 20upx;
	background-color: #ffffff;
}
.content > image {
	width: 100%;
	height: 260upx;
}

.ff {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
}

.fun image {
	width: 230upx;
	height: 100upx;
}
</style>
