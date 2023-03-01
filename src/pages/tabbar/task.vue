<template>
	<view :style="store.$state.imgObj.loginBg">

		<view class="pdlr35 pt38">
			<view class="f50  text_bold" :style="{color:store.$state.secondColor}">{{t('tabbar.t_t3')}}</view>
			<view class="notice " style="background-color: #fff;" dir="ltr">
				<nut-noticebar :text="commsionText" :left-icon="store.$state.imgObj.labaIcon"
					background="rgba(251, 248, 220, 0)" :color="store.$state.contentColor" :scrollable="true">
				</nut-noticebar>
			</view>

			<view class="mt30 flex vipBox col_center">

				<view class="center vipItem" :style="{background:store.$state.contentColor}">
					<image :src="store.$state.task.vip" mode="widthFix" style="width: 62rpx;height: 52rpx;"></image>
					<view class="mglr23">
						{{userData.vip?userData.vip.name:''}}
					</view>
				</view>
				<view class="mglr27">{{t('mine.t_t9')}} {{userData.vip?(userData.vip.rate *100).toFixed(2)+'%':''}}
				</view>
			</view>

			<view class="mt41 between wrap">
				<view class="flex botItem row_center col_center" v-for="item in botList">
					<!-- <image :src="item.img"  mode="widthFix" style="width: 74rpx;height: 74rpx;"></image> -->
					<view class="mglr24">
						<view class="f20 textHidden" style="height: 60rpx;"> {{item.name}}</view>
						<view class="f32 mt20 text_bold text_center" :style="{color:store.$state.contentColor}">
							{{item.value}}
						</view>
					</view>
				</view>
			</view>

			<view class="btns " :style="topStyle" style="margin-top: 200rpx;">
				{{t('mine.t_t4')}} {{pageData.rest_task}}
			</view>



			<view class="btns mt28" v-if="pageData.buttonStatus ==0" :style="choStyle" @click="getTask">
				{{t('mine.t_t5')}}
			</view>
			<view class="btns mt28" v-if="pageData.buttonStatus ==1" :style="noStyle" @click="changePage('./record')">
				{{t('mine.t_t6')}}
			</view>
			<view class="btns mt28" v-if="pageData.buttonStatus ==2" :style="noStyle">
				{{t('mine.t_t7')}}
			</view>
			<view class="btns mt28" v-if="pageData.buttonStatus ==3" :style="noStyle">
				{{t('mine.t_t8')}}
			</view>
			<!-- 按钮状态 0.可以获取任务 1.有待完成任务 2.推荐下一级vip  3.任务已全部完成,请明天再来 -->
			<!-- -->
			<nut-overlay v-model:visible="showMask" :close-on-click-overlay="false" v-if="maskData.goods">
				<view class="wrapper">
					<view class="content">
						<view class="text_center pt20 f40">
							{{maskData.status == 0?'payment successful':maskData.status == 2?'payment failed':''}}
							<!-- //状态 0.成功 2.支付失败，余额不足 -->
						</view>
						<view class=" recordItem f24">

							<view class="colorF mt17">
								{{t('record.r_r6')}} : {{maskData.order_no}}
							</view>
							<view class="flex mt24 ">
								<view class="imgBg center">

									<image :src="maskData.goods.pic" mode="scaleToFill"
										style="width: 100%;height: 100%;border-radius: 20rpx; border: 2rpx solid #AFAFAF;">
									</image>

								</view>

								<view class="mglr27 flex flex-col " style="align-content: space-around; width: 65%;">
									<view class="textHidden" style="height: 60rpx;">{{maskData.goods.name}} </view>
									<view class="between" style="margin-top: 50rpx;">
										<view> {{maskData.order_price}} {{currency}}</view>
										<view>×1</view>
									</view>
								</view>
							</view>

							<view class=" mt30 between">
								<view class="">
									{{t('record.r_r7')}}
								</view>
								<view class="">
									{{(maskData.rate *100).toFixed(2) +'%'}}
								</view>
							</view>
							<view class=" mt30 between">
								<view class="">
									{{t('record.r_r8')}}
								</view>
								<view class="f30" :style="{color:store.$state.contentColor}">
									{{maskData.commission}} {{currency}}
								</view>
							</view>
							<!-- v-if="maskData.status == 2" -->
							<view class=" mt30 maskBtns f30" :style="{background:store.$state.contentColor}"
								v-if="maskData.status == 2" @click="changePage('./recharge')">
								{{t('tabbar.t_t4')}}
							</view>
						</view>
						<view class="closeBtn" @click="closeHandle" :style="maskData.status == 2?{bottom:'-280rpx'}:''">
							<image src="../../static/closeBtn.png" mode="widthFix" style="width: 70rpx;height: 70rpx;">
							</image>
						</view>
					</view>

				</view>
			</nut-overlay>
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
		onLoad
	} from "@dcloudio/uni-app";
	const store = userStore();
	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();


	const showLoading = ref(null)
	const choStyle = {
		background: store.$state.contentColor,
		color: '#fff'
	}

	const noStyle = {
		background: '#fff',
		color: store.$state.contentColor,
		'box-shadow': 'none'
	}

	const topStyle = {
		background: store.$state.secondColor,
		color: "#fff",
		'box-shadow': 'none'
	}

	const botList = ref([{
			name: t('mine.m_t4'),
			img: store.$state.task.t1,
			value: '$ 0.00'
		},
		{
			name: t('wr.w_a2'),
			img: store.$state.task.t2,
			value: '$ 0.00'
		},
		{
			name: t('mine.t_t1'),
			img: store.$state.task.t3,
			value: '$ 0.00'
		},
		{
			name: t('mine.t_t2'),
			img: store.$state.task.t4,
			value: ' 0'
		},
	])
	// 　const { t } = useI18n()
	const userData = ref({})
	const pageData = ref({})
	const getData = () => {
		request({
			url: 'task/index',
			methods: 'get',
		}).then(res => {
			userData.value = res.user
			botList.value[0].value = res.user.balance + " " + currency.value
			botList.value[1].value = res.user.job_balance + " " + currency.value
			botList.value[2].value = res.user.total_commission + " " + currency.value
			botList.value[3].value = res.user.deal_count
			pageData.value = res


		})
	}
	const changePage = (url) => {

		if (showMask.value) {
			showMask.value = false
		}
		uni.reLaunch({
			url
		})
	}
	const getTask = () => {
		if (pageData.value.order) {
			return false
		}
		showLoading.value.loading = true
		setTimeout(() => {
			getTask1()
		}, 2000)
	}
	const getTask1 = () => {

		// 领取任务
		request({
			url: 'task/grab',
			methods: 'post',
		}).then(res => {
			try {
				maskData.value.goods.pic = ""
			} catch (e) {
				//TODO handle the exception
			}
			showLoading.value.loading = false
			maskData.value = res.order
			maskData.value.status = res.status
			// maskData.value.status = 2
			showMask.value = true
		}).catch(err => {
			showLoading.value.loading = false
			Toast.text(err.message)
		})
	}
	const showMask = ref(false)
	const currency = ref("")
	let maskData = ref({})

	const closeHandle = () => {
		showMask.value = false
		getData()
	}
	// 收益列表
	const commsionText = ref("")
	const getList = () => {
		request({
			url: 'home/taskProfit',
			methods: 'get'
		}).then(res => {
			let str = ""
			for (let i = 0; i < res.length; i++) {
				str += res[i].phone + " " + t('mine.t_t3') + " " + res[i].amount + currency.value + ";"
			}
			commsionText.value = str
		})
	}
	// 终于可以用了
	onShow(() => {
		getData();

	})
	onLoad(() => {
		currency.value = uni.getStorageSync('currency')
		getList()
	})
</script>

<style lang="scss">
	.notice {
		padding: 10rpx 0;
		background-color: #fff;
		border-radius: 20rpx;
		margin-top: 34rpx;
		font-size: 28rpx;
		box-shadow: 0px 1px 51px 0px rgba(64, 46, 197, 0.05);
	}

	.vipBox {
		height: 114rpx;
		background: #FEF3DE;
		border-radius: 30rpx;
		overflow: hidden;

		.vipItem {
			border-radius: 30rpx;
			width: 244rpx;
			height: 100%;
			color: #fff;
		}
	}

	.botItem {
		background-color: #fff;
		border-radius: 30rpx;
		margin-bottom: 30rpx;
		width: 40%;
		position: relative;
		padding: 53rpx 21rpx;

		.img {
			position: absolute;
			left: 20rpx;
			bottom: 20rpx;
		}
	}

	.btns {
		box-shadow: 0px 11px 47px 4px rgba(247, 175, 64, 0.35);
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		border-radius: 35rpx;
	}

	.maskBtns {
		box-shadow: 0px 11px 47px 4px rgba(247, 175, 64, 0.35);
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		border-radius: 20rpx;
		color: #fff;
	}

	.wrapper {
		display: flex;
		height: 100%;
		padding: 0 30rpx;

		.content {
			margin-top: 200rpx;
			height: 450rpx;
			width: 100%;
			background: #fff;
			border-radius: 8px;
			position: relative;
		}

		.closeBtn {
			position: absolute;
			bottom: -130rpx;
			right: 50%;
			transform: translateX(50%);
		}
	}

	.recordItem {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 26rpx 25rpx;

		.imgBg {
			width: 160rpx;
			height: 160rpx;
			border-radius: 20rpx;
		}
	}

	.textHidden {
		-webkit-line-clamp: 2;
	}
</style>
