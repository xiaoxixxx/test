<template>
	<view :style="store.$state.imgObj.loginBg">

		<view class="pdlr35 pt33" :style="{color:store.$state.secondColor}">

			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.secondColor}">{{t('inp.i_a1')}}</view>

			<view class="mt59">
				<view class="pl14">
					{{t('inp.i_a2')}}
				</view>
				<view class="mt34">
					<nut-picker v-model:visible="show" :text="'text2'" :columns="columns" @confirm="confirm"
						:cancel-text="t('all.a_c2')" :ok-text="t('all.a_c1')" />
					<input class="inp" placeholder-class="plo" :placeholder="t('inp.i_a3')" disabled
						 v-model="bName" @click="show = true">
					<!--  <input class="inp" placeholder-class="plo"  placeholder="please enter the Bank Name"  v-model="formData.bName"> -->
				</view>
			</view>

			<view class="mt38">
				<view class="pl14">
					{{t('inp.i_a4')}}
				</view>
				<view class="mt34">
					<input class="inp" placeholder-class="plo" :placeholder="t('inp.i_a5')" 
						v-model="formData.bank_num">
				</view>
			</view>
			
			<view class="mt38" v-if="showIn">
				<view class="pl14">
					{{t('add1.b_b5')}} ifsc_code
				</view>
				<view class="mt34">
					<input class="inp" placeholder-class="plo" :placeholder="t('add1.b_b5') +'ifsc_code'" 
						v-model="formData.other_param_1">
				</view>
			</view>
			
			<view class="mt38">
				<view class="pl14">
					{{t('inp.i_a6')}}
				</view>
				<view class="mt34">
					<input class="inp" placeholder-class="plo" :placeholder="t('inp.i_a7')" 
						v-model="formData.account_holder">
				</view>
			</view>

			<view class="mt38">
				<view class="pl14">
					{{t('inp.i_a8')}}
				</view>
				<view class="mt34">
					<input class="inp" placeholder-class="plo" :placeholder="t('inp.i_a9')" 
						v-model="formData.phone">
				</view>
			</view>



			<!-- 登录按钮 -->
			<view class="btns f36"
				:style="showTag?{background:store.$state.contentColor,boxShadow: '0rpx 11rpx 47rpx 4rpx rgba(247, 175, 64, 0.35)'}:{background:store.$state.btnDis}"
				@click="methods.saveHandle">
				{{ t('inp.i_s1')}}
			</view>

			<view style="height: 50rpx;"></view>
			<Loading ref="showLoading"></Loading>
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
	const showLoading = ref(null)
	import WEB_URL from "../../../yuming.js"
	import {
		useI18n
	} from 'vue-i18n'

	const {
		t
	} = useI18n()
	
	const showIn =ref(false)
	const methods = {
		back() {
			history.back()
		},
		saveHandle() {
			// if (!showTag.value) {
			// 	return false
			// }
			if (!formData.value.bankId) {
				Toast.text(t('inp.i_a3'));
				return false
			}

			if (!formData.value.bank_num) {
				Toast.text(t('inp.i_a5'));
				return false
			}
			if (!formData.value.account_holder) {
				Toast.text(t('inp.i_a7'));
				return false
			}
			if (!formData.value.phone) {
				Toast.text(t('inp.i_a9'));
				return false
			}
			showLoading.value.loading = true
			setTimeout(() => {
				methods.saveHandle1()
			}, 2000)
		},
		saveHandle1() {

			request({
				url: 'user/attribute/bankcard',
				methods: 'post',
				data: formData.value
			}).then(res => {
				showLoading.value.loading = false
				Toast.text(t('inp.i_s2'));
				history.back()

			}).catch(err => {
				showLoading.value.loading = false
				Toast.text(err.message);
			})


		},
	};
	const show = ref(false)
	const columns = ref([])

	const confirm = ({
		selectedValue,
		selectedOptions
	}) => {
		// desc.value = selectedValue.join(',');
		bName.value = selectedOptions[0].text
		formData.value.bankId = selectedOptions[0].value
	}
	const bName = ref("")
	const formData = ref({
		bankId: "",
		bank_num: '',
		account_holder: '',
		phone: '',
		other_param_1:""
	})
	const showTag = ref(false)
	// 监听
	watch(formData, (newVal, oldVal) => {
		showTag.value = false
		if (!canEdit.value) {
			return false
		}
		if (!formData.value.bankId) {
			return false
		}

		if (!formData.value.bank_num) {
			return false
		}
		if (!formData.value.account_holder) {
			return false
		}
		if (!formData.value.phone) {
			return false
		}
		showTag.value = true
	}, {
		deep: true
	})

	const canEdit = ref(false)
	const getData = () => {
		request({
			url: 'user/attribute/bankcard',
			methods: 'get',
		}).then(res => {
			// columns.value = res.banks
			if (res.banks.length > 0) {
				let temArr = []
				for (let i = 0; i < res.banks.length; i++) {
					res.banks[i].text = res.banks[i].name
					res.banks[i].value = res.banks[i].id
					temArr.push(res.banks[i])
				}
				columns.value = temArr
			}

			res.bank_card_can_edit == 1 ? canEdit.value = true : canEdit.value = false

			if (res.bankcard) {
				formData.value.account_holder = res.bankcard.account_holder
				formData.value.phone = res.bankcard.phone
				formData.value.bank_num = res.bankcard.bank_num
				formData.value.bankId = res.bankcard.bankId
				try{
					formData.value.other_param_1 = res.bankcard.other_param_1
				}catch(e){
					//TODO handle the exception
				}
				for (let i in columns.value) {
					if (columns.value[i].id == formData.value.bankId) {
						bName.value = columns.value[i].text
					}
				}
			}
		})
	}
	// 终于可以用了
	onShow(() => {
		getData();
		if(WEB_URL == 'bsppy88.top'  || WEB_URL == 'amazonshopin.com'){
			showIn.value = true
		}
	})
</script>

<style lang="scss">
	.colorC {
		color: #AFAFAF !important;
	}

	.btns {
		text-align: center;
		line-height: 120rpx;
		color: #fff;
		height: 120rpx;
		border-radius: 35rpx;
		margin-top: 76rpx;
	}
</style>
