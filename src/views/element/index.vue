<template>
  <div class="p-10 bg-gray-50 min-h-screen">
    <el-button type="primary" @click="handleStart()">开始</el-button>
    <el-button @click="handleEnd()">结束</el-button>
    <div class="mt-10">
      <el-progress type="circle" :percentage="parseInt(fake.progress*100)" />
    </div>
  </div>
</template>

<script setup>
import Fakeprogress from 'fake-progress'
import { onMounted, onBeforeMount, ref, watch } from 'vue';
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
</script>

<style scoped>
.test{

}
</style>
