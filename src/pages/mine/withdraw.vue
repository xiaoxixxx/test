<template>
	<view :style="store.$state.imgObj.loginBg">

		<view class="pdlr35 pt33">

			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.secondColor}">{{t('wr.w_a1')}}</view>
			<view class="f30 mt60 secondClo">
				{{t('wr.w_u9')}}
			</view>

			<view class="choItem mt38" @click="changeChoosed('usdt')" :style="cType =='usdt'?choStyle:''" v-if="showUsdt">
				<view class="flex">
					<image :src="store.$state.imgObj.usdt" mode="widthFix" style="width: 55rpx;height: 55rpx;"></image>
					<view class="mglr49 f28">USDT</view>
				</view>

				<view class="noCho">
					<image :src="store.$state.imgObj.choosed" mode="widthFix" style="width: 35rpx;height: 35rpx;"
						v-if="cType =='usdt'"></image>
				</view>
			</view>

			<view class="choItem" @click="changeChoosed('other')" :style="cType =='other'?choStyle:''" v-if="showBank">
				<view class="flex">
					<image :src="store.$state.imgObj.other" mode="widthFix" style="width: 55rpx;height: 55rpx;"></image>
					<view class="mglr49 f28">Other</view>
				</view>
				<!-- {{store.$state.imgObj.ohter}} -->
				<view class="noCho">
					<image :src="store.$state.imgObj.choosed" mode="widthFix" style="width: 35rpx;height: 35rpx;"
						v-if="cType =='other'"></image>
				</view>
			</view>


			<!-- btn -->
			<view class="btns" :style="{background:store.$state.contentColor}" @click="changePage">
					{{t('all.a_c1')}}
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
	
	const choStyle = {
		background: '#FEF3DE',
		animation: '.2s linear all'
	}
	const cType = ref('usdt')
	const changeChoosed = (type) => {
		cType.value = type
	}
	const methods = {
		back() {
			history.back()
		},
	};
	const showUsdt = ref(false)
	const showBank = ref(false)
	
	const getData = ()=>{
		request({
			url: 'setting/financeWay',
			methods: 'get'
		}).then(res => {
			// let tempArr = [1,2]
			// console.log(tempArr.includes(12));
			let {withdraw_type} = res
			// withdraw_type = [1]
			
			if(withdraw_type.includes(1)){
				showUsdt.value = true
			}
			 if(withdraw_type.includes(2)){
				showBank.value = true
			}
		})
	}
	
	const changePage = () => {
		let value = cType.value
		if (value == 'usdt') {
			uni.navigateTo({
				url: './usdtWithdraw'
			})
		} else if (value == 'other') {
			uni.navigateTo({
				url: './bankWithdraw'
			})

		}
	}
	// 终于可以用了
	onShow(() => {
		getData()
	})
</script>

<style lang="scss">
	.choItem {
		padding: 37rpx 50rpx;
		background-color: #fff;
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 30rpx;

		.noCho {
			width: 35rpx;
			height: 35rpx;
			border: 1px solid #AFAFAF;
			border-radius: 10rpx;
		}
	}

	.btns {
		margin-top: 313rpx;
		text-align: center;
		line-height: 120rpx;
		color: #fff;
		height: 120rpx;
		background: #F5B04C;
		box-shadow: 0px 11rpx 47rpx 4rpx rgba(247, 175, 64, 0.35);
		border-radius: 35rpx;
		font-size: 36rpx;
	}
</style>
