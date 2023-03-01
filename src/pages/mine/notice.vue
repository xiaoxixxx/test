<template>
	<view :style="store.$state.imgObj.loginBg">

		<view class="pdlr30 pt33">

			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.secondColor}">{{t('add1.a_d2')}}</view>
			<z-paging class="mt54" ref="paging" v-model="recordsList" @query="getData" width="100%" :fixed="false"
				:use-page-scroll="true" :refresher-enabled="false" :to-bottom-loading-more-enabled="true"
				:auto-show-back-to-top="true" :safe-area-inset-bottom="true" :empty-view-text="t('record.r_r1')"
				:loading-more-no-more-text="t('record.r_r1')" :empty-view-reload-text="t('record.r_r2')"
				:loading-more-loading-text="t('record.r_r4')" :loading-more-fail-text="t('record.r_r3')">
				<view class="listItem" v-for="(item, index) in recordsList" :key="index" @click="readHandle(item)">
					<view class="">
						<view>
							<nut-badge dot top="4" right="4" v-if="item.status ==0">
								<image :src="store.$state.imgObj.noticeP" mode="widthFix"
									style="width: 78rpx;height: 78rpx;"></image>
							</nut-badge>

							<image :src="store.$state.imgObj.noticeP" v-else mode="widthFix"
								style="width: 78rpx;height: 78rpx;"></image>
						</view>
					</view>

					<view class="mglr32 f24" style="flex: 1;">
						<view class="between">
							<view>{{item.template?item.template.title:''}}</view>
							<view class="" style="color: #AFAFAF;">{{item.createTime}}</view>
						</view>
						<view class="mt26">
							{{item.template?item.template.content:''}}
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
	const getData = () => {
		request({
			url: 'user/record/message',
			methods: 'get',
			data: pages.value
		}).then(res => {
			paging.value.complete(res.data);
			pages.value.page += 1
		})
	}
	const readHandle = item => {
		// 状态：0.未读 1.已读
		if (item.status !== 0) {
			return false
		}

		request({
			url: 'user/read',
			methods: 'post',
			data: {
				id: item.id
			}
		}).then(res => {
			Toast.text('success')
			recordsList.value = []
			pages.value.page = 1
			getData()
		}).catch(err => {
			Toast.text(err.message)
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
		margin-bottom: 25rpx;
		font-size: 28rpx;
		display: flex;


	}
</style>
