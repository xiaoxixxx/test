<template>
	<view class="">

		语言选择列表

		<view class="pdlr50 pt33">

			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.secondColor}">Recharge</view>
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


	// 　const { t } = useI18n()
	const methods = {
		back() {
			history.back()
		},

	};

	// 终于可以用了
	onShow(() => {
		console.log();
	})
</script>

<style lang="scss">

</style>
