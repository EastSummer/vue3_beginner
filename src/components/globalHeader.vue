<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-03-13 13:38:29
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-03-15 15:36:57
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
        <router-link to="/login" class="btn btn-outline-light my-2">
          注册
        </router-link>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title="`你好 ${user?.name}`">
          <DropdownItem>
            <a href="#" class="dropdown-item">新建文章</a>
          </DropdownItem>
          <DropdownItem :disabled="true">
            <a href="#" class="dropdown-item">编辑资料</a>
          </DropdownItem>
          <DropdownItem>
            <a href="#" class="dropdown-item">退出登录</a>
          </DropdownItem>
        </dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
export interface IUserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
</script>

<script setup lang="ts">
import Dropdown from './Dropdown.vue';
import DropdownItem from './DropdownItem.vue'

const props = defineProps<{
  user: IUserProps
}>()
</script>

<style scoped>

</style>