<template>
  <teleport to="#message">
    <div class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2"
      :class="classObject" v-if="isVisible">
      <span>{{message}}</span>
      <button type="button" class="btn-close" aria-label="Close"></button>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import useDOMCreate from '@/hooks/useDOMCreate'
import { ref } from 'vue'
export type IMessageType = 'success' | 'error' | 'default'

const props = withDefaults(defineProps<{
  message?: string,
  type?: IMessageType,
}>(), {
  type: 'default',
})

useDOMCreate('message')

const isVisible = ref(true)
const classObject = {
  'alert-success': props.type === 'success',
  'alert-danger': props.type === 'error',
  'alert-primary': props.type === 'default'
}
const emit = defineEmits(['close-message'])

const hide = () => {
  isVisible.value = false
  emit('close-message', true)
}
</script>

<style scoped>

</style>