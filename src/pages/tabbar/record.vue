<template>
	<view :style="store.$state.imgObj.recBg" style="height: calc(100vh - 120rpx) !important;overflow: hidden;">

		<view class="pdlr30 pt38">

			<view class="f50  text_bold" :style="{color:store.$state.secondColor}">{{t('record.r_r10')}}</view>

			<view class=" between f28 mt40" style="background-color: #fff;border-radius: 20rpx">
				<view v-for="(item,index) in staList" class="staItem" :style="pages.status == index?choStyle:''"
					@click="tabsChange(index)">
					{{item}}
				</view>
			</view>

			<z-paging class="mt54 " ref="paging" v-model="recordList" @query="getData" width="100%" :fixed="true"
				:refresher-enabled="false" :to-bottom-loading-more-enabled="true" :auto-full-height="true"
				:auto-show-back-to-top="true" :empty-view-text="t('record.r_r1')" :auto="false"
				:loading-more-no-more-text="t('record.r_r1')" :empty-view-reload-text="t('record.r_r2')"
				:loading-more-loading-text="t('record.r_r4')" :loading-more-fail-text="t('record.r_r3')"
				style="margin: 250rpx auto 0;width: 100%; " :loading-more-default-text="t('record.r_r3')">
				<view class="mt30 recordItem f24" v-for="(item,index) in recordList">
					<view class="colorF">
						{{t('record.r_r5')}} :{{item.create_time_format}}
					</view>
					<view class="colorF mt17">
						{{t('record.r_r6')}} : {{item.order_no}}
					</view>
					<view class="flex mt24 ">
						<view class="imgBg center">
							<image :src="item.goods.pic" mode="scaleToFill"
								style="width: 100%;height: 100%;border-radius: 20rpx; border: 2rpx solid #AFAFAF;">
							</image>
						</view>

						<view class="mglr27 flex flex-col " style="align-content: space-around; width: 65%;">
							<view class="textHidden">{{item.goods.name}} </view>
							<view class="between" style="margin-top: 30rpx;">
								<view> {{item.order_price}} {{currency}}</view>
								<view>×1</view>
							</view>
						</view>
					</view>

					<view class=" mt30 between">
						<view class="">
							{{t('record.r_r7')}}
						</view>
						<view class="">
							{{(item.rate *100).toFixed(2) +'%'}}
						</view>
					</view>
					<view class=" mt30 between">
						<view class="">
							{{t('record.r_r8')}}
						</view>
						<view class="f30" :style="{color:store.$state.contentColor}">
							{{item.commission}} {{currency}}
						</view>
					</view>
					<!-- -->
					<view class="btns mt34" :style="{background:store.$state.contentColor}" v-if="item.status ==1"
						@click="getOrderInfo(item.order_no)">
						submit orders
					</view>
				</view>

			</z-paging>
		</view>

		<view style="height: 50rpx;">

		</view>

		<nut-overlay v-model:visible="showMask" :close-on-click-overlay="false">
			<view class="wrapper">
				<view class="content">
					<view class="text_center pt20 f40">
						order details
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
								<view class="textHidden">{{maskData.goods.name}} </view>
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
								{{(maskData.rate *100 ).toFixed(2)+'%'}}
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
						<view class="mt30 between">
							<view class="">
								Recharge required
							</view>
							<view class="f30" :style="{color:store.$state.contentColor}">
								{{maskData.need_recharge}} {{currency}}
							</view>
						</view>
						<!-- v-if="maskData.status == 2" -->
						<view class=" mt30 maskBtns f30" :style="{background:store.$state.contentColor}"
							v-if=" maskData.need_recharge > 0  && maskData.status  ==1"
							@click="changePage('./recharge')">
							{{t('tabbar.t_t4')}}
						</view>
						<!-- v-if="maskData.status == 2" -->
						<view class=" mt30 maskBtns f30" :style="{background:store.$state.contentColor}" v-else
							@click="submitHandle(maskData)">
							submit orders
						</view>
					</view>
					<view class="closeBtn" @click="showMask = false">
						<image src="../../static/closeBtn.png" mode="widthFix" style="width: 70rpx;height: 70rpx;">
						</image>
					</view>
				</view>

			</view>
		</nut-overlay>
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
	const methods = {
		back() {
			history.back()
		},
	};
	const staList = [
		t('all.a_c7'),
		t('all.a_c8'),
		t('all.a_c9'),
		t('all.a_c10'),
	]

	const choStyle = {
		background: store.$state.contentColor,
		color: '#fff',
		borderRadius: "20rpx"
	}
	const tabsChange = (ind) => {
		pages.value.status = ind
		pages.value.page = 1
		paging.value.clean() //清空数组
		showLoading.value.loading = true

		setTimeout(() => {
			getData()
		}, 1000)
	}

	const pages = ref({
		status: 0,
		page: 1,
		size: 10
	})
	const showLoading = ref(null)
	const paging = ref(null)
	const hasMore = ref(true)


	const getData = page => {
		pages.value.page = page
		if (page == 1) {
			try {
				paging.value.clean()
			} catch (e) {
				//TODO handle the exception
			}
		}
		request({
			url: 'task/record',
			methods: 'get',
			data: pages.value
		}).then(res => {
			showLoading.value.loading = false
			paging.value.complete(res.data);
			pages.value.page += 1
		}).catch(err => {
			Toast.text(err.message)
			showLoading.value.loading = true
		})
	}

	const submitHandle = (item) => {
		showLoading.value.loading = true
		setTimeout(() => {
			showMask.value = false
			submitHandle1(item)
		}, 1500)
	}
	const submitHandle1 = item => {
		const data = {
			order_no: item.order_no
		}
	
		request({
			url: 'task/finishOrder',
			methods: 'post',
			data
		}).then(res => {
			showLoading.value.loading = false
			Toast.text(t('record.r_r11'))
			pages.value.page = 1
			pages.value.status = 0
			paging.value.clean()
			getData()
		}).catch(err => {
			showLoading.value.loading = false
			Toast.text(err.message)
		})

	}
	const recordList = ref([])
	const currency = ref("")

	const maskData = ref({
		goods: {
			pic: ""
		}
	})
	const showMask = ref(false)
	const getOrderInfo = id => {
		const data = {
			order_no: id
		}
		request({
			url: 'task/detail',
			methods: 'get',
			data
		}).then(res => {
			maskData.value = res
			showMask.value = true
			// maskData.value.status = 2
			// maskData.value.need_recharge = 20
		})
	}
	const changePage = (url) => {
		if (showMask.value) {
			showMask.value = false
		}
		uni.switchTab({
			url
		})
	}
	// 终于可以用了
	onShow(() => {
		currency.value = uni.getStorageSync('currency')
		getData(1)
	})
</script>

<style lang="scss">
	.staItem {
		width: 25%;
		text-align: center;
		color: #999999;
		padding: 27rpx 0;
	}

	.recordItem {
		background: #fff;
		border-radius: 20rpx;
		padding: 34rpx 45rpx 34rpx 45rpx;
		margin-bottom: 30rpx;
		font-size: 28rpx;
		width: 600rpx;
		margin: 30rpx auto;

		.imgBg {
			width: 160rpx;
			height: 160rpx;
			border-radius: 20rpx;
		}
	}



	.colorF {
		color: #AFAFAF;
		font-size: 20rpx;
	}

	.btns {
		width: 100%;
		height: 100rpx;
		border-radius: 20rpx;
		color: #fff;
		line-height: 100rpx;
		text-align: center;
		font-size: 30rpx;
	}

	.textHidden {
		-webkit-line-clamp: 4;
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
			// position: absolute;
			// bottom: -330rpx;
			// right: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			// transform: translateX(50%);
		}
	}


	.maskBtns {
		box-shadow: 0px 11px 47px 4px rgba(247, 175, 64, 0.35);
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		border-radius: 20rpx;
		color: #fff;
	}
</style>
