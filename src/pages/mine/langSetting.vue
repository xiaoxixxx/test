<template>
	<view :style="store.$state.imgObj.loginBg">

		<view class="pdlr35 pt33">

			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.secondColor}">	{{t('all.a_c3')}}</view>

			<view class="mt80">
				<view class="kefuItem flex col_center" v-for="(item,index) in langList" @click="langInd = index"
					:style="langInd == index?choStyle:''">
					<image :src="`/static/lang/${item.lang}.png`" mode="widthFix" style="width: 60rpx;height: 60rpx;"></image>
					<view class="mglr40 f40">
						{{item.name}}
					</view>
				</view>

				<view class="btns f40" :style="{background:store.$state.contentColor}" @click="setHandle">
					{{t('all.a_c1')}}
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

	};
	const choStyle = {
		background: store.$state.contentColor,
		color: '#fff'
	}
	const langList = ref([])
	const langInd = ref(0)
	const getData = () => {

		request({
			url: 'setting/lang',
			methods: 'get',
		}).then(res => {
			let langVal = uni.getStorageSync('lang')
			langList.value = res
			langList.value.forEach((item,index)=>{
				if(langVal == item.lang){
					langInd.value = index
				}
			})
		})
	}
	const setHandle = () => {
		uni.setStorageSync('lang', langList.value[langInd.value].lang)
		history.go(0)
		// window.open(item.contact_link)
	}
	// 终于可以用了
	onShow(() => {
		
		getData();
	})
</script>

<style lang="scss">
	.kefuItem {
		background-color: #fff;
		border-radius: 30rpx;
		margin-bottom: 40rpx;
		padding: 35rpx 30rpx;
		transition: .3s linear all;
	}

	.btns {
		margin-top: 200rpx;
		text-align: center;
		height: 120rpx;
		box-shadow: 0px 11rpx 47rpx 4rpx rgba(247, 175, 64, 0.35);
		border-radius: 35rpx;
		color: #fff;
		line-height: 120rpx;
	}
</style>
