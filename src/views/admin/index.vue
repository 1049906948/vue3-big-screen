<template>
  <ckLoading>
      <div class="ck-wapper">
        <div class="ck-sidebar">
         <div class="ck-logo" @click="handleCollapse">
            <div >logo {{isCollapse}}</div>
         </div>
          <el-menu
              :show-timeout="200"
              active-text-color="#ffd04b"
              background-color="#545c64"
              :collapse="isCollapse"
              @close="handleClose"
              @open="handleOpen"
              mode="vertical"
              unique-opened
          >


            <div class="menu-wrapper">
              <el-menu-item index="1">
                <el-icon><location /></el-icon>
                权限管理
              </el-menu-item>
            </div>


          </el-menu>
        </div>
      </div>
  </ckLoading>
</template>


<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { ref } from 'vue'
const isCollapse = ref(false)


const handleCollapse = () => {

  if(isCollapse.value){
    isCollapse.value = false;
  }else {
    isCollapse.value = true;
  }

}

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
.el-menu{
  border-right:none;
}

.ck-wapper{
  background: #ffffff;
  width: 100vw;
  height: 100vh;
}
.ck-sidebar{
  width: 13%;
  height: 100vh;
  background: #545c64;
  padding-top: 20px;
  box-sizing: border-box;
  .ck-logo{
    text-align: center;
    height: 50px;
    line-height: 50px;
    background: #ffffff;
    width: 80%;
    margin: 0 auto;
    cursor: pointer;
  }
  .menu-wrapper{
     padding-top: 20px;
  }
}
</style>

