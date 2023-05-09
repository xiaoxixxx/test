<template>
	<view :style="store.$state.imgObj.loginBg">

		<view class="pdlr50 pt33 pb50 ">

			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.secondColor}">{{t('wr.w_a1')}}</view>
			<view class="mt55">
				<view class="topBox center flex-col" :style="store.$state.wr.reBox">
					<view class="topItem f26">{{t('wr.w_a2')}}</view>

					<view class="mt35 f55" style="color: #fff;"> {{pageData.balance_max}} {{currency}}</view>

					<view class="mt28 f26 withdrawAll" :style="{color:store.$state.contentColor}"
						@click="inputNum = pageData.balance_max">{{t('wr.w_a3')}}</view>
				</view>
				<view class="notice " style="background-color: #fff;" dir="ltr">
					<nut-noticebar :text="topNotice" :left-icon="store.$state.imgObj.labaIcon"
						background="rgba(251, 248, 220, 0)" color="#212121">
					</nut-noticebar>
				</view>

				<view class="mainBox">
					<view class="withTitle" :style="choStyle">{{t('wr.w_u1')}}</view>
					<view class="flex mt70">
						<view class="short">{{currency}}</view>
						<input type="text" placeholder-class="plo" style="color: #F65E5E;" v-model="inputNum" focus
							:placeholder="t('mine.m_s7')">

					</view>

					<view class="flex mt30">
						<view class="short">USDT</view>
						<input type="text" :disabled="true" :value="(inputNum * pageData.u_rate).toFixed(2)">
					</view>

					<view class="mt44">
						<view class="tips">
							{{t('wr.w_a4')}} : {{pageData.min+currency}} - {{pageData.max+currency}}
						</view>
					</view>
				</view>

				<view class="mt38">
					<view class="f34  text_bold" :style="{color:store.$state.secondColor}">{{t('wr.w_u3')}}</view>
					<view class="mt34 otpEl">
						<input class="inp" placeholder-class="plo" :placeholder="t('wr.w_u4')" :disabled="true" :value="pageData.user_link">
						<view class="otp" v-if="!pageData.user_link" @click="changePage('../setting/set2')">
							{{t('wr.w_u5')}}
						</view>
					</view>
				</view>

				<view class="mt38">
					<view class="f34  text_bold" :style="{color:store.$state.secondColor}">{{t('login.l_l5')}}</view>
					<view class="mt34  passwordInp" v-if="!showInp">

						<input class="inp " type="safe-password" placeholder-class="plo"  password="true" v-model="fundPwd"
							:placeholder="t('login.l_l5')" v-if="showNewPwd1">
						<input class="inp " placeholder-class="plo" type="safe-password" v-model="fundPwd" :placeholder="t('login.l_l5')"
							v-else>
						<image v-if="showNewPwd1" src="../../static/themeNum1/icon/closeEye.png" class="pwdEye"
							style="width: 29rpx;height: 16rpx;" @click="methods.openPwdHandle('showNewPwd1')"></image>

						<image v-else src="../../static/themeNum1/icon/openEye.png" class="pwdEye openEye"
							style="width: 29rpx;height: 25rpx;" @click="methods.openPwdHandle('showNewPwd1')"></image>
					</view>
					
					<view class="mt34  passwordInp otpEl" v-else>
						<input class="inp " placeholder-class="plo" type="safe-password" password="true" :disabled="true"
							:placeholder="t('inp.a_c6')" >
						<view class="otp"  @click="changePage('../setting/set4')">
							{{t('mine.m_m14')}}
						</view>
					</view>


					<view class="btns" :style="choStyle" @click="submitHandle">
						{{t('wr.w_a11')}}
					</view>

					<view class="mt70" v-html="pageData.description"></view>
				</view>
			</view>
		</view>
		 <nut-overlay v-model:visible="showMask">
		    <div class="wrapper">
		      <div class="content" v-html="maskData"></div>
		    </div>
		  </nut-overlay>
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
	const store = userStore();
	
	
	const showMask = ref(false)
	const maskData = ref("")
	const showLoading = ref(null)
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
	const choStyle = {
		background: store.$state.contentColor,
		color: '#fff'
	}
	const noStyle = {
		color: store.$state.contentColor
	}
	const showNewPwd1 = ref(true)
	const fundPwd = ref("")

	const pageData = ref({})
	const showInp = ref(true)
	const getData = () => {
		request({
			url: 'finance/usdt/withdraw/index',
			methods: 'get',
		}).then(res => {
			pageData.value = res
			if (res.user.payment_password) {
				showInp.value = false
			}
			if(res.pop){
				maskData.value = res.pop
				showMask.value =true
			}
			// console.log(res);
			let str = t('wr.w_u6')
			// 手续费类型 1.比例 2.固定金额
			if (res.fee_type == 1) {
				str = str + res.fee_rate * 100 + '%'
			} else if (res.fee_type == 2) {
				str = str + res.fee
			}
			topNotice.value = str
		})
	}
	const changePage = (url) => {
		uni.navigateTo({
			url
		})
	}
	const currency = ref("")
	const inputNum = ref("")
	const topNotice = ref("")

	const submitHandle = () => {
		if (pageData.value.check.status == 1) {
			Toast.text(pageData.value.check.message)
			return
		}

		if ((inputNum.value - 0) < (pageData.value.min - 0) || (inputNum.value - 0) > (pageData.value.max - 0)) {
			Toast.text(t('wr.w_u7'))
			return false
		}

		showLoading.value.loading = true
		setTimeout(() => {
			submitHandle1()
		}, 2000)
	}

	const submitHandle1 = () => {
		const data = {
			amount: inputNum.value,
			password: fundPwd.value
		}

		request({
			url: 'finance/usdt/withdraw/submit',
			methods: 'post',
			data: data
		}).then(res => {
				getData();
			showLoading.value.loading = false
			Toast.text(t('wr.w_u8'))
			inputNum.value = ""
			fundPwd.value = ""
		}).catch(err => {
			showLoading.value.loading = false
			Toast.text(err.message)
		})
	}
	// 终于可以用了
	onShow(() => {
		getData();
		currency.value = uni.getStorageSync('currency')
	})
</script>

<style lang="scss">
	.wrapper {
	  display: flex;
	  height: 100%;
	  align-items: center;
	  justify-content: center;
	  .content {
	    display: flex;
	    width: 600rpx;
	    height: 350rpx;
	    background: #fff;
	    border-radius: 8px;
		padding: 30rpx ;
		overflow: scroll;
	  }
	}
	.topBox {
		width: 100%;
		height: 328rpx
	}

	.withdrawAll {
		padding: 27rpx 36rpx;
		border-radius: 38rpx;
		background: #fff;
	}

	.notice {
		padding: 20rpx 0;
		background-color: #fff;
		border-radius: 20rpx;
		margin-top: 34rpx;
		font-size: 28rpx;
	}

	.mainBox {
		margin-top: 36rpx;
		border-radius: 30rpx;
		padding: 32rpx 57rpx;
		font-size: 28rpx;
		background-color: #fff;
		position: relative;

		.withTitle {
			position: absolute;
			left: 0;
			top: 0;
			border-radius: 30rpx 0 30rpx 0;
			padding: 33rpx 48rpx;
		}

		.flex {
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid #eee;
			padding: 30rpx 0;

			.short {
				width: 30%;
				text-align: center;
				font-weight: bold;
			}

			input {
				margin-left: 30rpx;
				font-size: 30rpx;
				font-weight: bold;
			}
		}

		.tips {
			background-color: #F0F0F0;
			border-radius: 10rpx;
			padding: 20rpx;
			font-size: 20rpx;
			width: auto;
			color: #AFAFAF;
			display: inline-block;
		}
	}

	.btns {
		margin-top: 100rpx;
		box-shadow: 0px 11px 47px 4px rgba(247, 175, 64, 0.35);
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		border-radius: 35rpx;
	}

	.otpEl {
		position: relative;

		.otp {
			position: absolute;
			// left: 20rpx;
			right: 40rpx;
			top: 50%;
			font-size: 20rpx;
			transform: translateY(-50%);
			// width: 60rpx;
			padding: 0 10rpx;
			height: 60rpx;
			background: linear-gradient(-43deg, #FFA500 0%, #FFD253 100%);
			box-shadow: 0px 11rpx 8rpx 0px rgba(255, 166, 7, 0.48);
			border-radius: 10rpx;
			color: #fff;
			text-align: center;
			line-height: 60rpx;
		}
	}

	.passwordInp {
		position: relative;

		.pwdEye {
			position: absolute;
			// left: 20rpx;
			right: 40rpx;
			top: 50%;
			transform: translateY(-50%);
		}
		
	}
</style>
