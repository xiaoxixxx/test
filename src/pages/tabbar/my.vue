<template>
	<view :style="store.$state.imgObj.loginBg">
		<view class="pdlr48 pt33">

			<!-- head -->
			<view class="between ">
				<view class="secondClo" style="font-weight: normal;" :style="{color:store.$state.secondColor}">
					<view class="f32 text_bold">
						{{pageData.phone}}
					</view>
					<view class="f22 mt10">
						{{t('act.m_m1')}}: <text class="pl10">{{pageData.invite_code}}</text>
						<image class="mglr10" :src="store.$state.my.copy" mode="widthFix"
							style="width: 22rpx;height: 22rpx;" @click="copyHandle(pageData.invite_code)"></image>
					</view>
				</view>

				<nut-badge dot v-if="showBadge" right="10" top="5" size>
					<image :src="store.$state.my.notice" mode="widthFix" style="width: 70rpx;height: 70rpx;"
						@click="changePage('../mine/notice')"></image>
				</nut-badge>
				<image :src="store.$state.my.notice" mode="widthFix" style="width: 70rpx;height: 70rpx;"
					@click="changePage('../mine/notice')" v-else></image>
			</view>

			<!-- box -->
			<view class="mt20 bBox" :style="store.$state.my.topBox">

				<view class="f24 mt20">{{t('mine.m_t4')}}</view>
				<view class="mt20 f70">{{pageData.balance}} {{currency}}</view>
				<view class="mt26 boxItemBox ">
					<view class="boxItem" v-for="item in boxItem">
						<image :src="item.img" mode="widthFix" style="width: 35rpx;height: 35rpx;"></image>
						<view class="title mgtb10  f20">{{item.name}}</view>
						<view class="f24  secondClo" :style="{color:store.$state.secondColor}">{{item.value}}</view>
					</view>
				</view>
			</view>

			<!-- withdraw -->
			<view class="between mt40">
				<view class="bItem" :style="{background:store.$state.contentColor}" @click="goRecharge">
					<image :src="store.$state.my.wr[1]" mode="widthFix" style="width: 60rpx;height: 42rpx;"></image>
					<view class="mglr27">
						{{t('wr.r_r1')}}
					</view>
				</view>
				<view class="bItem" :style="{background:store.$state.secondColor}"
					@click="changePage('../mine/withdraw')">
					<image :src="store.$state.my.wr[0]" mode="widthFix" style="width: 60rpx;height: 42rpx;"></image>
					<view class="mglr27">
						{{t('wr.w_a1')}}
					</view>
				</view>
			</view>


			<view class="secondClo mt64 f40" :style="{color:store.$state.secondColor}">
				{{t('mine.m_m12')}}
			</view>

			<view class="mt60 myEl">
				<view class="myItem" v-for="(item,index) in myList" @click="changePage(item.url,item.openLink,item)"
					v-show="item.showFlag">
					<image :src="item.img" mode="widthFix" style="width: 85rpx;height: 85rpx;"></image>
					<view class="mglr15  textHidden " style="flex: 1;">{{item.name}}</view>
				</view>
			</view>
		</view>

		<div class="drag-boundary"></div>

		<!-- 客服列表 -->
		<nut-drag :boundary="{ top:50, left: 30, bottom:50, right: 30 }" :attract="true" v-if="showService"
			:style="{ top: '300px', right: '30px' }">
			<image :src="COUNTRY.kefu?COUNTRY.kefu:store.$state.imgObj.kefuIcon" mode="widthFix"
				style="width: 80rpx;height: 80rpx;margin-top: 0;" @click="changePage('../mine/service')"></image>
		</nut-drag>
		<nut-drag :boundary="{ top:50, left: 30, bottom:50, right: 30 }" :attract="true"
			:style="{ top: '400px', right: '30px' }">
			<view class="rightIcon">
				<view class="" @tap.stop="showAllAct = false" v-if="showAllAct">
					<image class="actItem " src="/static/actIcon/actALL.png" mode="widthFix"
						style="width: 80rpx;height: 80rpx;margin-top: 0;"></image>
				</view>
				<view v-else class="openBg">
					<nut-icon name="close" class="closeIcon" color="#ccc" size="15" @click="showAllAct = true">
					</nut-icon>
					<image class="actItem" v-if="showSign" src="/static/actIcon/signICon.png" mode="widthFix"
						style="width: 65rpx;height: 65rpx;margin-top: 20rpx;" @click="changePage('../mine/sign')">
					</image>
					<image class="actItem" v-if="showDraw" src="/static/actIcon/draw.png" mode="widthFix"
						style="width: 65rpx;height: 65rpx;" @click="changePage('../mine/rollingDraw')"></image>
						
						<image class="actItem" src="/static/actIcon/egg.png" mode="widthFix"
							style="width: 65rpx;height: 65rpx;" v-if="showEgg" @click="changePage('../mine/eggAct?id='+eggId)">
						</image>
					<image class="actItem" src="/static/actIcon/hongbao.png" mode="widthFix"
						style="width: 65rpx;height: 65rpx;" v-if="showHong" @click="changePage('../mine/redEnvList')">
					</image>
				</view>
			</view>
		</nut-drag>


		<!-- v-if="showAllAct v-if="showSign"" -->
	</view>
</template>

<script setup>
	import COUNTRY from "../../../setting.js"
	import request from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	import useClipboard from 'vue-clipboard3'
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	const store = userStore();
	const {
		toClipboard
	} = useClipboard()
	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();

	const showBadge = ref(false)
	const showAllAct = ref(true)
	const showSign = ref(false)
	const showDraw = ref(false)
	const showHong = ref(false)
	const showEgg = ref(false)
	const eggId = ref(0)
	const getAct = () => {
		// 获取签到
		request({
			url: 'activity/status',
			methods: 'get',
		}).then(res => {
			try{
				res.lottery.status == 1 ? showDraw.value = true : ''
				res.signIn.status == 1 ? showSign.value = true : ''
				res.prizePackage.status == 1 ? showHong.value = true : ''
				res.goldenEgg.status ==1 ?showEgg.value = true:''
				eggId.value = res.goldenEgg.id
			}catch(e){
				//TODO handle the exception
			}
		})
	}

	const boxItem = ref([{
			name: t('mine.m_m1'),
			value: '-',
			img: store.$state.my.boxItem[0]
		},
		{
			name: t('mine.m_m2'),
			value: '-',
			img: store.$state.my.boxItem[1]
		},
		{
			name: t('mine.m_m3'),
			value: '-',
			img: store.$state.my.boxItem[2]
		},
	])
	// myList
	const myList = ref([

		{
			name: t('mine.m_m5'),
			img: store.$state.my.myList[0],
			url: '../mine/accountDetails',
			openLink: false,
			showFlag: true,
		},
		{
			name: t('mine.m_m8'),
			img: store.$state.my.myList[1],
			url: '../mine/team',
			openLink: false,
			showFlag: true,
		},
		{
			name: t('mine.m_m7'),
			img: store.$state.my.myList[2],
			url: '../record/rechargeRecord',
			openLink: false,
			showFlag: true,
		},

		{
			name: t('mine.m_m6'),
			img: store.$state.my.myList[3],
			url: '../record/withdrawRecord',
			openLink: false,
			showFlag: true,
		},

		{
			name: t('mine.m_m9'),
			img: store.$state.my.myList[4],
			url: '../mine/share',
			openLink: false,
			showFlag: true,
		},


		{
			name: t('add1.a_d1') +" APP",
			img: store.$state.my.myList[5],
			openLink: true,
			showFlag: false,
			// url:"https://www.binance.com/en"
		},
		{
			name: "Binance",
			img: store.$state.my.myList[6],
			openLink: true,
			showFlag: true,
			url: "https://www.binance.com/en"
		},
		{
			name: t('mine.m_m10'),
			img: store.$state.my.myList[7],
			url: '../setting/setUp',
			openLink: false,
			showFlag: true,
		},

	])


	const changePage = (url, flag) => {
		if (flag) {
			if (url) {
				url ? window.open(url) : ''
			}
		} else {
			uni.navigateTo({
				url
			})
		}
	}



	const showService = ref(false)

	const copyHandle = async (data) => {
		try {
			await toClipboard(data)
			Toast.text(t('all.a_d1') + " " + t('all.a_c9'))
		} catch (e) {
			console.error(e)
		}
	}
	const goRecharge = (url) => {
		uni.switchTab({
			url: './recharge'
		})
	}
	const pageData = ref({})
	const getData = () => {
		request({
			url: 'user/index',
			methods: 'get',
		}).then(res => {
			pageData.value = res
			boxItem.value[0].value = res.total_commission
			boxItem.value[1].value = res.lixibao_balance
			boxItem.value[2].value = res.total_lixibao
		})
		// 获取客服状态
		request({
			url: 'setting/customerService',
			methods: 'get',
		}).then(res => {

			res.status == 1 ? showService.value = true : showService.value = false
		})
		// 获取app状态
		request({
			url: 'setting/app',
			methods: 'get',
		}).then(res => {
			if (res.download_status == 1) {
				myList.value[5].showFlag = true
				myList.value[5].url = res.url
			}
		})
		// 获取app状态
		request({
			url: 'user/unreadNoticeNum',
			methods: 'get',
		}).then(res => {
			res > 0 ? showBadge.value = true : showBadge.value = false
		})

	}
	const currency = ref("")
	// 终于可以用了
	onShow(() => {
		currency.value = uni.getStorageSync("currency")
		getData()
		getAct()
	})
</script>

<style lang="scss">
	.bBox {
		// height: 389rpx;
		height: 451rpx;
		display: flex;
		align-items: center;
		// justify-content: center;
		flex-direction: column;
		padding: 0 80rpx;
		color: #fff;

		.boxItemBox {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #fff;
			padding: 29rpx 27rpx;
			width: 100%;
			border-radius: 30rpx;

			.title {
				color: #AFAFAF;
				width: 90%;
				text-align: center;
				height: 50rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.boxItem {
				display: flex;
				align-items: center;
				flex-direction: column;
				width: 30%;
			}
		}
	}

	.bItem {
		width: 48%;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		// padding: 41rpx 35rpx;
		border-radius: 25rpx;
		height: 125rpx;

	}

	.myEl {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		width: 100%;

		.myItem {
			padding: 32rpx;
			background-color: #fff;
			border-radius: 30rpx;
			display: flex;
			align-items: center;
			width: 38%;
			margin-bottom: 40rpx;
			text-align: center;
			font-size: 26rpx;
		}
	}



	.rightIcon {
		top: 40%;
		right: 45rpx;
		display: flex;
		align-items: center;
		flex-direction: column;

		image {
			margin-top: 50rpx;
		}
	}

	.openBg {
		background-color: rgba(25, 25, 25, 0.3);
		padding: 30rpx 30rpx 30rpx;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-content: space-between;
		position: relative;
		overflow: hidden;

		.closeIcon {
			position: absolute;
			right: 10rpx;
			top: 10rpx;
		}

	}

	.actItem {
		animation: fadeInDown;
		/* referring directly to the animation's @keyframe declaration */
		animation-duration: 1s;
	}
</style>
