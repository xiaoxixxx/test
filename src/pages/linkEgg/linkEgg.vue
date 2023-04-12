<template>
	<!-- <view class="wrap"
		style="background: url(../../static/egg/bg.png) no-repeat  100%/100%;">
		 -->
	<view class="pageBg">
		<view class="pt30 pl30">
			<nut-icon name="left" color="#fff" size="20" @click="jumpPage('/')"></nut-icon>
		</view>
		<view class="title">Red Envelopes</view>

		<view class="center" style="margin-top: 570rpx;">
			<view class="money center">
				{{pageData.info?.price}} {{pageData.currency}}
			</view>
		</view>

		<view class="btns center" @click="getPro">
			Continue
		</view>
	</view>
</template>


<script setup>
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	import request from '../../../comm/request.ts';
	const pageData = ref({})
	const getInfo = () => {

		request({
			url: 'activity/award/info',
			methods: 'post',
			data: {
				key: key.value
			}
		}).then(res => {
			pageData.value = res
		}).catch(err=>{
			uni.showToast({
				title: err.message,
				icon: 'none'
			})
		})
	}
	const jumpPage = url=>{
		uni.reLaunch({
			url
		})
	}
	const getPro = () => {
		if(!uni.getStorageSync('token')){
			uni.navigateTo({
				url:'../login/login'
			})
			return false
		}
		if(!pageData.value.info){
			return false
		}
		if (pageData.value.info.status !== 0) {
			uni.showToast({
				title: "The red envelope has been snatched",
				icon: 'none'
			})
			return false
		}
		request({
			url: 'activity/award/receive',
			methods: 'post',
			data: {
				key: key.value
			}
		}).then(res => {
			sessionStorage.clear()
			uni.showToast({
				title: "Receive success",
				icon: 'none'
			})
			uni.navigateTo({
				url:"/"
			})
			getInfo()
		})
	}
	const key = ref("")
	// sfH9cq2UXz
	onLoad(e => {
		if (e.key) {
			key.value = e.key
			sessionStorage.setItem('link',e.key)
			getInfo()
		}
	})
	// 
</script>


<style lang="scss" scoped>
	.pageBg {
		min-height: 100vh;
		background: url('../../static/linkEgg/eggBg.png') no-repeat 100%/100%;
	}

	.title {
		padding-top: 68rpx;
		font-size: 80rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FBEBBD;
		text-align: center;
	}

	.money {
		background: url('../../static/linkEgg/egg.png') no-repeat 100%/100%;
		height: 250rpx;
		width: 250rpx;
		font-size: 42rpx;
		font-weight: 500;
		color: #DB1100;
	}

	.btns {
		width: 589rpx;
		height: 125rpx;
		background: linear-gradient(180deg, #FFFFE1 0%, #F5CB7E 100%);
		border-radius: 63rpx;
		margin: 315rpx auto 0;

		font-size: 40rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #DB1100;
		line-height: 125rpx;
	}
</style>
