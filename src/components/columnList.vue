<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-03-10 13:19:30
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-03-27 17:49:47
-->
<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="column.avatar" :alt="column.title" class="rounded-circle border border-light w-25 my-3">
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <router-link :to="`/column/${column.id}`" class="btn btn-outline-primary">
            进入专栏
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export interface IColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}
</script>

<script setup lang="ts">
import { defineProps, PropType, computed } from 'vue'
import img from '@/assets/column.jpg'

// 非ts写法
// const props = defineProps({
//   list: {
//     type: Array as PropType<IColumnProps[]>,
//     required: true,
//   }
// })

// ts写法
const props = defineProps<{
  list: IColumnProps[]
}>()

const columnList = computed(() => props.list.map(col => {
  if(!col.avatar) {
    col.avatar = img
  }
  return col
}))


</script>

<style scoped>

</style>