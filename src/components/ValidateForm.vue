<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-03-15 15:50:37
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-05-04 16:34:52
-->
<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script setup lang="ts">
import emitter from '@/utils/EventBus'
import { onUnmounted } from 'vue';

type IValidateFunc = () => boolean

const emits = defineEmits(['form-submit'])

let funcArr: IValidateFunc[] = []

const submitForm = () => {
  const result = funcArr.map(func => func()).every(res => res)  
  emits('form-submit', result)
}

const callback = (func: IValidateFunc) => {
  if (func) {
    funcArr.push(func)
  }
}
emitter.on('from-item-created', callback)
onUnmounted(() => {
  emitter.off('from-item-created', callback)
  funcArr = []
})
</script>

<style scoped>
.submit-area {
  display: inline-block;
}
</style>