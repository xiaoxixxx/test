<template>
	<view class="wrap" style="background: url(/static/actIcon/redElove/redBg.png) no-repeat 100%/100%;">
		<!-- 导航栏 -->
		<view class="pdlr50 pt33">
			<view class=" between">
				<image src="/static/actIcon/back.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>

			</view>
		</view>
		<!-- start -->
		<view class="open" @click="openHandle" :style="{ top: newTop + 'vh' }">OPEN</view>

		<view class="botList" v-if="botBoxData.length > 0">
			<view class="title textHidden">{{t('act.r_r1')}}</view>
			<swiper class="scroData mt10" :autoplay="true" :interval="4000" :duration="1500" :disable-touch="true"
				:vertical="true" :circular="true">
				<swiper-item v-for="(ite, ind) in botBoxData" :key="ind">
					<view class="mb10 center scrollItem " v-for="(item, index) in ite" :key="index">
						<view class="">
							{{ item.phone +" " + t('act.r_r2') }}
							<text style="color: red;">{{ item.price }}{{ currency + ' ' }}</text>
						</view>
						<view class="">{{ item.create_time }}</view>
					</view>
				</swiper-item>
			</swiper>

			<view class="text_center mt40 pb50 pdlr30 f30 text_bold" style="background-color: #fb2848; color: #fff;">
				{{t('act.r_r3')}}
				<view class="mt20" v-html="pageData.info?pageData.info.rules:''"></view>
			</view>
		</view>

		<view v-if="showMask" class="mask center" style="flex-direction: column;">
			<view class="mask_content"
				style="background: url(/static/actIcon/redElove/redMask.png) no-repeat 100%/100%">
				<view class="mainInfo"> {{t('act.r_r4')}} {{ maskMsg }} {{currency}}</view>
			</view>
			<view class="mt30">
				<image src="../../static/closeBtn.png" mode="widthFix" style="width: 80rpx;" @click="showMask = false">
				</image>
			</view>
		</view>
		<Loading ref="showLoading"></Loading>
	</view>
</template>


<script setup>
	import request from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	// import {
	// 	Toast
	// } from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	import {
		Toast
	} from '@nutui/nutui';
	const store = userStore();
	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();

	const pageData = ref({}) //红包信息
	const maskMsg = ref({}) //红包开单结果
	const botBoxData = ref([]) //底部数据
	const showMask = ref(false) //弹窗
	const newTop = ref('35')

	const methods = {
		back() {
			history.back()
		},
		changePage(url) {
			uni.navigateTo({
				url: "../record/redRecord"
			})
		},
	};
	const showLoading = ref(null)
	const openHandle = () => {
		showLoading.value.loading = true
		setTimeout(() => {
			openHandle1()
		}, 1000)
	}
	const openHandle1 = () => {
		if (pageData.value.authCheck.get_status == 0) {
			showLoading.value.loading = false
			Toast.text(pageData.value.authCheck.tips)
			return false
		}

		request({
			url: 'activity/prizePackage/open',
			methods: 'post',
			data: {
				id: redId.value
			}
		}).then(res => {
			showLoading.value.loading = false
			showMask.value = true
			maskMsg.value = res.price
			getBotData()
		}).catch(err => {
			showLoading.value.loading = false
			Toast.text(err.message)
		})
	}
	const chunk = (array, size) => {
		//获取数组的长度，如果你传入的不是数组，那么获取到的就是undefined
		const length = array.length;
		//判断不是数组，或者size没有设置，size小于1，就返回空数组
		if (!length || !size || size < 1) {
			return [];
		}
		//核心部分
		let index = 0; //用来表示切割元素的范围start
		let resIndex = 0; //用来递增表示输出数组的下标

		//根据length和size算出输出数组的长度，并且创建它。
		let result = new Array(Math.ceil(length / size));
		//进行循环
		while (index < length) {
			//循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
			result[resIndex++] = array.slice(index, (index += size));
		}
		//输出新数组
		return result;
	}
	const title = ref("")

	// 获取数据
	const redId = ref("")
	const getBotData = () => {

		request({
			url: 'activity/prizePackage/info',
			methods: 'get',
			data: {
				id: redId.value
			}
		}).then(res1 => {
			pageData.value = res1
			botBoxData.value = chunk(res1.logs, 4)


		})
	}
	const currency = ref("")
	// 终于可以用了
	onLoad((e) => {
		redId.value = e.id
		getBotData()
		currency.value = uni.getStorageSync("currency")
		uni.getSystemInfo({
			success: res => {
				if (res.windowHeight > 810) {
					newTop.value = 38;
				} else if (res.windowHeight <= 810 && res.windowHeight >= 710) {
					newTop.value = 38;
				} else if (res.windowHeight < 710 && res.windowHeight >= 610) {
					newTop.value = 35.5;
				} else {
					newTop.value = 28;
				}
			}
		});
	})
</script>


<style lang="scss" scoped>
	.mask {
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.8);
		position: fixed;
		top: 0;
		z-index: 99;

		.mask_content {
			width: 640rpx;
			height: 550rpx;
			margin-top: -250rpx;
			color: red;
			position: relative;

			.mainInfo {
				position: absolute;
				left: 0;
				right: 0;
				margin: 0 auto;
				text-align: center;
				top: 100rpx;
				font-size: 35rpx;
				font-weight: bold;
				width: 300rpx;
				text-align: center;
			}
		}

		.maskBtn {
			width: 220rpx;
			height: 80rpx;
			background: #ffdc30;
			border-radius: 40rpx;
		}
	}

	.wrap {
		height: 100vh;
	}

	.open {
		position: absolute;
		width: 150rpx;
		// height: 150rpx;
		border-radius: 50%;
		left: 0;
		right: 0;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 100%;
		color: red;
		font-weight: bold;
	}

	.botList {
		position: absolute;
		bottom: 0;
		height: 36vh;
		width: 100%;

		.title {
			padding: 30rpx 40rpx;
			width: 400rpx;
			margin: 0 auto 30rpx;
			line-height: 100%;
			border-radius: 20rpx;
			background-color: #fec84a;
			color: #fff;
			font-size: 30rpx;
			text-align: center;
		}
	}

	.scrollItem {
		// width: 100%;
		background-color: #fff;
		height: 40rpx !important;
		border-radius: 20rpx;
		padding: 20rpx;
		line-height: 100%;
	}

	.scroData {
		margin-top: 20rpx;

		padding: 0 60rpx;
		height: 70%;
		overflow-y: scroll;
	}

	.lines {
		width: 44rpx;
		height: 2rpx;
		background-color: #d9d9d9;
	}
</style>
