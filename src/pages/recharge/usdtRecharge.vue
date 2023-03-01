<template>
	<view :style="store.$state.imgObj.loginBg">

		<view class="pdlr35 pt33 pb50 ">

			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.secondColor}">{{t('wr.r_r1')}}</view>
			<view class="mt55">

				<view class="mt47 flex">
					<image src="../../static/themeNum1/wr/rechargeDor.png" mode="widthFix"
						style="width: 65rpx;height: 51rpx;"></image>
					<view class="mglr27" :style="{color:store.$state.secondColor}">
						{{t('wr.r_r14')}}
					</view>
				</view>
				<view class="mainBox">
					<view class="flex">
						<view class="short">{{currency}}</view>
						<input type="number"  placeholder-class="plo" focus :placeholder="t('mine.m_s7')" v-model="inputNum">
					</view>

					<view class="flex mt30">
						<view class="short">USDT</view>
						<input type="number"  style="color: #F65E5E;" disabled
							:value="((inputNum?inputNum:0 ) * pageData.rate).toFixed(2)">
					</view>

					<view class="mt44">
						<view class="tips">
							{{t('wr.r_r15')}} : {{ pageData.min+ currency}} - {{ pageData.max+ currency}}
						</view>
					</view>
				</view>


				<view class="btns" :style="choStyle" @click="goOrder">
					{{t('wr.r_r3')}}
				</view>
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
	};
	const pageData = ref({
		rate: 0
	})
	const inputNum = ref("")
	const choStyle = {
		background: store.$state.contentColor,
		color: '#fff'
	}
	const showLoading = ref(null)
	const goOrder = () => {
		if ((inputNum.value - 0) < (pageData.value.min - 0) || (inputNum.value - 0) > (pageData.value.max - 0)) {
			Toast.text(t('wr.r_r16'))
			return false
		}
		showLoading.value.loading = true
		setTimeout(() => {
			goOrder1()
		}, 2000)
	}
	const goOrder1 = () => {


		const data = {
			amount: inputNum.value
		}
		request({
			url: 'finance/usdt/recharge/submit',
			methods: 'post',
			data: data
		}).then(res => {
			showLoading.value.loading = false
			uni.navigateTo({
				url: './usdtOrder'
			})
		}).catch(err => {
				showLoading.value.loading = false
			uni.showToast({
				title: err.message,
				icon: 'none'
			})
		})
	}
	const getData = () => {
		request({
			url: 'finance/usdt/recharge/index',
			methods: 'get'
		}).then(res => {
			if (res.order) {
				uni.navigateTo({
					url: './usdtOrder'
				})
				return false
			}
			pageData.value = res
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
	.mainBox {
		margin-top: 36rpx;
		border-radius: 30rpx;
		padding: 32rpx 57rpx;
		font-size: 28rpx;
		background-color: #fff;

		.flex {
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid #eee;
			padding: 30rpx 0;

			.short {
				width: 30%;
				text-align: center;
				font-weight: bold;
			}

			input {
				margin-left: 30rpx;
				font-size: 30rpx;
				font-weight: bold;
			}
		}

		.tips {
			background-color: #F0F0F0;
			border-radius: 10rpx;
			padding: 20rpx;
			font-size: 20rpx;
			width: auto;
			color: #AFAFAF;
			display: inline-block;
		}
	}

	.btns {
		margin-top: 200rpx;
		box-shadow: 0px 11px 47px 4px rgba(247, 175, 64, 0.35);
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		border-radius: 35rpx;
	}
</style>
