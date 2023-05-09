<template>
	<view :style="store.$state.imgObj.loginBg">

		<view class="pdlr35 pt33 pb50 ">

			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.secondColor}">{{t('wr.r_r1')}}</view>
			<view class="mt38">
				<!-- top4 -->
				<view class="mt30 top_box">
					<view class="f26 flex  col_center">
						{{t('wr.r_r4')}}: <text class="pl10 f34"
							:style="{'color':store.$state.contentColor}">{{showTime}}</text>
					</view>
					<view class="mt34  flex-wrap between">
						<view class="items ">
							<view class="iTitle">{{t('wr.r_r5')}}</view>
							<view :style="topItemStyle">{{pageData.order_no}}</view>
						</view>
						<view class="items ">
							<view class="iTitle">{{t('wr.r_r6')}}</view>
							<view :style="topItemStyle">{{pageData.amount}}</view>
						</view>
						<view class="items topLine ">
							<view class="iTitle">{{t('wr.r_r10')}}</view>
							<view :style="topItemStyle">
								{{t('wr.r_r7')}}
							</view>
						</view>
						<view class="items topLine">
							<view class="iTitle">USDT</view>
							<view :style="topItemStyle">{{pageData.amount ?((pageData.amount) * rate).toFixed(2):0 }}</view>
						</view>
					</view>
				</view>

				<view class="addressBox">
					<view class="typeList center mb30">
						<view class="mglr20 typeItem" v-for="(item,index) in typeList"
							:style="typeInd== index?choStyle:''" @click="changeCode(index)">{{item.name}}</view>
					</view>
					<qrcode-vue :value="addresData" v-if="addresData" :size="163" level="H" />

					<view class="mt35 f26">
						{{t('wr.r_r8')}}
					</view>
					<view class="mt23 f22 addEl" @click="copyHandle(addresData)">
						{{addresData}}
					</view>
				</view>

				<view class="btns mt78" :style="noStyle" style="box-shadow: none;background-color: #fff;"
					@click="cancleOrder">
					{{t('wr.r_r9')}}
				</view>
				<view class="btns mt22" :style="choStyle" @click="methods.back">
					{{t('wr.r_r3')}}
				</view>
			</view>
		</view>
		<nut-overlay v-model:visible="cancleHandlemMask">
			<div class="wrapper">
				<div class="content ">
					<view class="f40">{{t('wr.r_r12')}}</view>
					<view class="f30 mt40">
						{{t('wr.r_r11')}}
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
	import QrcodeVue from 'qrcode.vue'
	import useClipboard from 'vue-clipboard3'
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad,
		onHide
	} from "@dcloudio/uni-app";
	const store = userStore();
	const {
		toClipboard
	} = useClipboard()
	const modal_qr = ref(false)
	import {
		useI18n
	} from "vue-i18n";
	const {
		t
	} = useI18n();
	const methods = {
		back() {
			if(!uploadTxid.value){
				uni.switchTab({
					url: "../tabbar/index"
				})
			}else{
				uni.navigateTo({
					url: "./usdtTxid"
				})
			}
			
		},
	};

	const typeList = [{
			name: 'TRC20'
		},
		// {
		// 	name:'USDT'
		// }
	]
	const typeInd = ref(0)

	const choStyle = {
		background: store.$state.contentColor,
		color: '#fff',
		border: 'none'
	}
	const noStyle = {
		color: store.$state.contentColor,
	}
	const topItemStyle = {
		color: store.$state.contentColor,
		marginTop: '10rpx'
	}
	const changeCode = (ind) => {
		typeInd.value = ind
		// if (typeInd.value == 0) {
		// 	codeUrl.value = "https://www.baidu.com"
		// } else if (typeInd.value == 1) {
		// 	codeUrl.value = "https://www.bilibili.com/"
		// }
	}
	const pageData = ref({})
	const addresData = ref("")

	const timer = ref(null)
	const showTime = ref(0)
	const rate = ref(0)
	const times = ref(0)
	const getData = () => {
		request({
			url: 'finance/usdt/recharge/index',
			methods: 'get'
		}).then(res => {
			if (!res.order) {
				methods.back()
				return false
			}
			addresData.value = res.address
			pageData.value = res.order
			res.type == 1?uploadTxid.value = false:uploadTxid.value = true
			rate.value = res.rate
			if (timer.value) {
				clearInterval(timer.value)
			}
			times.value = res.order.expire_time
			startTimer()
		})
	}
	const changePage = () => {
		uni.navigateTo({
			url: "./usdtTxid"
		})
	}
	const copyHandle = async (data) => {
		try {
			await toClipboard(data)
			Toast.text(t('all.a_d1') + " "+ t('all.a_c9'))
		} catch (e) {
			console.error(e)
		}
	}
	const cancleHandlemMask = ref(false)
	const uploadTxid = ref(null)
	
	const cancleOrder = () => {
		cancleHandlemMask.value = true
	}
	const confirmHandle = ()=>{
		request({
			url: 'finance/usdt/recharge/cancel',
			methods: 'post',
			data: {
				order_no: pageData.value.order_no
			}
		}).then(res => {
			Toast.text(t('wr.r_r13'))
			uni.switchTab({
				url:'../tabbar/recharge'
			})
		}).catch(err => {
			Toast.text(err.message)
		})
	}
	const changeTime = (num) => {
		let minute = parseInt(num / 60)
		let second = num % 60
		showTime.value = (minute < 10 ? '0' + minute : minute) + ":" + (second < 10 ? '0' + second : second)
	}
	// 开始时间减减

	const startTimer = () => {
		const that = this
		timer.value = setInterval(() => {
			if (times.value == 0) {
				clearTimeout(timer.value)
				methods.back()
			} else {
				times.value--;
				changeTime(times.value)
			}
		}, 1000)
	}
	// 终于可以用了
	onShow(() => {
		getData()
	})
	onHide(() => {
		if (timer.value) {
			clearInterval(timer.value)
		}
	})
</script>

<style lang="scss">
	.btns {
		box-shadow: 0px 11px 47px 4px rgba(247, 175, 64, 0.35);
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		border-radius: 35rpx;
	}

	.top_box {
		padding: 35rpx 40rpx;
		background-color: #fff;
		border-radius: 30rpx;

		.items {
			width: 48%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			height: 140rpx;
			font-size: 24rpx;
			background-color: #FEF3DE;
			margin-bottom: 24rpx;
			border-radius: 20rpx;
		}

		.flex-wrap {
			flex-wrap: wrap;
		}
	}

	.addressBox {
		margin-top: 40rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 27rpx 71rpx 48rpx 71rpx;
		border-radius: 30rpx;
		background-color: #fff;

		.typeItem {
			padding: 14rpx 32rpx;
			border-radius: 10rpx;
			border: 1rpx solid #eee;
		}

		.addEl {
			color: #999999;
			height: 60rpx;
			background: #FEF3DE;
			border-radius: 10rpx;
			// padding: 0 30rpx;
			text-align: center;
			line-height: 60rpx;
			width: 100%;
		}
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
				width:calc(100% - 80rpx);
				padding:   0  30rpx 40rpx;
				view {
					width: 48%;
					height: 100rpx;
					color: #fff;
					text-align: center;
					line-height: 100rpx;
					font-size: 30rpx;
					border-radius: 50rpx				}
			}
		}
	}
</style>
