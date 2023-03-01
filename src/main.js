import { createApp } from "vue";
import App from "./App.vue";
import '@/build/rem';
import '../comm/main.scss';
import i18n from '../lang/index.js'
import pinia from './store/index'
import piniaPersist from 'pinia-plugin-persist'
pinia.use(piniaPersist)
// 注意：这种方式将会导入所有组件
import NutUI from "@nutui/nutui";
import '../comm/animate.css'

// 采用按需加载时  此全局css样式，需要删除
import "@nutui/nutui/dist/style.css";

createApp(App).use(i18n).use(pinia).use(NutUI).mount("#app");

