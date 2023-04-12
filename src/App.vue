<script>
	import pageAnimation from '@/components/yy-PageAnimation';
	import {
		useI18n
	} from "vue-i18n";


	export default {

		mixins: [pageAnimation],
		onLaunch: function() {

		},
		onShow: function() {
			// console.log('App Show')

		},
		onHide: function() {
			// console.log('App Hide')
		},

	}
</script>

<style lang="scss">
		/*每个页面公共css */
	.nut-navbar {
		padding: 0 !important;
	}

	.botBox {
		img {
			width: 100%;
		}
	}

	.maskItem img,
	.mt70 img,
	.mt40 img {
		width: calc(100% - 45rpx) !important;
		max-height: 100% !important;
	}

	page {
		font-family: PingFangSC !important;
		// color: #333;
		font-size: 30rpx;
		animation: .3s linear all;
	}

	.secondClo {
		font-weight: bold;
		color: #2A5F64;
	}

	.inp {
		padding: 44rpx 49rpx;
		background: #FFFFFF;
		box-shadow: 0px 1rpx 51rpx 0px rgba(64, 46, 197, 0.05);
		border-radius: 30rpx;
		font-size: 28rpx;
		color: #333;
	}

	.btns {
		transition: .3s linear all;
	}

	.calendar-confirm-btn {
		border-radius: 20rpx !important;
		background: #F5B04C !important;
	}

	.calendar-month-day-active {
		background: #F5B04C !important;

	}

	.calendar-month-day-choose {
		color: #333 !important;
		background: rgb(254, 243, 222) !important;
	}

	.plo {
		color: #afafaf;
		font-weight: normal;
	}

	.pwdEye {
		transform: translateY(-50%);
	}

	.uni-swiper-dot {
		background-color: rgba(255, 255, 255, 0.5) !important;
	}

	.uni-swiper-dot-active {
		background-color: rgb(245, 176, 76) !important;
	}
	
</style>
