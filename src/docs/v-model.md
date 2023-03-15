<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-03-14 16:44:35
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-03-14 16:53:54
-->
### [Vue3 script setup语法糖中使用v-model对子组件进行双向数据绑定](https://blog.csdn.net/weixin_45525653/article/details/125581200)

v-model对子组件进行双向数据绑定的意义：  
在某些情况下，我们可能需要对某一个 prop 进行“双向绑定”，vue3提供的v-model可以很好的实现这个需求。

```html
// 父组件
<template>
  <Son v-model:count="count" />
</template>
<script setup lang="ts">
  import Son from 'xxxx'
  import { ref } from 'vue'

  let count = ref(100)
</script>
```
```html
// 子组件
<template>
  <h1>{{ count }}</h1>
  <button @click="emit('update:count', count+1)">+1</button>
</template>
<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue'
  const props = defineProps(['count'])
  const emit = defineEmits(['update:count'])
</script>
```
