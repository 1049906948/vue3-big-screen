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
        <div>logo {{ isCollapse }}</div>
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
// import { useLayoutStore } from '@/store/modules/layout'
import {IMenubarList} from '@/type/store/layout'
// const { getMenubar, setRoutes, changeCollapsed, getSetting } = useLayoutStore()

const isCollapse = ref(false)


 const route:Array<IMenubarList> = [
  {
    id: 2,
    parentId: 0,
    name: 'Project',
    path: '/Project',
    component: 'Layout',
    redirect: '/Project/ProjectList',
    meta: { title: '项目管理', icon: 'el-icon-phone' },
    children:[
      {
        id: 20,
        parentId: 2,
        name: 'ProjectList',
        path: '/Project/ProjectList',
        component: 'ProjectList',
        meta: { title: '项目列表', icon: 'el-icon-goods' }
      },
      {
        id: 21,
        parentId: 2,
        name: 'ProjectDetail',
        path: '/Project/ProjectDetail/:projName',
        component: 'ProjectDetail',
        meta: { title: '项目详情', icon: 'el-icon-question', activeMenu: '/Project/ProjectList', hidden: true }
      },
    ]
  },


  {
    id: 22,
    parentId: 2,
    name: 'ProjectImport',
    path: '/Project/ProjectImport',
    component: 'ProjectImport',
    meta: { title: '项目导入', icon: 'el-icon-help' }
  },
  {
    id: 3,
    parentId: 0,
    name: 'Nav',
    path: '/Nav',
    component: 'Layout',
    redirect: '/Nav/SecondNav/ThirdNav',
    meta: { title: '多级导航', icon: 'el-icon-picture' }
  },
  {
    id: 30,
    parentId: 3,
    name: 'SecondNav',
    path: '/Nav/SecondNav',
    redirect: '/Nav/SecondNav/ThirdNav',
    component: 'SecondNav',
    meta: { title: '二级导航', icon: 'el-icon-camera', alwaysShow: true }
  },
  {
    id: 300,
    parentId: 30,
    name: 'ThirdNav',
    path: '/Nav/SecondNav/ThirdNav',
    component: 'ThirdNav',
    meta: { title: '三级导航', icon: 'el-icon-platform' }
  },
  {
    id: 31,
    parentId: 3,
    name: 'SecondText',
    path: '/Nav/SecondText',
    redirect: '/Nav/SecondText/ThirdText',
    component: 'SecondText',
    meta: { title: '二级文本', icon: 'el-icon-opportunity', alwaysShow: true }
  },
  {
    id: 310,
    parentId: 31,
    name: 'ThirdText',
    path: '/Nav/SecondText/ThirdText',
    component: 'ThirdText',
    meta: { title: '三级文本', icon: 'el-icon-menu' }
  },
  {
    id: 4,
    parentId: 0,
    name: 'Components',
    path: '/Components',
    component: 'Layout',
    redirect: '/Components/OpenWindowTest',
    meta: { title: '组件测试', icon: 'el-icon-phone' }
  },
  {
    id: 40,
    parentId: 4,
    name: 'OpenWindowTest',
    path: '/Components/OpenWindowTest',
    component: 'OpenWindowTest',
    meta: { title: '选择页', icon: 'el-icon-goods' }
  },
  {
    id: 41,
    parentId: 4,
    name: 'CardListTest',
    path: '/Components/CardListTest',
    component: 'CardListTest',
    meta: { title: '卡片列表', icon: 'el-icon-question-filled' }
  },
  {
    id: 42,
    parentId: 4,
    name: 'TableSearchTest',
    path: '/Components/TableSearchTest',
    component: 'TableSearchTest',
    meta: { title: '表格搜索', icon: 'el-icon-question-filled' }
  },
  {
    id: 43,
    parentId: 4,
    name: 'ListTest',
    path: '/Components/ListTest',
    component: 'ListTest',
    meta: { title: '标签页列表', icon: 'el-icon-question-filled' }
  },
  {
    id: 5,
    parentId: 0,
    name: 'Permission',
    path: '/Permission',
    component: 'Layout',
    redirect: '/Permission/Directive',
    meta: { title: '权限管理', icon: 'el-icon-phone', alwaysShow: true }
  },
  {
    id: 50,
    parentId: 5,
    name: 'Directive',
    path: '/Permission/Directive',
    component: 'Directive',
    meta: { title: '指令管理', icon: 'el-icon-goods' }
  }
]



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
