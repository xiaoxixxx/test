<template>
	<view class="mask  "  v-show="show">
		<view class="maskContent  " >
			<view class="maskTop" style=" position: relative;">
				<!-- <view class="mask_tile">Placard</view> -->

				<view class="mainBox  ">
					<swiper :indicator-dots="false" :autoplay="false" :interval="2000" :duration="1000" next-margin="20"
						:circular="true" style="height: 100%;width: 100%; " :current="current" :disable-touch="true">
						<swiper-item v-for="(item, index) in maskList" :key="index" class="maskItem center" >
							<view v-html="item.content"
								style="padding: 60rpx 20rpx 0 20rpx; width: 100%;height: 100%;color: #333;"></view>
						</swiper-item>
					</swiper>
				</view>

				<view class="leftIcon" v-show="maskList.length > 0 && current > 0 && current < maskList.length"
					@tap="current -= 1">
					<nut-icon name="rect-left" size="40" color="#F5B04C"></nut-icon>
				</view>

				<view class="rightIcon"
					v-show="maskList.length > 0 && current < maskList.length && current !== maskList.length - 1"
					@tap="current += 1">
					<nut-icon name="rect-right" size="40" color="#F5B04C"></nut-icon>
				</view>

				<!--  -->
			</view>
			<view class="mask_btns center">
				<image src="../../static/closeBtn.png" class="mask_btns" mode="widthFix"
					style="width: 80rpx;height: 80rpx;" @click="confirmHandle"></image>
				<!-- <view class="mask_button mask_confirm" @click="confirmHandle" :style="{background:store.$state.contentColor}">{{t('all.a_c1')}}</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {
		userStore
	} from "@/store/themeNum.js";

	const store = userStore();
	export default {
	
		props: [ 'show', 'maskList'],
		data() {
			return {
				current: 0,
				index: 0,
				store: store,
			};
		},
		mounted() {
			console.log(this);
		},
		methods: {
			
			confirmHandle() {
				this.$emit('confirm', this.titleInd + 1);
			},

		}
	};
</script>

<style lang="scss">
	.mask {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		background: rgba(0, 0, 0, 0.4);
		z-index: 999;

		.maskTop {
			background-color: #fff;
			margin-bottom: 18rpx;
			border-radius: 20rpx;
			height:800rpx;
			overflow: scroll;
		}

		.maskContent {
			margin: 200rpx auto;
			animation-duration: 0.6s;
			width: 600rpx;
			border-radius: 20rpx;

			// box-shadow: 17rpx 17rpx 33rpx #7f7f7f, -17rpx -17rpx 33rpx #7f7f7f;
			.mask_tile {
				font-size: 36rpx;
				text-align: center;
				padding-top: 20rpx;
			}

			.mask_message {
				margin-top: 30rpx;
				// text-align: center;
				padding: 0 20rpx;
				font-size: 28rpx;
				color: #666;
			}

			.mask_btns {
				bottom: 0;
				left: 0;
				right: 0;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
			}



			.mask_cancle {
				border: 1rpx solid #ddd;
				color: #333;
				border-radius: 0 0 0 20rpx;
			}

			.mask_confirm {
				background-color: #567df4;
				color: #fff;
				border: 1rpx solid #567df4;
				border-radius: 0 0 20rpx 0;
				border-radius: 20rpx;
				z-index: 999;
			}

			.mask_error {
				width: 28px;
				height: 28px;
				// line-height: 26px;

				position: absolute;
				right: 0;
				top: 0;
				cursor: pointer;
			}

			.mask_error::before,
			.mask_error::after {
				content: '';
				position: absolute;
				height: 20px;
				width: 3px;
				left: 20rpx;
				top: 5rpx;
				background: #666;
			}

			.mask_error::before {
				transform: rotate(45deg);
			}

			.mask_error::after {
				transform: rotate(-45deg);
			}
		}
	}

	.cirCle {
		border-radius: 50%;
		width: 40rpx;
		height: 40rpx;
		border: 5rpx solid #ccc;
		margin-right: 60rpx;
		line-height: 40rpx;
	}

	.choosed {
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		background-color: #41adff;
	}

	.itemChoosed {
		color: #41adff;
	}

	.mainBox {
		height: 100%;
		width: 100%;

		.maskItem {
			overflow: scroll;

		}
	}



	.rightIcon,
	.leftIcon {
		position: absolute;
		top: 50%;
	}

	.rightIcon {
		right: 0;
	}

	.leftIcon {
		left: 0;
	}
</style>
