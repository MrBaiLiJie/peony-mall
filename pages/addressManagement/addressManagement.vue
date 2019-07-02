<template>
    <view>
        <view class="goods-list">
            <!-- <view class="tis" v-if="goodsList.length==0">收藏是空的哦~</view> -->
		<!-- 	<view class="grace-title" style="margin-top:28px;" @tap="addAddress()">
				<view>我的地址</view>
				<view class="grace-more" style="color:#ea7da7;">+ 添加新地址 </view>
			</view> -->
            <view class="row" v-for="(row,index) in address" :key="index" @touchstart="touchStart(index,$event)" @touchmove="touchMove(index,$event)" @touchend="touchEnd(index,$event)">
                <!-- 删除按钮 -->
                <view class="menu" @tap="gotoEdit(row)">
                    <view class="icon">编辑</view>
                </view>
                <!-- 商品 -->
                <view class="carrier" @tap="gotoEdit(row)" :class="[theIndex==index?'open':oldIndex==index?'close':'']">
                   
                    <view class="goods-info">
                        <view class="goods-info">
                            <view class="title">{{row.name}}</view>
                            <view class="spec">{{row.phoneNumber}}</view>
                            <view class="price-number">
                                <view class="price">{{ row.province }} {{ row.city }}  {{ row.region }}{{ row.detailAddress }}</view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view style="width:100%;margin:0 auto;position: fixed;bottom:0; z-index:9;" @tap="addAddress()">
       	  <button style="width:100%;height:100upx;border-radius:0upx; line-height:100upx; background-color: #d71518;color:#fff;font-size:32upx;">添加收货地址</button>
       </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                sumPrice:'0.00',
                headerPosition:"fixed",
                selectedList:[],
                isAllselected:false,
                goodsList:[],
                //控制滑动效果
                theIndex:null,
                oldIndex:null,
                isStop:false,
				address:[],
				userInfo:{}
            }
        },
        onPageScroll(e){
            // //兼容iOS端下拉时顶部漂移
            // if(e.scrollTop>=0){
            //     this.headerPosition = "fixed";
            // }else{
            //     this.headerPosition = "absolute";
            // }
        },
        //下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
        onPullDownRefresh() {
            setTimeout(function () {
                uni.stopPullDownRefresh();
            }, 1000);
        },
        onShow(options) {
            //兼容H5下结算条位置
            // #ifdef H5
                // this.footerbottom = document.getElementsByTagName('uni-tabbar')[0].offsetHeight+'px';
            // #endif
			// this.getCartData();
			let _this = this;
			this.userInfo = this.$stronge.getStronge('userInfo');
			_this.$ajax.get({
				url:`/member/address/list?memId=${this.userInfo.id}`
			}).then(res=>{
				_this.address=res.data.data;
			})
        },
        methods: {
			//跳转编辑页面
			gotoEdit(row) {
				uni.navigateTo({
				    url: `../user/editor/editor?id=${row.id}`
				});
			},
            //控制左滑删除效果-begin
            touchStart(index,event){
                //多点触控不触发
                if(event.touches.length>1){
                    this.isStop = true;
                    return ;
                }
                this.oldIndex = this.theIndex;
                this.theIndex = null;
                //初始坐标
                this.initXY = [event.touches[0].pageX,event.touches[0].pageY];
            },
            touchMove(index,event){
                //多点触控不触发
                if(event.touches.length>1){
                    this.isStop = true;
                    return ;
                }
                let moveX = event.touches[0].pageX - this.initXY[0];
                let moveY = event.touches[0].pageY - this.initXY[1];
                
                if(this.isStop||Math.abs(moveX)<5){
                    return ;
                }
                if (Math.abs(moveY) > Math.abs(moveX)){
                    // 竖向滑动-不触发左滑效果
                    this.isStop = true;
                    return;
                }
                
                if(moveX<0){
                    this.theIndex = index;
                    this.isStop = true;
                }else if(moveX>0){
                    if(this.theIndex!=null&&this.oldIndex==this.theIndex){
                        this.oldIndex = index;
                        this.theIndex = null;
                        this.isStop = true;
                        setTimeout(()=>{
                            this.oldIndex = null;
                        },150)
                    }
                }
            },
            touchEnd(index,$event){
                //结束禁止触发效果
                this.isStop = false;
            },
            deleteGoods(id){
				uni.navigateTo({
					 url:'../user/editor/editor'
				})
            },
			addAddress(){
				uni.navigateTo({
					url:'/pages/user/addAddress/addAddress'
				})
			}
            
        }
    }
</script>
<style lang="scss">
    @font-face {font-family:"HMfont-home";src:url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAOEAAsAAAAAB7wAAAM1AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDHAqDAIJNATYCJAMQCwoABCAFhG0HPhu1BsiOw7jha84s8T+CgOyq6unevTlAeAkRhAhQBjj8eJfmMg/oB5whSgaFspy7AqbpwE3Py3/j9j+X07uGyFHr21lua9HYi9rUCzDeGtBYmw4o0AJJ0BvGLmiJxyEAC3yIQhSVPL9BF4U5TgBi7ChtQzfjQKFYWEdgrFiqEBsxoGurtMfAhuD74g8JQgcNg8ScWjf8xoPz7/nfD8iFpoV0eQi86XQAWwUSiAIUiJGVhgEaUSAKiYXau0kKoKOjwVRthd8PmExIBRvmWH95INCQIIyYqVYAJKGghO/5Dg4B3wtxaPD9QAoS4IOM1gEzYBbAMkT16iIQGPxsopS5ScAcK23LiaBDpzyk1aGLHtsvhVrL7adDD55016wPXnDfcr7T3lcE2TVcP2fNhZM7WeiEhVp44vx9C5vVD6+eEgaLTZvEot3HL1lawlnXLK3XnISDllbWwmrmGjlRLdxq2bpme1RAeqXtzWh6g0F//wCCnRiN2diwr2+Yse3iEs20g05Q5tT0BikOXwKf79vsoEvb6p6xjVhHP92nwDJmX+9hwsf26dXbPiNvZ/98x67/+5T+ev0aWxbXCwOX41zLxia+O73B6Y57fN1u6GvN+Zmbc8XITigTAcB0Rl6X8QB4hDgEpoXypZz2q37D5FVnVa9t1n/dUgHw8uKMq9BmWqjoJoP3zevM+zG8jmVKE5hKpRShw9WTFZW04D7TscAC+B0RcOD9FHLnzqkg0HFOQMMMb5DoBKGKGgUGLEkCIzq5YEEkpastcWQyDYQyByJYBkBgx2nQsOEaSOx4girqOzDgwj8wYickWNAiHLe0JESMsiicTLaQh84PBm6WKlst/TD9hXQV25wWBLQP4jJw435MXD58RynxFDPKT30golBxluAtOI3iOMOcs5Bc2fFF8sPd2OFVBO24WQJ9CmEIG4HwQAb4ARmFS0aK8qoL/cLnXyA0FTE23FBSZf+AYEqCzpF4YojrgN5J004lt/LKFD7RHDAVQYEMh8lIQErAICImJgOZWD0ohHARdhg5wJdzSKxVaXhX6c7y8uQN1wAWmLOU0IQUShiQo0fZTceadqaMdP2uXwEAAAAA') format('woff2');}
    .icon {
        font-family:"HMfont-home" !important;
        font-size:32upx;
        font-style:normal;
        // color:#000000;
        &.jia {
            &:before{content:"\e641";}
        }
        &.jian {
            &:before{content:"\e643";}
        }
        &.shanchu {
            &:before{content:"\e6a4";}
        }
        
    }
    .checkbox-box{
        display: flex;
        align-items: center;
        .checkbox{
            width: 35upx;
            height: 35upx;
            border-radius: 100%;
            border: solid 2upx var(--common-color);
            display: flex;
            justify-content: center;
            align-items: center;
            .on{
                width: 25upx;
                height: 25upx;
                border-radius: 100%;
                background-color: var(--common-color);
            }
        }
        .text{
            font-size: 28upx;
            margin-left: 10upx;
        }
    }
.status {
        width: 100%;
        height: 0;
        position: fixed;
        z-index: 10;
        background-color: #fff;
        top: 0;
        /*  #ifdef  APP-PLUS  */
        height: var(--status-bar-height);//覆盖样式
        /*  #endif  */
    }

    .header{
        width: 92%;
        padding: 0 4%;
        height: 100upx;
        display: flex;
        align-items: center;
        position: fixed;
        top: 0;
        z-index: 10;
        background-color: var(--common-color);
        text-align: center;
        /*  #ifdef  APP-PLUS  */
        top: var(--status-bar-height);
        /*  #endif  */
        .title{
            font-size: 36upx;
            text-align: center;
            margin: 0 auto;
            color: #FFFFFF;
        }
        
    }
    .place{
        
        background-color: #ffffff;
        height: 100upx;
        /*  #ifdef  APP-PLUS  */
        margin-top: var(--status-bar-height);
        /*  #endif  */
    }
    .goods-list{
        width: 100%;
		padding-bottom: 88upx;
        // padding: 20upx 0 120upx 0;
        .tis{
            width: 100%;
            height: 60upx;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 32upx;
        }
        .row{
            width: calc(92%);
            height: calc(22vw + 40upx); 
            margin: 20upx auto;
            
            border-radius: 15upx;
            box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
            z-index: 4;
            border: 0;
            .menu{
                .icon{
                    color: #fff;
                    // font-size: 25upx;
                }
                position: absolute;
                width: 30%;
                height: 100%;
                right: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: var(--common-color);
                color: #fff;
                z-index: 2;
                
            }
            .carrier{
                @keyframes showMenu {
                    0% {transform: translateX(0);}100% {transform: translateX(-30%);}
                }
                @keyframes closeMenu {
                    0% {transform: translateX(-30%);}100% {transform: translateX(0);}
                }
                &.open{
                    animation: showMenu 0.25s linear both;
                }
                &.close{
                    animation: closeMenu 0.15s linear both;
                }
                background-color: #fff;
                .checkbox-box{
                    padding-left: 20upx;
                    flex-shrink: 0;
                    height: 22vw;
                    margin-right: 20upx;
                }
                position: absolute;
                width: 100%;
                padding: 0 0;
                height: 100%;
                z-index: 3;
                display: flex;
                align-items: center;

                .goods-info{
                    width: 100%;
                    display: flex;
                    padding-right: 20upx;
                    .img{
                        width: 22vw;
                        height: 22vw;
                        border-radius: 10upx;
                        overflow: hidden;
                        flex-shrink: 0;
                        margin-right: 10upx;
                        image{
                            width: 22vw;
                            height: 22vw;
                        }
                    }
                    .goods-info{
                        width: 100%;
                        height: 22vw;
                        overflow: hidden;
                        display: flex;
                        flex-wrap: wrap;
                        position: relative;
                        .title{
                          height:37upx;
                          font-size: 28upx;
                          display: -webkit-box;
                          -webkit-box-orient: vertical;
                          -webkit-line-clamp: 2;
                          // text-align: justify;
                          overflow: hidden;
                          margin-top:18upx;
                          margin-left:30upx;
                        }
                        .spec{
							// width:100upx;
							font-size: 30upx;
							// background-color: #f3f3f3;
							// color: #a7a7a7;
							height: 37upx;
							display: flex;
							align-items: center;
							padding: 0 10upx;
							border-radius: 15upx;
							// margin-bottom: 20vw;
							margin-left:30upx;
							margin-top:18upx;
                        }
                        .price-number{
                            position: absolute;
                           width: 100%;
                           bottom: 28upx;
                           display: flex;
                           justify-content: space-between;
                           align-items: flex-end;
                           font-size: 28upx;
                           height: 40upx;
                           margin-left:30upx;
                            .price{
                            }
                            .number{
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                .input{
                                    height: 40upx;
                                    margin: 0 10upx;
                                    background-color: var(--common-color);
                                    input{
                                        width: 60upx;
                                        height: 30upx;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        text-align: center;
                                        font-size: 26upx;
                                    }
                                }
                                
                                .sub ,.add{
                                    width: 40upx;
                                    height: 40upx;
                                    background-color: var(--common-color);
                                    border-radius: 5upx;
                                    .icon{
                                        font-size: 20upx;
                                        width: 40upx;
                                        height: 40upx;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
    }
	.btn{
		width:131rpx;
		height:30rpx;
		background-color:#ea7da7;
		padding:12rpx;
		margin-left:5rpx;
		text-align:center;

		}
    .footer{
        width: 92%;
        padding: 0 4%;
        background-color: #fbfbfb;
        height: 100upx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 28upx;
        position: fixed;
        bottom: 0upx;
        z-index: 5;
        .delBtn{
            border: solid 1upx var(--common-color);
            color: var(--common-color);
            padding: 0 30upx;
            height: 50upx;
            border-radius: 30upx;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .settlement{
            width: 60%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .sum{
                width: 50%;
                font-size: 28upx;
                margin-right: 10upx;
                display: flex;
                justify-content: flex-end;
                .money{
                    font-weight: 600;
                }
            }
            .btn{
                padding: 20upx 30upx;
                height: 50upx;
                background-color: var(--common-color);
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 30upx;
            }
        }
    }
</style>

<!-- <template>
	<view class="grace-margin">
		<view class="grace-title" style="margin-top:28px;" @tap="addAddress()">
			<view>我的地址</view>
			<view class="grace-more" style="color:#ea7da7;">+ 添加新地址 </view>
		</view>
		<view class="grace-list">
			<view class='items'>
				<view class="body" v-for="(item, index) in address" :key="index"@tap="addressClick(item)">
					<view class="title">
						{{ item.name }}
						<text>{{ item.phoneNumber }}</text>
					</view>
					<view class="desc">{{ item.province }} {{ item.city }}  {{ item.region }}{{ item.detailAddress }} </view>
				</view>
				<view class="bianji" @tap="bianji()">编辑</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
		data() {
			return {
				address:[
					
				]
			};
		},
		onLoad(){
			uni.request({
				method:'get',
				url:`http://192.144.170.210:8085/member/address/list?memId=10`,
				success: (res) => {
					this.address=res.data.data
					console.log(this.address)
				},
				fail: (err) => {
					console.log(err)
				}
		})
		},
		methods:{
			addAddress : function(){
				this.$emit("address-add")
			},
			addressClick(item){
				this.$emit("address-choose",item)
			},
			bianji(){
				url:'../user/editor/editor'
			}
		}
	}
</script>

<style>
  .bianji{
		font-family:"grace-iconfont";
		font-size:36rpx;
		height:50rpx;
		line-height:50rpx;
		text-align:center;
		width:108rpx;
		-webkit-flex-shrink:0;
		-ms-flex-negative:0;
		flex-shrink:0;
		margin-left:22upx;
		color:#A5A7B2;

	  }
</style>
 -->