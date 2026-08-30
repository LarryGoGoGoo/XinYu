/**
 * @description 封装 axios 网络请求
 */

import axios from "axios";
import router from "@/router";

const http = axios.create({
  // 如果请求时间超过 `timeout` 的值，则请求会被中断
  timeout: 1000 * 60 * 5,

  // 表示跨域请求时是否需要使用凭证
  withCredentials: true,

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL
  baseURL: "/xinyu",

  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

// 请求拦截
http.interceptors.request.use(
  (config) => {
    config.headers["Token"] = localStorage.getItem("Token"); // 请求头带上token
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
http.interceptors.response.use(
  (response) => {
    let data = response.data;

    // 文件类型，没有code，直接成功返回
    if (response.config.responseType === "blob") {
      return data;
    }

    switch (data.code) {
      //  0是请求成功的code
      case 0:
        return data;

      // 401需要是用户没有登录
      case 401:
        localStorage.removeItems();
        ElMessage({
          message: '登录凭证失效，请先登录',
          grouping: true,
          type: 'error',
        })
        router.push("/login");
        return Promise.reject(data);
        break;

      default:
        return Promise.reject(data);
        break;
    }
  },
  (error) => {
    let url = error.config.url || "";
    // 根据url判断是：获取当前登录的用户信息的api url: users/session, yonghu/session
    let isSession = /\/session$/.test(url);
    if (isSession) {
      localStorage.removeItems();
      router.push("/login");
    }

    return Promise.reject(error);
  }
);
export default http;
