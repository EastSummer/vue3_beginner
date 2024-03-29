/*
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-02-16 15:49:27
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-06-29 14:04:22
 */
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log('mode', mode);
  console.log('env', env);
  
  return {
    // 类似于 webpack 中的 publicPath，也就是资源的公共基础路径
    base: env.VITE_BASE_URL,
    resolve: {
      // 路径别名
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      port: 9999,
      hmr: true,
      proxy: {
        '/api': {
          target: 'http://apis.imooc.com/',
        },
      },
    },
    build: {
      outDir: env.VITE_OUTDIR,
    },
    plugins: [vue()],
  }
})
