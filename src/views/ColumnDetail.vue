<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-03-27 17:50:28
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-04-20 18:48:44
-->
<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar?.url" :alt="column.title" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{column.title}}</h4>
        <p class="text-muted">{{column.description}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue';
import PostList from '@/components/PostList.vue'
import { useMainStore } from '@/stores';
import { onMounted } from 'vue';
const route = useRoute()
const store = useMainStore()
const currentId = route.params.id as string
// import { storeToRefs } from 'pinia';
// const { getColumnById, getPostsByColId } = storeToRefs(store)
// const column = getColumnById.value(currentId)
// const list = getPostsByColId.value(currentId)
// 伪代码
// column -> ref(column)

const column = computed(() => store.getColumnById(currentId))
const list = computed(() => store.getPostsByColId(currentId))

onMounted(() => {
  store.fetchColumn(currentId)
  store.fetchPosts(currentId)
})
</script>