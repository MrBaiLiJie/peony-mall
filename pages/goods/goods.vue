<template>
	<view v-if="rxdata">
		<view class="status" :style="{ opacity: afterHeaderOpacity }"></view>
		<!-- 底部菜单 -->
		<view class="footer">
			<view class="gwc" @tap="shoucang" :key="index"> 
				<image v-show="!shoucangShow" src="../../static/img/shoucang1.png" mode=""></image>
				<image v-show="shoucangShow" src="../../static/img/shoucang2.png" mode=""></image>
				<view class="gwctxt">收藏</view>
			</view>
			<view class="gwc" @tap="jicai" v-if="userInfo && userInfo.ifCoupon">
				<image src="../../static/img/xian.png" mode=""></image>
				<view class="gwctxt">加入集采单</view>
			</view>
			<view class="btn">
				<view class="joinCart" @tap="joinCart(rxdata,id)">加入购物车</view>
				<view class="buy" @tap="buy">立即购买</view>
			</view>
		</view>
		<!-- 服务-模态层弹窗 -->
		<view class="popup service" :class="serviceClass" @touchmove.stop.prevent="discard" @tap="hideService">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="content">
					<view class="row" v-for="(item, index) in goodsData.service" :key="index">
						<view class="title">{{ item.name }}</view>
						<view class="description">{{ item.description }}</view>
					</view>
				</view>
				<view class="btn">
					<view class="button" @tap="hideService">完成</view>
				</view>
			</view>
		</view>
		<!-- 规格-模态层弹窗 -->
		<!-- 商品主图轮播 -->
		<view class="swiper-box">
			<image @tap="bigImg(sku.pic || rxdata.pic)" :src="sku.pic || rxdata.pic" mode="aspectFit"></image>
		</view>
		<view class="info-box goods-info">
			<view class="info-box2">
				<view class="ypi">
					<view class="price">￥{{sku.price||rxdata.price}}</view>
				</view>
			</view>
			<view class="info-box3">
				<view class="txt1">{{ rxdata.name }}</view>
				<view class="txt2">{{ rxdata.subTitle }}</view>
			</view>
		</view>
		<!-- 服务-规则选择 -->
		<view class="info-box spec">
			<view class="row" @tap="showService">
				<view class="content">
					<view class="serviceitem" v-for="(item, index) in goodsData.service" :key="index">
						<image :src="item.img" mode="" class="itemimg"></image>
						{{ item.name }}
						<view class="txt">{{ item.txt }}</view>
					</view>
				</view>
				<view class="arrow">
					<view class="icon xiangyou"></view>
				</view>
			</view>
			<view style="height: 20px;width: 100%;"></view>
			<view class="row" @tap="showSpec(false)">
				<view class="text">选择</view>
				<view class="content">
					<view>选择规格：</view>
					<view class="sp">
						<view v-for="(item,index) in selectFilter" :key="index" :class="[index==selectSpec?'on':'']">{{item}}</view>
					</view>
				</view>
				<view class="arrow">
					<view class="icon xiangyou"></view>
				</view>
			</view>
		</view>
		<!-- 评价 -->
		<view class="info-box comments" id="comments">
			<view class="row">
				<view class="text">商品评价</view>
				<view class="arrow">
					<view class="show" @tap="showComments(productId)" v-if="comments.length > 0">
						查看全部
						<view class="icon xiangyou"></view>
					</view>
				</view>
			</view>
			<!-- 评论 -->
			<view class="comment">
				<view class="user-info" v-if="comments.length > 0">
					<view class="face">
						<image :src="comments[0].umsIcot? comments[0].umsIcot : '../../static/img/category/list/nanzhuang.jpg'"></image>
						<view style="margin-left: 20upx;" class="">
							<view class="username">{{comments[0].userName}}</view>
							<view id="paragraph" class="paragraph" style="color:#ccc;font-size:25upx;margin-top: 5upx;">{{comments[0].createdAt}}</view>
						</view>
						<uni-rate :class="uni-rate" style="margin-left: 60upx;" disabled="true" size="17" :value="comments[0].star"></uni-rate>
					</view>

					<view class="content">
						{{comments[0].commit}}
					</view>
					<!-- 星星-->

				</view>
				<!-- 如果没有评论显示 -->
				<view class="com" v-if="comments.length == 0">
					该商品暂无评价
				</view>
			</view>
		</view>
		<!-- 详情 -->
		<view class="description">
			<view class="head">
				<view class="target" v-for="(target, index) in orderbyList" @tap="select(index)" :key="index" :class="[target.selected ? 'on' : '']">
					{{ target.text }}
					<view v-if="target.orderbyicon" class="icon" :class="target.orderbyicon[target.orderby]"></view>
				</view>
			</view>
			<view class="content">
				<img :src="rxdata.detailHtml" alt="">
				<rich-text :nodes="detail"></rich-text>
			</view>
		</view>
		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="discard" @tap="hideSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="content">
					<view class="title">选择规格：</view>
					<view v-for="(item,index) in filterList" :key="index">
						<view class="other">
							<view class="other-l">{{item.name}}</view>
							<view class="other-r" :class="{'other-active':item.current === idx}" v-for="(eve,idx) in item.list" :key="idx"
							 @click="setCurrent(index,idx)" v-if="index ? currentId[index-1] == eve.parentId : true">{{eve.value}}</view>
						</view>
					</view>
					<view class="length">
						<view class="text">数量</view>
						<view class="number">
							<view class="sub" @tap.stop="sub">
								<view class="icon jian"></view>
							</view>
							<view class="input" @tap.stop="discard">
								<input type="number" v-model="number" />
							</view>
							<view class="add" @tap.stop="add">
								<view class="icon jia"></view>
							</view>
						</view>
					</view>
				</view>
				<view class="btn">
					<view class="button" @tap="hideSpec">完成</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	export default {
		components: {
			uniRate
		},
		data() {
			return {
				orderbyList: [{
						text: '商品介绍',
						selected: true,
						orderbyicon: false,
						orderby: 0
					},
					{
						text: '规格参数',
						selected: false,
						orderbyicon: false,
						orderby: 0
					}
				],
				productsId: 0,
				items: ['已完成', '已拒绝', '已取消'],
				current: 0,
				productId: 0,
				comments: [],
				number: 1,
				//控制渐变标题栏的参数
				beforeHeaderzIndex: 11, //层级
				afterHeaderzIndex: 10, //层级
				beforeHeaderOpacity: 1, //不透明度
				afterHeaderOpacity: 0, //不透明度
				//是否显示返回按钮
				// #ifndef MP
				showBack: true,
				// #endif
				//轮播主图数据
				swiperList: [{
						id: 1,
						img: 'https://s2.ax1x.com/2019/03/28/AdOfUJ.jpg'
					},
					{
						id: 2,
						img: 'https://s2.ax1x.com/2019/03/28/AdOWE4.jpg'
					},
					{
						id: 3,
						img: 'https://s2.ax1x.com/2019/03/28/AdO2bF.jpg'
					},
					{
						id: 4,
						img: 'https://s2.ax1x.com/2019/03/28/AdOh59.jpg'
					}
				],
				//热销产品数据
				rxdata: {},
				//轮播图下标
				currentSwiper: 0,
				anchorlist: [], //导航条锚点
				selectAnchor: 0, //选中锚点
				serviceClass: '', //服务弹窗css类，控制开关动画
				specClass: '', //规格弹窗css类，控制开关动画
				// 商品信息
				goodsData: {
					id: 1,
					// yjd: '￥',
					name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
					price: '127.00',
					number: 1,
					delprice: '9999.00',
					management: '自营',
					mtxt: '口碑爆棚常断货，口碑爆棚常断货',
					service: [{
							name: '正品保证',
							img: '../../static/img/duigou.png',
							description: '此商品官方保证为正品'
						},
						{
							name: '极速退款',
							img: '../../static/img/duigou.png',
							description: '此商品享受退货极速退款服务'
						},
						{
							name: '7天退换',
							img: '../../static/img/duigou.png',
							description: '此商品享受7天无理由退换服务'
						},
						{
							txt: '保税仓发货*单件包邮*包税*不支持无理由退换'
						}
					],
					shop: [{
						img: '../../static/log.png',
						name: '智采网自营旗舰店',
						management: '自营',
						txt: '全球直采，100%正品保障'
					}],
					spec: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
					comment: {
						number: 1,
						userface: '../../static/img/face.jpg',
						username: '大黑哥',
						content: '很不错，之前买了很多次了，很好看，能放很久，和图片色差不大，值得购买！'
					}
				},
				selectSpec: null, //选中规格
				isKeep: false, //收藏
				userInfo: {},
				shoucangShow: false,
				filterList: [],
				selectFilter: [],
				skuIsChoose: false,
				isGouMai: false, //是否立即购买
				isJiaGou: false, //是否加入购物车
				isJiCai: false, //是否加入集采单
			};
		},
		computed: {
			currentId() {
				let temp = []
				this.filterList.map((item, index) => {
					temp.push(item.list[item.current].id)
				})
				return temp
			},
			sku() {
				if (this.filterList.length) {
					let index = this.filterList.length - 1
					let current = this.filterList[index].current
					return this.filterList[index].list[current]
				} else {
					return {
						price: null
					}
				}
			}
		},
		onLoad(option) {
			let _this = this;
			// #ifdef MP
			//小程序隐藏返回按钮
			this.showBack = false;
			// #endif
			//option为object类型，会序列化上个页面传递的参数
			this.productId = option.id;
			//获取商品信息
			_this.getGoodsData();
			//获取评论
			_this.getCommentsData();
			uni.getStorage({
				key: "userInfo",
				success: function(res) {
					_this.userInfo = res.data;
				}
			})
		},
		onReady() {
			this.calcAnchor(); //计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		// onReachBottom() {
		// 	uni.showToast({
		// 		title: '触发上拉加载'
		// 	});
		// },
		mounted() {},
		methods: {
			select(index) {
				this.orderbyList[index].selected = true;
				let len = this.orderbyList.length;
				for (let i = 0; i < len; i++) {
					if (i != index) {
						this.orderbyList[i].selected = false;
					}
				}
			},
			//查看大图
			bigImg(url){
				var urls = [];
				urls.push(url)
				uni.previewImage({
					current:0,
					urls:urls
				})
			},
			getGoodsData() {
				uni.showLoading({
					title: "加载中..."
				})
				this.$ajax.get({
					url: `/goods/select/${this.productId}`
				}).then(res => {
					uni.hideLoading();
					this.rxdata = res.data.data;
					if(this.rxdata.isLike == 1){
						this.shoucangShow = true
					}else{
						this.shoucangShow = false
					}
					this.filterList = this.pidFilter(this.rxdata.pmsProductAttributeList);
				})
			},
			getCommentsData() {
				this.$ajax.get({
					url: `/newOrder/selectCommitByGoodsId`,
					param: {
						productId: this.productId,
						pageNum: 1,
						pageSize: 1
					}
				}).then(res => {
					if (res.data.data) {
						this.comments = res.data.data
					} else {
						this.comments = []
					}
				})
			},
			setCurrent(index, idx) {
				this.filterList[index].current = idx;
			},
			pidFilter(list) {
				let lists = {}
				let arr = []
				list.map((item) => {
					if (!lists[item.attributeName]) {
						lists[item.attributeName] = {
							list: []
						}
					}
					lists[item.attributeName].name = item.attributeName
					lists[item.attributeName].current = 0
					lists[item.attributeName].list.push(item)
				})
				for (let i in lists) {
					arr.push(lists[i])
				}
				return arr
			},
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			},
			//轮播图指示器
			swiperChange(event) {
				this.currentSwiper = event.detail.current;
			},
			// 加入购物车
			joinCart() {
				if (!this.userInfo || !this.userInfo.id) {
					uni.navigateTo({
						url: "../login/login"
					})
					return;
				}
				if (!this.skuIsChoose) {
					this.showSpec();
					this.isJiaGou = true;
					return;
				}
				this.$ajax.postJSON({
					url: "/cart/add?memid=" + this.userInfo.id,
					data: {
						memberId: this.userInfo.id,
						memberNickname: this.rxdata.name,
						price: this.rxdata.price,
						productCategoryId: this.rxdata.productCategoryId,
						productId: this.rxdata.id,
						productName: this.rxdata.name,
						productPic: this.rxdata.pic,
						productSkuId: this.sku.id,
						productSn: this.rxdata.productSn,
						productSubTitle: this.rxdata.subTitle,
						quantity: this.number
					}
				}).then(res => {
					this.isJiaGou = false;
					uni.showToast({
						title: '已加入购物车'
					});
				})
			},
			//立即购买
			buy() {
				if (!this.userInfo || !this.userInfo.id) {
					uni.navigateTo({
						url: "../login/login"
					})
					return;
				}
				if (!this.skuIsChoose) {
					this.showSpec();
					this.isGouMai = true;
					return;
				}
				var productId = this.productId;
				let goodsDatas = [{
					pmsProduct: this.rxdata,
					sku: this.sku,
					quantity: this.number
				}]
				this.isGouMai = false;
				uni.setStorage({
					key: "buylist",
					data: goodsDatas,
					success: (res) => {
						uni.navigateTo({
							url: "../order/confirmation"
						})
					}
				})
			},
			//跳转评论列表
			showComments(productId) {
				var productId = this.productId;
				console.log(productId)
				uni.navigateTo({
					url: `../pingjiaList/list/pages/index/index?id=${productId}`
				})

			},
			//选择规格
			setSelectSpec(index) {
				this.selectSpec = index;
			},
			//减少数量
			sub() {
				if (this.number <= 1) {
					return;
				}
				this.number--;
			},
			//增加数量
			add() {
				this.number++;
			},
			//跳转锚点
			//计算锚点高度
			calcAnchor() {
				this.anchorlist = [{
						name: '主图'
					},
					{
						name: '评价'
					},
					{
						name: '详情'
					}
				];
				let commentsView = uni.createSelectorQuery().select('#comments');
			},
			//返回上一页
			back() {
				uni.navigateBack();
			},
			//服务弹窗
			showService() {
				this.serviceClass = 'show';
			},
			//关闭服务弹窗
			hideService() {
				this.serviceClass = 'hide';
				setTimeout(() => {
					this.serviceClass = 'none';
				}, 250);
			},
			//规格弹窗
			showSpec(fun) {
				this.specClass = 'show';
			},
			specCallback() {
				return;
			},
			//关闭规格弹窗
			hideSpec() {
				this.specClass = 'hide';
				//回调
				this.specCallback && this.specCallback();
				this.specCallback = false;
				setTimeout(() => {
					this.specClass = 'none';
				}, 250);
				this.selectFilter = [];
				for (let i = 0; i < this.filterList.length; i++) {
					this.selectFilter.push(this.filterList[i].list[this.filterList[i].current].value);
				}
				if (this.selectFilter.length > 0) {
					this.skuIsChoose = true;
				}
				if (this.isJiaGou) {
					this.joinCart();
				}
				if (this.isGouMai) {
					this.buy();
				}
				if (this.isJiCai) {
					this.jicai();
				}
			},
			discard() {
				//丢弃
			},
			shoucang: function() {
				if(this.rxdata.isLike == 1){
					this.$ajax.postJSON({
						url:`/UserFocus/deleteUser`,
						data:{
							userId:this.userInfo.id,
							productId:parseInt(this.productId)
						}
					}).then(res=>{
						uni.showToast({title: '取消成功',icon:"success"});
						this.shoucangShow = false;
					});
				}else{
					if (!this.userInfo || !this.userInfo.id) {
						uni.navigateTo({
							url: "../login/login"
						})
						return;
					}
					let _this = this;
					_this.$ajax.postJSON({
						url: "/UserFocus/insertUser",
						data: {
							productId:parseInt(this.productId),
							userId: this.userInfo.id
						}
					}).then(res => {
						uni.showToast({
							title: '收藏成功',
							icon: "success"
						});
						this.shoucangShow = true;
					}).catch(err => {
						uni.showToast({
							title: '收藏失败',
							icon: "none"
						});
					})
				}
			},
			//加入集采单
			jicai: function() {
				if (!this.skuIsChoose) {
					this.showSpec();
					this.isJiCai = true;
					return;
				}
				this.$ajax.postJSON({
					url: "/Group/add",
					data: {
						memberId: this.userInfo.id,
						memberNickname: this.userInfo.nickname,
						price: this.sku.price,
						productBrand: this.rxdata.brandName,
						productCategoryId: this.rxdata.productCategoryId,
						productId: this.rxdata.id,
						productName: this.rxdata.name,
						productPic: this.rxdata.pic,
						productSkuId: this.sku.id,
						productSn: this.rxdata.productSn,
						productSubTitle: this.rxdata.subTitle,
						quantity: this.number
					}
				}).then((res) => {
					this.isJiCai = false;
					if (res.data.code == 200) {
						uni.showToast({
							title: "添加成功"
						})
					} else {
						uni.showToast({
							title: "添加集采单失败",
							icon: "none"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
	}

	@font-face {
		font-family: 'HMfont-home';
		src: url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2');
	}

	.head {
		width: 92%;
		padding: 0 4%;
		height: 90upx;
		display: flex;
		justify-content: space-around;
		align-items: flex-end;
		background-color: #fff;
		border-bottom: solid 1upx #eee;
	}

	.target {
		width: 20%;
		height: 60upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		margin-bottom: -2upx;
		color: #cccccc;

		&.on {
			// color: #17e6a1;
			color: #555;
			border-bottom: 4upx solid #d71518;
			font-weight: 600;
			font-size: 30upx;
		}
	}

	.icon {
		font-family: 'HMfont-home' !important;
		font-size: 26upx;
		font-style: normal;

		&.fenxiang {
			&:before {
				content: '\e642';
			}
		}

		&.xiangqian {
			&:before {
				content: '\e634';
			}
		}

		&.xiangyou {
			&:before {
				content: '\e637';
			}
		}

		&.shoucangsel {
			&:before {
				content: '\e62c';
			}
		}

		&.shoucang {
			&:before {
				content: '\e62e';
			}
		}

		&.tongzhi {
			&:before {
				content: '\e729';
			}
		}

		&.kefu {
			&:before {
				content: '\e61e';
			}
		}

		&.cart {
			&:before {
				content: '\e614';
			}
		}

		&.jia {
			&:before {
				content: '\e641';
			}
		}

		&.jian {
			&:before {
				content: '\e643';
			}
		}
	}

	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		/*  #endif  */
		background-color: #f1f1f1;
	}

	.header {
		width: 100%;

		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);

		/*  #endif  */
		.before,
		.after {
			width: 92%;
			padding: 0 4%;
			height: 100upx;
			display: flex;
			align-items: center;
			position: fixed;
			top: 0;
			/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);
			/*  #endif  */

			.back {
				width: 120upx;
				height: 60upx;
				flex-shrink: 0;

				.icon {
					margin-left: -10%;
					width: 60upx;
					height: 60upx;
					display: flex;
					align-items: center;
					font-size: 42upx;
				}
			}

			.middle {
				width: 100%;
			}

			.icon-btn {
				width: 120upx;
				height: 60upx;
				flex-shrink: 0;
				display: flex;

				.icon {
					width: 60upx;
					height: 60upx;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					font-size: 42upx;
				}
			}
		}

		.before {
			.back {
				.icon {
					color: #fff;
				}
			}

			.icon-btn {
				.icon {
					color: #fff;
				}
			}
		}

		.after {
			background-color: #f1f1f1;

			.back {
				.icon {
					color: #666;
				}
			}

			.icon-btn {
				.icon {
					color: #666;
				}
			}

			.middle {
				font-size: 32upx;
				height: 90upx;
				display: flex;
				justify-content: center;
				align-items: center;

				view {
					padding: 0 3%;
					margin: 0 3%;
					display: flex;
					justify-content: center;
					align-items: center;

					&.on {
						margin-bottom: -4upx;
						color: #f47952;
						border-bottom: solid 4upx #f47952;
					}
				}
			}
		}
	}

	.swiper-box {
		width: 100%;
		text-align: center;
		// height: 100vw;

		swiper {
			width: 100%;
			height: 100vw;

			swiper-item {
				image {
					width: 100%;
					height: 100vw;
				}
			}
		}
	}

	.swiper-box image {
		width: 100%;
	}

	.info-box {
		width: 92%;
		padding: 30upx 4%;
		background-color: #fff;
		// height:200upx;
		// margin-bottom: 20upx;
	}

	.info-box2 {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		margin-bottom: 30upx;
	}

	.gwctxt {
		line-height: 1em;
		font-size: 22upx;
		color: #8a8a8a;
	}

	.info-box3 {
		width: 100%;
		height: 100%;
		// background-color:#333;
	}

	.info-box3 .txt1 {
		font-size: 30upx;
		padding: 2upx 4upx;
		margin: 0upx 10upx;
	}

	.txt2 {
		font-size: 30upx;
		padding: 2upx 4upx;
		margin: 0upx 10upx;
	}

	.goods-info {
		.price {
			font-size: 42upx;
			color: #d71518;
			margin-left: 20upx;
		}

		.title {
			font-size: 30upx;
		}
	}

	.spec {
		.row {
			width: 100%;
			display: flex;
			align-items: center;

			.text {
				font-size: 24upx;
				color: #a2a2a2;
				margin-right: 20upx;
			}

			.content {
				font-size: 24upx;
				display: flex;
				flex-wrap: wrap;

				.serviceitem {
					margin-right: 10upx;
				}

				.txt {
					font-size: 24upx;
					color: #cccccc;
				}

				.sp {
					width: 100%;
					display: flex;

					view {
						background-color: #f6f6f6;
						padding: 5upx 10upx;
						color: #999;
						margin-right: 10upx;
						font-size: 20upx;
						border-radius: 5upx;

						&.on {
							border: solid 1upx #f47952;
							padding: 4upx 8upx;
						}
					}
				}
			}

			.arrow {
				position: absolute;
				right: 4%;

				.icon {
					color: #ccc;
				}
			}
		}
	}

	.comments {
		.row {
			width: 100%;
			height: 40upx;
			display: flex;
			align-items: center;
			margin: 0 0 30upx 0;

			.text {
				font-size: 24upx;
			}

			.arrow {
				font-size: 28upx;
				position: absolute;
				right: 4%;
				color: #17e6a1;

				.show {
					display: flex;
					align-items: center;
					font-size: 24upx;

					.icon {
						color: #ccc;
					}
				}
			}
		}

		.comment {
			width: 100%;

			.com {
				text-align: center;
			}

			.user-info {
				width: 100%;
				// height: 40upx;
				// display: flex;
				align-items: center;
				justify-content: flex-start;

				.face {
					width: 100%;
					height: 80upx;
					// margin-right: 8upx;
					display: flex;
					align-items: center;

					image {
						width: 80upx;
						height: 100%;
						border-radius: 100%;
						// float:left;
					}
				}

				.username {
					// position: relative;
					bottom: 92upx;
					// color: #0A98D5;
					font-size: 24upx;
					// color: #cccccc;
					left: 106upx;
					// float:left;
				}

				.content {
					// position: relative;
					// right: 170upx;
					// top: 16upx;
					font-size: 26upx;
					margin-left:100upx;
				}
			}

			.content {
				margin-top: 8upx;
				margin-left: 62upx;
				font-size: 26upx;
			}
		}
	}

	.uni-rate {
		// position: relative;
		bottom: 126upx;
		left: 313upx;

		// margin-top: 6upx;
		// margin-left: 57upx;
		// float:left;
	}

	.description {
		.title {
			width: 100%;
			height: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: #999;
		}
	}

	.footer {
		position: fixed;
		bottom: 0upx;
		width: 100%;
		background-color: #fff;
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.icons {
			display: flex;
			height: 80upx;
			margin-left: -4%;

			.box {
				width: 80upx;
				height: 80upx;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;

				.icon {
					font-size: 40upx;
					color: #828282;
				}

				.text {
					display: flex;
					justify-content: center;
					width: 100%;
					font-size: 22upx;
					color: #666;
				}
			}
		}

		.btn {
			height: 90upx;
			overflow: hidden;
			display: flex;
			// margin-right: -2%;

			.joinCart,
			.buy {
				height: 100%;
				font-weight: 600;
				width: 250upx;
				color: #fff;
				line-height: 90upx;
				// justify-items: center;
				// align-items: center;
				font-size: 30upx;
			}

			.joinCart {
				line-height: 90upx;
				text-align: center;
				background-color: #ffd867;
				// border: 1upx solid #d71518;
				// color: #d71518;
				border-radius: 55upx 0 0 55upx;
				// background-color: #ce4f78;
			}

			.buy {
				text-align: center;
				line-height: 90upx;
				background-color: #d71518;
				border-radius: 0 55upx 55upx 0;
			}
		}
	}

	.popup {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 20;
		display: none;

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 21;
			background-color: rgba(0, 0, 0, 0.6);
		}

		.layer {
			position: fixed;
			z-index: 22;
			bottom: -70%;
			width: 92%;
			padding: 0 4%;
			height: 70%;
			border-radius: 20upx 20upx 0 0;
			background-color: #fff;
			display: flex;
			flex-wrap: wrap;
			align-content: space-between;

			.content {
				width: 100%;
				padding: 20upx 0;
			}

			.btn {
				width: 100%;
				height: 100upx;

				.button {
					width: 100%;
					height: 80upx;
					border-radius: 40upx;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #d71518;
					font-size: 28upx;
				}
			}
		}

		@keyframes showPopup {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		@keyframes hidePopup {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		@keyframes showLayer {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(-100%);
			}
		}

		@keyframes hideLayer {
			0% {
				transform: translateY(-100%);
			}

			100% {
				transform: translateY(0);
			}
		}

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.25s linear both;
			}

			.layer {
				animation: showLayer 0.25s linear both;
			}
		}

		&.hide {
			display: block;

			.mask {
				animation: hidePopup 0.25s linear both;
			}

			.layer {
				animation: hideLayer 0.25s linear both;
			}
		}

		&.none {
			display: none;
		}

		&.service {
			.row {
				margin: 30upx 0;

				.title {
					font-size: 30upx;
					margin: 10upx 0;
				}

				.description {
					font-size: 28upx;
					color: #999;
				}
			}
		}

		&.spec {
			.title {
				font-size: 30upx;
				margin: 30upx 0;
			}

			.sp {
				display: flex;

				view {
					font-size: 28upx;
					padding: 5upx 20upx;
					border-radius: 8upx;
					margin: 0 30upx 20upx 0;
					background-color: #f6f6f6;

					&.on {
						padding: 3upx 18upx;
						border: solid 1upx #f47925;
					}
				}
			}

			.length {
				margin-top: 30upx;
				border-top: solid 1upx #aaa;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 20upx;

				.text {
					font-size: 30upx;
				}

				.number {
					display: flex;
					justify-content: center;
					align-items: center;

					.input {
						width: 80upx;
						height: 60upx;
						margin: 0 10upx;
						background-color: #f3f3f3;
						display: flex;
						justify-content: center;
						align-items: center;
						text-align: center;

						input {
							width: 80upx;
							height: 60upx;
							display: flex;
							justify-content: center;
							align-items: center;
							text-align: center;
							font-size: 26upx;
						}
					}

					.sub,
					.add {
						width: 60upx;
						height: 60upx;
						background-color: #f3f3f3;
						border-radius: 5upx;

						.icon {
							font-size: 30upx;
							width: 60upx;
							height: 60upx;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}
				}
			}
		}
	}

	.ypi {
		display: flex;
		align-items: center;
	}

	.yjd {
		font-size: 20upx;
		padding: 4upx 8upx;
		border-radius: 20%;
		color: #fff;
		background-color: #4a2306;
	}

	.gwc {
		width: 110upx;
		text-align: center;
	}

	.delypi {
		font-size: 27upx;
		margin-left: 30upx;
		text-decoration: line-through;
		color: #ccc;
	}

	.gwc image {
		width: 50upx;
		height: 50upx;
	}

	.itemimg {
		margin-right: 10upx;
		width: 22upx;
		height: 22upx;
	}

	.shop {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
	}

	.shop .txt1 {
		font-size: 20upx;
		border-radius: 6upx;
		color: #9f7556;
		border: 1upx solid #9f7556;
		padding: 2upx 4upx;
		margin: 0upx 10upx;
	}

	.shop .txt {
		margin-top: 10upx;
	}

	.shop image {
		width: 110upx;
		height: 110upx;
		border-radius: 6upx;
	}

	.other {
		display: flex;
		align-items: center;
		font-size: 14px;
		margin-top: 18px;

		.other-l {
			margin-right: 24px;
		}

		.other-r {
			padding: 10px;
			color: #a5aeb7;
			box-shadow: 0 0 0 2px #a5aeb7;
			margin-left: 10px;
		}

		.other-active {
			box-shadow: 0 0 0 2px red;
			color: red;
		}

		.address {
			margin-right: 15px;
		}

		.last {
			color: #a5aeb7;
			margin-left: 10px;

			.tag {
				color: #3cc696;
			}
		}
	}

	.uni-rate {
		margin-left: 100upx;
		margin-top: -40upx;
	}
</style>
