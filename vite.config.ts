import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // 自动打开浏览器
    host: true, // 监听所有地址
  },
  build: {
    sourcemap: true, // 生成sourcemap
    chunkSizeWarningLimit: 1000, // 增加代码分块大小警告限制
  }
}) 