<template>

	<view class="tabbar">
		<nut-tabbar @tab-switch="tabSwitch" unactive-color="#b1b2b5" :active-color="store.$state.contentColor">
			<nut-tabbar-item tab-title="home" to="./index"  img="/static/themeNum1/tabbar/home.png"
				active-img="/static/themeNum1/tabbar/home1.png">
			</nut-tabbar-item>
			<nut-tabbar-item tab-title="recharge"  to="./recharge"
				img="/static/themeNum1/tabbar/recharge.png"  active-img="/static/themeNum1/tabbar/recharge1.png">
			</nut-tabbar-item>
			<nut-tabbar-item tab-title="task" to="./task"  img="/static/themeNum1/tabbar/task.png"
				active-img="/static/themeNum1/tabbar/task1.png">
			</nut-tabbar-item>
			<nut-tabbar-item tab-title="record"  img="/static/themeNum1/tabbar/record.png"
				active-img="/static/themeNum1/tabbar/record1.png">
			</nut-tabbar-item>
			<nut-tabbar-item tab-title="mine"  img="/static/themeNum1/tabbar/my.png"
				active-img="/static/themeNum1/tabbar/my1.png">
			</nut-tabbar-item>
		</nut-tabbar>
	</view>
</template>

<script setup>
	import {
		Image
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	import {
		userStore
	} from "@/store/themeNum.js";
	const store = userStore();
	
	// const props = defineProps({
	// 	numInd: {
	// 		type: Number,
	// 		default: 0
	// 	}
	// })
	
onShow(()=>{
	// console.log(store);
})

</script>

<style lang="scss">
	.tabbar {
		width: 100vw;
		position: fixed;
		bottom: 0;
	}
</style>
