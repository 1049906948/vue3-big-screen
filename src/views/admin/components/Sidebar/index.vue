<template>
  <div :class="{ 'has-logo': showSidebarLogo }">
<!--        <SidebarLogo v-if="showSidebarLogo" :collapse="isCollapse" />-->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="activeMenu"
          :unique-opened="true"
          active-text-color="#fff"
          background-color="#001529"
          mode="vertical"
          text-color="#fff"
      >
<!--        <SidebarItem-->
<!--            v-for="route in permissionStore.routes"-->
<!--            :key="route.path"-->
<!--            :base-path="route.path"-->
<!--            :is-collapse="isCollapse"-->
<!--            :item="route"-->
<!--        />-->
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import {computed} from "vue"
import {useRoute} from "vue-router"
import {storeToRefs} from "pinia"
import {useAppStore, DeviceType} from "@/store/modules/app"
import {useSettingsStore} from "@/store/modules/settings"

const appStore = useAppStore()
const settingsStore = useSettingsStore()

const activeMenu = computed(() => {
  // const { meta, path } = route
  // if (meta?.activeMenu) {
  //   return meta.activeMenu
  // }
  // return path
  return 111;
})


const isCollapse = computed(() => {
  return !appStore.sidebar.opened
})

</script>

<style lang="scss" scoped>
@mixin tip-line {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background-color: var(--v3-sidebar-menu-tip-line-bg-color);
  }
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - var(--v3-header-height));
  }
}

.el-scrollbar {
  height: 100%;

  :deep(.scrollbar-wrapper) {
    // 限制水平宽度
    overflow-x: hidden !important;

    .el-scrollbar__view {
      height: 100%;
    }
  }

  // 滚动条
  :deep(.el-scrollbar__bar) {
    &.is-horizontal {
      // 隐藏水平滚动条
      display: none;
    }
  }
}

.el-menu {
  border: none;
  min-height: 100%;
  width: 100% !important;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu .el-menu-item) {
  height: var(--v3-sidebar-menu-item-height);
  line-height: var(--v3-sidebar-menu-item-height);

  &.is-active,
  &:hover {
    background-color: var(--v3-sidebar-menu-hover-bg-color);
  }

  display: block;

  * {
    vertical-align: middle;
  }
}

:deep(.el-menu-item) {
  &.is-active {
    @include tip-line;
  }
}

.el-menu--collapse {
  :deep(.el-sub-menu) {
    &.is-active {
      .el-sub-menu__title {
        color: var(--v3-sidebar-menu-active-text-color) !important;
        @include tip-line;
      }
    }
  }
}
</style>
