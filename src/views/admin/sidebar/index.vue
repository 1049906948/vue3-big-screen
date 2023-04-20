<template>
  <div class="ck-sidebar">
    <el-menu
        class="ck-menu"
        :show-timeout="200"
        background-color="#001529"
        text-color="#fff"
        default-active="#fff"
        mode="vertical"
        unique-opened
        popper-effect="dark"
        @close="handleClose"
        @open="handleOpen"
    >
      <div class="ck-logo" @click="handleCollapse">
        <div>logo</div>
      </div>


      <div class="menu-wrapper">
        <menubar-item v-for='v in filterMenubarData' :key='v.path' :index='v.path' :menu-list='v' />
      </div>

    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import MenubarItem from './menubarItem.vue'
import { ref } from 'vue'
import {IMenubarList} from '@/type/store/layout'
import {route} from "@/views/admin/sidebar/com.config";
const isCollapse = ref(false)

const filterMenubarData = route

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleCollapse = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
.el-menu{
  padding-top: 20px;
  border-right: none;
}
.el-menu-item.is-active{
   background: #409eff;
   color: #ffffff;
}

.ck-sidebar {
  width: 250px;
  min-height: 100vh;
  background: #001529;
  border-right: none;
  .menu-wrapper{
    margin-top: 20px;
  }
  .ck-logo {
    text-align: center;
    height: 50px;
    line-height: 50px;
    background: #ffffff;
    width: 80%;
    margin: 0 auto;
    cursor: pointer;
  }
}
</style>
