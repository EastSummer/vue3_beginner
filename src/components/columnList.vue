<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-03-10 13:19:30
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-06-12 17:07:32
-->
<template>
  <div class="row">
    <div v-for="column in columnList" :key="column._id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="column.avatar?.fitUrl" :alt="column.title" class="rounded-circle border border-light w-25 my-3">
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <router-link :to="`/column/${column._id}`" class="btn btn-outline-primary">
            进入专栏
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
// import img from '@/assets/column.jpg'
import { IColumnProps } from '@/stores/index'
import { addColumnAvatar } from '@/utils/helper'

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
  // if(!col.avatar) {
  //   col.avatar = {
  //     url: img,
  //   }
  // }
  addColumnAvatar(col, 50, 50)
  return col
}))


</script>

<style scoped>

</style>