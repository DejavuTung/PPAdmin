import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ mode }) => {
  // 加载环境变量
  require('dotenv').config({ path: '.env' })
  
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    server: {
      port: 3000,
      open: true
    },
    // 环境变量配置
    envDir: '.',
    envPrefix: 'VITE_',
    define: {
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      // 手动定义环境变量
      'process.env.VITE_LEANCLOUD_APP_ID': JSON.stringify(process.env.VITE_LEANCLOUD_APP_ID),
      'process.env.VITE_LEANCLOUD_MASTER_KEY': JSON.stringify(process.env.VITE_LEANCLOUD_MASTER_KEY),
      'process.env.VITE_LEANCLOUD_APP_URL': JSON.stringify(process.env.VITE_LEANCLOUD_APP_URL),
    },
    // 确保环境变量被正确处理
    optimizeDeps: {
      include: ['vue', 'vue-router']
    },
    // 构建优化配置
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router', 'pinia'],
            elementPlus: ['element-plus'],
            echarts: ['echarts', 'vue-echarts']
          }
        }
      },
      // 确保在Vercel上正常运行
      target: 'es2015'
    }
  }
})
