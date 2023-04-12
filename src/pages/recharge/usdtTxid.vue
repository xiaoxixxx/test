<template>
	<view :style="store.$state.imgObj.loginBg">

		<view class="pdlr35 pt33" :style="{color:store.$state.secondColor}">

			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.secondColor}">{{t('wr.r_r1')}}</view>

			<view class="mt59">
				<view class="pl14">
					Txid
				</view>
				<view class="mt34">

					<input class="inp" :placeholder="t('inp.i_s3')" placeholder-class="colorC" v-model="formData.tx_id">
				</view>


				<view class="pl14 mt59">
					Certificate
				</view>
				<view class="mt34 flex">

					<nut-uploader :url="uploadHost +'api/uploads'" name="cert" type="image/jpeg"
						@success="successHandle" style="border-radius: 20rpx;"></nut-uploader>

					<view class="ml40" v-if="showImg">
						<image :src="uploadHost+ formData.cert"
							style="width: 200rpx;height: 200rpx;border-radius: 20rpx;"></image>
					</view>
				</view>
			</view>

			<!-- 登录按钮 -->
			<view class="btns f36" :style="{background:store.$state.contentColor}" @click="methods.saveHandle">
				{{t('inp.i_s1')}}
			</view>
			<view style="height: 50rpx;"></view>
		</view>
	</view>
</template>

<script setup>
	import request from '../../../comm/request.ts';

	import {
		userStore
	} from "@/store/themeNum.js";
	import {
		Toast,
		Locale
	} from '@nutui/nutui';
	import enUS from '@nutui/nutui/dist/packages/locale/lang/en-US';
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
		saveHandle() {
			request({
				url: '/finance/usdt/recharge/cert',
				methods: 'post',
				data: {
					...formData.value
				}
			}).then(res => {
				Toast.text(t('inp.i_s2'))
				setTimeout(() => {
					uni.switchTab({
						url: '../tabbar/index'
					})
				}, 500)
			}).catch(err => {
				Toast.text(err.message)
			})
		},
	};
	const uploadHost = ref("")

	const showImg = ref(false)
	const getData = () => {
		request({
			url: 'finance/usdt/recharge/index',
			methods: 'get'
		}).then(res => {
			if (!res.order) {
				uni.switchTab({
					url: '../tabbar/index'
				})
				return false
			}
			uploadHost.value = res.upload_host

			try {
				formData.value.tx_id = res.order.tx_id
				formData.value.order_no = res.order.order_no
				formData.value.cert = res.order.cert
				if (res.order.cert) {
					showImg.value = true
				}
			} catch (e) {
				//TODO handle the exception
			}
		})
	}

	const successHandle = (responseText, option, fileItem) => {
		showImg.value = false
		formData.value.cert = JSON.parse(responseText.responseText).data
	}

	const formData = ref({
		tx_id: '',
		order_no: "",
		cert: ""
	})

	// 终于可以用了
	onShow(() => {
		Locale.use('en-US', enUS);
		getData();
	})
</script>

<style lang="scss">
	.colorC {
		color: #AFAFAF !important;
	}

	.btns {
		text-align: center;
		line-height: 120rpx;
		color: #fff;
		height: 120rpx;
		background: #F5B04C;
		box-shadow: 0rpx 11rpx 47rpx 4rpx rgba(247, 175, 64, 0.35);
		border-radius: 35rpx;
		margin-top: 76rpx;
	}
</style>
