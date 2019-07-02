<template>
	<view class="body-view">
		<view :current="currentTab" class="swiper-box-list" duration="300" @change="swiperChange">
			<view v-for="(swiperDate,index1) in swiperDateList" :key="index1">
				
				<view class="invoice-list">
					<view class="tis" v-if="!(invoice?invoice.length:false)">
						<img src="../../static/kong.png" alt="" style="width:80upx;height:80upx">
						<text>发票列表是空的哦~</text>
					</view>
					<view class="row" v-for="(item,index) in invoice" :key="index" @tap="gotoEdit(item)">
						<view class="rowtype editDel">
							<!-- <view class="edit" @tap="gotoEdit(item)">编辑</view> -->
							<view class="del" @tap.stop="gotoDel(item.objectId)">删除</view>
						</view>
						<view class="rowtype">
							<view class="type">单位名称：</view>
							<view class="text">{{item.account}}</view>
						</view>
						<view class="rowtype">
							<view class="type">开户行：</view>
							<view class="text">{{item.bankInformation}}</view>
						</view>
						<view class="rowtype">
							<view class="type">银行地址：</view>
							<view class="text">{{item.bankOfDeposit}}</view>
						</view>
						<!-- <view class="rowtype">
							<view class="type">开票金额：</view>
							<view class="text">{{item.invoiceAmount}}</view>
						</view> -->
						<view class="rowtype">
							<view class="type">电话号码：</view>
							<view class="text">{{item.phoneNumber}}</view>
						</view>
						<view class="rowtype">
							<view class="type">纳税人识别号：</view>
							<view class="text">{{item.tfn}}</view>
						</view>
						<view class="rowtype">
							<view class="type">单位地址：</view>
							<view class="text">{{item.unitAddress}}</view>
						</view>
					</view>
					<view style="width:100%;position: fixed;bottom :0;">
						<button formType="submit" type="primary" 
						style="width:100%;background-color: #d71518;font-size: 32upx;height:100upx;border-radius:0upx; line-height:100upx;"
						@tap="gotoBill">新增发票</button>
					</view>
				</view>
			</view>
		</view>
</view>

</template>
<script>
	export default {
		data() {
			return {
				scrollLeft: 0,
				isClickChange: false,
				currentTab: 0,
				swiperDateList: [
					{
						putong:[78787]
					}
				],
				invoice:[],
				userInfo:{}
			}
		},
		onShow: function() {
			console.log('调用了')
			let _this = this;
			uni.getStorage({
				key:"userInfo",
				success:function(res){
					_this.userInfo = res.data;
					_this.getComponById()
				}
			})
			
		},
		methods: {
			gotoEdit(item) {
				uni.navigateTo({
				    url: `../invoice/invoice?id=${item.objectId}`
				});
			},
			gotoDel(id){
				console.log(id)
				this.$ajax.post({
					url:'/invoice/deleteById',
					data:{
						id:id
					}
				}).then((res)=>{
					if(res.data.code == 200){
						uni.showToast({
							title:"删除成功"
						})
						this.getComponById()
					}
				})
			},
			getComponById(){
				this.$ajax.get({
					url:'/invoice/selectByMemId',
					param:{
						memId:this.userInfo.id
					}
				}).then((res)=>{
					this.invoice = res.data.data
				})
			},
			gotoBill(){
				uni.redirectTo({
				    url: '../invoice/invoice' 
				});
			},
			swichMenu: async function(current) { //点击其中一个 menu
				if (this.currentTab == current) {
					return false;
				} else {
					this.currentTab = current;
					this.setScrollLeft(current);
				}
			},
			swiperChange: async function(e) {
				let index = e.target.current;
				this.setScrollLeft(index);
				this.currentTab = index; 
			},
			setScrollLeft: async function(tabIndex) {
				let leftWidthSum = 0;
				for (var i = 0; i <= tabIndex; i++) {
					let nowElement = await this.getWidth('tabNum' + i);
					// leftWidthSum = leftWidthSum + nowElement.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth;
				this.scrollLeft = leftWidthSum > winWidth ? (leftWidthSum - winWidth) : 0
			},
			getWidth: function(id) { //得到元素的宽高
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select("#" + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				})
			},
			loadMore: function(tabIndex) {
				console.log('正在加载更多数据。。。')
						this.getDateList(tabIndex);
					},
			getDateList: function(tabIndex) {
				for (var i = 0; i < 20; i++) {
					var entity = this.menuTabs[tabIndex].name + (this.swiperDateList[tabIndex].length);
					this.swiperDateList[tabIndex].push(entity);
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: center;
		background: rgba(249, 249, 249, 1);
	}
	 .invoice-list {
	     width: 100%;
		 overflow: auto;
	     padding: 20upx 0 120upx 0;
	     .row{
	         width: 92%;
	         // height: calc(22vw + 40upx); 
	         margin: 20upx auto;    
	         border-radius: 15upx;
	         box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
	         // display: flex;
	         // align-items: center;
	         position: relative;
	         
	         z-index: 4;
	         border: 0;
			 .editDel {
				position: absolute;
				top: 0;
				right: 0;
				color: #5E5E5E;
				.edit {
					margin-right: 15upx;
					padding-right: 15upx;
					border-right: 1upx solid #ccc;
					color: #5E5E5E;
				}
				.del {
					color: #5E5E5E;
				}
			 }
			 .rowtype {
				display: flex;
				align-items: center;
				padding: 0 20upx;
			 	// width: 100%;
				height: 70upx;
				.type {
					font-size: 30upx;
					width: 40%;
				}
				.text {
					font-size: 30upx;
					width: 60%;
				}
			 }
		}
		
	}
	.body-view {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
		width: 100%;
		align-items: flex-start;
		justify-content: center;
	}
	  .tis{
	     width: 100%;
	     height: 70upx;
	     display: flex;
	     justify-content: center;
	     align-items: center;
	     font-size: 32upx;
	 	margin-top:100upx;
	 }
	.top-menu-view {
		display: flex;
		white-space: nowrap;
		width: 100%;
		background-color: #FFFFFF;
		height: 112upx;
		/* 在这里设置导航条高度 */
	}
	 
	.top-menu-view .menu-one-view {
		display: inline-block;
		white-space: nowrap;
		height: 100%;
	}
	 
	.top-menu-view .menu-one-view .menu-one {
		/* 在这里写 单个按钮样式 */
		margin-left: 25upx;
		margin-right: 25upx;
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	 
	.top-menu-view .menu-one-view .menu-one .menu-one-txt {
		height: 40upx;
		font-size: 30upx;
		font-weight: 400;
		color: rgba(154, 154, 154, 1);
		line-height: 40upx;
	}
	 
	.top-menu-view .menu-one-view .menu-one .menu-one-bottom {
		position: absolute;
		bottom: 0;
		width: 100%;
	}
	 
	.top-menu-view .menu-one-view .menu-one .menu-one-bottom .menu-one-bottom-color {
		width: 60%;
		height: 4upx;
	}
	 
	.top-menu-view .menu-one-view .menu-one-act {
		/* 在这里写 单个按钮样式 */
		margin-left: 25upx;
		margin-right: 25upx;
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	 
	.top-menu-view .menu-one-view .menu-one-act .menu-one-txt {
		height: 40upx;
		font-size: 30upx;
		font-weight: 400;
		color: rgba(0, 170, 255, 1);
		line-height: 40upx;
	}
	 
	.top-menu-view .menu-one-view .menu-one-act .menu-one-bottom {
		position: absolute;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: center;
	}
	 
	.top-menu-view .menu-one-view .menu-one-act .menu-one-bottom .menu-one-bottom-color {
		width: 60%;
		height: 4upx;
		background: rgba(0, 170, 255, 1);
	}
	 
	.swiper-box-list {
		flex: 1;
		width: 100%;
		height: auto;
		background-color: #FFFFFF;
	}
	 
	.swiper-one-list {
		height: 100%;
		width: 100%;
	}
	 
	.swiper-one-list .swiper-list-entity {
		width: 100%;
		height: 112upx;
		text-align: center;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}
	.fpgrace-items input{
	    width:100%;
	    height:40rpx;
		line-height:40rpx;
		background:none;
		-webkit-flex-shrink:1;
		-ms-flex-negative:1;
		flex-shrink:1;
		border:0;
		text-align:right;
		padding:20rpx 0;
		margin-left:40rpx;
		color:#333333;
		font-size:28rpx;
	
	 }
	 .fpgrace-items{
		 display:-webkit-box;
		display:-webkit-flex;
		display:-ms-flexbox;
		display:flex;
		border-bottom:1px solid #F5F6F8;
		width:100%;
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
		padding:10rpx 0;
		border-bottom: 2upx solid #d7d7d7;
	
	 }
	 .fpgrace-label{
		 // width:130rpx;
		height:80rpx;
		line-height:80rpx;
		-webkit-flex-shrink:0;
		-ms-flex-negative:0;
		flex-shrink:0;
		overflow:hidden;
		color:#5E5E5E;
	
	 }
	 .fpgrace-form{
		display:block;
		width:95%;
		height:auto;
		overflow:hidden;
	    margin:0 auto;
		border-top:2upx solid #d7d7d7;
		// border-bottom:2upx solid #ea7da7;
	}
</style>
