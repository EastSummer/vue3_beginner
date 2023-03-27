/*
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-03-27 10:36:03
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-03-27 10:36:56
 */
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import ColumnDetail from '@/views/ColumnDetail.vue'

console.log(import.meta.env.VITE_BASE_URL);


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/column/:id',
    name: 'column',
    component: ColumnDetail,
  }
]

export default () => createRouter({
  history: createWebHistory(
    import.meta.env.VITE_BASE_URL ?? ''
  ),
  routes,
})

