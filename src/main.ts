import { createApp, defineComponent, h } from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "@/store";
import DataVVue3 from "@kjgl77/datav-vue3";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "@/assets/scss/tailwind/index.css";
import "@/assets/scss/index.scss";
import "@/assets/icon/iconfont.css";
// 引入 全局注册组件
import CustomEcharts from "@/components/index";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);

app
  .use(store)
  .use(router)
  .use(CustomEcharts)
  .use(ElementPlus)
  .use(DataVVue3)
  .mount("#app");
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// app.component(
//   "demo-component",
//   defineComponent(
//     (props: { data: DragItemData }) => {
//       return () =>
//         h(
//           "div",
//           {
//             style: {
//               width: "100%",
//               height: "100%",
//               color: "#fff",
//               backgroundColor: "#707eb1",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               fontSize: "26px",
//               fontWeight: "600",
//             },
//           },
//           `${props.data.column}x${props.data.row}`,
//         );
//     },
//     {
//       props: ["data"],
//     },
//   ),
// );
