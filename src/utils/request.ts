import { useLayoutStore } from "@/store/modules/layout";
import axios from "axios";
import { AxiosResponse } from "axios";
import { ElLoading, ElNotification } from "element-plus";

let loading: { close(): void };

const request = axios.create({
  baseURL: import.meta.env.VUE_APP_API_BASE_URL as string | undefined,
  timeout: 60000,
});

const errHandler = (err: { message: string }) => {
  loading.close();
  ElNotification({
    title: "请求失败",
    message: err.message,
    type: "error",
  });
};

//请求
request.interceptors.request.use((config) => {
  const { getStatus } = useLayoutStore();
  loading = ElLoading.service({
    lock: true,
    text: "loading",
    spinner: "el-icon-loading",
    background: "rgba(0,0,0,0.4)",
  });
  const token = getStatus.ACCESS_TOKEN;
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers["Access-Token"] = token;
  }
  return config;
}, errHandler);

//响应
request.interceptors.response.use((response: AxiosResponse<IResponse>) => {
  const { data } = response;
  const { getStatus, logout } = useLayoutStore();
  loading.close();
  if (data.Code !== 200) {
    let title = "请求失败";
    if (data.Code === 401) {
      if (getStatus.ACCESS_TOKEN) {
        logout();
      }
      title = "身份认证失败";
    }
    ElNotification({
      title,
      message: data.Msg,
      type: "error",
    });
    return Promise.reject(new Error(data.Msg || "Error"));
  }
  return response;
}, errHandler);

export default request;
