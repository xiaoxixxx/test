<template>
	<view class="warp"
		style="background: url(/static/actIcon/zhuanpan1/lottery.png) repeat-y 100%/105%;height: 100vh;overflow: scroll;width: 100vw;">


		<view class="pdlr50 pt33">

			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
					
					<image src="../../static/actIcon/sign/signRecord.png" mode="widthFix"
						style="width: 48rpx;height: 48rpx;" @click="changePage"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.secondColor}">{{t('act.d_s1')}}</view>
			
			<view class="notice " style="background-color: #fff;" dir="ltr">
				<nut-noticebar :text="barText" :left-icon="store.$state.imgObj.labaIcon"  :scrollable="true"
					background="rgba(251, 248, 220, 0)" color="#212121">
				</nut-noticebar>
			</view>
			<view class="flex topList" style="margin: 100rpx 0;">
				<view class="tabs " :style="{background:store.$state.contentColor}">{{t('act.d_s2')}}: {{ pageData.num }}</view>
				<view class="tabs mglr30" :style="{background:store.$state.contentColor}">{{t('act.d_s3')}}: {{ pageData.did_num }}
				</view>
			</view>

		

		</view>
		<view class=" ">


			<gb-choujiang nImg="" :AwardList="AwardList" @updateMoney="updateMoney" :canuse="canuse" :desc="desc">
			</gb-choujiang>
		</view>

	</view>
</template>


<script setup>
	import gbChoujiang from '../../components/gb-choujiang/gb-choujiang';
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
	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();

	const pageData = ref({})

	const AwardList = ref([])

	const isQd = ref(true)
	const canuse = ref(false)
	const msg = ref("")
	const desc = ref("")

	const barText = ref("")
	// 可自己后端获取，也可以前端
	const methods = {
		back() {
			history.back()
		},

	};

	const getData = () => {
		request({
			url: 'activity/lottery/info',
			methods: 'get'
		}).then(res => {
			pageData.value = res.chance
			// console.log(res.lottery.rule);
			desc.value = res.lottery.rule
			pageData.value.num > 0 ? (canuse.value = true) : (canuse.value = false);
			AwardList.value = res.lottery.gift
			let tempObj = {
				cover: "/upload/image/20220914/a1c80601be0cad21e5ee29a6b923eaac.jpg",
				full_cover: "https://api.bsppy88.top/upload/image/20220914/a1c80601be0cad21e5ee29a6b923eaac.jpg",
				id: 10,
				lotteryId: 1,
			}
			let tempObj1 = {
				cover: "/upload/image/20220914/a1c80601be0cad21e5ee29a6b923eaac.jpg",
				full_cover: "https://api.bsppy88.top/upload/image/20220914/a1c80601be0cad21e5ee29a6b923eaac.jpg",
				id: 19,
				lotteryId: 1,
			}
// 			let adLen = 8- AwardList.value.length
		
// AwardList.value.push(tempObj)
// 			AwardList.value.push(tempObj1)
			// 把第四个位置的奖励放到最后以为
			let tempObj3 = AwardList.value[4]
			AwardList.value.push(tempObj3)
			AwardList.value[4] = {}
			if (AwardList.value.length > 9) {
				AwardList.value = AwardList.value.splice(0, 9);
			}
			let str = ""
			res.result.forEach(item => {
				str += item.user.phone + " "+ t('act.d_s4') +" "+ item.gift.name + ", "
			})
			barText.value = str
		})
	}
	
	const changePage = ()=>{
		uni.navigateTo({
			url:"../record/drawRecord"
		})
	}
	const updateMoney = () => {
		getData()
	}
	// 终于可以用了
	onShow(() => {
		getData();
	})
</script>


<style lang="scss" scoped>
	.topCord {
		display: flex;
		flex-direction: row-reverse;

		.record {
			padding: 18rpx 45rpx;
			border-top: 1rpx solid #FFFFFF;
			border-left: 1rpx solid #FFFFFF;
			border-bottom: 1rpx solid #FFFFFF;
			background: linear-gradient(270deg, #9550E6 0%, #EC6FD6 100%);
			box-shadow: 0rpx 5rpx 28rpx 1rpx rgba(149, 80, 230, 0.55);
			border-radius: 30rpx 0 0 30rpx;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			line-height: 100%;
		}
	}

	.notice {
		padding: 10rpx 0;
		background-color: #fff;
		border-radius: 20rpx;
		margin-top: 34rpx;
		font-size: 28rpx;

	}

	.topList {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 50rpx;

		.tabs {
			padding: 25rpx 10rpx;
			border-radius: 20rpx;
			color: #fff;
			border: 1rpx solid #fff;
			width: 45%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 26rpx;
		}
	}




	.rules {
		height: 25vh;

		.ruleItem1 {

			width: 100%;
			margin: 0 auto;
			font-size: 42rpx;
			padding: 0 30rpx;
			border-radius: 8rpx;
			color: #fff;
			height: 67rpx;
		}

		.line {
			width: 150rpx;
			height: 4rpx;
			background-color: #fff;
			border-radius: 4rpx;
		}

		.ruleItem {
			height: 80%;
			overflow: scroll;
			color: #333;
			// margin-top: 00rpx;
			background: #fff;
			padding-bottom: 20rpx;
		}
	}
</style>
