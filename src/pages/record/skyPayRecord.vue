<template>
	<view :style="store.$state.imgObj.loginBg">

		<view class="pdlr35 pt33">

			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.secondColor}">{{t('record.r_s1')}} </view>
			<z-paging class="mt54" ref="paging" v-model="recordsList" @query="getData" width="100%" :fixed="false"
				:use-page-scroll="true" :refresher-enabled="false" :to-bottom-loading-more-enabled="true"
				:auto-show-back-to-top="true" :safe-area-inset-bottom="true"  :empty-view-text="t('record.r_r1')" :loading-more-no-more-text="t('record.r_r1')"  	:empty-view-reload-text="t('record.r_r2')" 
				:loading-more-loading-text="t('record.r_r4')" :loading-more-fail-text="t('record.r_r3')">
				<view class="listItem" v-for="(item, index) in recordsList" :key="index">
					<view class="f28" :style="{color:store.$state.contentColor}">
						
					</view>
					<view class="vvItem" style="margin-top: 0;">
						<view class="f26">{{t('record.r_s2')}}</view>
						<view class=""> {{ item.order_no }}</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{t('record.r_s3')}}</view>
						<view class="">
							{{item.num}}
						</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{t('record.r_s4')}}</view>
						<view class="">{{ item.yuji_num }}</view>
					</view>		<view class="vvItem">
						<view class="f26">{{t('record.r_s5')}}</view>
						<view class="">{{ item.actual_num }}</view>
					</view>		<view class="vvItem">
						<view class="f26">{{t('record.r_s6')}}</view>
						<view class="">{{ item.createTime }}</view>
					</view>	<view class="vvItem">
						<view class="f26">{{t('record.r_s7')}}</view>
						<view class="">{{ item.expire_time }}</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{t('all.a_d2')}}</view>
						<view class="">
							<text v-if="item.status ==1" class="pass">{{t('record.r_s8')}}</text>
							<text v-if="item.status ==2" class="pass">{{t('record.r_s9')}}</text>
							<text v-if="item.status ==3" class="cancle">{{t('record.r_s10')}}</text>
						</view>
					</view>
					
					<view class="btns" :style="{background:store.$state.contentColor}" v-if="showBtn && item.status ==1" @click="interruptHandle(item)">
						{{t('record.r_s11')}}
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
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	const store = userStore();

import {useI18n} from 'vue-i18n'

	　const { t } = useI18n()
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
	
	const showBtn = ref(false)
	const getData = (page) => {
		pages.value.page = page
		request({
			methods: 'get',
			url: 'lixibao/log',
			data: pages.value
		}).then(res => {
			paging.value.complete(res.data);
			pages.value.page += 1
		})
		request({
			methods: 'get',
			url: 'setting/lixibao',
		}).then(res => {
			res.can_interrupt == 1 ?showBtn.value = true:showBtn.value = false
		})
		
	}
	
	const interruptHandle = (item)=>{
		uni.showModal({
			title:t('record.r_s12'),
			content: t('record.r_s13'),
			confirmText: 'confirm',
			cancelText: 'cancel',
			success: e => {
				if (e.confirm) {
					const data = {
						id:item.id,
					}
					request({
						url: 'lixibao/interrupt',
						methods: 'post',
						data:data
					}).then(res => {
					
					Toast.text(t('record.r_s14'))
						
						history.go(0)
					}).catch(err=>{
						uni.showToast({
							title:err.message,
							icon:'none'
						})
					})
				}
			}
		});
	}
	
	// 终于可以用了
	onLoad(() => {
		// getData()
	})
</script>

<style lang="scss">
	page{
		font-family: PingFangSC;
	}
	.listItem {
		background: #fff;
		border-radius: 20rpx;
		padding: 34rpx 45rpx;
		margin-bottom: 30rpx;
		font-size: 28rpx;
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
		.cancle{
			color: #AFAFAF;
		}
		.btns{
			margin-top: 29rpx;
			color: #fff;
			border-radius: 10rpx;
			text-align: center;
			line-height: 90rpx;
			height: 90rpx;
		}
	}
</style>
