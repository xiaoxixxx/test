<template>
	<view :style="store.$state.imgObj.loginBg">

		<view class="pdlr49 ">
			<view :style="{color:store.$state.secondColor}">
				<view class="secondClo f50 pt38">
					{{t('tabbar.t_t4')}}
				</view>
				<view class="f30 mt60 secondClo">
					{{t('wr.w_u9')}}
				</view>
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

			<view class="choItem" @click="changeChoosed('bank')" :style="cType =='bank'?choStyle:''" v-if="showBank">
				<view class="flex">
					<image :src="store.$state.imgObj.bank" mode="widthFix" style="width: 55rpx;height: 55rpx;"></image>
					<view class="mglr49 f28">Bank Card</view>
				</view>
				<view class="noCho">
					<image :src="store.$state.imgObj.choosed" mode="widthFix" style="width: 35rpx;height: 35rpx;"
						v-if="cType =='bank'"></image>
				</view>
			</view>

			<!-- btn -->
			<view class="btns" :style="{background:store.$state.contentColor}" @click="chooseHandle">
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
	
	const showUsdt = ref(false)
	const showBank = ref(false)
	
	const getData = ()=>{
		request({
			url: 'setting/financeWay',
			methods: 'get'
		}).then(res => {
			let {recharge_type} = res
			
			if(recharge_type.includes(1)){
				showUsdt.value = true
			}
			 if(recharge_type.includes(2)){
				showBank.value = true
			}
			// console.log(res);
		})
	}
	
	const chooseHandle = () => {
		let value = cType.value
		if (value == 'usdt') {
			uni.navigateTo({
				url: '../recharge/usdtRecharge'
			})
		} else if (value == 'bank') {
			uni.navigateTo({
				url: '../recharge/bankRecharge'
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
