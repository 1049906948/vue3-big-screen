<template>
  <div class="ck-sidebar">
    <el-menu
        :collapse="isCollapse"
        :show-timeout="200"
        active-text-color="#ffffff"
        background-color="#545c64"
        default-active='1'
        mode="vertical"
        unique-opened
        @close="handleClose"
        @open="handleOpen"
    >
      <div class="ck-logo" @click="handleCollapse">
        <div>logo {{ isCollapse }}</div>
      </div>

      <div class="menu-wrapper">

      </div>

    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const isCollapse = ref(false)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
.ck-sidebar {
  width: 13%;
  height: 100vh;
  background: #545c64;
  padding-top: 20px;
  box-sizing: border-box;

  .ck-logo {
    text-align: center;
    height: 50px;
    line-height: 50px;
    background: #ffffff;
    width: 80%;
    margin: 0 auto;
    cursor: pointer;
  }
  //
  //.menu-wrapper {
  //  padding-top: 20px;
  //}
}
</style>
