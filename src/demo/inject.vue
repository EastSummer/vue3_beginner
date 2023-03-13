<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-02-24 15:02:47
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-02-24 15:13:46
 * @link https://cn.vuejs.org/api/options-composition.html#inject
-->
<template>
  <div>

  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
const msg = inject('key')
</script>

<script>
export default {
  inject: ['key']
}
</script>

<style scoped>

</style>
