<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-03-13 13:38:29
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-06-06 14:06:27
-->
<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link class="navbar-brand" to="/">者也专栏</router-link>
    <ul v-if="!user?.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link to="/login" class="btn btn-outline-light my-2">
          登陆
        </router-link>
      </li>
      <li class="list-inline-item">
        <router-link to="/signup" class="btn btn-outline-light my-2">
          注册
        </router-link>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title="`你好 ${user?.nickName}`">
          <DropdownItem>
            <router-link to="/create" class="dropdown-item">
              新建文章
            </router-link>
          </DropdownItem>
          <DropdownItem>
            <router-link :to="`/column/${user.column}`" class="dropdown-item">
              我的专栏
            </router-link>
          </DropdownItem>
          <DropdownItem :disabled="true">
            <router-link to="/edit" class="dropdown-item">
              编辑资料
            </router-link>
          </DropdownItem>
          <DropdownItem>
            <a href="#" class="dropdown-item" @click="logout">退出登录</a>
          </DropdownItem>
        </dropdown>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Dropdown from './Dropdown.vue';
import DropdownItem from './DropdownItem.vue'
import { IUserProps, useMainStore } from '@/stores'
import createMessage from './createMessage';

const store = useMainStore()
const router = useRouter()

const props = defineProps<{
  user: IUserProps
}>()

const logout = () => {
  store.logout()
  createMessage('退出登录成功，2秒后跳转到首页', 'success', 2000)
  const timer = setTimeout(() => {
    router.push('/')
    if (timer) clearTimeout(timer)
  }, 2000)
}
</script>

<style scoped>

</style>