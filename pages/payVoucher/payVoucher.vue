<template>
	<view style="background-color: #fff;height:520upx">
		<!-- <view class="item">
			<text>退款原因</text>
			<input v-model="body.title" @click="hideTabbar" @focus="hideTabbar" @blur="showTabbar" type="text" maxlength="11" placeholder="例如：商品不合适" value=""/>
		</view>
		<view class="items">
			<view class="ii">退款说明</view>
			<textarea v-model="body.content" @click="hideTabbar" @focus="hideTabbar" @blur="showTabbar" placeholder-style="color:#999999;" placeholder="请详细描述您遇到的问题"/>
		</view> -->
		<view class="grace-margin">
			<view class="grace-title" style="margin-top:20px;">请上传支付凭证</view>
			<view class="grace-file-list">
				<view class="add-btn" @tap="addImg" v-if="canAdd">
					<view>+</view>
					<view class="addPhoto" style="font-size:20upx;margin-top:34upx;">上传凭证</view>
				</view>
				<view class="items" v-for="(item, index) in imgLists" :key="index">
					<image :src="item" mode="widthFix" :data-imgurl="item" @tap="showImgs"></image>
					<view class="remove grace-icons icon-remove" @tap="removeImg" :id="'grace-items-img-'+index"></view>
				</view>
			</view>

		</view>
		<view class="btns" v-if="tabbar">
			<!-- <button class="btnleft" @tap="reset()" type="primary">重置</button> -->
			<button class="btnright" type="primary" @tap="send">提交</button>
		</view>
	</view>
</template>

<script>
	var maxNum = 9,
		_self;
	export default {
		data() {
			return {
				body: {
					title: '',
					userId: '',
					content: '',
				},
				imgLists: [],
				canAdd: true,
				tabbar: true,
				windowHeight: '',
				pic:[],
				isOrder:false

			}
		},
		onLoad(option) {
			this.xjId = option.id;
			if(option.isOrder == 1){
				this.isOrder = true
			}else{
				this.isOrder = false
			}
			_self = this;
			let _this = this;
			this.userInfo = this.$stronge.getStronge('userInfo');
			uni.getSystemInfo({
				success: (res) => {
					this.windowHeight = res.windowHeight;
				}
			});
			uni.onWindowResize((res) => {
				if (res.size.windowHeight < this.windowHeight) {
					this.tabbar = false
				} else {
					this.tabbar = true
				}
			})

		},
		methods: {
			//图片上传
			addImg: function() {
				let _this = this;
				var num = maxNum - _self.imgLists.length;
				if (num < 1) {
					return false;
				}
				uni.showLoading({
					title: ""
				});
				uni.chooseImage({
					count: num,
					sizeType: ['compressed'],
					success: function(res) {
						_self.imgLists = _self.imgLists.concat(res.tempFilePaths);
						console.log(_self.imgLists)
						if (_self.imgLists.length >= maxNum) {
							_self.canAdd = false;
						}
						uni.hideLoading();
						// const tempFilePaths = chooseImageRes.tempFilePaths;
						for (let i=0;i<=res.tempFilePaths.length;i++) {
							_this.$ajax.upImg({
								url:"/upload/fileUploadInTencent",
								imgUrl:res.tempFilePaths[i]
							}).then(res=>{
								let data = JSON.parse(res.data);
								_this.pic.push(data.data.url);
							})
						}
						
					},
					fail: function() {
						uni.hideLoading();
					}
				});

			},
			removeImg: function(e) {
				var index = e.currentTarget.id.replace('grace-items-img-', '');
				_self.imgLists.splice(index, 1);
				_self.pic.splice(index, 1);
				_self.imgLists = _self.imgLists;
				if (_self.imgLists.length < maxNum) {
					_self.canAdd = true;
				}
			},
			showImgs: function(e) {
				var currentImg = e.currentTarget.dataset.imgurl;
				uni.previewImage({
					urls: this.imgLists,
					current: currentImg
				})
			},
			//发送
			send() {
				if (!this.imgLists) {
					uni.showToast({
						title: '请上传凭证',
						icon: "none"
					});
					return false;
				}
				let _this = this;
				// _this.body=
				if(this.isOrder){
					//订单
					this.$ajax.postJSON({
						url: `/Inquiry/inquiryUpdatePayOrder`,
						data: {
							orderId: _this.xjId,
							payOrder: this.pic.join(",")
							// userId:_this.userInfo.id
						},
					}).then(res => {
						if (res.data.code == 200) {
							uni.showToast({
								title: "提交成功!"
							});
							setTimeout(function(){
									uni.navigateBack({
										delta: 1
									});
							},500)
							this.body = {
								title: '',
								content: ''
							}
						}
					});
				}else{
					//集采单
					this.$ajax.postJSON({
						url: `/Inquiry/inquiryUpdatePayOrder`,
						data: {
							inquiryId: _this.xjId,
							payOrder: this.pic
							// userId:_this.userInfo.id
						},
					}).then(res => {
						if (res.statusCode === 200) {
							uni.showToast({
								title: "提交成功!"
							});
							setTimeout(function(){
									uni.navigateBack({
										delta: 1
									});
							},500)
							this.body = {
								title: '',
								content: ''
							}
						}
					});
				}
				
			},
			reset() {
				this.body = {
					title: '',
					content: ''
				}
			},
			showTabbar() {
				this.tabbar = true;
			},
			hideTabbar() {
				this.tabbar = false;
			}
		},
	}
</script>

<style>
	.addPhoto {
		font-size: 28upx;
		height: 40upx;
		margin-top: 50upx;
		line-height: 40upx;
		text-align: center;
		color: #999999;
		width: 100%;

	}

	.grace-file-list .add-btn {
		width: 128upx;
		height: 128upx;
	}

	.grace-file-list .items image {
		width: 128upx;
		height: 128upx;
	}

	.grace-file-list .items {
		width: 128upx;
		height: 128upx;
	}

	.grace-file-list .add-btn view:first-child {
		font-size: 60upx !important;
	}

	.item {
		font-size: 32upx;
		color: #333333;
		padding: 30upx 20upx;
		border-top: 2upx solid #e6e6e6;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		background-color: #ffffff;
	}

	.item image {
		width: 12upx;
		height: 26upx;
	}

	.item input {
		text-align: right;
		color: #999999;
	}

	.ver {
		color: #999999;
	}

	.items {}

	.items .ii {
		padding: 30upx 20upx;
		font-size: 32upx;
		color: #333333;
	}

	.items>textarea {
		width: 100%;
		box-sizing: border-box;
		padding: 20upx;
		font-size: 32upx;
		background-color: #ffffff;
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

	.btns>button {
		width: 100%;
		height: 100%;
		text-align: center;
		line-height: 110upx;
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
