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

const submitForm = () => {
  const result = funcArr.map(func => func()).every(res => res)
  emits('form-submit', result)
}

let funcArr: IValidateFunc[] = []

const callback = (func: IValidateFunc) => {
  funcArr.push(func)
}
emitter.on('from-item-created', callback)
onUnmounted(() => {
  emitter.off('from-item-created', callback)
  funcArr = []
})
</script>

<style scoped>

</style>