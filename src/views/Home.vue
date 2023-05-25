<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50"/>
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <uploader
      action="upload"
      :before-upload="beforeUpload"
      @file-uploaded="onFileUploaded"
    >
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.url" width="500" />
      </template>
    </uploader>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="columns"></column-list>
  </div>
</template>

<script setup lang="ts">
import ColumnList from '@/components/ColumnList.vue'
import Uploader from '@/components/Uploader.vue'
import createMessage from '@/components/createMessage';
import { useMainStore, IImageProps } from '@/stores'
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const store = useMainStore()
const { columns } = storeToRefs(store)
const beforeUpload = (file: File) => {
  const isJPG = (file.type === 'image/jpeg')
  if (!isJPG) {
    createMessage('上传图片只能是 JPG 格式!', 'error', 2000)
  }
  return isJPG
}
const onFileUploaded = (rawData: IImageProps) => {
  createMessage(`上传图片ID ${rawData._id}`, 'success', 2000)
}

onMounted(() => {
  store.fetchColumns()
})

</script>