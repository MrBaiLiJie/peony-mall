<template>
	<view class="grace-margin">
		<form @submit="formSubmit" class="grace-form" style="margin-top:20px;">
			<view class="grace-items">
				<view class="grace-label">收货人</view>
				<input type="text" class="input" name="name" v-model="formData.name "></input>
			</view>
			<view class="grace-items">
				<view class="grace-label">手机号码</view>
				<input type="text" maxlength="11" class="input" name="phoneno" v-model="formData.phoneNumber "></input>
			</view>
			<view class="grace-items" @click="cityPicker">
				<view class="grace-label">所在地区</view>
				<view class="other">
					{{formData.cityText1}}
					<text class="grace-icons icon-arrow-right"></text>
				</view>
			</view>
			<view class="grace-items">
				<view class="grace-label">详细地址</view>
				<input type="text" class="input" name="address" v-model="formData.detailAddress " placeholder="请输入详细街区以及门牌号等"></input>
			</view>
			<view class="grace-items">
				<view class="grace-label" style="width:200upx;">设置为默认地址</view>
				<switch style="transform:scale(0.7)" :checked="moRenAddress" @change="switch1Change" />
			</view>
			<view style="padding:22upx 0;width:92%;margin:0 auto" @tap="addAddress()">
				<button style="width:100%;background-color: #d71518;color:#fff;font-size:32upx">添加收货地址</button>
			</view>

		</form>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker1" :pickerValueDefault="cityPickerValueDefault1"
		 @onConfirm="onConfirm1">
		</mpvue-city-picker>
	</view>
</template>
<script>
	import mpvuePicker from '../../../graceUI/threeComponents/mpvuePicker.vue';
	import mpvueCityPicker from '../../../graceUI/threeComponents/mpvueCityPicker.vue';
	var graceChecker = require("../../../graceUI/jsTools/graceChecker.js");
	var _self;
	export default {
		data() {
			return {
				themeColor: '#333', //颜色
				cityText1: "请选择", //文本
				cityPickerValueDefault1: [0, 0, 1], //默认选项
				city1: null, //客户选择城市后保存的城市数据
				formData: {
					name: "",
					phoneNumber: "",
					detailAddress: "",
					cityText1: "",
					memId:10,
					id:null
				},
				moRenAddress: true,
				userInfo:{},
				addressId:null
			};
		},
		onLoad: function(option) {
			if (option.id) {
				this.addressId = option.id;
				this.getAddressData();
				console.log("删除地址");
			} else {
				console.log("添加地址")
			}
			_self = this;
			this.userInfo = this.$stronge.getStronge('userInfo');
		},
		methods: {
			cityPicker: function() {
				this.$refs.mpvueCityPicker1.show();
			},
			switch1Change: function(e) {
				console.log(e)
				this.moRenAddress = e.detail.value
			},
			getAddressData(){
				let _this = this;
				_this.$ajax.get({
					url:`/member/address/${this.addressId}`
				}).then(res=>{
					console.log(res)
				})
			},
		addAddress(){
			let _this = this;
			let addresssss = this.formData.cityText1.split("-");
			if(!this.formData.name){
				uni.showToast({title: '请填写收货人',icon:"none"});
				return false; 
			}
			if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.formData.phoneNumber))){ 
				uni.showToast({title: '请填写正确手机号码',icon:"none"});
				return false; 
			}
			if(!this.formData.detailAddress){
				uni.showToast({title: '请填写详细地址',icon:"none"});
				return false; 
			}
			_this.$ajax.postJSON({
				url:"/member/address/add",
				data:{
					name:this.formData.name,
					phoneNumber: this.formData.phoneNumber,
					detailAddress: this.formData.detailAddress,
					province: addresssss[0],
					city: addresssss[1],
					region: addresssss[2],
					memberId:this.userInfo.id,
					postCode:"",
					defaultStatus: Number(this.moRenAddress)
				}
			}).then(res=>{
				console.log(res)
				uni.showToast({
					title:"添加成功",

				});
				setTimeout(function(){
					uni.navigateBack({
						delta:1
					})
				},500)
			})
		},
			onConfirm1(e) {
			var cityText1  = e.label;
			var cityValue1 = e.value;
			var cityCode1  = e.cityCode;
			console.log(cityText1, cityValue1, cityCode1);
			this.formData.cityText1 = cityText1;
			this.cityPickerValueDefault1 = cityValue1;
			this.city1 = e;
		},
		},
		components: {
			mpvuePicker,
			mpvueCityPicker
		},
	};
		
</script>
<style>
	.uni-title {
		width: 50%;
		height: 50upx;
	}

	.check {
		width: 50%;
	}
</style>
