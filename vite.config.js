import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/Interview-Card-CMS/',
  plugins: [vue()],
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    copyPublicDir: true,
    // 确保在构建时复制所有 public 目录的文件
  }
})
