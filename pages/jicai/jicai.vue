<template>
    <view>
        <view class="status" :style="{position:headerPosition}"></view>
        <!-- <view class="header" :style="{position:headerPosition}">
            <view class="title">购物车</view>
        </view> -->
        <!-- 占位 -->
        <!-- <view class="place"></view> -->
        <!-- 商品列表 -->
        <view class="goods-list">
            <view class="tis" v-if="goodsList.length==0&&loading">集采单是空的哦~</view>
            <view class="row" v-for="(row,index) in goodsList" 
				:key="index" 
				@touchstart="touchStart(index,$event)" 
				@touchmove="touchMove(index,$event)" 
				@touchend="touchEnd(index,$event)">
                <!-- 删除按钮 -->
                <view class="menu" @tap.stop="deleteGoods([row.id])">
                    <view class="icon shanchu"></view>
                </view>
                <!-- 商品 -->
                <view class="carrier" :class="[theIndex==index?'open':oldIndex==index?'close':'']">
                    <!-- checkbox -->
                    <view class="checkbox-box" @tap="selected(index)">
                        <view class="checkbox">
                            <view :class="[row.selected?'on':'']"></view>
                        </view>
                    </view>
                    <!-- 商品信息 -->
                    <view class="goods-info" @tap="toGoods(row)">
                        <view class="img">
                            <image :src="row.pmsProduct.pic"></image>
                        </view>
                        <view class="goods-info">
                            <view class="title">{{row.pmsProduct.name}}</view>
                            <view class="spec">{{ row.pmsSkuValueAttribute ? row.pmsSkuValueAttribute.value : "未选择"}}</view>
                            <view class="price-number">
                                <view class="price">￥{{row.sku ? row.sku.price : row.pmsProduct.price}}</view>
                                <view class="number">
                                    <view class="sub" @tap.stop="sub(index)">
                                        <view class="icon jian"></view>
                                    </view>
                                    <view class="input" @tap.stop="discard">
                                        <input type="number" v-model="row.quantity" @input="sum" />
                                    </view>
                                    <view class="add"  @tap.stop="add(index)">
                                        <view class="icon jia"></view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 脚部菜单 -->
        <view class="footer" :style="{bottom:footerbottom}">
            <view class="checkbox-box" @tap="allSelect">
                <view class="checkbox">
                    <view :class="[isAllselected?'on':'']"></view>
                </view>
                <view class="text">全选</view>
            </view>
            <view class="delBtn" @tap="deleteList()" v-if="selectedList.length>0">删除</view>
            <view class="settlement">
                <view class="sum">合计:<view class="money">￥{{sumPrice}}</view></view>
                <view class="btn" @tap="releaseOrder()">发布询价单</view>
				<!-- @tap="toConfirmation" -->
            </view>
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
				jicai:[],
				userInfo:{},
				pageNum:1,
				loading:false
            }
        },
        onPageScroll(e){
            //兼容iOS端下拉时顶部漂移
            if(e.scrollTop>=0){
                this.headerPosition = "fixed";
            }else{
                this.headerPosition = "absolute";
            }
        },
        //下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
        onPullDownRefresh() {
            setTimeout(function () {
                uni.stopPullDownRefresh();
            }, 1000);
        },
        onLoad() {
            //兼容H5下结算条位置
            // #ifdef H5
                this.footerbottom = document.getElementsByTagName('uni-tabbar')[0].offsetHeight+'px';
            // #endif
			this.userInfo = this.$stronge.getStronge("userInfo");
			this.getData();
        },
        methods: {
			getData(){
				this.loading = true;
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				this.$ajax.get({
					url:`/Group/list`,
					// ?memid=${this.userInfo.id}&pageNum=${this.pageNum}&pageSize=10
					param:{
						memid:this.userInfo.id,
						pageNum:1,
						pageSize:10
					}
				}).then(res=>{
					uni.hideLoading();
					if(res.data.data){
						if(this.pageNum == 1){
							this.goodsList = res.data.data;
							console.log(this.goodsList)
						}else{
							this.goodsList.concat(res.data.data);
						}
					}else{
						this.goodsList = [];
					}
					this.sum();
				})
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
            //控制左滑删除效果-end
            //商品跳转
            toGoods(e){
                // uni.showToast({title: '商品'+e.id,icon:"none"});
                uni.navigateTo({
                    url: '../goods/goods?id='+e.productId
                });
            },
            //删除商品
            deleteGoods(id){
                this.$ajax.postJSON({
					url:`/Group/delete?ids=${id.join(',')}&memberId=${this.userInfo.id}`
				}).then(res=>{
					if(res.data.code == 200){
						uni.showToast({
							title:"删除成功",
							icon:"none"
						})
						this.pageNum = 1;
						this.getData();
					}else{
						uni.showToast({
							title:"删除失败，请稍后重试",
							icon:"none"
						})
					}
				})
                //this.getData();
            },
			//删除商品数组
			deleteList(){
				this.deleteGoods(this.selectedList);
				setTimeout(function(){
					 	uni.showToast({
							title:"删除成功",
							icon:"none"
						});
				},500)
				
			},
            // 选中商品
            selected(index){
                this.goodsList[index].selected = this.goodsList[index].selected?false:true;
                let i = this.selectedList.indexOf(this.goodsList[index].id);
                i>-1?this.selectedList.splice(i, 1):this.selectedList.push(this.goodsList[index].id);
                this.isAllselected = this.selectedList.length == this.goodsList.length;
                this.sum();
            },
            //全选
            allSelect(){
                let len = this.goodsList.length;
                let arr = [];
                for(let i=0;i<len;i++){
                    this.goodsList[i].selected = this.isAllselected? false : true;
                    arr.push(this.goodsList[i].id);
                }
                this.selectedList = this.isAllselected?[]:arr;
                this.isAllselected = this.isAllselected||this.goodsList.length==0?false : true;
                this.sum();
            },
            // 减少数量
            sub(index){
                if(this.goodsList[index].quantity<=1){
                    return;
                }
                this.goodsList[index].quantity--;
                this.sum();
            },
            // 增加数量
            add(index){
                this.goodsList[index].quantity++;
                this.sum();
            },
            // 合计
            sum(){
                this.sumPrice=0;
                let len = this.goodsList.length;
                for(let i=0;i<len;i++){
                    if(this.goodsList[i].selected) {
                        this.sumPrice = this.sumPrice + (this.goodsList[i].quantity*this.goodsList[i].pmsProduct. price);
                    }
                }
                this.sumPrice = this.sumPrice.toFixed(2);
            },
            discard() {
                //丢弃
            },
			//生成询价单
			releaseOrder(){
				let z = {
					groupId:0,
					productId:0,
					productNum:0,
					skuId:0,
					userId:0
				}
				let data = [];
				let len = this.goodsList.length;
				for(let i=0;i<len;i++){
				    if(this.goodsList[i].selected) {
				        z.groupId = this.goodsList[i].id;
				        z.productId = this.goodsList[i].pmsProduct.id;
				        z.productNum = this.goodsList[i].quantity;
				        z.skuId = this.goodsList[i].productSkuId;
				        z.userId = this.userInfo.id;
						data.push(z)
				    }
				}
				console.log(data)
				this.$ajax.postJSON({
					url:"/Inquiry/insertByXun",
					data:data
				}).then(res=>{
					if(res.data.code == 200){
						uni.showToast({
							title:"发布成功",
							icon:"success"
						})
					}else{
						uni.showToast({
							title:"请选择商品发布",
							icon:"none"
						})
					}
				})
			}
        }
    }
</script>
<style lang="scss">
    @font-face {font-family:"HMfont-home";src:url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAOEAAsAAAAAB7wAAAM1AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDHAqDAIJNATYCJAMQCwoABCAFhG0HPhu1BsiOw7jha84s8T+CgOyq6unevTlAeAkRhAhQBjj8eJfmMg/oB5whSgaFspy7AqbpwE3Py3/j9j+X07uGyFHr21lua9HYi9rUCzDeGtBYmw4o0AJJ0BvGLmiJxyEAC3yIQhSVPL9BF4U5TgBi7ChtQzfjQKFYWEdgrFiqEBsxoGurtMfAhuD74g8JQgcNg8ScWjf8xoPz7/nfD8iFpoV0eQi86XQAWwUSiAIUiJGVhgEaUSAKiYXau0kKoKOjwVRthd8PmExIBRvmWH95INCQIIyYqVYAJKGghO/5Dg4B3wtxaPD9QAoS4IOM1gEzYBbAMkT16iIQGPxsopS5ScAcK23LiaBDpzyk1aGLHtsvhVrL7adDD55016wPXnDfcr7T3lcE2TVcP2fNhZM7WeiEhVp44vx9C5vVD6+eEgaLTZvEot3HL1lawlnXLK3XnISDllbWwmrmGjlRLdxq2bpme1RAeqXtzWh6g0F//wCCnRiN2diwr2+Yse3iEs20g05Q5tT0BikOXwKf79vsoEvb6p6xjVhHP92nwDJmX+9hwsf26dXbPiNvZ/98x67/+5T+ev0aWxbXCwOX41zLxia+O73B6Y57fN1u6GvN+Zmbc8XITigTAcB0Rl6X8QB4hDgEpoXypZz2q37D5FVnVa9t1n/dUgHw8uKMq9BmWqjoJoP3zevM+zG8jmVKE5hKpRShw9WTFZW04D7TscAC+B0RcOD9FHLnzqkg0HFOQMMMb5DoBKGKGgUGLEkCIzq5YEEkpastcWQyDYQyByJYBkBgx2nQsOEaSOx4girqOzDgwj8wYickWNAiHLe0JESMsiicTLaQh84PBm6WKlst/TD9hXQV25wWBLQP4jJw435MXD58RynxFDPKT30golBxluAtOI3iOMOcs5Bc2fFF8sPd2OFVBO24WQJ9CmEIG4HwQAb4ARmFS0aK8qoL/cLnXyA0FTE23FBSZf+AYEqCzpF4YojrgN5J004lt/LKFD7RHDAVQYEMh8lIQErAICImJgOZWD0ohHARdhg5wJdzSKxVaXhX6c7y8uQN1wAWmLOU0IQUShiQo0fZTceadqaMdP2uXwEAAAAA') format('woff2');}
    .icon {
        font-family:"HMfont-home" !important;
        font-size:60upx;
        font-style:normal;
        color:#000000;
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
            border: solid 2upx #ccc;
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
        padding: 20upx 0 120upx 0;
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
                            width: 100%;
                            font-size: 28upx;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            // text-align: justify;
                            overflow: hidden;
                        }
                        .spec{
                            font-size: 20upx;
                            background-color: #f3f3f3;
                            color: #a7a7a7;
                            height: 30upx;
                            display: flex;
                            align-items: center;
                            padding: 0 10upx;
                            border-radius: 15upx;
                            margin-bottom: 20vw;
                        }
                        .price-number{
                            position: absolute;
                            width: 100%;
                            bottom: 0upx;
                            display: flex;
                            justify-content: space-between;
                            align-items: flex-end;
                            font-size: 28upx;
                            height: 40upx;
                            .price{
                            }
                            .number{
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                .input{
                                    height: 40upx;
                                    margin: 0 10upx;
                                    background-color: #dbdbdb;
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
                                    background-color:#dbdbdb;
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
            padding: 0 20upx;
            height: 40upx;
            border-radius: 30upx;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .settlement{
            width: 65%;
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
                padding: 0 20upx;
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
