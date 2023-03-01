<template>
	<view :style="store.$state.imgObj.loginBg">

		<view class="pdlr35 pt33" :style="{color:store.$state.secondColor}">

			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.secondColor}">{{t('inp.a_b3')}}</view>



			<view class="mt59">
				<view class="pl14">
					{{t('inp.a_b4')}}
				</view>
				<view class="mt34  passwordInp">
					<input class="inp " type="safe-password" password="true" v-model="formData.old_password"
						:placeholder="t('inp.a_b5')" v-if="showOld" placeholder-class="plo">
					<input class="inp " type="safe-password" v-model="formData.old_password"
						:placeholder="t('inp.a_b5')" v-else placeholder-class="plo">

					<image v-if="showOld" src="../../static/themeNum1/icon/closeEye.png" class="pwdEye"
						style="width: 29rpx;height: 16rpx;" @click="methods.openPwdHandle('showOld')"></image>

					<image v-else src="../../static/themeNum1/icon/openEye.png" class="pwdEye"
						style="width: 29rpx;height: 25rpx;" @click="methods.openPwdHandle('showOld')"></image>
				</view>
			</view>

			<view class="mt38">
				<view class="pl14">
					{{t('inp.a_b6')}}
				</view>

				<view class="mt34  passwordInp">
					<input class="inp " type="safe-password" password="true" v-model="formData.password"
						:placeholder="t('inp.a_b7')" v-if="showNewPwd1" placeholder-class="plo">
					<input class="inp " type="safe-password" v-model="formData.password" placeholder-class="plo"
						:placeholder="t('inp.a_b7')" v-else>
					<image v-if="showNewPwd1" src="../../static/themeNum1/icon/closeEye.png" class="pwdEye"
						style="width: 29rpx;height: 16rpx;" @click="methods.openPwdHandle('showNewPwd1')"></image>

					<image v-else src="../../static/themeNum1/icon/openEye.png" class="pwdEye"
						style="width: 29rpx;height: 25rpx;" @click="methods.openPwdHandle('showNewPwd1')"></image>
				</view>
			</view>

			<view class="mt38">
				<view class="pl14">
					{{t('inp.a_b8')}}
				</view>
				<view class="mt34  passwordInp">
					<input class="inp " type="safe-password" password="true" v-model="formData.password2"
						:placeholder="t('inp.a_b9')" placeholder-class="plo" v-if="showNewPwd2">
					<input class="inp " placeholder-class="plo" type="safe-password" v-model="formData.password2"
						:placeholder="t('inp.a_b9')" v-else>
					<image v-if="showNewPwd2" src="../../static/themeNum1/icon/closeEye.png" class="pwdEye"
						style="width: 29rpx;height: 16rpx;" @click="methods.openPwdHandle('showNewPwd2')"></image>
					<image v-else src="../../static/themeNum1/icon/openEye.png" class="pwdEye"
						style="width: 29rpx;height: 25rpx;" @click="methods.openPwdHandle('showNewPwd2')"></image>
				</view>
			</view>

			<!-- 	<view class="mt29 f20 pl14" style="color: #F43D45;">
				reminder:At present, only trc20 addresses are supported,and the
				platform will not be responsible for the drop of orders caused.
			</view> -->

			<!-- 登录按钮 -->
			<view class="btns f36"
				:style="showTag?{background:store.$state.contentColor,boxShadow: '0rpx 11rpx 47rpx 4rpx rgba(247, 175, 64, 0.35)'}:{background:store.$state.btnDis}"
				@click="methods.saveHandle">
				{{ t('inp.i_s1')}}
			</view>

			<view style="height: 50rpx;"></view>
			<Loading ref="showLoading"></Loading>
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
	const showLoading = ref(null)
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
			if (!formData.value.old_password) {
				Toast.text(t('inp.a_b10'));
				return false
			}
			if (formData.value.password.length < 6 || formData.value.password.length > 24) {
				Toast.text(t('login.l_r14'))
				return false
			}
			if (formData.value.password == formData.value.old_password) {
				Toast.text(t('inp.a_b11'));
				return false
			}
			if (formData.value.password !== formData.value.password2) {
				Toast.text(t('inp.a_b12'));
				return false
			}
			showLoading.value.loading = true
			setTimeout(() => {

				methods.saveHandle1()
			}, 2000)
		},
		saveHandle1() {
			request({
				methods: 'post',
				url: 'user/attribute/password',
				data: formData.value
			}).then(res => {
				showLoading.value.loading = false
				Toast.text(t('inp.i_s2'));
				history.back()

			}).catch(err => {
				showLoading.value.loading = false
				Toast.text(err.message);
			})
			// Toast.text('保存成功');
		},
		openPwdHandle(type) {
			if (type == 'showOld') {
				showOld.value = !showOld.value
			} else if (type == 'showNewPwd1') {
				showNewPwd1.value = !showNewPwd1.value
			} else if (type == 'showNewPwd2') {
				showNewPwd2.value = !showNewPwd2.value
			}
		}
	};


	const formData = ref({
		old_password: '',
		password: '',
		password2: '',
		type: 0
	})

	const showOld = ref(true)
	const showNewPwd1 = ref(true)
	const showNewPwd2 = ref(true)

	const showTag = ref(false)
	// 监听
	watch(formData, (newVal, oldVal) => {
		showTag.value = false

		if (!formData.value.password) {
			return false
		}
		if (!formData.value.password2) {
			return false
		}

		showTag.value = true
	}, {
		deep: true
	})

	// 终于可以用了
	onShow(() => {})
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

	.passwordInp {
		position: relative;

		.pwdEye {
			position: absolute;
			// left: 20rpx;
			right: 40rpx;
			top: 50%;
		}
	}
</style>
