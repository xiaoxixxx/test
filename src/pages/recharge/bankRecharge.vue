<template>
	<view :style="store.$state.imgObj.loginBg">

		<view class="pdlr50 pt33 pb50 ">

			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.secondColor}">{{t('wr.r_r1')}}</view>
			<view class="mt55">
				<view class="topBox center flex-col" :style="store.$state.wr.reBox">
					<view class="topItem f26">{{t('mine.m_t4')}}</view>
					<view class="mt35 f55" style="color: #fff;">{{currency}} {{user.balance}} </view>
				</view>

				<view class="mt40 inputItem">
					<text :style="{color:store.$state.contentColor}">{{currency}}</text>
					<view class="pl35">
						<input type="number" :focus="true" :placeholder="t('mine.m_s7')" placeholder-class="f30 plo"
							v-model="inpVal" @input="inpHandle">
					</view>
				</view>
				<view class="f20 mt30 text_center" style="color: #F43D45;">
					*{{t('wr.r_r15')}}
					{{bankNameList[nameInd]?bankNameList[nameInd].min +"-" + bankNameList[nameInd].max:0}}
				</view>


				<view v-if="bankNameList.length >0">
					<view class=" mt54 f34 secondClo" :style="{color:store.$state.secondColor}">
						{{t('add1.b_b1')}}
					</view>

					<view class="mainBox mt40">
						<view class="chooseItem" v-for="(item,index) in bankNameList"
							:style="nameInd == index?choStyle:noStyle" @click="nameInd = index">
							{{item.alias}}
						</view>
					</view>

					<view v-if="nameInd >-1">
						<view class=" mt54 f34 secondClo" :style="{color:store.$state.secondColor}">
							{{t('add1.b_b2')}}
						</view>

						<view class="mainBox mt35">
							<view class="chooseItem" v-for="(item,index) in bankNameList[nameInd].buttons"
								:style="numInd == index?choStyle:noStyle" @click="changeInpVal(index,item)">
								{{item}}
							</view>
						</view>
					</view>


					<view v-if="nameInd >-1 && bankNameList[nameInd].way.length >0">
						<view class=" mt54 f34 secondClo" :style="{color:store.$state.secondColor}">
							{{t('add1.b_b2')}}
						</view>

						<view class="mainBox mt35">
							<view class="chooseItem" v-for="(item,index) in bankNameList[nameInd].way"
								:style="wayInd == index?choStyle:noStyle" @click="wayInd = index">
								{{item.name}}
							</view>
						</view>
					</view>
				</view>

				<view class="btns" :style="inpVal>0 && nameInd>-1? choStyle:noStyle" @click="submitHandle">
					{{t('wr.r_r3')}}
				</view>
			</view>
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
	const choStyle = {
		background: store.$state.contentColor,
		boxShadow: "none ",
		color: '#fff'
	}
	const noStyle = {
		color: store.$state.contentColor
	}



	const nameInd = ref(-1)
	const numInd = ref(-1)
	const wayInd = ref(-1)
	const bankNameList = ref([])
	const user = ref({})
	const pageData = ref({})
	const inpVal = ref("")



	const inpHandle = e => {

		if (nameInd.value == -1) {
			return false
		} else {
			bankNameList.value[nameInd.value].buttons.forEach((item, index) => {
				if (item !== e.detail.value) {
					numInd.value = -1
				}
			})
		}
	}
	const changeInpVal = (index, item) => {
		numInd.value = index
		inpVal.value = item
	}
	const getData = () => {
		request({
			url: 'finance/bank/recharge/index',
			methods: 'get',
		}).then(res => {
			bankNameList.value = res.channels
			user.value = res.user
		})
	}

	const submitHandle = () => {
		if (!inpVal.value) {
			Toast.text(t('add1.b_b3'))
			return false
		}
		if (nameInd.value == -1) {
			Toast.text(t('add1.b_b1'))
			return false
		}
		if (bankNameList.value[nameInd.value].way.length > 0 && wayInd.value == -1) {
			Toast.text('add1.b_b2')
			return false
		}
		const formData = {
			amount: inpVal.value,
			channelId: bankNameList.value[nameInd.value].id,
			way: bankNameList.value[nameInd.value].way.length > 0 ? bankNameList.value[nameInd.value].way[wayInd
				.value].id : 0
		}
		request({
			url: '/finance/bank/recharge/submit',
			methods: 'post',
			data: formData
		}).then(res => {
			let data = res
			if (data.is_post == 0) {
				window.location.href = data.native_url;
			} else if (data.is_post == 1) {
				const div = document.createElement('div');
				let inputHtml = "";
				let params = data.params;
				for (let key in data.params) {
					inputHtml += `<input name="${key}" value="${params[key]}" type="hidden" />`;
				}
				let myHtml = `<form method="post" action='${native_url}'>
			 		                            ${inputHtml}
			 		                        </form>`;
				div.innerHTML = myHtml;
				document.body.appendChild(div);
				document.forms[0].submit();
			} else if (data.is_post == 2) {
				uni.navigateTo({
					url: "/pages/clabe/clabe?clabe=" + data.native_url + "&amount=" + data
						.verify_money
				})
			}

		}).catch(err => {
			Toast.text(err.message)
		})

	}
	const currency = ref("")
	// 终于可以用了
	onShow(() => {
		currency.value = uni.getStorageSync('currency')
		getData();
	})
</script>

<style lang="scss">
	.topBox {
		width: 100%;
		height: 328rpx
	}

	.topItem {
		padding: 0 34rpx;
		height: 60rpx;
		background: #FEF3DE;
		border-radius: 30rpx;
		text-align: center;
		line-height: 60rpx;
	}

	.inputItem {
		height: 115rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 1rpx 51rpx 0rpx rgba(64, 46, 197, 0.05);
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 50rpx;
		color: #333;
		padding-left: 40rpx;

	}

	.mainBox {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		// grid-template-rows: repeat(3, 1fr);
		grid-column-gap: 0px;
		grid-row-gap: 0px;

		.chooseItem {
			width: 90%;
			background-color: #fff;
			height: 100rpx;
			border-radius: 20rpx;
			margin-bottom: 20rpx;
			text-align: center;
			line-height: 100rpx;
		}
	}

	.btns {
		margin-top: 100rpx;
		// box-shadow: 0px 11px 47px 4px rgba(247, 175, 64, 0.35);
		height: 120rpx;
		background-color: #fff;
		line-height: 120rpx;
		text-align: center;
		border-radius: 35rpx;
	}
</style>
