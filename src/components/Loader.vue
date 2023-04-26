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

const props = withDefaults(defineProps<{
  text?: string,
  background?: string,
}>(), {
  text: 'loading...',
})
const node = document.createElement('div')
node.id = 'back'
document.body.appendChild(node)

onUnmounted(() => {
  document.body.removeChild(node)
})
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