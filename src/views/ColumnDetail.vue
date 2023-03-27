<template>
  <h1>
    <pre>{{route}}</pre>
  </h1>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>