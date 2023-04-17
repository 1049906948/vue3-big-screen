<template>
  <div class="screen-container">
    <div v-if="loading" class="mask flex-c">
      <dv-loading>
        <span class="loading-title">加载中...</span>
      </dv-loading>
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ckLoading"
};
</script>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
const loading = ref(true);
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 500);
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/common/variables.scss';
.mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: $theme-color;
  z-index: 9999;
  background-image: url('@/assets/home_bg.png');
  .loading-title {
    font-size: $base-font-size;
    color: #fff;
    margin-top: 10px;
  }
}
</style>
