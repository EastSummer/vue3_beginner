<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-05-17 14:04:18
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-06-02 11:07:03
-->
<template>
  <div class="file-upload">
    <div
      class="file-upload-container"
      @click.prevent="triggerUpload"
      v-bind="$attrs"
    >
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadedData">
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="handleFileChange"
    >
  </div>
</template>

<script lang="ts">
export default {
  name: 'Uploader',
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import httpRequest from '@/utils/httpRequest'
import { ref, watch } from 'vue'

type IUploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean
const props = defineProps<{
  action: string,
  beforeUpload: CheckFunction,
  // 两种写法
  // uploaded: {
  //   [key: string]: any
  // },
  uploaded: Record<string, any>
}>()
const emit = defineEmits(['file-uploaded', 'file-uploaded-error'])
const fileInput = ref<null | HTMLInputElement>(null)
const fileStatus = ref<IUploadStatus>(props.uploaded ? 'success' : 'ready')
const uploadedData = ref(props.uploaded)

watch(() => props.uploaded, newVal => {
  if (newVal) {
    fileStatus.value = 'success'
    uploadedData.value = newVal.data
  }
})

const triggerUpload = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const handleFileChange = (e: Event) => {
  const currentTarget = e.target as HTMLInputElement
  if (currentTarget.files) {
    const files = Array.from(currentTarget.files)
    if (props.beforeUpload) {
      const result = props.beforeUpload(files[0])
      if (!result) return
    }
    fileStatus.value = 'loading'
    const formData = new FormData()
    formData.append('file', files[0])
    httpRequest.post({
      url: props.action,
      data: formData,
      options: {
        headers: {
        'Content-Type': 'multipart/form-data'
        },
      },
    }).then(resp => {
      // console.log('handleFileChange: ', resp.data)
      fileStatus.value = 'success'
      uploadedData.value = resp.data as Object
      emit('file-uploaded', resp.data)
    }).catch((error) => {
      fileStatus.value = 'error'
      emit('file-uploaded-error', { error })
    }).finally(() => {
      if (fileInput.value) {
        fileInput.value.value = ''
      }
    })
  }
}
</script>

<style scoped>

</style>