import WEB_URL from './yuming.js';
import themeNum1 from './color/themeNum1.js';
import {
		userStore
	} from "@/store/themeNum.js";
const store = userStore();

const countryList = [
	{
		url:'bsppy88.top',
		themeNum:1,
		qianzhui:'api.',
		lang:"ar"
	},
	
	{
		url:'shoping88.top',
		themeNum:1,
		qianzhui:'api.',
		lang:"ar"
		// icon:"/src/titleIcon/4.png"
	},

	{
		url:'amazonshopin.com',
		themeNum:1,
		qianzhui:'api.',
		lang:"en",
		title:"amazonshopin",
		icon:"./src/static/titleIcon/ams.png"
	},
	
	{
		url:'eBaybuys.com',
		themeNum:1,
		qianzhui:'api.',
		lang:"en",
		title:"amazonshopin",
		icon:"./src/static/titleIcon/ams.png"
	},
] 
let COUNTRY= {}
countryList.forEach(item=>{
	if(item.url == WEB_URL){
		COUNTRY = item
		return
	}
})


if(COUNTRY.themeNum ==1){
	store.setContentColor(themeNum1.contentColor)
	store.setSecondColor(themeNum1.secondColor)
	store.setImgObj(themeNum1.imgObj)
	store.setMy(themeNum1.my)
	store.setWr(themeNum1.wr)
	store.setTask(themeNum1.task)
}

COUNTRY.HOST = `https://${COUNTRY.qianzhui}${COUNTRY.url}` +'/api/'
export default COUNTRY
