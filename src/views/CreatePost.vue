<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-03-31 10:44:28
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-05-26 19:14:08
-->
<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <Uploader
      action="upload"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
      :before-upload="beforeUpload"
      @file-uploaded="handleFileUploaded"
    >
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.url">
      </template>
    </Uploader>
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
import Uploader from '@/components/Uploader.vue'
import { useMainStore, IPostProps, IImageProps } from '@/stores';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import createMessage from '@/components/createMessage';
import { beforeUploadCheck } from '@/utils/helper';

const titleVal = ref('')
const router = useRouter()
const store = useMainStore()
let imageId = ''
const titleRules: IRulesProp = [
  { type: 'required', message: '文章标题不能为空' }
]
const contentVal = ref('')
const contentRules: IRulesProp = [
  { type: 'required', message: '文章详情不能为空' }
]
const beforeUpload = (file: File) => {
  const { passed, error } = beforeUploadCheck(
    file, { format: ['image/jpeg', 'image/png'], size: 1 }
  )
  if (error === 'format') {
    createMessage('上传图片只能是 JPG/PNG 格式!', 'error')
  }
  if (error === 'size') {
    createMessage('上传图片大小不能超过 1Mb', 'error')
  }
  return passed
}
const handleFileUploaded = (rawData: IImageProps) => {
  if (rawData._id) {
    imageId = rawData._id
    console.log('上传图片ID ${rawData._id}: ', rawData._id)
  }
}
const onFormSubmit = (result: boolean) => {
  if(result) {
    const { column, _id } = store.user
    if (column) {
      const newPost: IPostProps = {
        title: titleVal.value,
        content: contentVal.value,
        column,
        author: _id,
      }
      if (imageId) {
        newPost.image = imageId
      }
      store.createPost(newPost).then(() => {
        createMessage('发表成功，2秒后跳转到文章', 'success', 2000)
        setTimeout(() => {
          router.push({ name: 'column', params: { id: column } })
        }, 2000)
      })
    }
  }
}
</script>

<style scoped>
/* 
  深度选择器
  https://cn.vuejs.org/api/sfc-css-features.html#scoped-css
*/
.create-post-page :deep(.file-upload-container) {
  height: 200px;
  cursor: pointer;
}
.create-post-page :deep(.file-upload-container img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>