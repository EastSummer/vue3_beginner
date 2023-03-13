<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-02-24 15:02:47
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-02-24 15:13:46
 * @link https://cn.vuejs.org/api/options-composition.html#provide
-->
<template>
  <div>

  </div>
</template>

<script setup lang="ts">
// 如果你使用的是composition API。可以直接使用provide 方法传递任何形式的数据。
import { provide, ref } from 'vue'
provide('key', 'value')
// 使用ref，我们还可以将这个属性设置为响应式
const value = ref('value')
provide('key', value)
</script>

<script lang="ts">
// 如果使用的是Options API，则可以使用以下结构在组件中提供数据。
// export default {
//   provide: {'key': 'value'}
// }
// 响应式
import { computed } from 'vue'
export default {
  data() {
    return {
      value: 'value'
    }
  },
  provide() {
    return {
      // 显式提供一个计算属性
      key: computed(() => this.value)
    }
  }
}
</script>

<style scoped>

</style>