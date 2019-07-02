<template>
	<view>
		<view class="Ahead">
			<view  class="head" style="">
				  <view class="price">￥{{sumPrice}}</view>
				  <view class="sumPrice">付款金额(元)</view>
			</view>
			<view class="jingxuan">
					<view class="checkBox">
						     <radio-group @change="radioChange">
								<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
                                      <view class="jxLeft">
										  <image :src="item.img"></image>
                                      </view>
									  <view class="jxRight">
										  <view class="text1">{{item.value}}</view>
										  <view class="text2">{{item.text2}}</view>
									  </view>
									<view>
										<radio value="" :checked="index === current" />
									</view>
								</label>
                 </radio-group>
					</view>
					 
				
			</view>	
			</view>
			<view class="btns">
				 <button class="btnright" @tap="zhifu()" type="primary">立即支付</button>
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
			sumPrice:'',
			items:[
				{   img:'../../../static/zhifu/weixin1x.png',
					value:'微信支付',
					text2:'推荐已安装微信的用户使用',
				},
				{   
					img:'../../../static/zhifu/zhifubao1x.png',
					text2:'推荐已安装支付宝的用户使用',
					value:'支付宝',
					checked: 'true'
				}
			],
			current: 0,
			userInfo:{}
		}
	},
	onLoad(options) {
		this.sumPrice = options.price;
		this.orderId = options.id;
		this.userInfo = this.$stronge.getStronge("userInfo");
	},
	methods: {
		  radioChange: function(evt) {
		    for (let i = 0; i < this.items.length; i++) {
		        if (this.items[i].value === evt.target.value) {
		            this.current = i;
		            break;
		        }
		    }
		},
		zhifu(){
			uni.showLoading({
				mask:true
			})
			this.$ajax.postJSON({
				url:"/pay/updatejifenPay",
				data:{
					orderID:this.orderId,
					memId:this.userInfo.id
				}
			}).then(res=>{
				uni.hideLoading()
				if(res.data.code == 200){
					uni.showToast({
						title:"支付成功"
					})
					setTimeout(function(){
						uni.redirectTo({
							url: "order_list?tbIndex=" + 2
						})
					},500)
				}else{
					uni.showToast({
						title:"支付失败",
						icon:"none"
					})
				}
			})
		}
	}
};
</script>

<style lang="scss">
page{
	background-color:#ffffff;
}
.Ahead{
	width:98%;
	margin:0 auto;
}
.head{
	margin-top:70upx;
	width: 90%;
	margin-left:20upx;
}
.price{
	font-size:60upx;
	color:#333333;
}
.sumPrice{
	font-size:32upx;
	color: #999999;
}
.uni-list-cell{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.jxLeft{
		// width:254upx;
		// height:168upx;
		// float:left;
		margin-left:20upx;
		margin-left:20upx;
	}
	.jxRight{
		// width:600upx;
		height:106upx;
		// float:left;
		margin-left:20upx;
	}
	.jxRight img{
		width:30upx;
		height:30upx;
		margin-top:20upx;
	}
	.jxRight text{
		font-size:30upx;
		color:#999999;
		margin-top:20upx;
	}
	.jxLeft image{
		width:80upx;
		height:80upx;
		margin-top:7upx;
	}
	.jingxuan{
		margin-top:40upx;
		width:100%;
		height:106upx;
        border-bottom: 0.5upx solid #eee;
	}
	.jingxuan .text1{
		width:100%;
		height:50upx;
		font-size:32upx;
		color:#333333;
	}
	.text2{
		width:552upx;
		// float:left;
		font-size:28upx;
        color:#999999;
	}
	.check{
		transform:scale(0.7);
		color:#08726F;
	}
	.checkBox{
		// width:42upx;
		// height:42upx;
		border-radius: 100%;
		// float:right;
		margin-top:17upx;
		
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
		color: #08726F !important;
		border: 2upx solid #08726F !important;
		background-color: #f9f9f9 !important;
		border-radius: 0;
	}
	.btns .btnright {
		color: #ffffff !important;
		background-color: #d71518 !important;
		border-radius: 0;
	}
</style>
