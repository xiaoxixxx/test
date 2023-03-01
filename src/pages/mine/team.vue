<template>
	<view :style="store.$state.imgObj.loginBg">

		<view class="pdlr35 pt33">

			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.secondColor}">{{t('mine.m_t15')}}</view>

			<view class="flex mt40" v-if="!pages.start">
				<view class="sel btns" @click="isVisible =true">
					{{t('mine.m_a2')}}
					<image class="mglr17" :src="store.$state.imgObj.down" mode="widthFix"
						style="width: 21rpx; height: 13rpx;"></image>
				</view>
				<view class="sea btns mglr22" @click="searchHandle">
					<image class="mr17" :src="store.$state.imgObj.search" mode="widthFix"
						style="width: 31rpx; height: 30rpx;"></image>
					{{t('mine.m_a3')}}
				</view>
			</view>
			<view class="flex mt40" v-else>
				<view class="sel btns">
					{{pages.start +' -- '+ pages.end}}

					<view class="mglr17" @click="clearHandle">
						<nut-icon name="close" size="14"></nut-icon>
					</view>
				</view>
				<view class="sea btns mglr22" @click="searchHandle">
					<image class="mr17" :src="store.$state.imgObj.search" mode="widthFix"
						style="width: 31rpx; height: 30rpx;"></image>
					{{t('mine.m_a3')}}
				</view>
			</view>

			<view class="mt35 topEl">
				<view class="topItem f20" v-for="(item,index) in topBox">
					<view class="">
						{{item.name}}
						<nut-icon name="ask" size="10" class="askIcon" color="red" v-if="index ==3"
							@click="teamMask = true"></nut-icon>
					</view>
					<view class="">
						{{index==0||index == 1? parseFloat(item.value).toFixed(2):item.value}}
					</view>
				</view>
			</view>

			<view class="mt35 selBot" :style="{background:store.$state.secondColor}">
				{{t('mine.m_t1')}}: <text @click="memberShow = true">{{memberValue.text}}</text>
			</view>

			<view class="mt40 botEl">
				<view class="botItem" v-for="item in botList">
					<view class="between">
						<view>{{t('mine.m_t2')}}</view>
						<view>{{item.phone}}</view>
					</view>
					<view class="between mt16">
						<view>{{t('mine.m_t3')}}</view>
						<view>{{item.child}}</view>
					</view>
					<view class="between mt16">
						<view>{{t('mine.m_t6')}}</view>
						<view>{{item.total_commission}}</view>
					</view>
					<view class="between mt16">
						<view>{{t('mine.m_t4')}}</view>
						<view>{{item.balance}}</view>
					</view>
					<view class="between mt16">
						<view>{{t('mine.m_t5')}}</view>
						<view>{{item.create_time}}</view>
					</view>
				</view>
				<view class="center mt30">
					<view class="line"></view>
					<view class="mglr27 f20" v-if="hasMore" @click="loadMore">
						{{t('record.r_r2')}}
					</view>
					<view class="mglr27 f20" v-else>
						{{t('record.r_r1')}}
					</view>
					<view class="line"></view>
				</view>
				<view style="height: 50rpx;"></view>
			</view>
		</view>

		<!-- 日历 -->
		<nut-calendar v-model:visible="isVisible" type="range" @choose="setChooseValue">
		</nut-calendar>

		<!-- 选择器 -->
		<nut-picker v-model:visible="memberShow" :columns="columns" @confirm="confirm">
		</nut-picker>

		<nut-overlay v-model:visible="teamMask">
			<div class="wrapper">
				<image src="../../static/themeNum1/teamMask.png" mode="heightFix" style="width: 100%;height: 320rpx;">
				</image>
			</div>
		</nut-overlay>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
	import request from '../../../comm/request.ts';
	import {
		Locale
	} from '@nutui/nutui';
	import enUS from '@nutui/nutui/dist/packages/locale/lang/en-US';
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
	const showLoading = ref(null)
	const methods = {
		back() {
			history.back()
		},

	};
	const isVisible = ref(false)
	const memberShow = ref(false)
	const memberValue = ref({
		text: t('mine.m_t7'),
		value: 0
	})

	const closeSwitch = param => {
		isVisible.value = false;
	};
	const setChooseValue = param => {
		pages.value.start = param[0][3]
		pages.value.end = param[1][3]
	};
	const confirm = ({
		selectedValue,
		selectedOptions
	}) => {
		// desc.value = selectedValue.join(',');
		memberValue.value = selectedOptions[0]
		showLoading.value.loading = true
		pages.value.page = 1
		pages.value.level = selectedOptions[0].value
		getRecord(pages.value)
	}

	const columns = [{
			text: t('mine.m_t7'),
			value: 0
		},
		{
			text: '1 ' + t('mine.m_t8'),
			value: 1
		},
		{
			text: '2 ' + t('mine.m_t8'),
			value: 2
		},
		{
			text: '3 ' + t('mine.m_t8'),
			value: 3
		},
	]

	const topBox = ref([{
			name: t('mine.m_t13'),
			value: 0
		},
		{
			name: t('mine.m_t14'),
			value: 0
		}, {
			name: t('mine.m_t9'),
			value: 0
		},
		{
			name: t('mine.m_t10'),
			value: 0
		},
		{
			name: t('mine.m_t11'),
			value: 0
		},
		{
			name: t('mine.m_t12'),
			value: 0
		},


	])



	const getData = () => {
		request({
			url: 'user/record/team/report',
			methods: 'get',
		}).then(res => {
			topBox.value[0].value = res.member_cate_commission
			topBox.value[1].value = res.member_cate_commission_today
			topBox.value[2].value = res.level
			topBox.value[3].value = res.zhitui
			topBox.value[4].value = res.level2
			topBox.value[5].value = res.level3

		})
	}

	const pages = ref({
		page: 1,
		size: 10,
		level: 0,
		start: "",
		end: ""
	})

	const hasMore = ref(true)
	const botList = ref([])
	const getRecord = (data) => {
		request({
			url: 'user/record/team/user',
			methods: 'get',
			data
		}).then(res => {
			showLoading.value.loading = false
			botList.value = res.data
			if (botList.value.length < res.total) {
				hasMore.value = true
			}else{
				hasMore.value = false
			}
		})
	}
	const clearHandle = () => {
		pages.value.start = ""
		pages.value.end = ""
	}
	const searchHandle = () => {
		const data = Object.assign(pages.value)
		getRecord(data)
	}
	const loadMore = () => {
		pages.value.page += 1
		showLoading.value.loading = true
		request({
			url: 'user/record/team/user',
			methods: 'get',
			data: pages.value
		}).then(res => {
			showLoading.value.loading = false
			botList.value = botList.value.concat(res.data)
			if (botList.value.length < res.total) {
				hasMore.value = true
			}else{
				hasMore.value = false
			}
		})
	}
	const teamMask = ref(false)


	// 终于可以用了
	onShow(() => {
		Locale.use('en-US', enUS);
		getData();
		getRecord(pages.value)
	})
</script>

<style lang="scss">
	.btns {
		// width: 220rpx;
		height: 80rpx;
		border-radius: 40rpx;

		color: #fff;
		font-size: 26rpx;
		padding: 0 30rpx;
		min-width: 160rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.sea {
		background: #F5B04C;
		box-shadow: 0rpx 1rpx 31rpx 0rpx rgba(232, 158, 52, 0.57);
	}

	.sel {
		background: #3477E0;
		box-shadow: 0rpx 1rpx 31rpx 0rpx rgba(76, 136, 230, 0.38);
	}

	.topEl {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		// grid-template-rows: repeat(3, 1fr);
		grid-column-gap: 0px;
		grid-row-gap: 0px;
		background-color: #fff;
		border-radius: 30rpx;
		padding: 27rpx 20rpx;

		.topItem {
			padding: 47rpx 0;
			text-align: center;
			position: relative;

			// .askIcon{
			// 	position: absolute;
			// 	right: 20rpx;
			// 	bottom: 20rpx;
			// }
			view:nth-child(1) {
				height: 80%;
			}
		}
	}

	.selBot {
		padding: 21rpx 31rpx;
		color: #fff;
		display: inline-block;
		border-radius: 30rpx;
		font-size: 26rpx;
	}

	.botItem {
		padding: 35rpx;
		background-color: #fff;
		border-radius: 30rpx;
		margin-bottom: 30rpx;
		font-size: 20rpx;
	}

	.botEl {
		height: 40vh;
		overflow: scroll;
	}

	.line {
		width: 44rpx;
		height: 2rpx;
		background-color: #999999;
	}

	.wrapper {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
		padding: 0 30rpx;
		
	}
</style>
