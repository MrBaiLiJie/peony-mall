<template>
	<view class="body-view">
		<scroll-view class="top-menu-view" scroll-x="true" :scroll-left="scrollLeft">
			<block v-for="(menuTab,index) in menuTabs" :key="index">
				<view class="menu-one-view" v-bind:id="'tabNum'+index" @click="swichMenu(index)">
					<view :class="[currentTab==index ? 'menu-one-act' : 'menu-one']">
						<view class="menu-one-txt">{{menuTab.name}}</view>
						<view class="menu-one-bottom">
							<view class="menu-one-bottom-color"></view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<swiper :current="currentTab" class="swiper-box-list" duration="300" @change="swiperChange">
			<!-- <block v-for="(swiperDate,index1) in swiperDateList" :key="index1"> -->
				<swiper-item class="invoice-list">
					<view class="coupon" @tap="gotoComm">
						<view class="img">
							<image src="../../static/coun1.png" mode=""></image>
						</view>
						<view class="txt">领券中心</view>
						<view class="right">
							<image src="../../static/right.png" mode=""></image>
						</view>
					</view>
					<view class="row" v-for="(item,index) in invoice" :key="index">
						<view class="row-l">
							<view class="price">
								<view class="img"><image src="../../static/price1.png" mode=""></image></view>
								<view class="num">{{item.smsCoupon.amount}}</view>
							</view>
							<view class="full">满{{item.smsCoupon.minPoint}}可用</view>
						</view>
						<view class="row-m">
							<view class="text">{{item.smsCoupon.name}}</view>
							
							<format-date :starttime="item.smsCoupon.startTime" :endtime="item.smsCoupon.endTime"></format-date>
						</view>
						<view class="row-r">
							<button class="btn">立即使用</button>
						</view>
						
					</view>
					
				</swiper-item>
				<swiper-item class="invoice-list">
					<view class="coupon" @tap="gotoComm">
						<view class="img">
							<image src="../../static/coun1.png" mode=""></image>
						</view>
						<view class="txt">领券中心</view>
						<view class="right">
							<image src="../../static/right.png" mode=""></image>
						</view>
					</view>
					<view class="row" v-for="(item,index) in invoice" :key="index">
						<view class="row-l">
							<view class="price">
								<view class="img"><image src="../../static/price1.png" mode=""></image></view>
								<view class="num gray">{{item.smsCoupon.amount}}</view>
							</view>
							<view class="full gray">满{{item.smsCoupon.minPoint}}可用</view>
						</view>
						<view class="row-m">
							<view class="text gray">{{item.smsCoupon.name}}</view>
							<format-date :starttime="item.smsCoupon.startTime" :endtime="item.smsCoupon.endTime"></format-date>
						</view>
						<view class="row-r">
							<view class="used"><image src="../../static/use.png" mode=""></image></view>
						</view>
						
					</view>
					
				</swiper-item>
				<swiper-item class="invoice-list">
					<view class="coupon" @tap="gotoComm">
						<view class="img">
							<image src="../../static/coun1.png" mode=""></image>
						</view>
						<view class="txt">领券中心</view>
						<view class="right">
							<image src="../../static/right.png" mode=""></image>
						</view>
					</view>
					<view class="row" v-for="(item,index) in invoice" :key="index">
						<view class="row-l">
							<view class="price">
								<view class="img"><image src="../../static/price1.png" mode=""></image></view>
								<view class="num gray">{{item.smsCoupon.amount}}</view>
							</view>
							<view class="full gray">满{{item.smsCoupon.minPoint}}可用</view>
						</view>
						<view class="row-m">
							<view class="text gray">{{item.smsCoupon.name}}</view>
							<format-date :starttime="item.smsCoupon.startTime" :endtime="item.smsCoupon.endTime"></format-date>
						</view>
						<view class="row-r">
							<view class="used"><image src="../../static/overdue.png" mode=""></image></view>
						</view>
						
					</view>
					
				</swiper-item>
			<!-- 	<swiper-item class="invoice-list">
					<view class="coupon" @tap="gotoComm">
						<view class="img">
							<image src="../../static/coun1.png" mode=""></image>
						</view>
						<view class="txt">领券中心</view>
						<view class="right">
							<image src="../../static/right.png" mode=""></image>
						</view>
					</view>
					<view class="row" v-for="(item,index) in invoice" :key="index">
						<view class="row-l">
							<view class="price">
								<view class="img"><image src="../../static/price1.png" mode=""></image></view>
								<view class="num">{{item.smsCoupon.amount}}</view>
							</view>
							<view class="full">满{{item.smsCoupon.minPoint}}可用</view>
						</view>
						<view class="row-m">
							<view class="text">{{item.smsCoupon.name}}</view>
							
							<format-date :starttime="item.smsCoupon.startTime" :endtime="item.smsCoupon.endTime"></format-date>
						</view>
						<view class="row-r">
							<button class="btn">立即使用</button>
						</view>
						
					</view>
					
				</swiper-item> -->
			<!-- </block> -->
		</swiper>
		
</view>

</template>
<script>
	import formatDate from './formatDate'
	export default {
		data() {
			return {
				scrollLeft: 0,
				isClickChange: false,
				currentTab: 0,
				menuTabs: [
					{name: '未使用'},
					{name: '已使用'},
					{name: '已失效'}
					// {name: '全部'}

				],
				invoice:[],
				swiperDateList: [
					{putong:[
						78787
					]},
					[12133],
				]
			}
		},
		components:{
			formatDate
		},
		onShow: function() {
			let _this = this;
			this.userInfo = this.$stronge.getStronge('userInfo');
			// console.log(this.menuTabs[1].name)
			if(this.menuTabs[0].name == '未使用') {
				this.$ajax.get({
					url:'/member/coupon/list',
					param:{
						useStatus:0,
						memId:this.userInfo.id
					}
				}).then((res)=>{
					this.invoice = res.data.data
				})
			}
			
		
		},
		methods: {
			gotoComm() {
				uni.navigateTo({
				    url: '../tabBar/community' 
				});
			},
			swichMenu: async function(current) { //点击其中一个 menu
				console.log(current)
				if (this.currentTab == current) {
					return false;
				} else {
					this.currentTab = current;
					this.setScrollLeft(current);
				}
				this.$ajax.get({
					url:'/member/coupon/list',
					param:{
						useStatus:current,
						memId:10
					}
				}).then((res)=>{
					this.invoice = res.data.data
				})
				
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
					leftWidthSum = leftWidthSum + nowElement.width;
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
		 .coupon {
			width: 92%;
			height: 77upx;
			// height: calc(22vw + 40upx); 
			margin: 0 auto;    
			border-radius: 15upx;
			box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
			// display: flex;
			// align-items: center;
			position: relative;
			padding-top: 11upx;			
			z-index: 4;
			border: 0;
			.img {
				float: left;
				width: 70upx;
				height: 70upx;
				margin-left: 20upx;
				
				image {
					width: 100%;
					height: 100%;
				}
			}
			.txt {
				margin-top: 10upx;
				font-size: 30upx;
				float: left;
				margin-left: 20upx;
			}
			.right {
				float: right;
				margin-top: 10upx;
				margin-right: 20upx;
				width: 50upx;
				height: 50upx;
				image {
					width: 70%;
					height:70%;
				}
			}
		 }
	     .row{
			 display: flex;
	         width: 92%;
			 height: 180upx;
	         // height: calc(22vw + 40upx); 
	         margin: 20upx auto;    
	         border-radius: 15upx;
	         box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
	         // display: flex;
	         // align-items: center;
	         position: relative;
	         
	         z-index: 4;
	         border: 0;
			
			.row-l {
				width: 25%;
				box-sizing: border-box;
				.price {
					position: relative;
					overflow: hidden;
					.img {
						float: left;
						margin: 60upx 2upx 20upx 30upx;
						width: 30upx;
						height: 30upx;
						image {
							width: 100%;
							height: 100%;
						}
						
					}
					
					.num {
						margin-top: 30upx;
						float: left;
						font-size: 60upx;
						color: #d71518;
					}
					.gray {
						// color: #d71518;
					} 
					
				}
				.full {
					margin-left: 30upx;
					margin-top: 5upx;	
					color: #d71518;
					width:100%;
					font-size:25rpx;

				}
				.gray {
					color: #bfbfbf;
				} 
			}
			.row-m {
				width: 50%;
				.text {
					margin: 40upx 0 30upx 0;
					font-size: 32upx;
				}
				.gray {
					color: #bfbfbf;
				} 
				.time {
					color: #bfbfbf;
				}
			}
			.row-r {
				width: 25%;
				
				.btn {
					width:75%;
					padding: 0 10upx;
					background-color: #d71518;
					// height: 60upx;
					font-size: 24upx;
					margin-top: 60upx;
					color: #FFFFFF;
					margin-right: 20upx;
				}
				.used {
					width: 140upx;
					height: 140upx;
					float: right;
					image {
						width: 100%;
						height: 100%;
					}
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
		color:#ccc;
		line-height: 40upx;
	}
	 
	.top-menu-view .menu-one-view .menu-one .menu-one-bottom {
		position: absolute;
		bottom: 0;
		width: 100%;
		color:#ccc;
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
		color: #d71518;
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
		background: #d71518;
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
