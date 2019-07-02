<template>
	<view class="home">
		<!-- 状态栏 -->
		<!-- <view class="status" :style="{ position: headerPosition }"></view> -->
		<!-- 顶部导航栏 -->
		<naviGation></naviGation>
		<!-- 占位 -->
		<!-- <view class="place"></view> -->
		<!--	 局部选项卡 -->
	<!-- 	<view class="head">
			<view class="target" v-for="(target, index) in orderbyList" @tap="select(index)" :key="index" :class="[target.selected ? 'on' : '']">
				{{ target.text }}
				<view v-if="target.orderbyicon" class="icon" :class="target.orderbyicon[target.orderby]"></view>
			</view>
		</view> -->
		
		<view class="home-content">
			<!-- 轮播图 -->
			<view class="swiper">
				<view class="swiper-box">
					<swiper circular="true" autoplay="true" @change="swiperChange">
						<swiper-item v-for="swiper in lunbo" :key="swiper.id">
							<image :src="swiper.pic" @tap="toSwiper(swiper)"></image>
						</swiper-item>
					</swiper>
					<view class="indicator"><view class="dots" v-for="(swiper, index) in swiperList" :class="[currentSwiper >= index ? 'on' : '']" :key="index"></view></view>
				</view>
			</view>
			<!-- 分类列表 -->
			 <view class="uni-padding-wrap">
			    <view class="page-section swiper">
			        <view class="page-section-spacing">
			            <view class="fenlei-swiper">
			                <view v-for="(item, index) in classList" :key="index">
			                    <view class="swiper-item"  :key="index" >
			                    	<view class="category" v-for="(item2,index2) in item" :key="index2" @tap="toCategory(item2)">
			                    		<view class="img"><image :src="item2.icon ? item2.icon : '../../static/img/category/list/nanzhuang.jpg'"></image></view>
			                    		<view class="text">{{ item2.name }}</view>
			                    	</view>
									<view class="catego" @tap="goFenLei()">
										<view class="img"><image src="../../static/more.png"></image></view>
										<view class="text">更多</view>
									</view>
			                    </view>
								
			                </view>
							
			            </view>
			        </view>
			    </view>
			</view>
			<!-- 热销推荐 -->
			<view class="aqg">
				<text >热</text>
				<text style="margin-left:10upx">/</text>
				<text style="margin-left:10upx">销</text>
				<text style="margin-left:10upx">/</text>
				<text style="margin-left:10upx">商</text>
				<text style="margin-left:10upx">/</text>
				<text style="margin-left:10upx">品</text>
			</view>
			<view class="hot" v-for="(item, index) in hot" :key="index">
				<view class="popularity">
<!-- 					<text style="font-size: 32upx;color:#333">热销产品</text>
					<text style="font-size: 32upx;color:#ccc;text-align: right;">更多 ></text> -->
					<!-- <image :src="item.img" mode="" style="width: 100%;height: 280upx;margin-top: 30upx;"></image> -->
					<view class="commodity" v-for="itemone in hotcakes" :key="index" @tap="toGoods(itemone.id)">
						<view class="comm">
							<!-- <image :src="items.img" mode=""></image> -->
							<view class="tx1"><image :src="itemone.pic" mode="aspectFit"></image></view>
							<view class="tx3">{{ itemone.name}}</view>
							<view class="comm1">
								<view class="tx2">¥{{ itemone.originalPrice }}</view>
								<view class="tx4">月销量0</view>
								<!-- {{ itemone.sale }} -->
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 猜您喜欢 -->
			<view class="aqg" v-if="userInfo.id">
				<text >猜</text>
				<text style="margin-left:10upx">/</text>
				<text style="margin-left:10upx">您</text>
				<text style="margin-left:10upx">/</text>
				<text style="margin-left:10upx">喜</text>
				<text style="margin-left:10upx">/</text>
				<text style="margin-left:10upx">欢</text>
			</view>
			<view class="cailikelimited hot">
				<view class="cailikepopularity">
					<view class="cailiketime" v-for="(time, index) in cailike" :key="index" @tap="toGoods(time.id)">
						<image :src="time.pic" mode=""></image>
						<view class="cailikecomm">
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<text class="tx10">{{ time.name }}</text>
							</view>
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<text class="tx11">¥{{ time.price }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<cmd-curtain :visible="visible" mode="bottom" @close="closeHuoDong()">
				<view class="gxhead" v-for="(item,index) in tanchuang" :key="index">
					  <image mode="aspectFit" :src="item.img"></image>
					<view class="gongxi">{{item.txt1}}</view>
					<view class="qianwang">{{item.txt2}}</view>
					<view class="button" @tap="goCommunity()">立即领取</view>
				</view>
			</cmd-curtain>
		</view>
	</view>
</template>

<script>
import uniCountdown from '@/components/uni-countdown/uni-countdown.vue';
import naviGation from '@/components/naviGation.vue';
import cmdCurtain from "@/components/cmd-curtain/cmd-curtain.vue"
export default {
	components: {
		uniCountdown,
		naviGation,
		cmdCurtain
		
	},
	
	data() {
		return {
			tabCurrentIndex: 0,
			swiperCurrentIndex: 0,
			headerPosition: 'fixed',
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			commt: [{ txt: '雪山旗舰店入驻智采平台。' }],
			titleShowId: 'tabTag-0',
			currentSwiper: 0,
			area: [
				{
					img: '../../static/img/user.png'
				}
			],
			// 轮播图片
			swiperList: [
				{
					id: 1,
					src: 'url1',
					// img: '../../static/lunbo/lunbo1.jpg'
				},
				{
					id: 2,
					src: 'url2',
					// img: '../../static/lunbo/lunbo2.jpg'
				},
			],
			tanchuang:[
				{
					img:'../../static/zu3.png',
					txt1:'恭喜您获得10元立减券',
					txt2:'前往领券中心领取'
				}
			],
			// 分类菜单
			categoryList: [
				{
					id: 1,
				},
				{
					id: 2,
					// name: '屋',
					// img: '../../static/fenlei/phone.png'
				},
				{
					id: 3,
				},
				{
					id: 4,
				},
				{
					id: 5,
				},
				{
					id: 6,
				},
				{
					id: 7,
				},
				{
					id: 8,
				},
				{
					id: 9,
				},
				{
					id: 10,
				},
				
			],
			//分类2
				categoryListtwo: [
				
				{
					id: 1,
					
				},
				{
					id: 2,
					
				},
				{
					id: 3,
					
				},
				{
					id: 4,
					
				},
				{
					id: 5,
					
				},
				{
					id: 6,
					
				},
				{
					id: 7,
					
				},
				{
					id: 8,
				
				},
				{
					id: 9,
				
				},
				{
					id: 10,
				},
				
			],
			hot: [{ img: '../../static/lunbo/lunbo1.jpg' }],
			comm: [
			
			],
			time: [
				{ img: '../../static/lunbo/douleshu.jpg', txt1: '￥3.80', txt2: '5.5/袋' },
				{ img: '../../static/lunbo/leshi.jpg', txt1: '￥4.5', txt2: '5.5/袋' },
				{ img: '../../static/lunbo/douleshu.jpg', txt1: '￥7', txt2: '5.5/袋' }
			],
			lunbo:[
				
			],
			hotcakes:[
				
			],
			classification:[
				
			],
			cailike :[
			],
			Promotion: [],
			//猜你喜欢列表
			loadingText: '正在加载...',
			userInfo:{},
			visible:false
		};
	},
	computed:{
		classList(){
			let temp =[]
			let arr = []
			this.classification.map((item)=>{
				temp = temp.concat(item.sons)
			})
			while(1){
				if(temp.length){
					arr.push(temp.splice(0,7))
					break
				}else{
					break
				}
			}
			console.log(arr)
			return arr
		}
	},
	onPageScroll(e) {
		//兼容iOS端下拉时顶部漂移
		if (e.scrollTop >= 0) {
			this.headerPosition = 'fixed';
		} else {
			this.headerPosition = 'absolute';
		}
	},
	//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
	onPullDownRefresh() {
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	onReachBottom() {
		return;
		let len = this.productList.length;
		if (len >= 40) {
			this.loadingText = '到底了';
			return false;
		}
		// 演示,随机加入商品,生成环境请替换为ajax请求
		let end_goods_id = this.productList[len - 1].goods_id;
		for (let i = 1; i <= 10; i++) {
			let goods_id = end_goods_id + i;
			let p = {
				goods_id: goods_id,
				img: '../../static/img/goods/p' + (goods_id % 10 == 0 ? 10 : goods_id % 10) + '.jpg',
				name: '商品名称商品名称商品名称商品名称商品名称',
				price: '￥168',
				slogan: '1235人付款'
			};
			this.productList.push(p);
		}
	},
	onShow() {
		let _this = this;
		uni.getStorage({
			key: 'userInfo',
			success: (res)=>{
				_this.userInfo = res.data
				if(res.data&&res.data.id){
						//猜您喜欢
					_this.$ajax.get({
						url:`/goods/guessYouLike?pageSize=6&pageNumber=1&memberId=${this.userInfo.id}`,
					}).then(ress=>{
						_this.cailike = ress.data.data;
					});
				}else{
					//未到登录
						
				}
			},
			fail:function(err){
				//未到登录
			}
		});
		uni.getStorage({
			key:"huoDong",
			success:(res)=>{
				console.log(res)
			},
			fail: (err) => {
				this.visible = true
			}
		})
	},
   onLoad:function(){
	   uni.showLoading({
	   	mask:true
	   })
	   this.$ajax.postJSON({
		   url:"/home/selectBannerByType",
		   data:1
	   }).then(res=>{
		   this.lunbo = res.data.data;
	   });
		//热销商品
		this.$ajax.get({
			url:`/goods/selectGoodsByHot`,
			param:{
				pageSize:6,
				pageNum:1
			},
			
		}).then(res=>{
			uni.hideLoading()
			this.hotcakes = res.data.data;
		});
	
		//商品前排分类
			this.$ajax.get({
			url:`/home/selectFrontrowByCategory`,
		}).then(res=>{
			uni.hideLoading()
			this.classification=res.data.data;
		});
	},
	methods: {
	   goCommunity(){
		   uni.setStorage({
		   	key:"huoDong",
			data:1
		   })
		   uni.navigateTo({
		   	url:'community'
		   })
	   },
		select(index) {
			if (this.orderbyList[index].orderbyicon) {
				let type = this.orderbyList[index].orderby == 0;
				if (this.orderbyList[index].selected) {
					type = this.orderbyList[index].orderby == 0;
					this.orderbyList[index].orderby = this.orderbyList[index].orderby == 0 ? 1 : 0;
				}
			}
			this.orderbyList[index].selected = true;
			let len = this.orderbyList.length;
			for (let i = 0; i < len; i++) {
				if (i != index) {
					this.orderbyList[i].selected = false;
				}
			}
		},
		tabChange: function(e) {
			var index = e.target.id.replace('tabTag-', '');
			this.swiperCurrentIndex = index;
			this.tabCurrentIndex = index;
			this.titleShowId = 'tabTag-' + index;
		},
		swiperChange1: function(e) {
			var index = e.detail.current;
			this.tabCurrentIndex = index;
			this.titleShowId = 'tabTag-' + index;
		},
		//搜索跳转
		//vip跳转
		tovip(e) {
			uni.navigateTo({
				url:'../vip/vip?img=' + e.img,
			});
		},
		//轮播图跳转
		toSwiper(e) {
			uni.showToast({
				title: e.src,
				icon: 'none'
			});
		},
		//分类跳转
		toCategory(e) {
			console.log(e)
			uni.navigateTo({
				url: '../goods/goods-list?cid=' + e.id + '&name=' + e.name
			});
		},
		//推荐商品跳转
		toPromotion(e) {
			uni.showToast({
				title: e.title,
				icon: 'none'
			});
		},
		//热销跳转
		toGoods(index){
			console.log(index);
			uni.navigateTo({
				url:`/pages/goods/goods?id=${index}`
			})
		},
		//轮播图指示器
		swiperChange(event) {
			this.currentSwiper = event.detail.current;
		},
		//视频列表页
		goVideo() {
			uni.navigateTo({
				url: '../video/video'
			});
		},
		//视频播放页
		//消息列表页
		goMsg() {
			uni.navigateTo({
				url: '../msg/msg'
			});
		},
		goFenLei(){
			uni.switchTab({
				url:"category"
			})
		},
		//关闭活动
		closeHuoDong(){
			this.visible = false;
			uni.setStorage({
				key:"huoDong",
				data:1
			})
		},
		//获取用户信息
		getUserData() {
			//获取用户授权
			uni.getUserInfo({
				provider: 'weixin',
				success: function(res) {
					var loginData = res.userInfo;
					loginData.loginStatus = true;
					uni.setStorage({
						key: 'login',
						data: loginData,
						success: function(res) {
							console.log(res);
							uni.navigateBack({
								delta: 1
							});
						}
					});
				},
				fail: function(err) {
					console.log(err);
					uni.navigateTo({
						url: '../login/weixinLogin/weixinLogin'
					});
				}
			});
		}
	}
};
</script>
<style lang="scss">
body {
	background-color: #efefef;
}
@font-face {
	font-family: 'HMfont-home';
	src: url('data:application/x-font-woff2;charset=utf-8;base64,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')
		format('woff2');
}
.home{
	height: 100vh;
}
.icon {
	font-family: 'HMfont-home' !important;
	font-size: 60upx;
	font-style: normal;
	color: #000000;

	&.yuyin {
		&:before {
			content: '\e64e';
		}
	}

	&.tongzhi {
		&:before {
			content: '\e729';
		}
	}

	&.search {
		&:before {
			content: '\e628';
		}
	}

	&.location {
		&:before {
			content: '\e611';
		}
	}

	&.xia {
		&:before {
			content: '\e689';
		}
	}
	&.jt {
		&:before {
			content: '\e516';
		}
	}
}
.uni-padding-wrap {
	margin-top: 20upx;
}
.status {
	width: 100%;
	height: 0;
	position: fixed;
	z-index: 10;
	background-color: #fff;
	top: 0;
	/*  #ifdef  APP-PLUS  */
	height: var(--status-bar-height); //覆盖样式
	/*  #endif  */
}
.home-content{
	height: 100vh;
	overflow-y: auto;
}
.gxhead {
    text-align:center;
    image{
	width:440upx;
	height:440upx;
	}
	.button{
		width:271upx;
		height:76upx;
		border-radius: 50upx;
		position: absolute;
		top:320upx;
		left:169upx;
		line-height: 76upx;
		background-color: #FDC901;
		color:#FF2544;
	}
}
.gongxi{
	position: absolute;
	top:220upx;
    left:149upx;
	font-size: 30upx;
	color:#fff;
}
.qianwang{
	position: absolute;
	top:270upx;
    left:191upx;
	font-size: 26upx;
	color:#fff;
}
.place {
	background-color: #ffffff;
	height: 40upx;
	/*  #ifdef  APP-PLUS  */
	margin-top: var(--status-bar-height);
	/*  #endif  */
}
.fenlei-swiper{
	width:100%;
	// height:600rpx;
}
.swiper {
	width: 100%;
	// margin-top: 105upx;
	// display: flex;
	// flex-wrap: wrap;
	justify-content: center;
	// height: 300px;
	.swiper-box {
		width: 100%;
		border-radius: 15upx;
		box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.1);
		//兼容ios，微信小程序
		position: relative;
		z-index: 1;

		swiper {
			width: 100%;
			// height: 30.7vw;

			swiper-item {
				
				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.indicator {
			position: absolute;
			bottom: 20upx;
			left: 20upx;
			background-color: rgba(255, 255, 255, 0.4);
			width: 150upx;
			height: 5upx;
			border-radius: 3upx;
			overflow: hidden;
			display: flex;

			.dots {
				width: 100%;

				&.on {
					background-color: rgba(255, 255, 255, 1);
				}
			}
		}
	}
}

.swiper-item {
	width: 100%;
	background-color: #ffffff;
	padding: 0 0 60upx 0;
	border-bottom: solid 2upx #f6f6f6;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	height: inherit;
	.category,
	.catego {
		width: 25%;
		height:30%;
		margin-top: 50upx;
		display: flex;
		flex-wrap: wrap;

		.img {
			width: 100%;
			display: flex;
			justify-content: center;

			image {
				width: 9vw;
				height: 9vw;
			}
		}

		.text {
			margin-top: 16upx;
			width: 100%;
			display: flex;
			justify-content: center;
			font-size: 24upx;
			color: #3c3c3c;
		}
	}
	
}

.banner {
	width: 92%;
	margin: 40upx 4%;

	image {
		width: 100%;
		height: 100%;
		border-radius: 10vw;
		box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.3);
	}
}

.promotion {
	width: 92%;
	margin: 0 4%;

	.text {
		width: 100%;
		height: 60upx;
		font-size: 34upx;
		font-weight: 600;
		margin-top: -10upx;
	}

	.list {
		width: 100%;
		display: flex;
		justify-content: space-between;

		.column {
			width: 43%;
			padding: 15upx 3%;
			background-color: #ebf9f9;
			border-radius: 10upx;
			overflow: hidden;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.top {
				width: 100%;
				height: 40upx;
				display: flex;
				align-items: center;
				margin-bottom: 5upx;

				.title {
					font-size: 30upx;
				}

				.countdown {
					margin-left: 20upx;
					display: flex;
					height: 40upx;
					display: flex;
					align-items: center;
					font-size: 20upx;

					view {
						height: 30upx;
						background-color: #f06c7a;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #fff;
						border-radius: 4upx;
						margin: 0 4upx;
						padding: 0 2upx;
					}
				}
			}

			.left {
				width: 50%;
				height: 18.86vw;
				display: flex;
				flex-wrap: wrap;
				align-content: space-between;

				.ad {
					margin-top: 5upx;
					width: 100%;
					font-size: 22upx;
					color: #acb0b0;
				}

				.into {
					width: 100%;
					font-size: 24upx;
					color: #aaa;
					margin-bottom: 5upx;
				}
			}

			.right {
				width: 18.86vw;
				height: 18.86vw;

				image {
					width: 18.86vw;
					height: 18.86vw;
				}
			}
		}
	}
}

.zhuanjia-image {
	height: 62upx;
	width: 273upx;
	margin: 0 auto;
}

.goods-list {
	// background-color: #f4f4f4;
	.title {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80upx;
		color: #f47825;
		font-size: 30upx;
		margin-top: 10upx;

		image {
			height: 62upx;
			width: 273upx;
		}
	}

	.loading-text {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60upx;
		color: #979797;
		font-size: 24upx;
	}

	.product-list {
		width: 92%;
		padding: 0 4%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
}

.item {
	box-shadow: 1upx 0upx 1upx #cecece;
}

.grace-margin {
	background-color: var(--common-color);
}
.head {
	width: 100%;
	margin-top: 60upx;
	display: flex;
	justify-content: space-around;
	align-items: flex-end;
	// background-color: #4a2306;
	border-bottom: solid 1upx #eee;
	padding-bottom: 20upx;
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
		border-bottom: 6upx solid #ffffff;
		font-weight: 600;
		font-size: 24upx;
	}
}
.community {
	height: 100upx;
	display: flex;
	object-position: center;
	align-items: center;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	background-color: #efefef;
	padding: 40upx 0;
}
.community .text3 {
	padding: 0upx 20upx;
	height: 100upx;
	background-color: #ffffff;
	display: flex;
	align-items: center;
	box-shadow: #cecece 2upx 0upx 1upx;
}
.community text {
	margin-left: 0;
	font-size: 26upx;
	color: #ea7da7;
}
.community .txt1 {
	left: 188upx;
	top: 680upx;
	width: 460upx;
	height: 60upx;
	line-height: 60upx;
	color: rgba(102, 102, 102, 1);
	font-size: 26upx;
	text-align: left;
	font-family: PingFangSC-regular;
    margin-left:61upx;
}
.text3 .txt2{
	left: 312.5px;
	top: 350px;
	width: 1px;
	height: 10px;
	line-height: 20px;
	background-color: rgba(153, 153, 153, 1);
	text-align: center;

}
.text3 .txt3{
	left: 644upx;
	top: 680upx;
	width: 54upx;
	height: 60upx;
	line-height: 60upx;
	margin-left:10upx;
	color: rgba(51, 51, 51, 1);
	font-size: 26upx;
	text-align: center;
	font-family: PingFangSC-regular;

}
//爱青果
.aqg{
	left: 0upx;
	top: 1792upx;
	width: 750upx;
	height: 80upx;
	line-height: 80upx;
	color: #333;
	font-weight: 500;
	// color: rgba(255, 157, 87, 1);
	font-size: 32upx;
	text-align: center;
	font-family: PingFangSC-regular;

	}
.blackvip {
	display: flex;
	margin: 0 auto;
	width: 94%;
	height: 80upx;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	background-color: #383838;
	border-top-left-radius: 16upx;
	border-top-right-radius: 16upx;
}
.blackvip .box {
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fae5c5;
	margin: 0upx 20upx;
	font-size: 28upx;
}
.blackvip image {
	width: 40upx;
	height: 40upx;
	margin: 0upx 10upx;
}
.hot {
	padding: 28upx;
	background-color: #ffffff;
	// margin-bottom: 20upx;
	// margin-top:20upx;
}
.popularity {
	font-size: 26upx;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	text {
		width: 50%;
	}
}
.aqgpopularity {
	font-size: 26upx;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	
}
.cailikepopularity{
	font-size: 26upx;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
.commodity {
	width: 300upx;
	margin-top:20upx;
}
.comm {
	margin-top: 20upx;
	text-align: center;
}
.aqgcomm{
	width: 320upx;
	margin-top: 10upx;
}
.cailikecomm{
	width: 320upx;
	margin-top: 10upx;
}
.comm image {
	width: 210upx;
	height: 198upx;
}
.aqgcomm image{
	width: 160upx;
	height: 160upx;
}
.cailiketime image{
	width: 260upx;
	height: 260upx;
}
.cailiketime{
	width:336upx;
	}
.aqgcomm .tx9{
	font-size: 24upx;
	margin-top:5upx;
	color:#FF6060;
}

.comm .tx3 {
	font-size: 24upx;
	font-weight: 600;
	margin-top:10upx;
	text-align: left;
	padding-left: 40upx;
	color: #000000;
	overflow: hidden;
	text-overflow: ellipsis;
    white-space: nowrap;
}
.comm1 {
	display: flex;
}
.comm .tx2 {
	width: 50%;
	color: #d71518;
	// #cecece;
	font-size: 35upx;
	padding-left: 40upx;
	text-align: left;
	margin-top:10upx;
}
.comm .tx4 {
	width: 50%;
	font-size: 25upx;
	// padding-left: 40upx;
	margin-top:17upx;
	color: #cccccc;
}
.time {
	width: 210upx;
}
.aqgtime{
	width:310upx;
}
.cailiketime{
	width:310upx;
}
.limited .time image {
	width: 220upx;
	height: 220upx;
}
.time .tx5 {
	font-size: 20upx;
	text-decoration: line-through;
}
.tx6{
	left: 20upx;
	top: 1328upx;
	width: 130upx;
	height: 32upx;
	line-height: 32upx;
	color: rgba(77, 235, 235, 1);
	font-size: 32upx;
	text-align: left;
	font-family: PingFangSC-regular;

}
.tx6{
	left: 20upx;
	top: 1328upx;
	width: 130upx;
	height: 32upx;
	line-height: 32upx;
	color: rgba(77, 235, 235, 1);
	font-size: 32upx;
	text-align: left;
	font-family: PingFangSC-regular;

}
.tx10{
	font-size: 24upx;
	font-weight: 600;
	}
.tx11{
	font-size: 35upx;
	margin-top:30upx;
	color:#d71518;
}
.tx12{
	left: 20upx;
	top: 72upx;
	width: 160upx;
	height: 34upx;
	line-height: 34upx;
	color: #cccccc;
	font-size: 25upx;
	margin-top:-37rpx;
    margin-left:212rpx;
	font-family: PingFangSC-regular;

}
.dfx{
	padding-bottom: 30upx;
}
.dfx .commm image{
	width: 350upx;
	height: 350upx;
}
.dfx2 {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
}
.dfx image {
	width: 100%;
	height: 320upx;
}
.fx{
	position: fixed;
	bottom: 20upx;
	right: 10upx;
}
.fx image{
	width: 148upx;
	height: 142upx;
}
</style>
