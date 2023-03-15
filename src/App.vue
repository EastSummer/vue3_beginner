<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-02-16 15:49:27
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-03-15 13:33:44
-->
<template>
  <div class="container-fluid px-0 flex-shrink-0">
    <global-header :user="currentUser" />
    <column-list :list="testData" />
    <validate-input
      :rules="emailRules"
      v-model="emailVal"
      placeholder="请输入邮箱地址"
      type="text"
    />
    <h3>{{ emailVal }}</h3>
  </div>
</template>

<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import { ref } from 'vue'
import ColumnList, { IColumnProps } from '@/components/ColumnList.vue'
import GlobalHeader, { IUserProps } from '@/components/GlobalHeader.vue'
import ValidateInput, { IRulesProp } from '@/components/ValidateInput.vue'

const currentUser = ref<IUserProps>({
  isLogin: true,
  name: '111'
})

const emailVal = ref('emailVal')

const emailRules = ref<IRulesProp>([
  { type: 'required', message: '电子邮箱地址不能为空' },
  { type: 'email', message: '请输入正确的电子邮箱格式' },
])

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
