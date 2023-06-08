<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-06-07 15:01:36
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-06-07 15:38:20
-->
<template>
  <div class="vue-easymde-editor">
    <textarea ref="textArea"></textarea>
  </div>
</template>

<script setup lang="ts">
import EasyMDE, { Options } from 'easymde'
import { onMounted, onUnmounted, ref, watch } from 'vue'

// 类型，属性以及事件
interface IEditorProps {
  modelValue?: string
  options?: Options
}
interface IEditorEvents {
  (type: 'update:modelValue', value: string): void
  (type: 'change', value: string): void
  (type: 'blur'): void
}

const props = defineProps<IEditorProps>()
const emits = defineEmits<IEditorEvents>()
// 有了模版我们需要一些初始的数据
// 1 暴露对应的方法
// 2 结合页面实现验证功能
const textArea = ref<null | HTMLTextAreaElement>()
let easyMDEInstance: EasyMDE | null = null
const innerValue = ref(props.modelValue || '')

watch(()=> props.modelValue, newVal => {
  if (easyMDEInstance) {
    if (newVal !== innerValue.value) {
      easyMDEInstance.value(newVal || '')
    }
  }
})

onMounted(() => {
  if(textArea.value) {
    // 组装 options
    const config: Options = {
      ...(props.options || {}),
      element: textArea.value,
      initialValue: innerValue.value,
    }
    easyMDEInstance = new EasyMDE(config)
    // 监控对应的事件
    easyMDEInstance.codemirror.on('change', () => {
      if (easyMDEInstance) {
        // 拿到当前的值
        const updateValue = easyMDEInstance.value()
        innerValue.value = updateValue
        emits('update:modelValue', updateValue)
        emits('change', updateValue)
      }
    })
    easyMDEInstance.codemirror.on('blur', () => {
      if (easyMDEInstance) {
        emits('blur')
      }
    })
  }
})
// 销毁对应的实例
onUnmounted(() => {
  if (easyMDEInstance) {
    easyMDEInstance.cleanup()
  }
  easyMDEInstance = null
})
const clear = () => {
  if (easyMDEInstance) {
    easyMDEInstance.value('')
  }
}
const getMDEInstance = () => easyMDEInstance
// https://cn.vuejs.org/api/sfc-script-setup.html#defineexpose
defineExpose({
  clear,
  getMDEInstance,
})

</script>

<style scoped>
.vue-easymde-editor.is-invalid {
  border: 1px solid #dc3545;
}
</style>