<template>
	<view style="background: url('/static/actIcon/sign/signBg.png') no-repeat 100%;">
		<!-- 导航栏 -->
		<view class="pdlr50 pt33">

			<view class=" between">
				<image src="/static/actIcon/back.png" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>

				<image src="/static/actIcon/record.png" mode="widthFix"
					style="width: 48rpx;height: 48rpx;" @click="changePage"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.secondColor}">{{t('act.a_s1')}}</view>

			<!-- 背景图 -->
			<view class="mt60">
				<qian-dao :checks="checks" @current-month-day="onSignIn" @prev-month-day="onPrev"
					@next-month-day="onNext" />
			</view>


			<view class="center mt30">
				<view class=" btns" @click="qindaoHandle" v-if="!firstSign"
					:style="{background:store.$state.contentColor}">
					{{t('act.a_s1')}}
				</view>
				<view class=" isSignC" v-else :style="{background:store.$state.btnDis}">
					{{t('act.a_s1')}}
				</view>
				<!-- <image src="../../static/mine/signIn.png" mode="widthFix" style="width: 429rpx;"></image> -->
			</view>
			<view class="mt57 botBox">
				<view class="center pt40">
					<view class="center">
						<view class="line"></view>
						<view class="dors"></view>
					</view>
					<view class="text-white">{{t('act.a_s2')}}</view>
					<view class="center">
						<view class="dors"></view>
						<view class="line"></view>
					</view>
				</view>

				<view class="mt40 f26 text_center">
					<rich-text :nodes="desc"></rich-text>
				</view>
			</view>
		</view>

		<view style="height: 50rpx;"></view>
		<!-- mask -->
		<view v-show="showMask" class="mask center flex-col">
			<view class="mask_content">
				<view class="signSuccess text-white">
					<view class="text_center" style="padding: 250rpx 46rpx 0 46rpx;">
						{{t('act.a_s3')}}
					</view>
				</view>
			</view>

			<image src="../../static/closeBtn.png" class="mt30" mode="widthFix" style="width: 80rpx;"
				@click="closeHandle"></image>
		</view>
	<Loading ref="showLoading"></Loading>
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
	import qianDao from '../../components/qian-dao/qian-dao.vue'
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
	const showMask = ref(false)
	const firstSign = ref(false)
	const checks = ref([

	])
	const desc = ref("")
	const isSign = ref(0)
	const onSignIn = (payload) => {
		const {
			checked,
			year,
			month,
			day
		} = payload
			!checked && checks.value.push(`${year}-${month}-${day}`)
	}
	const showLoading = ref(null)
	const qindaoHandle = ()=>{
		showLoading.value.loading = true
		setTimeout(()=>{
			qindaoHandle1()
		},1000)
	}
	const qindaoHandle1 = () => {
		request({
			url: 'activity/signIn/signIn',
			methods: 'post'
		}).then(res => {
			showLoading.value.loading = false
			firstSign.value = true
			showMask.value = true
		}).catch(err=>{
			showLoading.value.loading = false
			Toast.text(err.message)
		})
	}

	const onPrev = (payload) => {}
	const onNext = (payload) => {}
	const changePage = ()=>{
		uni.navigateTo({
			url:"../record/signRecord"
		})
	}
	const getData = () => {
		//能否签到 0.不能 1.能
		request({
			url: 'activity/signIn/info',
			methods: 'get'
		}).then(res => {
			desc.value = res.info.rules
			checks.value = res.sign_log
			res.sign_status == 1 ? firstSign.value = false : firstSign.value = true
		}).catch(err=>{
			Toast.text(err.message)
		})
	}
	const closeHandle = () => {
		getData()
		showMask.value = false
	}
	// 终于可以用了
	onLoad(() => {
		getData()
	})
</script>



<style lang="scss" scoped>
	.mask {
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.8);
		position: fixed;
		top: 0;
		z-index: 999;

		.mask_content {
			margin-top: -300rpx;

			.signSuccess {
				width: 518rpx;
				height: 450rpx;
				background: url(../../static/actIcon/sign/signSuccess.png) no-repeat 100%/100%;
			}

			.signRe {
				width: 518rpx;
				height: 450rpx;
				background: url(../../static/actIcon/sign/signed.png) no-repeat 100%/100%;
			}
		}

		.maskBtn {
			width: 230rpx;
			height: 80rpx;
			border-radius: 40rpx;
		}
	}





	.botBox {
		// height: 350rpx;
		margin-bottom: 30rpx;
		background: #6A5AE0;
		border-radius: 50rpx;
		padding: 30rpx 35rpx;

		.line {
			width: 60rpx;
			height: 2rpx;
			background: #FFFFFF;
			border-radius: 1rpx;
		}

		.dors {
			width: 12rpx;
			height: 12rpx;
			background: #FFFFFF;
			border-radius: 50%;
			margin: 0 15rpx;
		}
	}

	.btns {
		margin-left: 15rpx;
		line-height: 100rpx;
		text-align: center;
		width: 100%;
		height: 100rpx;
		border-radius: 20rpx;
		color: #FFFFFF;
		font-size: 36rpx;
		box-shadow: inset 0rpx 0rpx 6rpx 3rpx rgba(225, 225, 225, 0.4);
	}

	.isSignC {
		margin-left: 15rpx;
		line-height: 100rpx;
		text-align: center;
		width: 100%;
		height: 100rpx;
		border-radius: 20rpx;
		color: #eee;
		font-size: 36rpx;
		box-shadow: inset 0rpx 0rpx 6rpx 3rpx rgba(225, 225, 225, 0.4);
	}

	.text-white {
		color: #fff
	}
</style>
