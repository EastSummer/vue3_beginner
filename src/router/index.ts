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
import CreatePost from '@/views/CreatePost.vue'
import Signup from '@/views/Signup.vue'
import PostDetail from '@/views/PostDetail.vue'
import EditProfile from '@/views/EditProfile.vue'

console.log('import.meta.env: ', import.meta.env.VITE_BASE_URL);


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
    meta: { redirectAlreadyLogin: true },
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: { redirectAlreadyLogin: true }
  },
  {
    path: '/column/:id',
    name: 'column',
    component: ColumnDetail,
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: PostDetail,
  },
  {
    path: '/create',
    name: 'create',
    component: CreatePost,
    meta: { requiredLogin: true },
  },
  {
    path: '/edit',
    name: 'edit',
    component: EditProfile,
    meta: { requiredLogin: true }
  },
]

export default () => createRouter({
  history: createWebHistory(
    import.meta.env.VITE_BASE_URL ?? ''
  ),
  routes,
})

