<template>
	<view :style="store.$state.imgObj.loginBg">
		<view class="pdlr35 pt33">
			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
				<image :src="store.$state.imgObj.langSetting" mode="widthFix" style="width: 70rpx;height: 70rpx;"
					@click="methods.changePage">
				</image>
			</view>

			<view class="mt73" :style="{color:store.$state.secondColor}">
				<view class="f60 text_bold">
					{{t('act.l_f')}}
				</view>
				<!-- 登录 -->
				<view class="mt54">
					<view class="pl14">
						{{t('login.l_l2')}}
					</view>
					<view class="mt34 phoneEl">
						<view class="phoneLabel">
							{{regisForm.country_code}}
						</view>
						<input class="inp" type="number" v-model="regisForm.phone" :placeholder="t('login.l_l3')">
						<nut-icon name="Check" size="20" v-if="phoneRegFlag"
							class="phoneCheck animate__animated animate__fadeIn " color="green"></nut-icon>
					</view>

					<view class="mt38">
						<view class="pl14">
							{{t('login.l_l4')}}
						</view>
						<view class="mt34 passwordInp">
							<input class="inp " type="safe-password" password="true" v-model="regisForm.password"
								:placeholder="t('login.l_l5')" v-if="openPwd">
							<input class="inp " type="safe-password" v-model="regisForm.password"
								:placeholder="t('login.l_l5')" v-else>


							<image src="../../static/themeNum1/icon/openEye.png" class="pwdEye"
								style="width: 29rpx;height: 25rpx;" @click="methods.openPwdHandle('first')"
								v-if="!openPwd"></image>

							<image src="../../static/themeNum1/icon/closeEye.png" class="pwdEye"
								style="width: 29rpx;height: 16rpx;" @click="methods.openPwdHandle('first')" v-else>
							</image>
						</view>
					</view>

					<view class="mt38">
						<view class="pl14">
							{{t('login.l_r4')}}
						</view>
						<view class="mt34 otpEl">
							<input class="inp" v-model="regisForm.sms_code" :placeholder="t('login.l_r5')">

							<view class="otp" v-if="!hasSend" @click="sendHandle">
								OTP
							</view>
							<view class="countdown center" v-else>
								{{hasSecond}}s
							</view>
						</view>
					</view>

					<!-- 登录按钮 -->
					<view class="mt71 f36" :style="regFlag?choStyle:noCho" @click="forgetHandle">
						{{t('act.l_f')}}
					</view>
				</view>
			</view>
			<view style="height: 50rpx;"></view>



			<Loading ref="showLoading"></Loading>
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
		onLoad,
		onHide
	} from "@dcloudio/uni-app";
	import {
		watch
	} from 'vue';
	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();

	const store = userStore();

	const actInd = ref(0); //0 登录  1 注册  2 找回密码

	const openPwd = ref(true) // 密码可见
	const openCpwd = ref(true) // 第二次密码可见

	// 登录表单
	const regisForm = ref({
		phone: '',
		password: '',
		sms_code: '',
		country_code: ""
	})
	const btnDis = ref(false)
	// 　const { t } = useI18n()
	const country_code = ref('')
	const showPicker = ref(false)

	const regFlag = ref(false)
	const phoneRegFlag = ref(false)
	// 监听
	watch(regisForm, (newVal, oldVal) => {


		if (regisForm.value.password.length < 6 || regisForm.value.password.length > 24) {
			return false
		}
		if (!regisForm.value.phone || !regisForm.value.sms_code) {
			return false
		}
		regFlag.value = true
	}, {
		deep: true
	})

	const choStyle = {
		background: store.$state.contentColor,
		color: '#fff',
		boxShadow: '0rpx 11rpx 47rpx 4rpx rgba(247, 175, 64, 0.35)'
	}
	const noCho = {
		background: store.$state.btnDis,
		color: '#fff'
	}

	const hasSecond = ref(60)
	const hasSend = ref(false)
	const sendHandle = () => {
		if (timer.value) {
			clearInterval(timer.value)
		}
		const data = {
			tel: regisForm.value.phone,
			country: regisForm.value.country_code,
			type: 2
		}

		request({
			url: 'join/sms',
			methods: 'post',
			data: data
		}).then(res => {
			startTimer()
			hasSend.value = true
			Toast.text(t('login.l_r9'))
		}).catch(err => {
			Toast.text(err.message)
		})
	}

	const timer = ref(null)
	const forgetHandle = () => {
		showLoading.value.loading = true
		console.log(regisForm.value);
		request({
			url: 'join/forget',
			methods: 'post',
			data: regisForm.value
		}).then(res => {
			Toast.text('设置成功')
			showLoading.value.loading = true
			setTimeout(() => {
				uni.navigateTo({
					url: './login'
				})
			}, 1000)
		}).catch(err => {
			showLoading.value.loading = false
			Toast.text(err.message)
		})
	}
	const startTimer = () => {
		timer.value = setInterval(() => {
			if (hasSecond.value == 0) {
				clearInterval(timer.value)
				hasSecond = false
			}
			hasSecond.value--;
		}, 1000)

	}
	const currentInd = ref(0)

	const showLoading = ref(null)

	const methods = {
		back() {
			history.back()
		},
		changePage() {
			uni.navigateTo({
				url: '../mine/langSetting'
			})
		},

		openPwdHandle(type) {
			if (type == 'second') {
				openCpwd.value = !openCpwd.value
			}
			if (type == 'first') {
				openPwd.value = !openPwd.value
			}
		}
	};

	const countryList = ref([])


	onHide(() => {
		if (timer.value) {
			clearInterval(timer.value)
		}
	})
	onLoad((e) => {
		if (e.code) {
			regisForm.value.country_code = "+" + e.code
		}

	})
</script>

<style lang="scss">
	.mt71 {
		text-align: center;
		height: 120rpx;
		border-radius: 35rpx;
		color: #fff;
		line-height: 120rpx;
		transition: .3s linear all;
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

	.otpEl {
		position: relative;

		.otp {
			position: absolute;
			// left: 20rpx;
			right: 40rpx;
			top: 50%;
			font-size: 20rpx;
			transform: translateY(-50%);
			width: 60rpx;
			height: 60rpx;
			background: linear-gradient(-43deg, #FFA500 0%, #FFD253 100%);
			box-shadow: 0px 11rpx 8rpx 0px rgba(255, 166, 7, 0.48);
			border-radius: 10rpx;
			color: #fff;
			text-align: center;
			line-height: 60rpx;
		}

		.countdown {
			position: absolute;
			// left: 20rpx;
			right: 40rpx;
			top: 50%;
			transform: translateY(-50%);
			width: 60rpx;
			height: 60rpx;
			border: 1rpx solid #ccc;
			border-radius: 10rpx;
			color: #ccc;
			text-align: center;
			line-height: 60rpx;

		}
	}

	.phoneEl {
		position: relative;
		padding-left: 100rpx;
		background-color: #fff;
		border-radius: 30rpx;

		.phoneLabel {
			position: absolute;
			left: 40rpx;
			top: 50%;
			font-size: 30rpx;
			transform: translateY(-50%);
		}

		.phoneCheck {
			position: absolute;
			right: 30rpx;
			top: 50%;
			transform: translateY(-50%);

		}
	}

	.listItem {
		font-size: 30rpx;
		padding: 10rpx 20rpx;
		margin: 10rpx 0;
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1rpx solid #eee;
	}

	.actItem {
		color: #fff;
	}
</style>
