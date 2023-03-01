<template>
	<view
		style="height: calc(100vh ) !important;overflow: hidden;background: url('static/actIcon/redElove/listBg1.png') no-repeat 100%/100%;">
		<view class="pdlr35 pt33">

			<view class="flex between">
				<image src="/static/actIcon/back.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:'#fff'}">{{t('act.r_r1')}} </view>
			<view style="padding: 0;">
				<z-paging class="mt54 " ref="paging" v-model="recordsList" @query="getData" width="100%" :fixed="true"
					:refresher-enabled="false" :to-bottom-loading-more-enabled="true" :auto-full-height="true"
					:auto-show-back-to-top="true" :empty-view-text="t('record.r_r1')"
					:loading-more-no-more-text="t('record.r_r1')" :empty-view-reload-text="t('record.r_r2')"
					:loading-more-loading-text="t('record.r_r4')" :loading-more-fail-text="t('record.r_r3')"
					style="margin: 250rpx auto 0;width: 100%;  ">
					<view class="listItem" v-for="(item, index) in recordsList" :key="index">
						<view class="vvItem">
							<view class="f26">{{t('act.r_r5')}}</view>
							<view class="" :style="{color:store.$state.contentColor}">
								{{item.price}} {{currency}}
							</view>
						</view>
						<view class="vvItem">
							<view class="f26">{{t('act.r_r6')}}</view>
							<view class="" :style="{color:store.$state.contentColor}">
								{{ item.createTime }}
							</view>
						</view>
					</view>
				</z-paging>
			</view>
		</view>
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
		getStorageSync
	} from '@dcloudio/uni-h5';
	const store = userStore();
	import {
		useI18n
	} from 'vue-i18n'

	const {
		t
	} = useI18n()
	const methods = {
		back() {
			history.back()
		},

	};
	const recordsList = ref([])
	const paging = ref(null)
	const pages = ref({
		page: 1,
		size: 10
	})
	const getData = (page) => {
		pages.value.page = page
		request({
			methods: 'get',
			url: 'activity/prizePackage/log',
			data: pages.value
		}).then(res => {
			paging.value.complete(res.data);
			pages.value.page += 1
		})
	}
	const currency = ref("")
	// 终于可以用了
	onLoad(() => {
		currency.value = uni.getStorageSync('currency')
	})
</script>

<style lang="scss">
	.listItem {
		background: #fff;
		border-radius: 20rpx;
		padding: 4rpx 45rpx 34rpx 45rpx;
		margin-bottom: 30rpx;
		font-size: 28rpx;
		width: 600rpx;
		margin: 30rpx auto;

		.vvItem {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 29rpx;
		}

		.pass {
			color: #5db760;
		}

		.error {
			color: #f5564b;
		}

		.cancle {
			color: #AFAFAF;
		}
	}
</style>
