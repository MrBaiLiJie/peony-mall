<template>
	<view class="grace-margin">
		<view class="grace-search grace-fixed-top top beij">
			<!-- <view class="icons grace-icons icon-scancode"></view> -->
			<view class="grace-search-in">
				<view class="icons grace-icons icon-search"></view>
				<input type="search" @input="searchChange" @confirm="searchNow" :value="searchKey" placeholder="关键字"></input>
				<view class="icons grace-icons icon-close" @tap="clearKey" v-if="searchClose"></view>
			</view>
		</view>
		<view class="grace-title" style="margin-top:50px;">
			<view>搜索历史</view>
			<text class="grace-more"><text class="grace-icons icon-remove"></text>清空</text>
		</view>
		<view class="grace-search-taps">
			<view v-for="(item, index) in searchKeyHistory" :key="index" :data-key="item" @tap="setKey">{{item}}</view>
		</view>
		<view class="grace-title" style="margin-top:10px;">
			<view>热门搜索</view>
		</view>
		<view class="grace-search-taps">
			<view v-for="(item, index) in HotKeyHistory" :key="index" :data-key="item" @tap="setKey">{{item}}</view>
		</view>
	</view>
</template>
<script>
	import graceLoading from "../../graceUI/components/graceLoading.vue";
export default {
    data() {
        return {
            searchKey : "",
            searchClose : false,
			searchKeyHistory : [
				 '男装', '女装', '手机'
			],
			HotKeyHistory : [
				 '手机', '零食', '手表'
			]
        }
    },
    methods:{
        searchChange:function(e){
            var key = e.detail.value;
            this.searchKey = key;
            if(key.length >= 1){
                this.searchClose = true;
            }else{
                this.searchClose = false;
            }
        },
        clearKey:function(){
            this.searchClose = false;
            this.searchKey   = "";
        },
        searchNow:function(){
			this.searchData(this.searchKey)
        },
		setKey : function(e){
			var key = e.currentTarget.dataset.key;
			this.searchData(key)
		},
		searchData(key){
			uni.navigateTo({
				url:"./../goods/goods-list?key="+key
			})
		}
    }
}
</script>
<style>
.top{top:0;}
/* #ifdef H5 */
.top{top:44px;}
/* #endif */
.beij{
	background-color: #d71518;
}
</style>