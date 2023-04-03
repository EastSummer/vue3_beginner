<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-03-27 17:50:28
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-04-03 14:17:28
-->
<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar" :alt="column.title" class="rounded-circle border ">
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
import PostList from '@/components/PostList.vue'
import { useMainStore } from '@/stores';
import { storeToRefs } from 'pinia';
const route = useRoute()
const store = useMainStore()
const { getColumnById, getPostsByColId } = storeToRefs(store)
const currentId = +route.params.id
const column = getColumnById.value(currentId)
const list = getPostsByColId.value(currentId)

// import { computed } from 'vue';
// const column = computed(() => store.getColumnById(currentId))
// const list = computed(() => store.getPostsByColId(currentId))
</script>