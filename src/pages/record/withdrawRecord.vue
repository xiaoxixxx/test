<template>
	<view :style="store.$state.imgObj.loginBg">

		<view class="pdlr35 pt33">

			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.secondColor}">{{t('record.r_w1')}}</view>
			
			<z-paging class="mt54" ref="paging" v-model="recordsList" @query="getData" 
				:use-page-scroll="true" :refresher-enabled="false" :to-bottom-loading-more-enabled="true"
				:auto-show-back-to-top="true" :safe-area-inset-bottom="true" :empty-view-text="t('record.r_r1')"
				:loading-more-no-more-text="t('record.r_r1')" :empty-view-reload-text="t('record.r_r2')"
				:loading-more-loading-text="t('record.r_r4')" :loading-more-fail-text="t('record.r_r3')">
				<view class="listItem" v-for="(item, index) in recordsList" :key="index">
					<view class="vvItem">
						<view class="f26">{{t('mine.m_s10')}}</view>
						<view class=""> {{ item.amount }}</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{t('wr.r_r5')}}</view>
						<view class="">
							{{item.order_no}}
						</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{t('record.r_w2')}}</view>
						<view class="">{{ item.fee }}</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{t('record.r_w3')}}</view>
						<view class="">{{ item.actual_amount }}</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{t('record.r_w4')}}</view>
						<view class="">
							<text v-if="item.type ==1" class="pass">USDT</text>
							<text v-if="item.type ==2" class="pass">OTHER</text>
						</view>
					</view>
					<view class="vvItem" v-if="item.remark">
						<view class="f26">Remarks</view>
						<view class="">{{ item.remark }}</view>
					</view>
					<view class="vvItem">
						<!-- 1-待审核 2-审核成功 3-驳回 4-已取消 -->
						<view class="f26">{{t('record.r_w9')}}</view>
						<view class="">
							<text v-if="item.status ==1" class="pass">{{t('record.r_w10')}}</text>
							<text v-if="item.status ==2" class="pass">{{t('record.r_w11')}}</text>
							<text v-if="item.status ==3" class="error">{{t('record.r_w12')}}</text>
							<text v-if="item.status ==4" class="cancle">{{t('record.r_w13')}}</text>
						</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{t('record.r_w5')}}</view>
						<view class="">
							<text v-if="item.pay_status ==1" class="cancle">{{t('record.r_w6')}}</text>
							<text v-if="item.pay_status ==2" class="pass">{{t('record.r_w7')}}</text>
							<text v-if="item.pay_status ==3" class="error">{{t('record.r_w8')}}</text>
						</view>
					</view>
				</view>
			</z-paging>
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
	} from 'vue-i18n'

	const {
		t
	} = useI18n()
	const methods = {
		back() {
			history.back()
		},

	};
	const recordsList = ref([])
	const paging = ref(null)
	const pages = ref({
		page: 1,
		size: 10
	})
	const getData = (page) => {
		pages.value.page = page
		request({
			methods: 'get',
			url: 'user/record/withdraw',
			data: pages.value
		}).then(res => {
			paging.value.complete(res.data);
			pages.value.page += 1
		})
	}
	// 终于可以用了
	onLoad(() => {

	})
</script>

<style lang="scss">
	page {
		font-family: PingFangSC;
	}

	.listItem {
		background: #fff;
		border-radius: 20rpx;
		padding: 34rpx 45rpx;
		margin-bottom: 30rpx;
		font-size: 28rpx;
		width: 600rpx;
		.vvItem {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 29rpx;
		}

		.pass {
			color: #5db760;
		}

		.error {
			color: #f5564b;
		}
	}
</style>
