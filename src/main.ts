import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import DataVVue3 from "@kjgl77/datav-vue3";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/assets/scss/index.scss';
import '@/assets/icon/iconfont.css';
// 引入 全局注册组件
import CustomEcharts from '@/components/index';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);

app.use(router).use(CustomEcharts).use(ElementPlus).use(DataVVue3).mount("#app");
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
