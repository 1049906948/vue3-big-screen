<template>
  <div class="ck-container">

    <div v-if="loading" class="mask flex-c">
      <dv-loading>
        <span class="loading-title">加载中...</span>
      </dv-loading>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
const loading = ref(true);
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 2000);
})
</script>

<style scoped>

</style>
