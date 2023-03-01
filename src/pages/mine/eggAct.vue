<template>
	<!-- <view class="wrap"
		style="background: url(../../static/egg/bg.png) no-repeat  100%/100%;">
		 -->
	<view style="background: url(../../static/egg/bg.png) no-repeat  100%/100%;height: 100vh;overflow: scroll;">
		<view class="pdlr35 pt33">


			<view class="flex between">
				<image src="/static/actIcon/back.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
				<image src="/static/actIcon/record.png" mode="widthFix" style="width: 48rpx;height: 48rpx;"
					@click="goRecord"></image>
			</view>
			<!-- 导航栏 -->

			<view class="mt10 center flex-direction" ref="picture">
				<view v-if="pageData.show_status !==3 ">
					<view class="u-text-center f80 text-white center">
						{{pageData.goldenUser?pageData.goldenUser.price:0}}
						<text class="pl20" style="padding-left: 20rpx;"> {{ huobi }}</text>
					</view>


					<view class="flex-direction" style="margin-top: 19rpx;">
						<view
							style="background-color: #fff; padding: 0 40rpx;border-radius:35rpx; height: 69rpx;line-height: 69rpx;color: #F85050; font-size: 28rpx;">
							{{t('act.e_e1')}}<b class="pl10">{{(diffNum).toFixed(2)}}
								{{ huobi }}</b> {{t('act.e_e2')}}
						</view>
						<view class="u-text-center  text-white f24" style="margin-top: 28rpx;">
							{{showTime}} {{t('act.e_e3')}}
						</view>
					</view>

				</view>

				<view v-else>
					<view class="f50 center flex-direction" style="color: #fff;">
						<view class="u-text-center" style="width: 80%;">
							{{t('act.e_e4')}}
							{{pageData.goldenUser?pageData.goldenUser.price:0}} {{huobi}}!
						</view>
						<view class="mt20 f28"
							style="background-color: #fff; padding: 0 40rpx;border-radius:35rpx; height: 69rpx;line-height: 69rpx;color: #F85050;">
							{{t('act.e_e5')}}
						</view>
					</view>
				</view>

				<view class="" style="transform: translateX(-39rpx);">
					<image src="../../static/egg/egg.png" mode="widthFix" style="width: 730rpx;"></image>
				</view>

				<view class="" style="margin-top: -120rpx;z-index: 99;height: 100rpx;"
					v-if="pageData.show_status !== 3">
					<view class="center flex-direction text-white"
						style="background: linear-gradient(91deg, #EC4D14 0%, #DC2E22 99%);border-radius: 50rpx;padding: 20rpx 70rpx; height: 101rpx;color: #fff;box-shadow: #fff 0 0 7px 4px inset; "
						@click="openEggHandle" v-if="pageData.show_status !== 2">
						<view class="f36">{{t('act.e_e6')}}</view>
						<view class="f16 mt5">{{t('act.e_e7')}}
							{{pageData.goldenUser?pageData.goldenUser.num:0 }}
						</view>
					</view>
					<view class="center flex-direction text-white"
						style="background: linear-gradient(91deg, #EC4D14 0%, #DC2E22 99%);border-radius: 50rpx;padding: 20rpx 70rpx; height: 101rpx;color: #fff;box-shadow: #fff 0 0 7px 4px inset; min-width: 400rpx; "
						@click="withDraw" v-else>
						<view class="f36">{{t('index.i_a7')}}</view>
					</view>
				</view>

				<view class="botBox " style="margin-top: 105rpx;"
					:style="pageData.show_status == 3?{'margin-top': '55rpx'}:{'margin-top': '75rpx'}">
					<view class="u-text-center f28 text_bold ">
						{{t('act.e_e8')}}
					</view>

					<swiper :circular="true" :indicator-dots="false" :autoplay="true" :interval="2000" :duration="1000"
						:vertical="true" display-multiple-items="4"
						style=" width: 100% !important;height: 100% !important;" :disable-touch="true">
						<swiper-item class="swiperI" v-for="(item, index) in zhongjiangList" :key="index">
							<view class="swiperItem">
								<view>
									{{ item.user.filter_phone }}
								</view>
								<view>
									{{t('index.i_a4')}}
								</view>
								<view>
									{{ item.price }} {{ huobi }}
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>

				<view class="botBox " style="margin-top: 55rpx;">
					<view class="u-text-center f28 text_bold ">
					{{t('act.e_e9')}}
					</view>

					<view style="height: 100%;overflow: scroll; margin-top: 20rpx;">
						<view v-html="eggInfo.rules">
						</view>
					</view>
				</view>
			</view>

			<view class="rightFix center flex-direction u-text-center" @click="changePage">
				<image src="../../static/egg/gift.png" mode="widthFix" style="width: 33rpx;height: 33rpx;"></image>
				<view class="mt12" style="max-width: 100rpx;">
					{{t('act.e_e10')}}
				</view>
			</view>

			<view style="height: 50rpx;"></view>
			<!-- showMask -->
			<view class="mask flex-direction" v-if="showMask">
				<view class="maskContent ">
					<view class="u-text-center ">
						<view v-if="isOpenEgg">{{t('act.e_e11')}} {{maskData.price}} {{huobi}}</view>
						<view v-else>{{t('act.e_e11')}} {{pageData.goldenUser.num}} {{t('act.e_e12')}} <br>{{t('act.e_e13')}}
						</view>
					</view>

					<view class="center " :class="isOpenEgg?'mt110':'mt90'">
						<view class="center f28"
							style="background: url('../../static/egg/maskBtn.png') no-repeat 100%/100%;width: 185rpx;height: 185rpx;padding: 54rpx 59rpx 56rpx 61rpx;">
							<view v-if="isOpenEgg" @click="closeMaskHandle">{{t('all.a_c1')}}</view>
							<view v-else @click="closeMaskHandle" class="f12 u-text-center">{{t('act.e_e14')}}</view>
						</view>
					</view>
				</view>
				<view class="mt40" @click="closeMaskHandle">
					<image src="/static/closeBtn.png" mode="widthFix" style="width: 80rpx;height: 80rpx;"></image>
				</view>
			</view>
		</view>
	</view>
</template>


<script setup>
	import request from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	import useClipboard from 'vue-clipboard3'
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	const store = userStore();
	const {
		toClipboard
	} = useClipboard()
	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();

	const showMask = ref(false)
	const eggInfo = ref({})
	const huobi = ref("")
	const openEgg = ref(false)
	const zhongjiangList = ref([])
	const isOpenEgg = ref(false)
	const pageData = ref({})
	const canWithdraw = ref(false)

	const timer = ref(null)
	const times = ref(0)
	const showTime = ref("")
	const maskData = ref({})
	const isFir = ref(0)
	const diffNum = ref(0)

	const methods = {
		back() {
			history.back()
		}
	}
	const closeMaskHandle = () => {
		showMask.value = false

		if (isFir.value !== 0) {
			getData()
		}

	}

	const startTimer = () => {
		timer.value = setInterval(() => {
			if (times.value == 0) {
				clearTimeout(timer.value)
			} else {
				times.value--;
				changeTime(times.value)
			}
		}, 1000)

	}
	const changeTime = (num) => {
		let hours = addZero(parseInt(num / 3600))
		let minute = addZero(parseInt(num / 60 % 60))
		let second = addZero(num % 60)
		showTime.value = hours + ':' + minute + ":" + second
	}
	const addZero = (num) => {
		return num > 10 ? num : '0' + num
	}

	const getData = (id) => {
		request({
			url: '/activity/goldenEgg/info',
			methods: 'get',
			data: {
				goldenEggId: actId.value
			}
		}).then(res => {
			pageData.value = res
			eggInfo.value = res.goldenEggInfo
			// console.log(res);
			if (res.goldenUser.num > 0 && isFir.value == 0) {
				isFir.value = 2
				isOpenEgg.value = false
				showMask.value = true
			}
			if (timer.value) {
				clearTimeout(timer.value)
			}
			if ((res.goldenEggInfo.end_time - res.goldenEggInfo.start_time) > 0) {
				if (res.show_status !== 3) {
					times.value = parseInt((res.goldenEggInfo.end_time - res.goldenEggInfo.start_time) / 1000)
					startTimer()
				}
			}
			diffNum.value = res.goldenEggInfo.target_price - res.goldenUser.price
			if (res.show_status == 3) {
				canWithdraw.value = true
			}
			// for (let i = 0; i < 10; i++) {
			// 	zhongjiangList.value.push(res.logs[0])
			// }
			zhongjiangList.value = res.logs
		})
	}
	const openEggHandle = () => {

		if (pageData.value.goldenUser.num == 0) {

			Toast.text(t('act.e_e15'))

			return false
		}

		request({
			url: '/activity/goldenEgg/open',
			methods: "post",
			data: {
				goldenEggId: actId.value
			}
		}).then(res => {
			maskData.value = res
			isOpenEgg.value = true
			showMask.value = true
		}).catch(err => {
			Toast.text(err.message)
		})
	}
	const withDraw = () => {
		request({
			url: '/activity/goldenEgg/withdraw',
			methods: "post",
			data: {
				goldenEggId: actId.value
			}
		}).then(res => {
			Toast.text(t('index.i_a4'))
			getData()
		}).catch(err => {
			Toast.text(err.message)
		})
	}
	const changePage = () => {
		uni.navigateTo({
			url: "./share"
		})
	}
	const goRecord = () => {
		uni.navigateTo({
			url: "../record/eggRecord?id=" + actId.value
		})
	}
	const actId = ref(0)
	onLoad((e) => {
		if (e.id) {
			actId.value = e.id
			getData()
		} else {
			history.back()
		}
		huobi.value = uni.getStorageSync("currency")
	})
</script>


<style lang="scss" scoped>
	.mt110 {
		margin-top: 130rpx;
	}

	.mask {
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.8);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		display: flex;
		align-items: center;
		justify-content: center;

		.maskContent {
			width: 574rpx;
			height: 635rpx;
			margin-top: -250rpx;
			background: url('../../static/egg/mask.png') no-repeat 100%/100%;
			padding: 91rpx 50rpx 0 50rpx;
			// align-items: center;
			font-size: 40rpx;
			color: #F51B41;
		}

	}

	.rightFix {
		position: fixed;
		right: 0;
		top: 20vh;
		background-color: #fff;
		border-radius: 20rpx 0 0 20rpx;
		color: #F85050;
		font-size: 20rpx;
		padding: 10rpx 20rpx;
	}

	.center {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.botBox {
		width: 600rpx;
		height: 326rpx;
		background-color: #fff;
		border-radius: 20rpx;
		// background: url('../../static/egg/box.png') no-repeat 100%/100%;
		padding: 20rpx 24rpx 40rpx 22rpx;
		border: 20rpx solid #F85050;
		color: #F85050;
		font-size: 20rpx;
		overflow: hidden !important;
	}

	.swiperItem {
		display: flex;
		align-items: center;
		justify-content: space-between;
		// height: 80% ;
	}

	.swiperI {
		height: 75rpx !important;
		line-height: 75rpx !important;
	}

	.uni-modal__bd {
		word-break: keep-all !important;
	}

	.center {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.flex-direction {
		flex-direction: column;
	}

	.u-text-center {
		text-align: center;
	}

	.text-white {
		color: #fff;
	}
</style>
