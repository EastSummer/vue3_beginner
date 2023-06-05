<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-03-28 16:51:11
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-06-01 15:23:07
-->
<template>
  <div class="post-list">
    <article v-for="post in posts" :key="post._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4>
          <router-link :to="`/posts/${post._id}/`">
            {{post.title}}
          </router-link>
        </h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image && typeof post.image === 'object'" class="col-4">
            <img :src="post.image.fitUrl" :alt="post.title" class="rounded-lg w-100">
          </div>
          <p :class="{'col-8': post.image}" class="text-muted">
            {{post.excerpt}}
          </p>
        </div>
        <span class="text-muted">{{post.createdAt}}</span>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { IImageProps, IPostProps } from '@/stores'
import { generateFitUrl } from '@/utils/helper';
import { computed } from 'vue';
const props = defineProps<{
  list: IPostProps[],
}>()
const posts = computed(() => props.list.map(post => {
  generateFitUrl(post.image as IImageProps, 200, 100, ['m_fill'])
  return post
}))
</script>

<style scoped>
.post-list h4 a {
  text-decoration: none;
  color:#1a1a1a;
}
.post-list h4 a:hover {
  color:#0d6efd;
}
</style>