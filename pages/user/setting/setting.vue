<template>
	<view>
		<view class="content">
			<view class="list">
				<!-- <view class="row" @tap="chooseImage()">
					<view class="title">头像</view>
					<view class="right"><view class="tis">
					<image :src="headPortrait" mode="widthFix"></image>
					</view><view class="icon jiantou"></view></view>
				</view> -->
				<view class="row" @tap="goUpdateUser()">
					<view class="title">修改信息</view>
					<view class="right"><view class="tis"></view><view class="icon jiantou"></view></view>
				</view>
				<view class="row" @tap="goUpdatePwd()">
					<view class="title">修改密码</view>
					<view class="right"><view class="icon jiantou"></view></view>
				</view>
				<!-- <view class="row" @tap="goAddress()">
					<view class="title">收货地址</view>
					<view class="right"><view class="tis"></view><view class="icon jiantou"></view></view>
				</view> -->
			</view>
			<view class="list">
			<!-- #ifdef APP-PLUS -->
				<view class="row"  @tap="checkUpdate()">
					<view class="title">版本升级</view>
					<view class="right"><view class="tis">v1.0.0</view><view class="icon jiantou"></view></view>
				</view>
			<!-- #endif -->
				<view class="row" @tap="clearHc()">
					<view class="title">清除缓存</view>
					<view class="right"><view class="tis"></view><view class="icon jiantou"></view></view>
				</view>
				<!-- <view class="row" @tap="goComplaints()">
					<view class="title">我的反馈</view>
					<view class="right"><view class="tis"></view><view class="icon jiantou"></view></view>
				</view> -->
				<view class="row">
					<view class="title">关于商城</view>
					<view class="right"><view class="tis"></view><view class="icon jiantou"></view></view>
				</view>
			</view>
		</view>
		<view class="upload-jindu" v-show="downloadProgressShow">
		    <view class="jindu-content">
		        <view class="jindu-tiao">
		            <text>0%</text>
		            <view class="tiao-div">
		                <view class="tiao-tiao" :style="{width:downloadProgress + '%'}"></view>
		            </view>
		            <text>100%</text>
		        </view>
		        <text>下载进度：{{ downloadProgress }}%</text>
		    </view>
		</view>
		<view style="padding:22upx 0;">
			<button style="width:100%;height:100upx;border-radius:0upx; line-height:100upx;margin-top: 30upx;background-color: #d71518;font-size: 30upx;color:#fff"
			@tap="exit()">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: '正在加载', // 主标题显示版本号
				Minfo: '未知', // 副标题显示版本类型
				Mtip: '', // 小提示标语
				updateInfo: '无', // 更新摘要
				latest: null, // 版本信息
				packgeSize: null, // 更新包大小
				packgePath: null, // 更新包的文件地址
				downloadTask: null, // 下载任务
				downloadProgress: 0, // 下载进度
				downloadProgressShow:false,
				buttonLoading: false, // 加载 - 标记
				installed: false, // 是否执行了安装 - 标记
				startProgress: false, // 下载进行 - 标记
				currentIsLatest: true, // 当前版本就是最新版本 - 标记
				downloadLink:"",
				appVersion:0,
				headPortrait:[]
			};
		},
		onLoad(options) {
			var _this = this;
			_this.appVersion = _this.$version;
			var windowHeight = uni.getSystemInfo({
				success(res) {
					_this.screenHeight = res.screenHeight;
				}
			});
			this.userInfo = this.$stronge.getStronge('userInfo')
			//_this.status[0].number = _this.loginSession.detectionNum;
			//_this.status[1].number = _this.loginSession.detectionNum;
			// if(_this.isUpdate){
			// 	uni.request({
			// 		method:"POST",
			// 		url:"https://www.pgyer.com/apiv2/app/check",
			// 		data:{
			// 			"_api_key":"a5bd5ba5f0c6563e2817f49496c69614",
			// 			"appKey":"bca0de50327894e91fa07a106e7a436a"
			// 		},
			// 		header:{
			// 			"Content-Type":"application/x-www-form-urlencoded"
			// 		},
			// 		success:function(res){
			// 			_this.downloadLink = res.data.data.downloadURL;
			// 			_this.createTask(_this.downloadLink)
			// 		}
			// 	})
			// }
		},
		methods: {
			//退出登录
			exit(){
				uni.removeStorage({
					key: 'userInfo',
					success: function (res) {
						uni.reLaunch({
							url:"../../login/login"
						})
					}
				});
				
			},
				goUpdateUser () {
					uni.navigateTo({
						url: `../updateUser/updateUser`
					});
				},
				goUpdatePwd () {
					uni.navigateTo({
						url: `../updatePwd/updatePwd`
					});
				},
				goAddress() {
					uni.navigateTo({
						url: `../userAddress/userAddress`
					});
				},
				goComplaints(){
					uni.navigateTo({
						url: `../../uni-comment/uni-comment`
					});
				},
				clearHc(){
					setTimeout(function(){
						uni.showToast({
							title:'清除成功'
						})
					},500)	
				},
		        checkUpdate(){
		            let _this = this;
		            uni.request({
		            	method:"POST",
		                url:"https://www.pgyer.com/apiv2/app/check",
		                data:{
		                    "_api_key":"a5bd5ba5f0c6563e2817f49496c69614",
		                    "appKey":"67a5b95a495921ecab5b4f853d76895b"
		                },
		                header:{
		                    "Content-Type":"application/x-www-form-urlencoded"
		                },
		                success:function(res){
		                    var serverVersion = parseFloat(res.data.data.buildVersion);
		                    var isVersion = parseFloat(_this.$version);
		                    if(serverVersion>isVersion){ 
		                        _this.downloadLink = res.data.data.downloadURL;
		                        res.data.data.buildUpdateDescription ? _this.updateInfo =res.data.data.buildUpdateDescription : _this.updateInfo = "无";
		                        uni.showModal({
		                            title: '发现新版本',
		                            content: _this.updateInfo,
		                            cancelText:"取消",
		                            confirmText:"立即更新",
		                            success: function (res) {
		                                if (res.confirm) {
		                                    _this.createTask(_this.downloadLink)
		                                } else if (res.cancel) {
		                                    uni.showToast({
		                                        title: '取消更新',
		                                        icon:"none"
		                                    });
		                                }
		                            } 
		                        });
		                    }else{
		                        console.log(2)
		                        uni.showToast({
		                            title: '当前已是最新版本',
		                            icon:"none"
		                        });
		                    }
		                }
		            })
		        },
				//修改头像
				
				chooseImage(){
					let _this=this;
					uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						_this.headPortrait=res.tempFilePaths[0]
					}
				});

					},
		        // 开始下载任务
		        createTask(downloadLink) {
		            let _this = this;
		            this.downloadProgressShow = true;
		            //判断是否已经存在任务
		            if (this.packgePath) {
		                this.haveDownloaded()
		            } else {
		                this.downloadProgress = 0
		                this.startProgress = true
		                // 创建下载任务对象
		                this.downloadTask = uni.downloadFile({
		                    url: downloadLink,
		                    success: (res) => {
		                        if (res.statusCode === 200) {
		                            this.downloadProgressShow = false;
		                            // 保存下载的安装包
		                            uni.saveFile({
		                                tempFilePath: res.tempFilePath,
		                                success: (res) => {
		                                    this.packgePath = res.savedFilePath
		                                    // 进行安装
		                                    this.installPackge()
		                                    // 任务完成，关闭下载任务
		                                    this.closeTask()
		                                }
		                            })
		                        }
		                    }
		                })
		                // 进度条更新
		                this.downloadTask.onProgressUpdate((res) => {
		                    this.downloadProgress = res.progress
		                    if(res == 100){
		                        this.downloadProgressShow = false;
		                    }
		                })
		            }
		        },
		        // 已经下载了更新包但是没有安装
		        haveDownloaded() {
		            uni.showModal({
		                title: '更新尚未完成',
		                content: '您已下载更新包，但是还没有完成安装，请问是否要继续安装更新包呢？',
		                success: (res) => {
		                    if (res.confirm) {
		                        // 安装
		                        this.installPackge()
		                    } else if (res.cancel) {
		                        this.showToast('更新被取消')
		                    }
		                }
		            })
		        },
		        // 封装个Toast方便用
		        showToast(text) {
		            uni.showToast({
		                title: text,
		                duration: 3000,
		                icon: 'none'
		            })
		        },
		        installPackge() {
		            // 安装更新
		            plus.runtime.install(this.packgePath, {
		                force: true
		            })
		            this.installed = true
		            // 保存更新记录到stroage，方便下次启动app时删除安装包
		            uni.setStorage({
		                key: 'updated',
		                data: {
		                    completed: true,
		                    packgePath: this.packgePath
		                },
		                success: (res) => {
		                    console.log('成功保存更新记录')
		                }
		            })
		        }
		    }
		
	}
</script>

<style lang="scss">
page{
	background-color: #f3f3f3;	
}
@font-face {
	font-family: 'HMfont-home';
	src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAKQAAsAAAAABjwAAAJFAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcApIXAE2AiQDCAsGAAQgBYRtBy4bgAUR1Ys/sq+wcQ0AKCMxzO7s4dbxlywA4w2+QAIrUAAAAABA8Hzt9zt3d9//+00Taomhi1gSkUZTzUynEiJMh45HsUimByZ4/unc4gMVRqR1SoYZi0pw3aFbm/4hO4VNh2bJ2umnZ+Q3hAuhQ3jVPHGMDgCfuHf6W0CBzAeU4160xqAuoC4OpEDHGhRZCWXcMHaBSzgOAbykUYLUXFp6sBiscQLIvJsaweacGAyLWARXzVKDnCsHqw6SWzgLvy/fpWJB4WisnI7J2nEq3tgxrP/X+31CuUBAqx1AAyWAAempDbahEUbXeIOGLNhXpsCb9w3IXrUI++usdD8AKZB3T3x3LAKAAritnkSA5KjrQSJz++JfybXOMS/f0eF7B4itVLl1SnvltSIO9qACqdWN/RMBBLqPPHZo3Z8lA8D9FYUS09MNdg8mgT/BR01GF1p6ZVR+bbsicoYKL17gH1ujvI5VJU4bFSyJEWY3qSk0lhySoZXAwUcZXFjK4aWY+tU+YqyiEeMBitgBEMJcQRHkGpowdyRDe4FDkl+4CIuGlz5xSx95YrnZkbESbKH+gWuo145RZlHmDc0UK84KQ8YLeXQeKNK8GLlijzzHjPFtShENmqmDCzgNYyQYmDw2klqR4ZBluu5NaUOdmlHNWAm2UP/ANdRrv7PMSp+/oZlixS0NNe4X8uj6hyLNe5Cusr5Xw728Mr5NKaJBM3VwAYMwRoKhfpDHRlI7wj8cMruV7itL11d0X7cLpWZY6kTsQo1Zo6lQCgA=')
		format('woff2');
}
.icon {
	font-family: 'HMfont-home' !important;
	font-size: 35upx;
	font-style: normal;
	color: #000000;
	&.jiantou {
		&:before {
			content: '\e627';
		}
	}
}
.content{
	padding-bottom: 20upx;
	.list{
		width: 96%;
		padding-left: 4%;
		background-color: #fff;
		margin-bottom: 20upx;
		.row{
			widows: 100%;
			min-height: 90upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: solid 1upx #eee;
			&:last-child{
				border-bottom: none;
			}
			.title{
				font-size: 32upx;
				color: #333;
			}
			.right{
				display: flex;
				align-items: center;
				color: #999;
				.tis{
					font-size: 26upx;
					margin-right: 5upx;
					max-height: 120upx;
					image{
						width: 100upx;
						height: 100upx;
						border-radius: 100%;
						margin: 10upx 0;
					}
				}
				.icon{
					width: 40upx;
					color: #cecece;
				}
			}
			
		}
	}
}
.upload-jindu{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.5);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.jindu-content{
    width: 500upx;
    height: 120upx;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #999999;
}
.jindu-tiao{
    width: 500upx;
    height: 40upx;
    background: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.tiao-div{
    width: 300upx;
    height: 20upx;
}
.tiao-tiao{
    height: 100%;
    background: #00CCFF;
}
</style>
