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

					<input class="inp" :placeholder="t('inp.i_s3')" placeholder-class="colorC"
						v-model="formData.txid">
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
		saveHandle() {
			Toast.text(t('inp.i_s2'));
			uni.switchTab({
				url:'../tabbar/index'
			})
		},
	};


	const formData = ref({
		txid: ''
	})

	// 终于可以用了
	onShow(() => {
		console.log();
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
