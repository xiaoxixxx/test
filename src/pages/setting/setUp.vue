<template>
	<view :style="store.$state.imgObj.loginBg">

		<view class="pdlr35 pt33">

			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f60 mt60 text_bold" :style="{color:store.$state.secondColor}">{{t('add1.a_d3')}}</view>

			<view class="mt67">
				<view v-for="(item,index) in settingList" @click="methods.changePage(item.url,index)">
					<view v-if="item.flag" class="between mb30 settingItem">
						<view class="flex col_center">
							<image :src="item.img"  style="width: 50rpx; height: 50rpx;"></image>
							<view class="mglr50" style="flex: 1;">
								{{item.name}}
							</view>
						</view>
						<nut-icon name="rect-right" size="14" :color="store.$state.secondColor"></nut-icon>
					</view>
				</view>
			</view>
		</view>
		
		<nut-overlay v-model:visible="loginOutMask">
			<div class="wrapper">
				<div class="content ">
					<view class="f40">Tips</view>
					<view class="f30 mt40">
						{{t('mine.m_m13')}}
					</view>
		
					<view class="between">
						<view :style="{background:store.$state.secondColor}">{{ t('all.a_c2')}}</view>
						<view :style="{background:store.$state.contentColor}" @click="confirmHandle"> {{t('all.a_c1')}}
						</view>
					</view>
				</div>
			</div>
		</nut-overlay>
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
	} from 'vue-i18n'

	const {
		t
	} = useI18n()
	
	const loginOutMask = ref(false)
	const settingList = ref([
		{
			flag: true,
			img: store.$state.my.setting[2],
			name: t('inp.i_s6'),
			url: './set3'
		},
		{
			flag: true,
			img: store.$state.my.setting[3],
			name: t('inp.i_s7'),
			url: './set4'
		},
		// 地址设置
		{
			flag: false,
			img: store.$state.my.setting[1],
			name: t('inp.i_s5'),
			url: './set2'
		},
		// 银行卡设置
		{
			flag: false,
			img: store.$state.my.setting[0],
			name: t('inp.i_s4'),
			url: './set1'
		},
	
	
		{
			flag: true,
			img: store.$state.my.setting[4],
			name: t('inp.i_s8'),
			url: './set5'
		},
		{
			flag: true,
			img: store.$state.my.setting[5],
			name: t('mine.m_m11'),
		},
	])

	// 　const { t } = useI18n()
	const methods = {
		back() {
			history.back()
		},

		changePage(url,ind) {
			if(ind == settingList.value.length - 1){
				loginOutMask.value = true
				return false
			}
			uni.navigateTo({
				url,
			})
		}

	};
	
	const getData = ()=>{
		request({
			url: 'setting/financeWay',
			methods: 'get'
		}).then(res => {
			let {withdraw_type} = res
			//数组 可以包含多个方式 1.USDT  2.三方
			if(withdraw_type.includes(1)){
				settingList.value[2].flag = true
			}
			 if(withdraw_type.includes(2)){
				settingList.value[3].flag = true
			}
		})
	}
	const confirmHandle = () => {
		uni.navigateTo({
			url: '../login/login'
		})
	}

	// 终于可以用了
	onShow(() => {
		getData()
	})
</script>

<style lang="scss">
	.settingItem {
		padding: 35rpx 50rpx;
		border-radius: 30rpx;
		background-color: #fff;
		font-size: 26rpx;
	}
	.wrapper {
		display: flex;
		height: 100%;
		justify-content: center;
		padding: 0 50rpx;
	
		.content {
			margin-top: 400rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			height: 350rpx;
			background: #fff;
			border-radius: 30rpx;
			// justify-content: center;
			padding-top: 50rpx;
			position: relative;
			overflow: hidden;
	
			.between {
				position: absolute;
				bottom: 0;
				width: calc(100% - 80rpx);
				padding: 0 30rpx 40rpx;
	
				view {
					width: 48%;
					height: 100rpx;
					color: #fff;
					text-align: center;
					line-height: 100rpx;
					font-size: 30rpx;
					border-radius: 50rpx
				}
			}
		}
	}
</style>
