import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  base: '/school-counselor/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // 伺服器配置
  server: {
    // 設置代理規則
    proxy: {
      // 當請求以 '/api' 開頭時
      '/api': {
        // 代理目標地址
        // target: 'http://localhost:5268', 
        target: 'https://myproject-814320709930.asia-east1.run.app/', 
        // 允許代理 HTTPS 證書的請求
        secure: false, 
        // 重寫路徑：將 /api 從請求路徑中移除
        // 例如：前端請求 /api/auth/login 會被轉發到 http://localhost:5268/auth/login
        rewrite: (path) => path.replace(/^\/api/, ''), 
        // 必須更改源站 (host) 標頭，使目標伺服器認為請求來自它自己
        changeOrigin: true,
      },
      
      // ⚠️ 如果您的 API 路由直接是根路徑，請使用以下配置：
      // '/auth': {
      //   target: 'http://localhost:5268',
      //   changeOrigin: true,
      //   secure: false,
      // }
    },
    // 確保 Vite 使用一個特定的 port 啟動，例如 3000
    port: 5173, 
  },
})
