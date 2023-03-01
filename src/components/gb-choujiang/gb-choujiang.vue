<template>
	<view style="margin-top: 20rpx;">

		<view class="center">
			<view class="luck-list"
				style=" background: url(../../static/actIcon/zhuanpan1/mainBox.png) no-repeat 100%/100%;">
				<view v-for="(item, index) in AwardList" :key="index" class="cell-item"
					:class="index == 4 || index === sel ? 'y-b' : 'w-b'" @tap="begin(index)">
					<view class="cell-content" :class="index === sel ? 'y' : 'w'">
						<image :src="item.full_cover" style="width:90%; height:90%;border-radius: 10rpx;"
							v-if="index !== 4"></image>

					</view>
				</view>
			</view>
		</view>
		<!-- 		<view class="" style="height: 50rpx;">
			
		</view> -->
		<view class="mt40" style=" color: #000066; padding: 0 35rpx;">
			<view class="center f50 mb30">
				Lottery rules
			</view>
			<view v-html="desc">

			</view>
		</view>


	</view>
</template>

<script>
	import request from '../../../comm/request.ts';
	export default {
		props: {
			// 背景图
			nImg: String,
			canuse: Boolean,
			// 列表
			AwardList: {
				type: Array,
				default: []
			},
			desc: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				sel: '',
				FastNums: 0,
				SlowNums: 0,
				time: 1000,
				LoopStatus: true,
				noClick: true,
				sjNum: '',
				msg: ''
			};
		},
		onLoad() {},
		methods: {
			// 中奖后的逻辑
			updateMoney() {
				this.$emit('updateMoney', this.msg);
			},
			// 开始抽奖
			begin(index) {
				if (!this.canuse) {
					return false;
				}
				if (index !== 4) {
					return false;
				}
				if (!this.noClick) {
					return;
				}
				this.noClick = false;
				this.FastNums = 0;
				this.SlowNums = 0;
				this.time = 200;
				this.LoopStatus = true;

				this.getResult();
			},
			async getResult() {
				// 
				request({
					url: 'activity/lottery/lottery',
					methods: 'post'
				}).then(res => {
					let id = res.prize_id;
					for (let i in this.AwardList) {
						if (this.AwardList[i].id == id) {
							this.sjNum = i;
							console.log(this.sjNum);
							this.msg = this.AwardList[i].name;
							this.loop();
							return;
						}
					}
				})
			},
			// 抽奖过程 控制
			// 抽奖过程 控制
			loop() {
				let sjNum = this.sjNum;
				if (!this.sel || this.sel < 9) {
					if (this.sel == 3) {
						this.sel = 0;
					} else if (this.sel === '') {
						this.sel = 0;
					} else if (this.sel == 2) {
						this.sel = 5;
					} else if (this.sel == 5) {
						this.sel = 8;
					} else if (this.sel == 8) {
						this.sel = 7;
					} else if (this.sel == 7) {
						this.sel = 6;
					} else if (this.sel == 6) {
						this.sel = 3;
					} else {
						this.sel++;
					}
					this.FastNums++;
					if (this.FastNums == 4) {
						this.FastNums = 0;
						this.time = 50;
						this.SlowNums++;
					}
					if (this.SlowNums == 8) {
						this.SlowNums = 0;
						this.time = 500;
						this.FastNums = 5;
					}
					if (this.FastNums > 5) {
						if (this.sel == sjNum) {
							this.noClick = true;
							this.LoopStatus = false;
							uni.showToast({
								title: 'lottery result:' + this.msg,
								icon: 'none'
							})
							// 成功的逻辑
							this.updateMoney();
						}
					}
					if (this.LoopStatus) {
						setTimeout(() => {
							this.loop();
						}, this.time);
					}
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	/* 抽奖 */
	.luck-list {
		/* padding: 14rpx 25rpx; */
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 0.5rpx;
		height: 554rpx;
		width: 750rpx;
		padding: 180rpx 70rpx 80rpx 100rpx;
		/* 		height: 794rpx;
		width: 750rpx;
			padding: 180rpx 104rpx 80rpx 104rpx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		align-content: space-around;
		justify-content: space-around; */
		/* flex-wrap: wrap; */
	}

	.changeIcon {
		background-color: blue;
		color: #fff;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 80rpx;
		font-weight: bold;
	}

	.cell-item {
		width: 150rpx;
		height: 150rpx;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		margin-top: -4rpx;
		margin-left: 4rpx;
		/* border-radius: 10rpx; */
		/* margin: 0 8rpx 0 0; */
	}

	.cell-content {
		/* margin: 5rpx 10rpx; */
		width: 100%;
		height: 100%;
		/* border-radius: 30rpx; */
		display: flex;
		align-items: center;
		justify-content: center;
		/* background-color: #d6d6d6; */
		/* padding-left: 10rpx; */
	}

	.w {
		/* background-color: #fdf2ee; */
	}

	.w-b {
		/* margin-top: 3rpx; */
		/* background-color: #f8d0c3; */
	}

	.y {
		background-color: #ff6969;
		margin-left: 0 !important;
		/* border-radius: 10rpx; */
	}

	/*  .y::after {
	   position: absolute;
	   content: "";
	   display: block;
	   width: 100%;
	   height: 100%;
	   border-radius: 10rpx;
	   z-index: 9;
	   left: 0;
	   top: 0;
    	background-color: rgba(255, 140, 25, 0.4) !important;
		border-radius: 10rpx;
    } */

	.y-b {
		/* background-color: #EFCD22; */
	}

	.rules {
		.ruleItem1 {
			width: 400rpx;
			margin: 0 auto;
			font-size: 32rpx;
			padding: 0 30rpx;
			background-color: #ffe32e;
			border-radius: 8rpx;
			height: 67rpx;
		}

		.ruleItem {
			margin-top: 00rpx;
			background: #f00a38;
			padding-bottom: 20rpx;
		}
	}
</style>
