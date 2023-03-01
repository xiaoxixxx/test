<template>
	<view  style="height: calc(100vh ) !important;overflow: hidden;background: url('static/actIcon/redElove/listBg1.png') no-repeat 100%/100%;">

		<view class="pdlr50 pt33">

			<view class="flex between">
				<image src="/static/actIcon/back.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
				
				<image src="/static/actIcon/record.png" mode="widthFix"
					style="width: 48rpx;height: 48rpx;" @click="methods.changePage"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:'#fff'}">{{t('act.r_r7')}}</view>

			<view class="mt80">
				<view class="kefuItem flex col_center" v-for="item in dataList" @click="changePage(item)">
					<image src="/static/actIcon/redElove/hList.png" mode="widthFix" style="width: 80rpx;height: 80rpx;">
					</image>
					<view class="mglr40 f34">
						{{item.title}}
					</view>
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
	// import {
	// 	Toast
	// } from '@nutui/nutui';
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
		changePage(url) {
			uni.navigateTo({
				url: "../record/redRecord"
			})
		},
	};
	const dataList = ref([])
	const getData = () => {
		request({
			url: 'activity/prizePackage/list',
			methods: 'get'
		}).then(res => {
			dataList.value = res
		})
	}
	const changePage = (item) => {
		uni.navigateTo({
			url: "./redEnvelope?id=" + item.id
		})
	}
	// 终于可以用了
	onShow(() => {
		getData();
	})
</script>

<style lang="scss">
	.kefuItem {
		background-color: #fff;
		border-radius: 20rpx;
		margin-bottom: 40rpx;
		padding:30rpx ;
	}
</style>
