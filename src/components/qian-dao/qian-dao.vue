<template>
	<view class="calendar">
		<view class="header">
			<view class="btn-group">
				<view class="btn btn-prev" @click="onSwitchPrevMonth()">
					<nut-icon name="left" color="#fff"></nut-icon>
				</view>
				<view class="current-date">{{ currentDate }}</view>
				<view class="btn btn-next" @click="onSwitchNextMonth()">
					<nut-icon name="right" color="#fff"></nut-icon>
				</view>
			</view>
		</view>
		<view class="body">
			<view class="weeks">
				<view class="week-item" v-for="(item,index) in weeks" :key="index">{{ item }}
				</view>
			</view>
			<view class="day-list">
				<view :class="{
            'day-item': true,
            today: day.isToday,
            checked: day.checked,
            'current-month-day': day.type === 'current'
          }" v-for="(day, index) in dayList" :key="index">
					<!-- <text class="text">{{ day.checked ? '√' : day.day }}</text>
		   -->
					<view class="flex flex-direction justify-center align-center" :class="day.checked?'checkedDay':''"
						:style="day.checked?{'background':'#F5B04C'}:''">
						<view> {{day.day}}</view>
						<nut-icon class="absIcon" v-show="day.checked" name="Check" color="#fff" size="20"
							style="margin-top: -10rpx;"></nut-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			checks: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				year: null,
				month: null,
				day: null,
				dayList: [],
				weeks: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
			}
		},
		computed: {
			currentDate() {
				const year = this.year
				const month = this.month < 10 ? '0' + this.month : this.month

				return `${year}-${month}`
			}
		},
		watch: {
			checks() {
				this.initDate()
			}
		},
		created() {
			const {
				year,
				month,
				day
			} = this.getCurrentDate()

			this.initDate(year, month, day)
		},
		methods: {
			initDate(year = this.year, month = this.month, day = this.day) {
				const dayList = this.getDayList(year, month)

				this.year = year
				this.month = month
				this.day = day
				this.dayList = dayList
			},
			handleClick(day) {
				const payload = {
					year: this.year,
					month: this.month,
					...day
				}

				switch (day.type) {
					case 'prev':
						this.onSwitchPrevMonth(day)
						break
					case 'next':
						this.onSwitchNextMonth(day)
						break
					default:
						this.$emit('current-month-day', payload)
				}
			},
			onSwitchPrevMonth(day) {
				const {
					prevYear,
					prevMonth
				} = this.getPrevMonthInfo(
					this.year,
					this.month
				)
				const payload = {
					year: prevYear,
					month: prevMonth,
					oldYear: this.year,
					oldMonth: this.month,
					...day
				}

				this.initDate(prevYear, prevMonth)
				this.$emit('prev-month-day', payload)
			},
			onSwitchNextMonth(day) {
				const {
					nextYear,
					nextMonth
				} = this.getNextMonthInfo(
					this.year,
					this.month
				)
				const payload = {
					year: nextYear,
					month: nextMonth,
					oldYear: this.year,
					oldMonth: this.month,
					...day
				}

				this.initDate(nextYear, nextMonth)
				this.$emit('next-month-day', payload)
			},
			getPrevMonthInfo(year, month) {
				let prevYear = year
				let prevMonth = month - 1

				if (prevMonth < 1) {
					prevMonth = 12
					prevYear -= 1
				}

				return {
					prevYear,
					prevMonth
				}
			},
			getNextMonthInfo(year, month) {
				let nextYear = year
				let nextMonth = month + 1

				if (nextMonth > 12) {
					nextMonth = 1
					nextYear += 1
				}

				return {
					nextYear,
					nextMonth
				}
			},
			getDayList(year, month) {
				const prevMonthDays = this.getPrevMonthDays(year, month)
				const currentMonthDays = this.getCurrentMonthDays(year, month)
				const nextMonthDays = this.getNextMonthDays(year, month)

				return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
			},
			getCurrentDate() {
				const date = new Date()
				const year = date.getFullYear()
				const month = date.getMonth() + 1
				const day = date.getDate()

				return {
					year,
					month,
					day
				}
			},
			getMonthLastDay(year, month) {
				const {
					nextYear,
					nextMonth
				} = this.getNextMonthInfo(year, month)
				const date = new Date(`${nextYear}/${nextMonth}/1`)
				const firstDayTimeStamp = date.getTime()
				const oneDayTimeStamp = 24 * 60 * 60 * 1000
				const prevMonthLastDay = new Date(
					firstDayTimeStamp - oneDayTimeStamp
				).getDate()

				return prevMonthLastDay
			},
			getPrevMonthDays(year, month) {
				const {
					prevYear,
					prevMonth
				} = this.getPrevMonthInfo(year, month)
				const prevMonthLastDay = this.getMonthLastDay(prevYear, prevMonth)
				const date = new Date(`${year}/${month}/1`)
				const week = date.getDay()

				const days = []

				for (let i = 0; i < week; i++) {
					days.unshift({
						type: 'prev',
						checked: false,
						day: prevMonthLastDay - i
					})
				}

				return days
			},
			getCurrentMonthDays(year, month) {
				const currentMonthLastDay = this.getMonthLastDay(year, month)
				const checks = this.checks
				const days = []
				const {
					year: currentYear,
					month: currentMonth,
					day: currentDay
				} = this.getCurrentDate()

				for (let i = 1; i <= currentMonthLastDay; i++) {
					let checked = false
					let isToday =
						currentYear === year && currentMonth === month && currentDay === i

					checks.forEach(date => {
						const dateArr = date.split('-')

						if (year == dateArr[0] && month == dateArr[1] && i == dateArr[2]) {
							checked = true
						}
					})

					days.push({
						type: 'current',
						checked,
						isToday,
						day: i
					})
				}
				return days
			},
			getNextMonthDays(year, month) {
				const currentMonthLastDay = this.getMonthLastDay(year, month)
				const date = new Date(`${year}/${month}/${currentMonthLastDay}`)
				const week = date.getDay()
				const days = []

				let day = 0

				for (let i = week + 1; i <= 6; i++) {
					day++

					days.push({
						type: 'next',
						checked: false,
						day
					})
				}

				return days
			}
		}
	}
</script>

<style lang="scss" scoped>
	.checkedDay {
		background: #FFA179;
		border: 2rpx solid #FFFFFF;
		width: 70rpx;
		height: 70rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		border-radius: 50%;
		position: relative;
	}

	.calendar {
		background-color: #6A5AE0;
		color: $uni-text-color;
		border-radius: 30rpx;
		.header {
			padding: 0 24upx;
			display: flex;
			justify-content: space-between;
			border-bottom: 2upx solid #eee;

			.current-date {
				text-align: center;
				font-size: 34upx;
				padding: 32upx 0;
				color: #FFf;
			}

			.btn-group {
				display: flex;
				align-items: center;
				width: 100%;
				justify-content: space-between;

				.btn {
					line-height: 1;
					text-align: center;
					box-sizing: border-box;
					font-weight: 500;
					padding: 12upx 20upx;
					font-size: 24upx;

					&.btn-prev {
						border-radius: 2rpx 0 0 2rpx;
						border-right: 0;
					}

					&.btn-next {
						border-radius: 0 2rpx 2rpx 0;
					}
				}
			}
		}

		.body {
			.weeks {
				display: flex;
				font-size: 30upx;
				padding: 32upx 0;
				color: #fff;

				.week-item {
					flex: 1;
					text-align: center;
				}
			}

			.day-list {
				display: flex;
				flex-wrap: wrap;

				.day-item {
					display: flex;
					justify-content: center;
					width: 14.285%;
					text-align: center;
					padding: 30upx 0;
					font-size: 28rpx;
					color: #1D1FAA;

					&.current-month-day {
						color: #fff;
					}

					&.checked,
					&.today {
						padding: 26upx 0;

						.text {
							display: flex;
							align-items: center;
							justify-content: center;
							width: 56upx;
							height: 56upx;
							border-radius: 100%;
							box-sizing: border-box;
							background-color: #3f9dff;
							color: #fff;
							font-size: 28upx;
							padding: 28upx 0;
						}
					}
				}
			}
		}
	}
</style>
