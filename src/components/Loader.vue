<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-04-26 14:45:55
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-05-04 16:37:11
-->
<template>
  <Teleport to="#back">
    <div
      class="d-flex justify-content-center align-items-center h-100 w-100 loading-container"
      :style="{backgroundColor: background || ''}"
    >
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">{{ text }}</span>
          <!--
            https://v5.getbootstrap.com/docs/5.0/migration/#helpers
            Renamed .sr-only and .sr-only-focusable to .visually-hidden and .visually-hidden-focusable
          -->
        </div>
        <p v-if="text" class="text-primary">{{ text }}</p>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue'
import useDOMCreate from '@/hooks/useDOMCreate'

const props = withDefaults(defineProps<{
  text?: string,
  background?: string,
}>(), {
  text: 'loading...',
})

useDOMCreate('back')

</script>

<style>
.loading-container {
  background: rgba(0, 0, 0, .5);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
}
.loading-container {
  text-align: center;
}
</style>