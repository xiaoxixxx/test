// 引入setting.ts
import COUNTRY from '../setting.js'


if (COUNTRY.icon) {
	var link = document.createElement("link");
	link.type = "image/x-icon";
	link.rel = "shortcut icon";
	link.href = COUNTRY.icon; //icon 图标
	document.getElementsByTagName("head")[0].appendChild(link);
}
if (COUNTRY.title) {
	var title = document.createElement("title");
	title.innerHTML = COUNTRY.title; //icon 图标
	document.getElementsByTagName("head")[0].appendChild(title);
}

