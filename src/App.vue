<template>
  <div class="container-fluid px-0 flex-shrink-0">
    <global-header :user="currentUser" />
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from '@/components/GlobalHeader.vue'
import { useMainStore } from './stores';
import { storeToRefs } from 'pinia';
const store = useMainStore()
const { user } = storeToRefs(store)
const currentUser = user


</script>

<style scoped>

</style>
