<template>
	<view :style="store.$state.imgObj.loginBg">

		<view class="pdlr50 pt33 pb50 ">

			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.secondColor}">{{t('wr.w_a1')}}</view>
			<view class="mt55">
				<view class="topBox center flex-col" :style="store.$state.wr.reBox">
					<view class="topItem f26">{{t('wr.w_a2')}}</view>

					<view class="mt35 f55" style="color: #fff;"> {{pageData.balance_max}} {{currency}}</view>

					<view class="mt28 f26 withdrawAll" :style="{color:store.$state.contentColor}"
						@click="inputNum = pageData.balance_max">{{t('wr.w_a3')}}</view>
				</view>


				<view class="mt40 inputItem">
					{{currency}}
					<view class="pl15">
						<input type="text" :focus="true" :placeholder="t('mine.m_s7')" placeholder-class="f30 plo"
							v-model="inputNum">
					</view>
				</view>
				<view class="f20 mt30 text_center" style="color: #F43D45;">
					* {{t('wr.w_a4')}} : {{pageData.min+currency}} - {{pageData.max+currency}}
				</view>

				<view class="mt38 info">
					<view class="between" v-if="!pageData.bankcard" @click="changePage('../setting/set1')">
						<view style="width: 80%;">
							{{t('wr.w_a5')}}
						</view>
						<image :src="store.$state.imgObj.left" mode="widthFix" style="width: 23rpx;height: 39rpx;">
						</image>
					</view>
					<view v-else>
						<view>
							{{t('wr.w_a5')}}
						</view>
						<view class="mt20 f26 flex col_center">{{t('wr.w_a6')}}: <text class="f34 pl15"
								:style="{color:store.$state.contentColor}">{{pageData.bankcard.bank.name}} </text>
						</view>
						<view class="mt20 f26 flex col_center">{{t('wr.w_a7')}}: <text class="f34 pl15"
								:style="{color:store.$state.contentColor}">{{pageData.bankcard.account_holder}} </text>
						</view>
						<view class="mt20 f26 flex col_center">{{t('wr.w_a8')}}: <text class="f34 pl15"
								:style="{color:store.$state.contentColor}">{{pageData.bankcard.bank_num}} </text>
						</view>
						<view class="mt20 f26 flex col_center">{{t('wr.w_a9')}}: <text class="f34 pl15"
								:style="{color:store.$state.contentColor}">{{pageData.bankcard.phone}} </text> </view>
					</view>
				</view>
				<view class="mt38">
					<view class="f34  text_bold f30">{{t('wr.w_a10')}}</view>
					<view class="mt34  passwordInp" v-if="!showPwd">
						<input class="inp " type="safe-password" password="true" v-model="fundPwd"
							:placeholder="t('wr.w_a10')" v-if="showNewPwd1">
						<input class="inp " type="safe-password" v-model="fundPwd" :placeholder="t('wr.w_a10')" v-else>
						<image v-if="showNewPwd1" src="../../static/themeNum1/icon/closeEye.png" class="pwdEye"
							style="width: 29rpx;height: 16rpx;" @click="methods.openPwdHandle('showNewPwd1')"></image>

						<image v-else src="../../static/themeNum1/icon/openEye.png" class="pwdEye"
							style="width: 29rpx;height: 25rpx;" @click="methods.openPwdHandle('showNewPwd1')"></image>
					</view>
					
					<view class="mt34  passwordInp otpEl" v-else>
					
						<input class="inp " placeholder-class="plo" type="safe-password" password="true" :disabled="true"
							:placeholder="t('login.l_l5')" v-if="showNewPwd1">
						<view class="otp" v-if="!pageData.user_link" @click="changePage('../setting/set4')">
							{{t('mine.m_m14')}}
						</view>
					</view>
				</view>


				<view class="btns" :style="choStyle" @click="submitHandle">
					{{t('wr.w_a11')}}
				</view>


			</view>
			<view class="mt70" v-html="pageData.description"></view>
		</view>
	</view>
</template>

<script setup>
	import request from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	const store = userStore();
	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();

	const methods = {
		back() {
			history.back()
		},
		openPwdHandle(type) {
			if (type == 'showOld') {
				showOld.value = !showOld.value
			} else if (type == 'showNewPwd1') {
				showNewPwd1.value = !showNewPwd1.value
			} else if (type == 'showNewPwd2') {
				showNewPwd2.value = !showNewPwd2.value
			}
		}
	};
	const choStyle = {
		background: store.$state.contentColor,
		color: '#fff'
	}
	const noStyle = {
		color: store.$state.contentColor
	}
	const showNewPwd1 = ref(true)
	const fundPwd = ref("")
	const inputNum = ref("")
	const pageData = ref({})
	const showPwd = ref(true)
	const getData = () => {
		request({
			url: '/finance/bank/withdraw/index',
			methods: 'get',
		}).then(res => {
			pageData.value = res
			
			if (res.user.payment_password) {
				showPwd.value = false
			}
		})
	}

	const locked = ref(false)
	const submitHandle = () => {
		if ((inputNum.value - 0) < (pageData.value.min - 0) || (inputNum.value - 0) > (pageData.value.max - 0)) {
			Toast.text(t('wr.w_u7'))
			return false
		}
		if (locked.value) {
			return false
		}
		locked.value = true
		if (pageData.value.check.status == 1) {
			Toast.text(pageData.value.check.message)
			return
		}


		const data = {
			amount: inputNum.value,
			password: fundPwd.value
		}

		request({
			url: 'finance/bank/withdraw/submit',
			methods: 'post',
			data: data
		}).then(res => {
				getData();
			Toast.text(t('wr.w_u8'))
			inputNum.value = ""
		}).catch(err => {
			Toast.text(err.message)
		})
		locked.value = false
	}

	const changePage = (url) => {
		uni.navigateTo({
			url: url
		})
	}
	const currency = ref("")

	// 终于可以用了
	onShow(() => {
		getData();
		currency.value = uni.getStorageSync('currency')
	})
</script>

<style lang="scss">
	.topBox {
		width: 100%;
		height: 328rpx
	}

	.withdrawAll {
		padding: 27rpx 36rpx;
		border-radius: 38rpx;
		background: #fff;
	}

	.notice {
		padding: 20rpx 0;
		background-color: #fff;
		border-radius: 20rpx;
		margin-top: 34rpx;
		font-size: 28rpx;
	}

	.inputItem {
		height: 115rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 1rpx 51rpx 0rpx rgba(64, 46, 197, 0.05);
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 50rpx;
		color: #333;
		padding-left: 40rpx;
	}

	.info {
		background-color: #fff;
		border-radius: 30rpx;
		padding: 30rpx 28rpx;
	}

	.btns {
		margin-top: 100rpx;
		box-shadow: 0px 11px 47px 4px rgba(247, 175, 64, 0.35);
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		border-radius: 35rpx;
	}



	.passwordInp {
		position: relative;

		.pwdEye {
			position: absolute;
			// left: 20rpx;
			right: 40rpx;
			top: 50%;
		}
	}

	// .mainBox {
	// 	display: grid;
	// 	grid-template-columns: repeat(3, 1fr);
	// 	// grid-template-rows: repeat(3, 1fr);
	// 	grid-column-gap: 0px;
	// 	grid-row-gap: 0px;

	// 	.chooseItem {
	// 		width: 90%;
	// 		background-color: #fff;
	// 		height: 100rpx;
	// 		border-radius: 20rpx;
	// 		margin-bottom: 20rpx;
	// 		text-align: center;
	// 		line-height: 100rpx;
	// 	}
	// }
	
	
	.otpEl {
		position: relative;
	
		.otp {
			position: absolute;
			// left: 20rpx;
			right: 40rpx;
			top: 50%;
			font-size: 20rpx;
			transform: translateY(-50%);
			// width: 60rpx;
			padding: 0 10rpx;
			height: 60rpx;
			background: linear-gradient(-43deg, #FFA500 0%, #FFD253 100%);
			box-shadow: 0px 11rpx 8rpx 0px rgba(255, 166, 7, 0.48);
			border-radius: 10rpx;
			color: #fff;
			text-align: center;
			line-height: 60rpx;
		}
	}
</style>
