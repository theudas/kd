import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
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
