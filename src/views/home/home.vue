<template>
  <div class="ck-container">

    <div class="box">
      <div class="item">
        <div @click="handleUrl('/Screen')">大屏展示</div>
      </div>
      <div class="item">
        <div @click="handleStart()">开始</div>
      </div>
      <div class="item">
        <div @click="handleEnd()">结束</div>
      </div>
      <div class="item" @click="handleUrl('/admin')">管理系统</div>
    </div>

    <div class="box">
      <div class="item">
        <div @click="handleUrl('/Screen')">大屏展示</div>
      </div>
      <div class="item">
        <div @click="handleStart()">开始</div>
      </div>
      <div class="item">
        <div @click="handleEnd()">结束</div>
      </div>
      <div class="item"></div>
    </div>

    <div class="test">
      <el-progress type="circle" :percentage="parseInt(fake.progress*100)" />
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
import Fakeprogress from 'fake-progress'
import { onMounted, onBeforeMount, ref, watch } from 'vue';
const router=useRouter()

const time = new Fakeprogress({
  timeConstant : 10000,
  autoStart : true
});
const fake = ref(time);

function handleStart(){
  fake.value.start()
}

function handleEnd(){
  fake.value.end()
}

function handleUrl(url){
  router.push(url)
  console.log(12)
}
</script>

<style lang="scss" scoped>
.test{
  //background: #55a532;
  width: 1200px;
  margin: 0 auto;
  margin-top: 80px;
}
.box{
  background: #55a532;
  width: 1200px;
  margin: 0 auto;
  display: flex;
  margin-top: 20px;
  .item{
    background: #3de7c9;
    width: 25%;
    border: 1px solid red;
    text-align: center;
    height: 50px;
    line-height: 50px;
    cursor:pointer;
  }
}
</style>
