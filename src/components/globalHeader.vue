<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a class="navbar-brand" href="#">者也专栏</a>
    <ul v-if="!user?.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <a href="#" class="btn btn-outline-light my-2">登陆</a>
      </li>
      <li class="list-inline-item">
        <a href="#" class="btn btn-outline-light my-2">注册</a>
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

<script setup lang="ts">
import Dropdown from './dropdown.vue';
import DropdownItem from './dropdownItem.vue'

export interface IUserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

const props = defineProps<{
  user: IUserProps
}>()
</script>

<style scoped>

</style>