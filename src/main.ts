/*
* @Descripttion: 
* @version: 
* @Author: chenpengfei
* @Date: 2023-02-16 15:49:27
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-05-25 16:45:57
*/
import { useMainStore } from './stores/index';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import createRouter from './router'
import httpRequest from './utils/httpRequest';
import 'easymde/dist/easymde.min.css'

const router = createRouter()
const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.mount('#app')

router.beforeEach((to, from, next) => {
  const store = useMainStore()
  const { user, token, fetchCurrentUser, logout } = store
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if (!user.isLogin) {
    if (token) {
      httpRequest.axios.defaults.headers.common.Authorization = `Bearer ${token}`
      fetchCurrentUser().then(() => {
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(e => {
        console.error(e)
        logout()
        next('login')
      })
    } else {
      if (requiredLogin) {
        next('login')
      } else {
        next()
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})
