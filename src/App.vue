<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-02-16 15:49:27
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-03-13 13:52:28
-->
<template>
  <div class="container-fluid px-0 flex-shrink-0">
    <global-header :user="currentUser" />
    <column-list :list="testData" />
  </div>
</template>

<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import { ref } from 'vue'
import ColumnList, { IColumnProps } from '@/components/columnList.vue'
import GlobalHeader, { IUserProps } from '@/components/globalHeader.vue'

const currentUser = ref<IUserProps>({
  isLogin: true,
  name: '111'
})

const testData = ref<IColumnProps[]>([
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: '这是的test3专栏，有一段非常有意思的简介，可以更新一下欧',
    // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  }
])

</script>

<style scoped>

</style>
