<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-03-31 10:44:28
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-04-20 19:22:41
-->
<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          rows="10"
          type="text"
          tag="textarea"
          placeholder="请输入文章详情"
          :rules="contentRules"
          v-model="contentVal"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>

<script setup lang="ts">
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { IRulesProp } from '@/components/ValidateInput.vue'
import { useMainStore, IPostProps } from '@/stores';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const titleVal = ref('')
const router = useRouter()
const store = useMainStore()
const titleRules: IRulesProp = [
  { type: 'required', message: '文章标题不能为空' }
]
const contentVal = ref('')
const contentRules: IRulesProp = [
  { type: 'required', message: '文章详情不能为空' }
]
const onFormSubmit = (result: boolean) => {
  if(result) {
    const { columnId } = store.user
    if (columnId) {
      const newPost: IPostProps = {
        _id: new Date().getTime().toString(),
        title: titleVal.value,
        content: contentVal.value,
        column: columnId.toString(),
        createdAt: new Date().toLocaleString(),
      }
      store.createPost(newPost)
      router.push({ name: 'column', params: { id: columnId } })
    }
  }
}
</script>

<style scoped>

</style>