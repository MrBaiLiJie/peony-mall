<template>
	<view class="grace-margin">
		<form @submit="formSubmit" class="grace-form" style="margin-top:20px;">
			<view class="grace-items">
				<view class="grace-label">联系姓名</view>
				<input type="text" class="input" name="name" v-model="formData.name "></input>
			</view>
			<view class="grace-items">
				<view class="grace-label">联系电话</view>
				<input type="text" class="input" name="phoneno" v-model="formData.phoneNumber "></input>
			</view>
			<view class="grace-items" @tap="cityPicker">
				<view class="grace-label">所在地区</view>
				<view class="other">
					{{cityText1}}
					<text class="grace-icons icon-arrow-right"></text>
				</view>
			</view>
			<view class="grace-items">
				<view class="grace-label">详细地址</view>
				<input type="text" class="input" name="address" v-model="formData.detailAddress "></input>
			</view>
			<view class="grace-items">
				<view class="grace-label" style="width:200upx">设置为默认地址</view>
				<switch style="transform:scale(0.7)" :checked="moRenAddress" @change="switch1Change" />
			</view>
			<view style="padding:22upx 0;">
				<button  @click="modifyThe()" style="width:100%;font-size:32upx;background-color: #d71518;color:#fff">确认修改</button>
			</view>
			<view style="padding:22upx 0;">
				<button @click="deleteAddress()" style="width:100%;font-size:32upx;background-color: #d71518;color:#fff">删除地址</button>
			</view>
		</form>
		<!-- 所在地区 -->
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker1" :pickerValueDefault="cityPickerValueDefault1"
		 @onConfirm="onConfirm1">
		</mpvue-city-picker>
	</view>
</template>
<script>
	// formType="submit" type="primary"
	import mpvuePicker from '../../../graceUI/threeComponents/mpvuePicker.vue';
	import mpvueCityPicker from '../../../graceUI/threeComponents/mpvueCityPicker.vue';
	var graceChecker = require("../../../graceUI/jsTools/graceChecker.js");
	var _self;
	export default {
		data() {
			return {
				themeColor: '#333', //颜色
				cityText1: "河北省秦皇岛市北戴河区1232132", //文本
				cityPickerValueDefault1: [0, 0, 1], //默认选项
				city1: null, //客户选择城市后保存的城市数据
				// formData:{
				// 	name:"",
				// 	phoneNumber:"",
				// 	detailAddress:"",
				// 	region:""
				// },
				formData: [],
				id: 0,
				moRenAddress:true
			};
		},
		onLoad: function(option) {
			console.log(option.id)
			this.id = option.id;
			let _this = this;
			this.userInfo = this.$stronge.getStronge('userInfo');
			_this.$ajax.get({
				url:`/member/address/${_this.id}`,
				param:{
					memId:this.userInfo.id
				}
			}).then(res=>{
				console.log(res)
				this.formData = res.data.data;
				if(this.formData.defaultStatus == 1){
					this.moRenAddress = true
				}else{
					this.moRenAddress = false
				}
				this.cityText1 = res.data.data.province + "-" + res.data.data.city + "-" + res.data.data.region;
			});
			// uni.request({
			// 	method: 'get',
			// 	url: `http://192.144.170.210:8085/member/address/${_this.id}?memId=${this.userInfo.id}`,
			// 	success: (res) => {
			// 		console.log(res.data)
			// 		this.formData = res.data.data
			// 	},
			// 	fail: function(err) {
			// 		console.log(err)
			// 	}
			// })
		},
		methods: {
			//删除地址
			deleteAddress:function(){
				let _this=this;
	            console.log(_this)
				_this.$ajax.postJSON({
					url:`/member/address/delete/${_this.id}?memId=${this.userInfo.id}`,
				}).then(res=>{
					// console.log(res)
					uni.showToast({
						title:"删除成功",
						duration:5000
					});
					setTimeout(function(){
						uni.navigateBack({
							delta:1
						})
					},500)
					
				})
				},	
			// 修改地址
			modifyThe:function(){
				let _this=this;
				_this.$ajax.postJSON({
					url:`/member/address/update/${_this.id}?memId=${this.userInfo.id}`,
					data:{
						  ...this.formData,
						  defaultStatus:Number(this.moRenAddress)
					},
				}).then(res =>{
					this.formData = {}
					uni.showToast({
						title:"修改成功", 
						icon:"none",
					});
					setTimeout(function(){
						uni.navigateBack({
							delta:1
						})
					},500)
				})
			},
			formSubmit: function(e) {
				// if(this.city1 == null){
				// 	uni.showToast({title:"请选择地区", icon:"none"});
				// 	return false;
				// }
				var rule = [{
						name: "name",
						checkType: "string",
						checkRule: "1,10",
						errorMsg: "联系人应为1-20个字符"
					},
					{
						name: "phoneno",
						checkType: "phoneno",
						checkRule: "",
						errorMsg: "请正确填写手机号"
					},
					{
						name: "address",
						checkType: "string",
						checkRule: "5,100",
						errorMsg: "请正确填写详细地址"
					}
				];
				// 	let _this=this;
				// 	uni.request({
				// 	method:'POST',
				// 	url:`http://192.144.170.210:8085/member/address/update/${_this.id}?memId=10`,
				// 	data:{
				// 		  ...this.formData,
				// 		  defaultStatus:Number(this.moRenAddress)
				// 	},
				// 	success: (res) => {
				// 		console.log(res.data)
				// 		this.formData = {}
				// 	},
				// 	fail: function(err){
				// 		console.log(err)
				// 	}
				// })
				var formData = e.detail.value;
				formData.city1 = _self.city1.cityCode; //此处以保存用户城市代码为例
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "修改成功",
						icon: "none"
					});
					console.log(formData);
				} else {
					uni.showToast({
						title: "修改失败，请重新填写",
						icon: "none"
					});
				}
			},
			cityPicker() {
				console.log(333)
				this.$refs.mpvueCityPicker1.show();

			},
			switch1Change:function(e){
				this.moRenAddress = e.detail.value
			},
			onConfirm1(e) {
				var cityText1 = e.label;
				var cityValue1 = e.value;
				var cityCode1 = e.cityCode;
				console.log(cityText1, cityValue1, cityCode1);
				this.cityText1 = cityText1;
				this.cityPickerValueDefault1 = cityValue1;
				this.city1 = e;
			}
		},

		components: {
			mpvuePicker,
			mpvueCityPicker
		}
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
