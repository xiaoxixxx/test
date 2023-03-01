<template>
	<view :style="store.$state.imgObj.loginBg">

		<view class="pdlr37 pt33">

			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold mglr17" :style="{color:store.$state.secondColor}">{{t('index.i_a9')}}</view>
			<view class="mt81 f50 text_center" :style="{color:store.$state.contentColor}">
					{{t('mine.m_s1')}}
			</view>
		<view class="center">
			<view class="mt28 f24 topB" :style="{color:store.$state.secondColor}">
				{{t('mine.m_s2')}}
			</view>
		</view>
			<view class="shareBox">
				<qrcode-vue :value="codeUrl" :size="163" level="H" />
				<view class="mt39 center">
					<view class="line" :style="{background:store.$state.contentColor}"></view>
					<view class="mglr27 f24">{{t('act.m_m1')}}</view>
					<view class="line" :style="{background:store.$state.contentColor}"></view>
				</view>
				<view class="mt37 f36" :style="{color:store.$state.contentColor}">
					{{inviteCode}}
				</view>
				<!-- <image src="../../static/mine/erweima.png" mode="widthFix" style="width: 400rpx;"></image> -->
			</view>

			<view class="btns" @click="copyHandle">
				{{t('all.a_d1')}}
			</view>
			<view class="center">
				<image src="../../static/themeNum1/shareB.png"  style="width: 402rpx;height: 341rpx;">
				</image>
				 <!-- <nut-image src="//img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg" width="100" height="100"></nut-image> -->
			</view>
			<!-- <view style="height: 50rpx;"></view> -->
		</view>
	</view>
</template>

<script setup>
	import request from '../../../comm/request.ts';
	// import clipboardfrom from "/comm/copy.js"
	import useClipboard from 'vue-clipboard3'
	import {
		userStore
	} from "@/store/themeNum.js";
	import QrcodeVue from 'qrcode.vue'
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	
	import {
		useI18n
	} from "vue-i18n";
	
	const {t} = useI18n();
	const store = userStore();
	const {
		toClipboard
	} = useClipboard()
	const modal_qr = ref(false)
	// 　const { t } = useI18n()
	const methods = {
		back() {
			history.back()
		},

	};
	const copyHandle = async () => {
		try {
			await toClipboard(codeUrl.value)
			Toast.text(t('all.a_d1') + " "+ t('all.a_c9'))
		} catch (e) {
			console.error(e)
		}
	}
	const getData = ()=>{
		request({
			url: 'user/index',
			methods: 'get',
		}).then(res => {
			// let str = "+55"
			res.country_code = res.country_code.replace("+","")
			
			inviteCode.value = res.invite_code
			codeUrl.value = window.location.protocol + "//"+window.location.host+"/\#/pages/login/register\?code=" +res.invite_code +"&country="+res.country_code
		})
	}
	// 终于可以用了
	onShow(() => {
		getData()
	})
	
	const inviteCode = ref({})
	const codeUrl = ref("")

</script>

<style lang="scss">
	.topB {
		// color: ;
		background-color: #FEF3DE;
		text-align: center;
		padding: 19rpx 40rpx;
		border-radius: 30rpx;
		
	}

	.shareBox {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		background: url('../../static/themeNum1/shareBox.png') no-repeat 100%/100%;
		height: 700rpx;
		width: 100%;
	}

	.line {
		width: 44rpx;
		height: 2rpx;
	}

	.btns {
		width: 570rpx;
		height: 110rpx;
		background: #F5B04C;
		border-radius: 30rpx;
		margin: 10rpx auto;
		text-align: center;
		line-height: 110rpx;
		color: #fff;
	}
</style>
