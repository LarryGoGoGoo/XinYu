import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { apiBaseUrl } from './src/utils/base'

export default defineConfig({
  plugins: [
    vue(),
  ],

  resolve: {
    //设置路径别名
    alias: {
      "@": resolve(__dirname, "src/")
    },
  },

  server: {

    // 服务器默认端口是8080，前端默认8081，所以需要代理
    port: 8081,
    host: "0.0.0.0",

    // 自动打开浏览器
    open: false, 

    // 设置代理
    proxy: {
      "/xinyu": {
        target: apiBaseUrl,
        changeOrigin: true,
      },
    },
  },

  // 打包后的文件引入路径 由/assets，改为./assets
  base: "",
  build: {
    sourcemap: false,
  },
})