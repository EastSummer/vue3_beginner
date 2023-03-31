<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-03-23 13:37:41
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-03-31 14:11:01
-->
<template>
  <div class="login-page">
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules"
          v-model="emailVal"
          placeholder="请输入邮箱地址"
          type="text"
          ref="inputRef"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          type="password"
          placeholder="请输入密码"
          :rules="passwordRules"
          v-model="passwordVal"
        />
      </div>
    </validate-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ValidateInput, { IRulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { useMainStore } from '@/stores';

const router = useRouter()
const store = useMainStore()
const emailVal = ref('es@github.com')
const emailRules = ref<IRulesProp>([
  { type: 'required', message: '电子邮箱地址不能为空' },
  { type: 'email', message: '请输入正确的电子邮箱格式' },
])
const passwordVal = ref('')
const passwordRules = ref<IRulesProp>([
  { type: 'required', message: '密码不能为空' }
])
const onFormSubmit = (result: boolean) => {
  if (result) {
    router.push('/')
    store.login()
  }
}
</script>