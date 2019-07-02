<template>
	<view class="content">
		<view class="appraisal-from">
			<uniSteps
				:data="steps"
				:active="stepIndex"
				@steps-click="stepsChoose"></uniSteps>
			<view v-show="stepIndex == 0">
				<view class="baby-list">
					<view class="baby-label">
						<text>宝贝名称</text>
					</view>
					<view class="baby-input">
						<input type="text">
					</view>
				</view>
				<view class="baby-list">
					<view class="baby-label">
						<text>类型</text>
					</view>
					<view class="baby-input">
						<input type="text">
					</view>
				</view>
				<view class="baby-list" style="height: 200upx;">
					<view class="baby-label">
						<text>备注</text>
					</view>
					<view class="baby-input" style="text-align: left;">
						<textarea
							style="width: 470upx;" 
							name=""
							id=""></textarea>
					</view>
				</view>
				<view class="baby-list" style="height: 300upx;flex-direction: column;">
					<view class="baby-label">
						<text>附件</text>
					</view>
					<view class="up-img">
						<image src="../../static/img/upimg.png"></image>
					</view>
				</view>
			</view>
			<view class="" v-show="stepIndex != 0">
				<expertKist
					@expert-click="expertChoose"></expertKist>
			</view>
			<view class="next-tip" @tap="nextTip()" v-show="stepIndex == 0">
				下一步
			</view>
		</view>
		<payment @hide-payment="hidePayment" :price="168" v-if="paymentShow"></payment>
	</view>
</template>

<script>
	import uniSteps from "@/components/uni-steps/uni-steps.vue"
	import expertKist from "@/components/expertList.vue"
	import payment from "@/components/payment.vue"
	export default {
		components:{
			uniSteps,
			expertKist,
			payment
		},
		data() {
			return {
				steps:[
					{
						title:"输入信息"
					},
					{
						title:"选择专家"
					},
					{
						title:"支付"
					}
				],
				stepIndex:0,
				paymentShow:false
			}
		},
		methods: {
			nextTip(){
				this.stepIndex++;
			},
			expertChoose(item){
				this.stepIndex = 2;
				this.paymentShow = true;
			},
			stepsChoose(index){
				this.stepIndex = index;
			},
			hidePayment(){
				this.paymentShow = false;
				this.stepIndex = 1;
			}
		}
	}
</script>

<style>
@import "onlineAppraisal.css";
</style>
