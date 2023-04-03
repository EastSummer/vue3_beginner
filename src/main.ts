/*
* @Descripttion: 
* @version: 
* @Author: chenpengfei
* @Date: 2023-02-16 15:49:27
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-03-31 16:51:30
*/
import { useMainStore } from './stores/index';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import createRouter from './router'

const router = createRouter()
const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.mount('#app')

router.beforeEach((to, from, next) => {
  const store = useMainStore()
  if (to.meta.requiredLogin && !store.user.isLogin) {
    next({ name: 'login' })
  } else if (to.meta.redirectAlreadyLogin && store.user.isLogin) {
    next('/')
  } else {
    next()
  }
})
