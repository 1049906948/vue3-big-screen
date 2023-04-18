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
<!--        <menubar-item v-for='v in filterMenubarData' :key='v.path' :index='v.path' :menu-list='v' />-->
      </div>

    </el-menu>
  </div>
</template>

<script lang="ts" setup>
// import MenubarItem from './menubarItem.vue'
import { ref } from 'vue'
// import { useLayoutStore } from '@/store/modules/layout'
// const { getMenubar, setRoutes, changeCollapsed, getSetting } = useLayoutStore()

const isCollapse = ref(false)
// 过滤隐藏的菜单，并提取单条的子菜单
// const filterMenubar = (menuList:IMenubarList[]) => {
//   const f = (menuList:IMenubarList[]) => {
//     let arr:IMenubarList[] = []
//     menuList.filter(v => !v.meta.hidden).forEach(v => {
//       let child = v.children && v.children.filter(v => !v.meta.hidden)
//       let currentItem = v
//       if(!v.meta.alwaysShow && child && child.length === 1) {
//         [currentItem] = child
//       }
//       arr.push(currentItem)
//       if(currentItem.children && currentItem.children.length > 0) {
//         arr[arr.length - 1].children = f(currentItem.children)
//       }
//     })
//     return arr
//   }
//   return f(menuList)
// }



// const filterMenubarData = filterMenubar(getMenubar.menuList)

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
