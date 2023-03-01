<template>
	<view :style="store.$state.imgObj.loginBg">

		<view class="pdlr35 pt33">

			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;" @click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.secondColor}">{{pageData.name}}</view>
			<view class="mt40">
				<view v-html="pageData.contents"></view>
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


	// 　const { t } = useI18n()
	const methods = {
		back() {
			history.back()
		},

	};
	const pageData = ref({})
	const getData  = (data)=>{
		
		request({
			url: 'page/article/detail',
			methods: 'get',
			data
		}).then(res => {
			pageData.value = res
		})
	}

	// 终于可以用了
	onShow(() => {
		getData
	})
	onLoad((e)=>{
		const data = {
			id:e.id
		}
		getData(data)
	})
</script>

<style lang="scss">

</style>
