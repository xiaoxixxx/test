<template>
	<view :style="store.$state.imgObj.loginBg">

		<view class="pdlr35 pt33" :style="{color:store.$state.secondColor}">

			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.secondColor}">{{t('inp.a_c1')}}
			</view>



			<view class="mt59">
				<view class="pl14">
					{{t('inp.a_c2')}}
				</view>
				<view class="mt34">
					<input class="inp" placeholder-class="plo" :placeholder="t('inp.a_c3')"
						v-model="formData.consignee">
				</view>
			</view>

			<view class="mt38">
				<view class="pl14">
					{{t('inp.a_c4')}}
				</view>
				<view class="mt34">
					<input class="inp" placeholder-class="plo" :placeholder="t('inp.a_c5')" v-model="formData.address">
				</view>
			</view>

			<!-- 登录按钮 -->
			<view class="btns f36"
				:style="showTag?{background:store.$state.contentColor,boxShadow: '0rpx 11rpx 47rpx 4rpx rgba(247, 175, 64, 0.35)'}:{background:store.$state.btnDis}"
				@click="methods.saveHandle">
				{{ t('inp.i_s1')}}
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
	} from 'vue-i18n'

	const {
		t
	} = useI18n()
	const methods = {
		back() {
			history.back()
		},
		saveHandle() {
			request({
				methods: 'post',
				url: 'user/attribute/receive',
				data: formData.value
			}).then(res => {
				// if(res.)
				Toast.text(t('inp.i_s2'));
				history.back()
			}).catch(err => {
				Toast.text(err.message);
			})

		},
	};


	const formData = ref({
		consignee: '',
		address: ''
	})
	const showTag = ref(false)
	// 监听
	watch(formData, (newVal, oldVal) => {
		showTag.value = false

		if (!formData.value.consignee) {
			return false
		}
		if (!formData.value.address) {
			return false
		}
		showTag.value = true
	}, {
		deep: true
	})
	const getData = () => {
		request({
			methods: 'get',
			url: 'user/attribute/receive',
		}).then(res => {
			if (res && res.address) {
				formData.value.address = res.address
				formData.value.consignee = res.consignee
			}
		})
	}
	// 终于可以用了
	onShow(() => {
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
		border-radius: 35rpx;
		margin-top: 76rpx;
	}
</style>
