<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-05-29 14:03:32
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-05-31 16:42:28
-->
<template>
  <div class="post-detail-page">
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <img :src="currentImageUrl" alt="currentPost.title" class="rounded-lg img-fluid my-4" v-if="currentImageUrl">
      <h2 class="mb-4">{{currentPost.title}}</h2>
      <div class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0">
        <div class="col">
          <user-profile :user="currentPost.author" v-if="typeof currentPost.author === 'object'"></user-profile>
        </div>
        <span class="text-muted col text-right font-italic">发表于：{{currentPost.createdAt}}</span>
      </div>
      <div v-html="currentHTML"></div>
      <div v-if="showEditArea" class="btn-group mt-5">
        <router-link
          type="button"
          class="btn btn-success"
          :to="{name: 'create', query: { id: currentPost._id}}"
        >
          编辑
        </router-link>
        <button type="button" class="btn btn-danger">删除</button>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import UserProfile from '@/components/UserProfile.vue'
import { IImageProps, IUserProps, useMainStore } from '@/stores'
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'

const store = useMainStore()
const { fetchPost, getCurrentPost, user } = store
const route = useRoute()
const currentId = route.params.id as string
const md = MarkdownIt()

const currentPost = computed(() => getCurrentPost(currentId))
const currentHTML = computed(() => {
  if (currentPost.value && currentPost.value.content) {
    return md.render(currentPost.value.content)
  }
})
const showEditArea = computed(() => {
  const { isLogin, _id } = user
  if (currentPost.value && currentPost.value.author && isLogin) {
    const postAuthor = currentPost.value.author as IUserProps
    return postAuthor._id === _id
  } else {
    return false
  }
})
const currentImageUrl = computed(() => {
  if (currentPost.value && currentPost.value.image) {
    const { image } = currentPost.value
    return (image as IImageProps).url + '?x-oss-process=image/resize,w_850'
  } else {
    return null
  }
})

onMounted(() => {
  fetchPost(currentId)
})
</script>

<style scoped>

</style>