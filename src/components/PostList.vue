<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-03-28 16:51:11
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-04-20 18:36:45
-->
<template>
  <div class="post-list">
    <article v-for="post in list" :key="post._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4>{{post.title}}</h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image" class="col-3">
            <img :src="post.image.url" :alt="post.title" class="rounded-lg w-100">
          </div>
          <p :class="{'col-9': post.image}">{{post.content}}</p>
        </div>
        <span class="text-muted">{{post.createdAt}}</span>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { IPostProps } from '@/stores'
const props = defineProps<{
  list: IPostProps[],
}>()
</script>

<style scoped>

</style>