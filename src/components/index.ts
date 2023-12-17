import mEcharts from "./echarts-custom/EchartsCustom.vue";
import ckLoading from "./ck-loading/ckLoding.vue";
// import domeComponent from "./demo-component/index";
// 组件列表
const components = [mEcharts, ckLoading];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，那么所有的组件都会被注册
const install = (Vue: any) => {
  // 遍历注册全局组件
  components.map((component) => Vue.component(component.name, component));
  console.log(Vue);
};

export default {
  install,
};
