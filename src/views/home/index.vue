<template>
  <div class="ck-container">

      <div class="box">
        <div class="item">
          <div @click="handleUrl('/Screen')">大屏展示</div>
        </div>
        <div class="item">

        </div>
        <div class="item"></div>
        <div class="item"></div>
      </div>


    <div class="test">
      <el-progress type="circle" :percentage="25" />
    </div>



  </div>
</template>

<script setup lang="ts">

import {useRouter} from 'vue-router'
const router=useRouter()
function handleUrl(url:string){
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