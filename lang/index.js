import {
	createI18n
} from 'vue-i18n'
import langEn from './en';
// import langTw from './tw';
import langAr from './ar';
import langRu from './ru';
import langEs from './es';
import langPt from './pt';
import langIn from './in';


import langAz from './az';
import langBd from './bd';
import langDe from './de';
import langFr from './fr';
import langHe from './he';
import langIt from './it';
import langJp from './jp';
import langKh from './kh';
import langPl from './pl';
import langTh from './th';
import langTr from './tr';

const messages = {
	// 'tw': langTw,
	'en': langEn,
	'ru': langRu,
	'ar': langAr,
	'es': langEs,
	'pt': langPt,
	'in':langIn,
	'az':langAz,
	
	'bd':langBd,
	'de':langDe,
	'fr':langFr,
	'he':langHe,
	'it':langIt,
	'jp':langJp,
	'kh':langKh,
	'pl':langPl,
	'th':langTh,
	'tr':langTr,
}

let cur_lang = uni.getStorageSync('lang')

if (cur_lang == 'ar') {
	let eles = document.querySelector("html")
	document.querySelector("html").setAttribute("dir", 'rtl')
}


const i18n = createI18n({
	globalInjection: true, //全局$t 生效
	locale: uni.getStorageSync('lang') ||"en" ,
	messages,
	legacy: false
})

uni.setTabBarItem({
	index: 0,
	text: i18n.global.t('tabbar.t_t1')
})
uni.setTabBarItem({
	index: 1,
	text: i18n.global.t('tabbar.t_t4')
})
uni.setTabBarItem({
	index: 2,
	text: i18n.global.t('tabbar.t_t3')
})
uni.setTabBarItem({
	index: 3,
	text: i18n.global.t('tabbar.t_t2')
})
uni.setTabBarItem({
	index: 4,
	text: i18n.global.t('tabbar.t_t5')
})
export default i18n
