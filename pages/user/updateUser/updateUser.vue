<template>
	<view class="body-view">
		<form @submit="formSubmit" class="fpgrace-form" style="margin-top:20px;">
			<view class="fpgrace-items">
				<view class="fpgrace-label">用户名：</view>
				<input type="text" class="input" name="phone" v-model="username" datatype="s"></input>
			</view>
			<view class="fpgrace-items">
				<view class="fpgrace-label">昵称：</view>
				<input type="text" class="input" name="nickname" v-model="nickname"></input>
			</view>
			<view class="fpgrace-items">
				<view class="fpgrace-label">性别：</view>
				<radio-group @change="radioGender">
					<label><radio value="1" :checked="man"></radio>男</label>
					<label><radio value="2" :checked="woman"></radio>女</label>
				</radio-group>
			</view>
			<view class="fpgrace-items">
				<view class="fpgrace-label">生日：</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-db">
							<picker mode="date" :value="birthday" :start="startDate" :end="endDate" @change="bindDateChange">
								<view class="uni-input">{{birthday}}</view>
							</picker>
						</view>
					</view>
				</view>
			</view>
		
			<view style="padding:22upx 0;">
				<button formType="submit" type="primary" 
				style="width:100%;margin-top: 30upx;background-color: #d71518;font-size: 30upx;"
				@tap="getUpdate">提交</button>
			</view>
			
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				man:true,
				woman:false,
				id:'',
				username:'',
				nickname:'',
				gender:'',
				birthday:currentDate,
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad() {
			let _this=this;
			uni.getStorage({
				key: 'userInfo',
				success: function (res) {
					console.log(res);
					_this.username = res.data.username;
					_this.birthday = res.data.birthday.split('T')[0];
					_this.nickname = res.data.nickname;
					_this.gender = res.data.gender;
					if(_this.gender =='1'){
						// console.log('男')
						_this.man = true
						_this.woman = false
					}else if(_this.gender == '2'){
						// console.log('女')
						_this.woman = true
						_this.man = false
					}
					_this.id = res.data.id;	
				}
			});
		},
		methods: {
			getUpdate() {
				let _this = this;
				this.$ajax.postJSON({
					url:'/MemberMessage/updateMember',
					data:{
						id:this.id,
						username:this.username,
						nickname:this.nickname,
						gender:this.gender,
						birthday:this.birthday
					}
				}).then(res=>{
					console.log(res.data)
					let user =  uni.getStorageSync('userInfo')
					user.username = this.username;
					user.nickname=this.nickname;
					user.gender=this.gender;
					user.birthday=this.birthday;
				    user.id = this.id;
					let obj = { ...user}
					// console.log('1111',obj.gender)
					 uni.setStorageSync('userInfo',obj)
					 uni.switchTab({
						url:"../../tabBar/user"
					 })
				})
			},
			bindDateChange: function(e) {
				this.birthday = e.target.value
				// console.log(this.birthday)
			},
			radioGender (e) {
				this.gender = e.detail.value
				// console.log('性别',this.gender)
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
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
	 
	.body-view {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
		width: 100%;
	}
	.uni-list {
		width: 60%;
		height: 80upx;
		text-align: center;
		line-height: 80upx;
		background-color: #fff;
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
		color:#000;
	 }
	 .fpgrace-form{
		display:block;
		width:95%;
		height:auto;
		overflow:hidden;
	    margin:0 auto;
		// border-top:2upx solid #d7d7d7;
		// border-bottom:2upx solid #ea7da7;
	 }
</style>
