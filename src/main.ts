/*
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-02-16 15:49:27
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-03-30 15:36:35
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import createRouter from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(createRouter())
app.use(pinia)
app.mount('#app')
