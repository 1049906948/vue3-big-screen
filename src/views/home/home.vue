<template>
  <div class="ck-container">


    <div class="box">

      <el-row :gutter="12">
        <el-col :span="6">
          <el-card class="item" shadow="always">
            <div @click="handleUrl('/Screen')">大屏展示</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="item" shadow="always">
            <div @click="handleUrl('/element')">element ui</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="item" shadow="always">
            <div @click="handleUrl('/Screen')">大屏展示</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="item" shadow="always">
            <div class="item" @click="handleUrl('/admin')">管理系统</div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="box">

      <el-row :gutter="12">
        <el-col :span="6">
          <el-card class="item" shadow="always">
            <div @click="handleUrl('/examples')">表格</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="item" shadow="always">
            <div @click="handleUrl('/three')">three</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="item" shadow="always">
            <div @click="handleUrl('/webgl')">webgl</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="item" shadow="always">
            <div @click="handleUrl('/examples')">表格</div>
          </el-card>
        </el-col>
      </el-row>
    </div>


    <div class="box">

      <el-row :gutter="12">

        <el-col :span="6">
          <el-card class="item" shadow="always">
            <div class="item" @click="handleUrl('/tailwind')">tailwind</div>
          </el-card>
        </el-col>

        <el-col :span="6">
          <el-card class="item" shadow="always">
            <div class="item" @click="handleUrl('/web3')">web3</div>
          </el-card>
        </el-col>

        <el-col :span="6">
          <el-card class="item" shadow="always">
            <div class="item" @click="handleUrl('/grid')">九宫格</div>
          </el-card>
        </el-col>

        <el-col :span="6">
          <el-card class="item" shadow="always">
            <a href="https://github.com/1049906948/vue3-big-screen" target="_blank">
              github
            </a>
          </el-card>
        </el-col>
      </el-row>
    </div>





  </div>
</template>

<script setup>
// import Fakeprogress from 'fake-progress'
// export default {
//   data(){
//     return{
//       fake:new Fakeprogress({
//         timeConstant: 60000,
//         autoStart : true
//       })
//     }
//   },
//   created() {
//
//   },
//   methods:{
//     handleUrl(){
//
//     },
//     handleStart(){
//       this.fake.start()
//     },
//     handleEnd(){
//       this.fake.end()
//     }
//   }
// }

import {useRouter} from 'vue-router';
import { onMounted, onBeforeMount, ref, watch } from 'vue';
const router=useRouter()

function handleUrl(url){
  router.push(url)
  console.log(12)
}
</script>

<style lang="scss" scoped>

.box {
  width: 1200px;
  margin: 0 auto;
  margin-top: 20px;

  .item {
    text-align: center;
    cursor: pointer;
    height: 100px;
    line-height: 50px;
    &:hover {
      background: #3de7c9;
    }
  }
}
</style>
