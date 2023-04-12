import {
	defineStore
} from 'pinia'

export const userStore = defineStore({
	id: 'themeNum', // 命名，唯一
	state: () => {
		return {
			contentColor: '',
			btnDis: "#d8d8d8",
			secondColor: "",
			imgObj: {},
			my: {},
			wr: {},
			task: {},
			countryCode: [],
			linImg:""
		}
	},
	actions: {
		setThemenum(data) {
			// 可直接通过this访问state属性
			this.themeNum = data;
		},
		setCountryCode(data) {
			// 可直接通过this访问state属性
			this.countryCode = data;
		},
		setContentColor(data) {
			this.contentColor = data
		},
		setSecondColor(data) {
			this.secondColor = data
		},
		setImgObj(data) {
			this.imgObj = data
		},
		setMy(data) {
			this.my = data
		},
		setWr(data) {
			this.wr = data
		},
		setTask(data) {
			this.task = data
		},
		setImg(data){
			this.linImg = data
		}
	},
	// 持久化存储
	// persist:{
	// 	enabled:false,
	// 	strategies:[{
	// 		key:'themeNum',
	// 		storage:localStorage
	// 	}]
	// }
})
