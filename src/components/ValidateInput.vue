<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-03-14 15:20:44
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-03-15 10:28:08
-->
<template>
  <div class="validate-input-container pb-3">
    <input
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    >
    <span v-if="inputRef.error" class="invalid-feedback">{{inputRef.message}}</span>
  </div>
</template>

<script lang="ts">
interface IRuleProp {
  type: 'required' | 'email';
  message: string;
}
export type IRulesProp = IRuleProp[]
export default {
  name: 'ValidateInput',
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { reactive } from 'vue';

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const props = defineProps<{
  rules: IRulesProp,
  modelValue: string,
}>()

const emits = defineEmits(['update:modelValue'])

const inputRef = reactive({
  val: props.modelValue || '',
  error: false,
  message: '',
})

const validateInput = () => {
  if(props.rules) {
    const allPassed = props.rules.every(rule => {
      let passed = true
      inputRef.message = rule.message
      switch (rule.type) {
        case 'required':
          passed = (inputRef.val.trim() !== '')
          break
        case 'email':
          passed = emailReg.test(inputRef.val)
          break
        default:
          break
      }
      return passed
    })
    inputRef.error = !allPassed
  }
}

const updateValue = (e: Event) => {
  const targetValue = (e.target as HTMLInputElement).value
  inputRef.val = targetValue
  emits('update:modelValue', targetValue)
}
</script>

<style scoped>

</style>