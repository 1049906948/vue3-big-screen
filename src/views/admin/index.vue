<template>
  <div class="screen-container">
    <div class="screen-content" ref="screenRef">

      <div v-if="loading" class="mask flex-c">
        <dv-loading>
          <span class="loading-title">加载中...</span>
        </dv-loading>
      </div>

      <div class="ck-container" v-else>
           1231
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import windowResize from "@/utils/resize";
const { screenRef, calcRate, windowDraw, unWindowDraw } = windowResize()
import { onMounted, onUnmounted, ref } from 'vue';
const loading = ref(true);
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 2000);
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
